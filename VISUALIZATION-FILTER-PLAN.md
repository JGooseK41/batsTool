# Visualization Filtering Implementation Plan

## Overview
Add filtering capabilities to the B.A.T.S. visualization to show only specific paths through the investigation graph, using thread IDs for tracing.

## User Stories

### US-1: Filter by Victim/Root Total
**As an investigator**, I want to show only the path of funds from a specific victim, so I can focus on one victim's funds in a complex multi-victim investigation.

**Example:** Investigation has 3 victims (V1, V2, V3). User selects "V1" → visualization shows only nodes/edges where V1 threads flow.

### US-2: Filter by Terminal Wallet
**As an investigator**, I want to show all paths leading to a specific terminal wallet, so I can see which victims' funds ended up there.

**Example:** Investigation has 5 terminal wallets. User selects "0xABC...DEF" → visualization shows all victim/hop nodes that trace to that terminal.

### US-3: Filter by Specific Thread Path
**As an investigator**, I want to trace a single thread through the entire investigation, so I can follow one specific transaction's journey.

**Example:** User selects thread "V1-T2" → visualization shows only nodes/edges in the path: V1-T2 → V1-T2-H1 → V1-T2-H1-H2 → Terminal

## Data Structure Enhancement

### 1. Add Thread Metadata to Nodes

**Current node structure:**
```javascript
{
    id: 'hop_123',
    type: 'hop',
    label: '0xABC...DEF',
    layer: 2,
    data: { /* entry object */ }
}
```

**IMPORTANT: Dual Tracking System**
batsTool uses TWO identifiers for threads:
- **notation** (human-readable): `V1-T1-H1` - displayed to users, searchable
- **internalId** (unique tracking): `V1-T1-H1_ETH` - ensures uniqueness across currencies

Format: `internalId = ${notation}_${currency}` (deterministic) or `${notation}_${currency}_${timestamp}_${random}` (forced unique)

**Enhanced node structure:**
```javascript
{
    id: 'hop_123',
    type: 'hop',
    label: '0xABC...DEF',
    layer: 2,
    data: { /* entry object */ },

    // NEW: Thread tracking (DUAL SYSTEM)
    threadMetadata: {
        // Human-readable (for display/search)
        notation: 'V1-T1-H1',                 // Thread notation
        sourceNotations: ['V1-T1'],           // Source notations consumed

        // Internal IDs (for precise tracking)
        internalId: 'V1-T1-H1_ETH',          // Unique thread ID
        sourceInternalIds: ['V1-T1_ETH'],     // Source internal IDs consumed

        // Metadata
        currency: 'ETH',
        amount: 5.0,
        rootVictimIds: ['V1'],                // Which victims contributed
        isCommingled: false,                  // Multiple victims merge here

        // Paths (both formats)
        notationPath: ['V1-T1', 'V1-T1-H1'],           // Human-readable path
        internalIdPath: ['V1-T1_ETH', 'V1-T1-H1_ETH']  // Internal ID path
    }
}
```

### 2. Add Thread Metadata to Edges

**Enhanced edge structure:**
```javascript
{
    id: 'edge_123',
    source: 'victim_0',
    target: 'hop_1',

    // NEW: Thread tracking (DUAL SYSTEM)
    notation: 'V1-T1',               // Human-readable thread notation
    internalId: 'V1-T1_ETH',         // Unique internal thread ID
    amount: 5.0,                      // Amount of this specific thread
    currency: 'ETH'
}
```

**Note:** Edges track individual thread flows. In commingling scenarios, there may be multiple edges between the same two nodes (one per thread).

### 3. Graph Metadata Index

