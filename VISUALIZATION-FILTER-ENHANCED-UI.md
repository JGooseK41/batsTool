# Enhanced Visualization Filtering - Multi-Select with Saved Views

## UI Workflow

### Step 1: Display Filter Button
User clicks **"Display Filter"** button on visualization page

### Step 2: Select Filter Mode
Modal opens with dropdown:
- Filter by Victim
- Filter by Root Thread
- Filter by Terminal Wallet

### Step 3: Multi-Select Checkboxes
Based on selected mode, show all available options with checkboxes:

**Example (Filter by Victim):**
```
☐ V1 - Alice Chen (3 transactions, 15.5 ETH)
☐ V2 - Bob Smith (2 transactions, 8.0 BTC)
☑ V3 - Carol Lee (1 transaction, 1000 USDT)
☑ V4 - David Wong (4 transactions, 25.3 ETH)
```

### Step 4: Apply & Save
- **Apply Filter** - Show selected items in visualization
- **Save View** - Name and save this filter configuration
- **Export View** - Export current filtered visualization as PNG/SVG

### Step 5: Manage Saved Views
- Load previously saved views
- Delete saved views
- Export saved views to share with team

---

## Implementation

### Phase 1: UI Components

Add to visualization page in `index.html`:

```html
<!-- Display Filter Button (always visible) -->
<div id="viz-controls" style="position: absolute; top: 10px; right: 10px; z-index: 1000;">
    <button onclick="openFilterModal()" class="btn btn-primary"
            style="padding: 10px 20px; font-size: 16px;">
        🔍 Display Filter
    </button>

    <!-- Active Filter Badge -->
    <div id="active-filter-badge" style="display: none; margin-top: 10px;
                                         background: #e3f2fd; padding: 10px;
                                         border-radius: 5px; border-left: 4px solid #2563eb;">
        <strong>Active View:</strong> <span id="filter-badge-text"></span>
        <button onclick="clearActiveFilter()" style="margin-left: 10px;
                                                     padding: 2px 8px; font-size: 11px;">
            Clear
        </button>
    </div>

    <!-- Saved Views Quick Access -->
    <div id="saved-views-quick" style="margin-top: 10px; display: none;">
        <strong style="font-size: 12px;">Saved Views:</strong>
        <select id="quick-load-view" onchange="loadSavedViewQuick(this.value)"
                class="form-control" style="font-size: 12px; margin-top: 5px;">
            <option value="">-- Load Saved View --</option>
            <!-- Populated dynamically -->
        </select>
    </div>
</div>

<!-- Filter Modal (hidden by default) -->
<div id="filter-modal" class="modal-overlay" style="display: none; z-index: 10001;">
    <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0;">🔍 Display Filter</h2>
            <button onclick="closeFilterModal()" class="btn btn-secondary"
                    style="padding: 5px 15px;">✕ Close</button>
        </div>

        <!-- Step 1: Select Filter Mode -->
        <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <label style="display: block; font-weight: bold; margin-bottom: 10px;">
                Select Filter Mode:
            </label>
            <select id="filter-mode-select" onchange="updateFilterOptions()"
                    class="form-control" style="font-size: 16px;">
                <option value="">-- Choose How to Filter --</option>
                <option value="victim">📍 By Victim (Forward Trace)</option>
                <option value="rootThread">🔗 By Root Thread (Forward Trace)</option>
                <option value="terminal">🎯 By Terminal Wallet (Backward Trace)</option>
            </select>
        </div>

        <!-- Step 2: Multi-Select Checkboxes -->
        <div id="filter-options-container" style="display: none; margin-bottom: 20px;
                                                   padding: 15px; background: #fff;
                                                   border: 2px solid #dee2e6; border-radius: 5px;
                                                   max-height: 400px; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <strong>Select items to display:</strong>
                <div>
                    <button onclick="selectAllFilterOptions()" class="btn btn-sm btn-secondary"
                            style="padding: 3px 10px; font-size: 12px; margin-right: 5px;">
                        Select All
                    </button>
                    <button onclick="deselectAllFilterOptions()" class="btn btn-sm btn-secondary"
                            style="padding: 3px 10px; font-size: 12px;">
                        Deselect All
                    </button>
                </div>
            </div>

            <!-- Options populated dynamically -->
            <div id="filter-options-list"></div>
        </div>

        <!-- Step 3: Action Buttons -->
        <div style="margin-bottom: 20px;">
            <button onclick="applySelectedFilter()" class="btn btn-primary"
                    style="width: 100%; padding: 12px; font-size: 16px; margin-bottom: 10px;">
                ✓ Apply Filter
            </button>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <button onclick="saveCurrentView()" class="btn btn-secondary"
                        style="padding: 10px;">
                    💾 Save View
                </button>
                <button onclick="exportCurrentView()" class="btn btn-secondary"
                        style="padding: 10px;">
                    📥 Export View
                </button>
            </div>
        </div>

        <!-- Step 4: Manage Saved Views -->
        <div style="border-top: 2px solid #dee2e6; padding-top: 20px;">
            <h3 style="margin-bottom: 15px;">📚 Saved Views</h3>
            <div id="saved-views-list" style="max-height: 200px; overflow-y: auto;">
                <!-- Populated dynamically -->
            </div>
        </div>
    </div>
</div>

<style>
/* Filter option checkbox styling */
.filter-option-item {
    padding: 10px;
    margin-bottom: 8px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.filter-option-item:hover {
    background: #f8f9fa;
}

.filter-option-item input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.filter-option-item label {
    cursor: pointer;
    margin: 0;
    flex: 1;
}

.saved-view-item {
    padding: 10px;
    margin-bottom: 8px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.saved-view-item:hover {
    background: #f8f9fa;
}
</style>
```