Add an index for fast filtering using BOTH notation and internal IDs:
```javascript
{
    // Victim → all nodes in their path
    victimPaths: {
        'V1': ['victim_0', 'hop_1', 'hop_5', 'terminal_2'],
        'V2': ['victim_1', 'hop_2', 'hop_5', 'terminal_2'],
        'V3': ['victim_2', 'hop_3', 'hop_4', 'terminal_3']
    },

    // Terminal wallet → all victims that reach it
    terminalSources: {
        'terminal_2': ['V1', 'V2'],
        'terminal_3': ['V3']
    },

    // DUAL INDEXING: Thread notation AND internal ID
    threadPathsByNotation: {
        // Index by notation (for user search/filter)
        'V1-T1': {
            nodeIds: ['victim_0', 'hop_1', 'hop_5', 'terminal_2'],
            internalIds: ['V1-T1_ETH']  // May have multiple if split into different currencies
        },
        'V1-T2': {
            nodeIds: ['victim_0', 'hop_6', 'terminal_4'],
            internalIds: ['V1-T2_BTC']
        },
        'V2-T1': {
            nodeIds: ['victim_1', 'hop_2', 'hop_5', 'terminal_2'],
            internalIds: ['V2-T1_ETH']
        }
    },

    threadPathsByInternalId: {
        // Index by internal ID (for precise data tracking)
        'V1-T1_ETH': ['victim_0', 'hop_1', 'hop_5', 'terminal_2'],
        'V1-T2_BTC': ['victim_0', 'hop_6', 'terminal_4'],
        'V2-T1_ETH': ['victim_1', 'hop_2', 'hop_5', 'terminal_2']
    },

    // Currency → threads
    currencyIndex: {
        'ETH': ['V1-T1_ETH', 'V2-T1_ETH'],
        'BTC': ['V1-T2_BTC']
    }
}
```

**Why dual indexing?**
- **User searches by notation** (`V1-T1`) → may match multiple internal IDs if swapped/bridged
- **Data integrity uses internal ID** (`V1-T1_ETH`) → guaranteed unique per currency
- **Filtering flexibility** → Can filter "all V1-T1 regardless of currency" OR "only V1-T1 ETH threads"

## Implementation Steps

### Phase 1: Data Layer Enhancement

#### Step 1.1: Update loadInvestigation() to Track Threads
**File:** `bats-visualization-engine.js` - Line ~892

```javascript
loadInvestigation(investigation) {
    this.graph.clear();

    // NEW: Initialize path index
    this.pathIndex = {
        victimPaths: new Map(),
        terminalSources: new Map(),
        threadPaths: new Map()
    };

    // Process victims and build thread metadata
    investigation.victims.forEach((victim, vIndex) => {
        victim.transactions.forEach(tx => {
            const nodeId = `victim_${nodeIdCounter++}`;
            const threadId = `V${victim.id}-T${tx.id}`;

            this.graph.addNode(nodeId, {
                type: 'victim',
                label: /* ... */,
                threadMetadata: {
                    notation: threadId,
                    sourceThreads: [],  // Root - no sources
                    rootVictimIds: [`V${victim.id}`],
                    isCommingled: false,
                    threadPath: [threadId]
                }
            });

            // Index this node for victim path
            if (!this.pathIndex.victimPaths.has(`V${victim.id}`)) {
                this.pathIndex.victimPaths.set(`V${victim.id}`, []);
            }
            this.pathIndex.victimPaths.get(`V${victim.id}`).push(nodeId);

            // Index for thread path
            this.pathIndex.threadPaths.set(threadId, [nodeId]);
        });
    });

    // Process hops and trace thread lineage
    investigation.hops.forEach((hop, hopIndex) => {
        hop.entries.forEach(entry => {
            const nodeId = `hop_${nodeIdCounter++}`;

            // Determine source threads
            const sourceThreads = entry.multipleSourceThreads ||
                                  (entry.sourceThreadId ? [entry.sourceThreadId] : []);

            // Trace root victims from source threads
            const rootVictimIds = new Set();
            sourceThreads.forEach(sourceId => {
                // Extract victim ID from notation (e.g., "V1-T1-H2" → "V1")
                const match = sourceId.match(/^V(\d+)/);
                if (match) rootVictimIds.add(`V${match[1]}`);
            });

            // Build thread path by tracing backwards
            const threadPath = this.traceThreadPath(entry.notation, sourceThreads);

            this.graph.addNode(nodeId, {
                type: entry.entryType || 'hop',
                label: /* ... */,
                threadMetadata: {
                    notation: entry.notation,
                    sourceThreads: sourceThreads,
                    rootVictimIds: Array.from(rootVictimIds),
                    isCommingled: sourceThreads.length > 1,
                    threadPath: threadPath
                }
            });

            // Update path indexes
            rootVictimIds.forEach(victimId => {
                if (!this.pathIndex.victimPaths.has(victimId)) {
                    this.pathIndex.victimPaths.set(victimId, []);
                }
                this.pathIndex.victimPaths.get(victimId).push(nodeId);
            });

            // Index thread path
            this.pathIndex.threadPaths.set(entry.notation, threadPath);

            // If terminal, index reverse lookup
            if (entry.entryType === 'terminal') {
                this.pathIndex.terminalSources.set(nodeId, Array.from(rootVictimIds));
            }
        });
    });
}

// Helper to trace full path for a thread
traceThreadPath(notation, sourceThreads) {
    const path = [];

    // Recursively trace each source thread
    sourceThreads.forEach(sourceId => {
        const sourcePath = this.pathIndex.threadPaths.get(sourceId);
        if (sourcePath) {
            path.push(...sourcePath);
        }
    });

    // Add current thread
    path.push(notation);

    return [...new Set(path)];  // Remove duplicates
}
```

#### Step 1.2: Update Edge Creation to Include Thread IDs
```javascript
// When connecting nodes, track which thread flows through edge
this.graph.addEdge(`edge_${edgeIdCounter++}`, sourceNodeId, targetNodeId, {
    threadId: entry.notation,
    amount: entry.amount,
    currency: entry.currency
});
```

### Phase 2: Filtering Logic

#### Step 2.1: Add FilterManager Class
**File:** `bats-visualization-engine.js` - Add new class

```javascript
class FilterManager {
    constructor(graph, pathIndex) {
        this.graph = graph;
        this.pathIndex = pathIndex;
        this.activeFilters = {
            victims: new Set(),        // Selected victim IDs
            terminals: new Set(),      // Selected terminal node IDs
            threads: new Set(),        // Selected thread notations
            mode: 'OR'                 // 'OR' = show union, 'AND' = show intersection
        };
    }

    // Add filter for specific victim
    addVictimFilter(victimId) {
        this.activeFilters.victims.add(victimId);
    }

    // Add filter for terminal wallet
    addTerminalFilter(terminalNodeId) {
        this.activeFilters.terminals.add(terminalNodeId);
    }

    // Add filter for specific thread
    addThreadFilter(threadNotation) {
        this.activeFilters.threads.add(threadNotation);
    }

    // Clear all filters
    clearFilters() {
        this.activeFilters.victims.clear();
        this.activeFilters.terminals.clear();
        this.activeFilters.threads.clear();
    }

    // Get filtered node IDs
    getFilteredNodes() {
        if (this.activeFilters.victims.size === 0 &&
            this.activeFilters.terminals.size === 0 &&
            this.activeFilters.threads.size === 0) {
            // No filters = show all
            return new Set(this.graph.nodes.keys());
        }

        const filteredNodes = new Set();

        // Filter by victims
        this.activeFilters.victims.forEach(victimId => {
            const nodes = this.pathIndex.victimPaths.get(victimId) || [];
            nodes.forEach(nodeId => filteredNodes.add(nodeId));
        });

        // Filter by terminals (show all paths leading to terminal)
        this.activeFilters.terminals.forEach(terminalId => {
            const victimIds = this.pathIndex.terminalSources.get(terminalId) || [];
            victimIds.forEach(victimId => {
                const nodes = this.pathIndex.victimPaths.get(victimId) || [];
                nodes.forEach(nodeId => {
                    // Only add if this node is on path to terminal
                    const node = this.graph.getNode(nodeId);
                    if (this.isOnPathToTerminal(node, terminalId)) {
                        filteredNodes.add(nodeId);
                    }
                });
            });
        });

        // Filter by specific threads
        this.activeFilters.threads.forEach(threadNotation => {
            const nodes = this.pathIndex.threadPaths.get(threadNotation) || [];
            nodes.forEach(nodeId => filteredNodes.add(nodeId));
        });

        return filteredNodes;
    }

    // Get filtered edge IDs
    getFilteredEdges(filteredNodes) {
        const filteredEdges = new Set();

        this.graph.edges.forEach((edge, edgeId) => {
            // Include edge if both source and target are in filtered nodes
            if (filteredNodes.has(edge.source) && filteredNodes.has(edge.target)) {
                filteredEdges.add(edgeId);
            }
        });

        return filteredEdges;
    }

    // Helper: Check if node is on path to specific terminal
    isOnPathToTerminal(node, terminalId) {
        // TODO: Implement path tracing logic
        // For now, simplified check
        return true;
    }
}
```