### Phase 2: JavaScript Implementation

```javascript
// Global state for filter UI
const filterUI = {
    currentMode: null,          // 'victim', 'rootThread', 'terminal'
    selectedItems: new Set(),   // Set of selected IDs
    savedViews: [],             // Array of saved view objects
    currentViewName: null       // Name of currently active saved view
};

// Initialize filter UI (call after visualization loads)
function initializeFilterUI() {
    // Load saved views from localStorage
    const savedViewsJson = localStorage.getItem(`bats_saved_views_${investigation.caseNumber}`);
    if (savedViewsJson) {
        filterUI.savedViews = JSON.parse(savedViewsJson);
    }

    refreshSavedViewsList();
    updateQuickLoadDropdown();
}

// Open filter modal
function openFilterModal() {
    document.getElementById('filter-modal').style.display = 'flex';

    // Pre-select current mode if active
    if (filterUI.currentMode) {
        document.getElementById('filter-mode-select').value = filterUI.currentMode;
        updateFilterOptions();
    }
}

// Close filter modal
function closeFilterModal() {
    document.getElementById('filter-modal').style.display = 'none';
}

// Update filter options based on selected mode
function updateFilterOptions() {
    const mode = document.getElementById('filter-mode-select').value;
    const container = document.getElementById('filter-options-container');
    const optionsList = document.getElementById('filter-options-list');

    if (!mode) {
        container.style.display = 'none';
        return;
    }

    filterUI.currentMode = mode;
    container.style.display = 'block';
    optionsList.innerHTML = '';

    const idx = visualizationEngine.provenanceIndex;
    let options = [];

    // Build options based on mode
    if (mode === 'victim') {
        // Get all victims
        idx.victimRootThreads.forEach((threads, victimId) => {
            const victimNum = parseInt(victimId.substring(1));
            const victim = investigation.victims[victimNum - 1];

            // Calculate total amount across all root threads
            let totalAmount = 0;
            let currency = 'Mixed';
            const currencies = new Set();

            threads.forEach(internalId => {
                const thread = idx.threads.get(internalId);
                if (thread) {
                    totalAmount += thread.totalAmount || 0;
                    currencies.add(thread.currency);
                }
            });

            if (currencies.size === 1) {
                currency = Array.from(currencies)[0];
            }

            options.push({
                id: victimId,
                label: `${victimId} - ${victim?.name || 'Unknown'}`,
                details: `${threads.size} transaction${threads.size > 1 ? 's' : ''}, ${totalAmount.toFixed(4)} ${currency}`,
                type: 'victim'
            });
        });
    } else if (mode === 'rootThread') {
        // Get all root threads
        const rootNotations = new Map();

        idx.victimRootThreads.forEach((threads, victimId) => {
            threads.forEach(internalId => {
                const thread = idx.threads.get(internalId);
                if (thread && thread.notation) {
                    if (!rootNotations.has(thread.notation)) {
                        rootNotations.set(thread.notation, {
                            amount: 0,
                            currency: thread.currency,
                            count: 0
                        });
                    }
                    const data = rootNotations.get(thread.notation);
                    data.amount += thread.totalAmount || 0;
                    data.count++;
                }
            });
        });

        rootNotations.forEach((data, notation) => {
            options.push({
                id: notation,
                label: notation,
                details: `${data.amount.toFixed(4)} ${data.currency}${data.count > 1 ? ` (${data.count} threads)` : ''}`,
                type: 'rootThread'
            });
        });

        // Sort by notation
        options.sort((a, b) => a.label.localeCompare(b.label));
    } else if (mode === 'terminal') {
        // Get all terminals
        idx.terminalAncestors.forEach((ancestors, terminalNodeId) => {
            const node = visualizationEngine.graph.getNode(terminalNodeId);
            if (node) {
                // Get victim sources
                const victimSources = new Set();
                ancestors.forEach(ancestorId => {
                    const thread = idx.threads.get(ancestorId);
                    if (thread && thread.victimId) {
                        victimSources.add(`V${thread.victimId}`);
                    }
                });

                options.push({
                    id: terminalNodeId,
                    label: node.label || 'Unknown Terminal',
                    details: `${ancestors.size} source thread${ancestors.size > 1 ? 's' : ''} from ${Array.from(victimSources).join(', ')}`,
                    type: 'terminal',
                    fullAddress: node.data?.toWallet || ''
                });
            }
        });
    }

    // Render options as checkboxes
    options.forEach(option => {
        const isChecked = filterUI.selectedItems.has(option.id);

        const optionDiv = document.createElement('div');
        optionDiv.className = 'filter-option-item';
        optionDiv.innerHTML = `
            <input type="checkbox"
                   id="filter-opt-${option.id}"
                   value="${option.id}"
                   ${isChecked ? 'checked' : ''}
                   onchange="toggleFilterOption('${option.id}')">
            <label for="filter-opt-${option.id}" style="display: flex; flex-direction: column;">
                <strong>${option.label}</strong>
                <span style="font-size: 12px; color: #666;">${option.details}</span>
                ${option.fullAddress ? `<span style="font-size: 11px; color: #999; font-family: monospace;">${option.fullAddress}</span>` : ''}
            </label>
        `;

        optionsList.appendChild(optionDiv);
    });

    console.log(`Loaded ${options.length} ${mode} options`);
}

// Toggle individual filter option
function toggleFilterOption(id) {
    if (filterUI.selectedItems.has(id)) {
        filterUI.selectedItems.delete(id);
    } else {
        filterUI.selectedItems.add(id);
    }
}

// Select all options
function selectAllFilterOptions() {
    const checkboxes = document.querySelectorAll('#filter-options-list input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = true;
        filterUI.selectedItems.add(cb.value);
    });
}

// Deselect all options
function deselectAllFilterOptions() {
    const checkboxes = document.querySelectorAll('#filter-options-list input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
        filterUI.selectedItems.delete(cb.value);
    });
}

// Apply selected filter
function applySelectedFilter() {
    if (filterUI.selectedItems.size === 0) {
        alert('Please select at least one item to display');
        return;
    }

    const mode = filterUI.currentMode;
    console.log(`Applying ${mode} filter with ${filterUI.selectedItems.size} selected items:`,
                Array.from(filterUI.selectedItems));

    // Combine results from all selected items
    const combinedNodes = new Set();
    const combinedEdges = new Set();

    filterUI.selectedItems.forEach(itemId => {
        let result;

        if (mode === 'victim') {
            result = visualizationEngine.filterManager.filterByVictim(itemId);
        } else if (mode === 'rootThread') {
            result = visualizationEngine.filterManager.filterByRootThread(itemId);
        } else if (mode === 'terminal') {
            result = visualizationEngine.filterManager.filterByTerminal(itemId);
        }

        if (result) {
            result.nodes.forEach(nodeId => combinedNodes.add(nodeId));
            result.edges.forEach(edgeId => combinedEdges.add(edgeId));
        }
    });

    // Apply combined filter
    visualizationEngine.currentFilterResult = {
        nodes: combinedNodes,
        edges: combinedEdges,
        filter: {
            type: mode,
            selectedItems: Array.from(filterUI.selectedItems),
            description: `${filterUI.selectedItems.size} ${mode}${filterUI.selectedItems.size > 1 ? 's' : ''} selected`
        }
    };

    visualizationEngine.render();
    visualizationEngine.interaction.fitToScreen();

    // Update UI
    showActiveFilterBadge(`${filterUI.selectedItems.size} ${mode}${filterUI.selectedItems.size > 1 ? 's' : ''}`);
    closeFilterModal();

    console.log(`Filter applied: ${combinedNodes.size} nodes, ${combinedEdges.size} edges visible`);
}

// Save current view
function saveCurrentView() {
    if (filterUI.selectedItems.size === 0) {
        alert('Please apply a filter before saving');
        return;
    }

    const viewName = prompt('Enter a name for this view:');
    if (!viewName || viewName.trim() === '') {
        return;
    }

    const savedView = {
        id: Date.now().toString(),
        name: viewName.trim(),
        mode: filterUI.currentMode,
        selectedItems: Array.from(filterUI.selectedItems),
        createdAt: new Date().toISOString(),
        description: `${filterUI.selectedItems.size} ${filterUI.currentMode}${filterUI.selectedItems.size > 1 ? 's' : ''}`
    };

    filterUI.savedViews.push(savedView);
    saveSavedViewsToStorage();
    refreshSavedViewsList();
    updateQuickLoadDropdown();

    alert(`View "${viewName}" saved successfully!`);
}

// Load saved view
function loadSavedView(viewId) {
    const view = filterUI.savedViews.find(v => v.id === viewId);
    if (!view) {
        console.error('Saved view not found:', viewId);
        return;
    }

    // Set filter mode
    filterUI.currentMode = view.mode;
    filterUI.selectedItems = new Set(view.selectedItems);
    filterUI.currentViewName = view.name;

    // Update UI
    document.getElementById('filter-mode-select').value = view.mode;
    updateFilterOptions();

    // Apply filter
    applySelectedFilter();

    console.log(`Loaded saved view: ${view.name}`);
}

// Quick load from dropdown
function loadSavedViewQuick(viewId) {
    if (!viewId) return;

    loadSavedView(viewId);

    // Reset dropdown
    document.getElementById('quick-load-view').value = '';
}

// Delete saved view
function deleteSavedView(viewId) {
    const view = filterUI.savedViews.find(v => v.id === viewId);
    if (!view) return;

    if (!confirm(`Delete saved view "${view.name}"?`)) {
        return;
    }

    filterUI.savedViews = filterUI.savedViews.filter(v => v.id !== viewId);
    saveSavedViewsToStorage();
    refreshSavedViewsList();
    updateQuickLoadDropdown();
}

// Export current view as PNG
async function exportCurrentView() {
    if (!visualizationEngine.currentFilterResult ||
        visualizationEngine.currentFilterResult.nodes.size === 0) {
        alert('Please apply a filter before exporting');
        return;
    }

    try {
        const blob = await visualizationEngine.exportAs('png');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const viewName = filterUI.currentViewName || 'filtered-view';
        const timestamp = new Date().toISOString().slice(0, 10);
        a.download = `${investigation.caseNumber}_${viewName}_${timestamp}.png`;

        a.click();
        URL.revokeObjectURL(url);

        console.log('View exported as PNG');
    } catch (error) {
        console.error('Export failed:', error);
        alert('Failed to export view: ' + error.message);
    }
}

// Clear active filter
function clearActiveFilter() {
    filterUI.selectedItems.clear();
    filterUI.currentViewName = null;

    visualizationEngine.clearFilter();

    hideActiveFilterBadge();
}

// Show active filter badge
function showActiveFilterBadge(text) {
    const badge = document.getElementById('active-filter-badge');
    const badgeText = document.getElementById('filter-badge-text');

    badgeText.textContent = text;
    badge.style.display = 'block';

    // Show saved views quick access
    document.getElementById('saved-views-quick').style.display = 'block';
}

// Hide active filter badge
function hideActiveFilterBadge() {
    document.getElementById('active-filter-badge').style.display = 'none';
    document.getElementById('saved-views-quick').style.display = 'none';
}

// Refresh saved views list in modal
function refreshSavedViewsList() {
    const listDiv = document.getElementById('saved-views-list');

    if (filterUI.savedViews.length === 0) {
        listDiv.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No saved views yet</p>';
        return;
    }

    listDiv.innerHTML = '';

    filterUI.savedViews.forEach(view => {
        const viewDiv = document.createElement('div');
        viewDiv.className = 'saved-view-item';

        const createdDate = new Date(view.createdAt).toLocaleDateString();

        viewDiv.innerHTML = `
            <div style="flex: 1;">
                <strong>${view.name}</strong><br>
                <span style="font-size: 12px; color: #666;">
                    ${view.description} • Created ${createdDate}
                </span>
            </div>
            <div style="display: flex; gap: 5px;">
                <button onclick="loadSavedView('${view.id}')"
                        class="btn btn-sm btn-primary"
                        style="padding: 5px 10px; font-size: 12px;">
                    Load
                </button>
                <button onclick="exportSavedView('${view.id}')"
                        class="btn btn-sm btn-secondary"
                        style="padding: 5px 10px; font-size: 12px;">
                    Export
                </button>
                <button onclick="deleteSavedView('${view.id}')"
                        class="btn btn-sm btn-danger"
                        style="padding: 5px 10px; font-size: 12px;">
                    Delete
                </button>
            </div>
        `;

        listDiv.appendChild(viewDiv);
    });
}

// Update quick load dropdown
function updateQuickLoadDropdown() {
    const select = document.getElementById('quick-load-view');

    select.innerHTML = '<option value="">-- Load Saved View --</option>';

    filterUI.savedViews.forEach(view => {
        const option = document.createElement('option');
        option.value = view.id;
        option.textContent = view.name;
        select.appendChild(option);
    });
}

// Export saved view configuration
function exportSavedView(viewId) {
    const view = filterUI.savedViews.find(v => v.id === viewId);
    if (!view) return;

    // First load the view
    loadSavedView(viewId);

    // Then export it after a short delay to allow rendering
    setTimeout(async () => {
        await exportCurrentView();
    }, 500);
}

// Save to localStorage
function saveSavedViewsToStorage() {
    localStorage.setItem(
        `bats_saved_views_${investigation.caseNumber}`,
        JSON.stringify(filterUI.savedViews)
    );
}

// Initialize when visualization loads
// Add to existing visualization initialization around line 17699:
visualizationEngine = new BATSVisualizationEngine('visualization-canvas');
visualizationEngine.loadInvestigation(investigation);
populateVizFilters();  // Existing
initializeFilterUI();  // NEW - Add this line
```