#### Step 2.2: Integrate FilterManager into BATSVisualizationEngine
```javascript
class BATSVisualizationEngine {
    constructor(containerId) {
        // ... existing code ...

        // NEW: Add filter manager
        this.filterManager = new FilterManager(this.graph, this.pathIndex);
    }

    // NEW: Apply filters to rendering
    render() {
        const filteredNodes = this.filterManager.getFilteredNodes();
        const filteredEdges = this.filterManager.getFilteredEdges(filteredNodes);

        this.renderer.render(this.graph, {
            visibleNodes: filteredNodes,
            visibleEdges: filteredEdges
        });
    }

    // NEW: Public API for filtering
    filterByVictim(victimId) {
        this.filterManager.clearFilters();
        this.filterManager.addVictimFilter(victimId);
        this.render();
    }

    filterByTerminal(terminalNodeId) {
        this.filterManager.clearFilters();
        this.filterManager.addTerminalFilter(terminalNodeId);
        this.render();
    }

    filterByThread(threadNotation) {
        this.filterManager.clearFilters();
        this.filterManager.addThreadFilter(threadNotation);
        this.render();
    }

    clearFilters() {
        this.filterManager.clearFilters();
        this.render();
    }
}
```

#### Step 2.3: Update Renderer to Respect Filters
```javascript
class CanvasRenderer {
    render(graph, options = {}) {
        const visibleNodes = options.visibleNodes || new Set(graph.nodes.keys());
        const visibleEdges = options.visibleEdges || new Set(graph.edges.keys());

        this.clear();

        if (this.camera.zoom > 0.5) {
            this.renderGrid();
        }

        // Render only visible edges
        graph.edges.forEach((edge, edgeId) => {
            if (visibleEdges.has(edgeId)) {
                const sourceNode = graph.getNode(edge.source);
                const targetNode = graph.getNode(edge.target);

                if (sourceNode && targetNode) {
                    this.renderEdge(edge, sourceNode, targetNode);
                }
            }
        });

        // Render only visible nodes
        graph.nodes.forEach((node, nodeId) => {
            if (visibleNodes.has(nodeId)) {
                this.renderNode(node);
            }
        });
    }
}
```

### Phase 3: UI Controls

#### Step 3.1: Add Filter Panel to Visualization Page
**File:** `index.html` - Add to visualization section

```html
<div id="visualization-container">
    <!-- NEW: Filter Controls -->
    <div id="viz-filter-panel" style="position: absolute; top: 10px; right: 10px;
                                       background: white; border: 2px solid #ccc;
                                       border-radius: 8px; padding: 15px;
                                       max-width: 300px; z-index: 1000;">
        <h4 style="margin: 0 0 10px 0;">🔍 Visualization Filters</h4>

        <!-- Filter by Victim -->
        <div style="margin-bottom: 15px;">
            <label><strong>Filter by Victim:</strong></label>
            <select id="filter-victim-select" onchange="applyVictimFilter(this.value)"
                    style="width: 100%; padding: 5px;">
                <option value="">-- Show All Victims --</option>
                <!-- Dynamically populated -->
            </select>
        </div>

        <!-- Filter by Terminal -->
        <div style="margin-bottom: 15px;">
            <label><strong>Filter by Terminal Wallet:</strong></label>
            <select id="filter-terminal-select" onchange="applyTerminalFilter(this.value)"
                    style="width: 100%; padding: 5px;">
                <option value="">-- Show All Terminals --</option>
                <!-- Dynamically populated -->
            </select>
        </div>

        <!-- Filter by Thread -->
        <div style="margin-bottom: 15px;">
            <label><strong>Filter by Thread:</strong></label>
            <input type="text" id="filter-thread-input"
                   placeholder="e.g., V1-T1 or V2-T3-H1"
                   style="width: 100%; padding: 5px;">
            <button onclick="applyThreadFilter()" class="btn btn-secondary"
                    style="margin-top: 5px; width: 100%;">
                Apply Thread Filter
            </button>
        </div>

        <!-- Clear Filters -->
        <button onclick="clearVizFilters()" class="btn btn-secondary"
                style="width: 100%; background: #dc3545;">
            Clear All Filters
        </button>

        <!-- Active Filter Status -->
        <div id="active-filter-status" style="margin-top: 10px; padding: 10px;
                                              background: #f0f0f0; border-radius: 4px;
                                              font-size: 12px; display: none;">
            <strong>Active Filter:</strong> <span id="filter-description"></span>
        </div>
    </div>

    <!-- Existing canvas -->
    <canvas id="visualization-canvas"></canvas>
</div>
```

#### Step 3.2: Add Filter Control Functions
**File:** `index.html` - Add to script section

```javascript
// Populate filter dropdowns when visualization loads
function populateVizFilters() {
    if (!visualizationEngine || !visualizationEngine.graph) return;

    // Populate victim filter
    const victimSelect = document.getElementById('filter-victim-select');
    victimSelect.innerHTML = '<option value="">-- Show All Victims --</option>';

    const victims = new Set();
    visualizationEngine.graph.nodes.forEach(node => {
        if (node.type === 'victim' && node.threadMetadata) {
            node.threadMetadata.rootVictimIds.forEach(v => victims.add(v));
        }
    });

    Array.from(victims).sort().forEach(victimId => {
        const option = document.createElement('option');
        option.value = victimId;
        option.textContent = `Victim ${victimId} (${investigation.victims[parseInt(victimId.substring(1))-1]?.name || 'Unknown'})`;
        victimSelect.appendChild(option);
    });

    // Populate terminal filter
    const terminalSelect = document.getElementById('filter-terminal-select');
    terminalSelect.innerHTML = '<option value="">-- Show All Terminals --</option>';

    visualizationEngine.graph.nodes.forEach((node, nodeId) => {
        if (node.type === 'terminal') {
            const option = document.createElement('option');
            option.value = nodeId;
            option.textContent = `${node.label} (${node.threadMetadata?.rootVictimIds.join(', ')})`;
            terminalSelect.appendChild(option);
        }
    });
}

// Filter functions
function applyVictimFilter(victimId) {
    if (!victimId) {
        clearVizFilters();
        return;
    }

    visualizationEngine.filterByVictim(victimId);
    showFilterStatus(`Showing only funds from ${victimId}`);
}

function applyTerminalFilter(terminalNodeId) {
    if (!terminalNodeId) {
        clearVizFilters();
        return;
    }

    const node = visualizationEngine.graph.getNode(terminalNodeId);
    visualizationEngine.filterByTerminal(terminalNodeId);
    showFilterStatus(`Showing all paths to terminal: ${node.label}`);
}

function applyThreadFilter() {
    const threadInput = document.getElementById('filter-thread-input');
    const threadNotation = threadInput.value.trim();

    if (!threadNotation) {
        alert('Please enter a thread notation (e.g., V1-T1 or V2-T3-H1)');
        return;
    }

    visualizationEngine.filterByThread(threadNotation);
    showFilterStatus(`Showing thread path: ${threadNotation}`);
}

function clearVizFilters() {
    visualizationEngine.clearFilters();
    document.getElementById('filter-victim-select').value = '';
    document.getElementById('filter-terminal-select').value = '';
    document.getElementById('filter-thread-input').value = '';
    hideFilterStatus();
}

function showFilterStatus(description) {
    const statusDiv = document.getElementById('active-filter-status');
    const descSpan = document.getElementById('filter-description');
    descSpan.textContent = description;
    statusDiv.style.display = 'block';
}

function hideFilterStatus() {
    document.getElementById('active-filter-status').style.display = 'none';
}

// Call after loading visualization
// Update existing code at line ~17699:
visualizationEngine = new BATSVisualizationEngine('visualization-canvas');
visualizationEngine.loadInvestigation(investigation);
populateVizFilters();  // NEW
```