### Phase 3: Update FilterManager for Multi-Select

Update the filter manager methods to be called individually and combined:

```javascript
// No changes needed to FilterManager!
// The applySelectedFilter() function above handles combining multiple filter results
```

---

## Features Summary

### ✅ Multi-Selection
- Check multiple victims to see combined path
- Select multiple terminals to see all contributing sources
- Mix and match as needed

### ✅ Saved Views
- Name and save filter configurations
- Quick-load saved views from dropdown
- Manage saved views (load, export, delete)
- Saved views persist per investigation

### ✅ Export Capabilities
- Export current filtered view as PNG
- Export saved views directly
- Filename includes case number, view name, and date

### ✅ User-Friendly
- Single "Display Filter" button
- Step-by-step workflow
- Visual feedback with active filter badge
- Select All / Deselect All shortcuts

---

## Example Use Cases

### Use Case 1: "Show V1 and V3 Together"
1. Click "Display Filter"
2. Select "By Victim"
3. Check ☑ V1 and ☑ V3
4. Click "Apply Filter"
5. Save as "V1 and V3 Combined"

### Use Case 2: "All Coinbase Terminals"
1. Click "Display Filter"
2. Select "By Terminal Wallet"
3. Check all terminals with "Coinbase" in address
4. Apply and save as "Coinbase Destinations"

### Use Case 3: "Just the First Transaction from Each Victim"
1. Click "Display Filter"
2. Select "By Root Thread"
3. Check V1-T1, V2-T1, V3-T1
4. Apply and export as PNG for report

---

## Storage

Saved views stored in localStorage:
```javascript
Key: `bats_saved_views_${caseNumber}`
Value: [
    {
        id: "1234567890",
        name: "V1 and V3 Combined",
        mode: "victim",
        selectedItems: ["V1", "V3"],
        createdAt: "2025-10-24T10:30:00Z",
        description: "2 victims"
    },
    // ... more saved views
]
```

---

Ready to implement this enhanced UI?