### Phase 4: Advanced Features (Optional)

#### Feature 4.1: Multi-Filter Mode
Allow combining multiple filters (e.g., show V1 AND V2 paths together)

```javascript
// Add checkboxes instead of dropdown for victims
<div id="victim-filter-checkboxes"></div>

// Populate with checkboxes
victims.forEach(victimId => {
    const checkbox = `
        <label>
            <input type="checkbox" value="${victimId}"
                   onchange="updateMultiVictimFilter()">
            Victim ${victimId}
        </label><br>
    `;
    document.getElementById('victim-filter-checkboxes').innerHTML += checkbox;
});

function updateMultiVictimFilter() {
    const checkboxes = document.querySelectorAll('#victim-filter-checkboxes input:checked');
    const selectedVictims = Array.from(checkboxes).map(cb => cb.value);

    visualizationEngine.filterManager.clearFilters();
    selectedVictims.forEach(v => visualizationEngine.filterManager.addVictimFilter(v));
    visualizationEngine.render();
}
```

#### Feature 4.2: Highlight Path on Hover
When hovering over a node, highlight its full thread path

```javascript
// In InteractionLayer.onNodeHover()
onNodeHover(node) {
    if (node.threadMetadata && node.threadMetadata.threadPath) {
        // Highlight all nodes in this thread's path
        this.renderer.highlightPath(node.threadMetadata.threadPath);
    }
}
```

#### Feature 4.3: Export Filtered View
Allow exporting only the filtered visualization

```javascript
// Already supported - exporter will only export visible nodes/edges
function exportFilteredView() {
    const blob = await visualizationEngine.exportAs('png');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `filtered-visualization-${Date.now()}.png`;
    a.click();
}
```

## Testing Checklist

### Test Case 1: Single Victim Filter
- [ ] Load investigation with 3 victims
- [ ] Select "V1" filter
- [ ] Verify only V1 nodes and edges are visible
- [ ] Verify V2 and V3 nodes are hidden
- [ ] Clear filter
- [ ] Verify all nodes visible again

### Test Case 2: Terminal Filter
- [ ] Load investigation with multiple terminals
- [ ] Select specific terminal wallet
- [ ] Verify all victim paths leading to that terminal are shown
- [ ] Verify paths to other terminals are hidden

### Test Case 3: Thread Filter
- [ ] Enter thread notation "V1-T1"
- [ ] Verify only nodes in V1-T1 path are shown
- [ ] Test invalid thread notation
- [ ] Verify appropriate error message

### Test Case 4: Commingling Scenario
- [ ] Load investigation where V1 and V2 commingle at H2
- [ ] Filter by V1
- [ ] Verify commingled hop is shown (because V1 contributes)
- [ ] Filter by V2
- [ ] Verify same commingled hop is shown (because V2 also contributes)

## Performance Considerations

1. **Large Investigations:**
   - Index building happens once during `loadInvestigation()`
   - Filtering is O(n) where n = number of nodes
   - Use Set for fast lookups

2. **Memory:**
   - Path index adds ~20-30% memory overhead
   - Acceptable for typical investigations (<10,000 nodes)

3. **Rendering:**
   - Only filtered nodes/edges are rendered
   - Large investigations will actually render faster when filtered

## Migration Notes

- Existing investigations work without modification
- Thread metadata is built dynamically from existing data
- No schema changes required
- Fully backward compatible

## Future Enhancements

1. **Save Filter Presets:** Allow users to save common filters
2. **Auto-Filter on Click:** Click victim → auto-filter to their path
3. **Animated Transitions:** Smooth fade-in/out when applying filters
4. **Filter History:** Undo/redo filter changes
5. **Search:** Text search for wallet addresses, filter to matching paths

---

## Summary

This implementation adds powerful filtering to the visualization using the existing thread ID system. Key benefits:

- **No data structure changes** - works with existing investigations
- **Fast filtering** - uses indexed lookups
- **Intuitive UI** - dropdown/input controls
- **Flexible** - supports victim, terminal, and thread filters
- **Extensible** - easy to add more filter types

The thread-based approach leverages batsTool's existing V-T-H notation system, making it a natural fit for the application's architecture.
