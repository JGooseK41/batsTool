# Visualization Filtering - Focused Implementation

## Three Filtering Modes

### 1. Filter by Victim (Left → Right)
**Use case:** "Show me where all of Victim 1's funds went"
- Start: Victim's root transactions (V1-T1, V1-T2, etc.)
- Direction: Follow descendants forward through hops to terminals
- Shows: Complete forward provenance chain for that victim

### 2. Filter by Root Thread (Left → Right)
**Use case:** "Show me where this specific transaction went" (e.g., V1-T2)
- Start: One specific victim transaction (V1-T2)
- Direction: Follow descendants forward through hops to terminal(s)
- Shows: Single thread path from root to terminal(s)

### 3. Filter by Terminal Wallet (Right → Left)
**Use case:** "Show me where this terminal wallet's funds came from"
- Start: Terminal wallet address
- Direction: Trace ancestors backward through hops to victim roots
- Shows: Complete backward provenance chain to all contributing victims

---

## Implementation

### Phase 1: Build Provenance Index

Add to `BATSVisualizationEngine.loadInvestigation()`:

```javascript
loadInvestigation(investigation) {
    this.graph.clear();

    // Build provenance index
    this.provenanceIndex = {
        // Thread tracking
        threads: new Map(),              // internalId → thread object
        descendants: new Map(),          // internalId → Set<child internalIds>
        ancestors: new Map(),            // internalId → Set<parent internalIds>

        // Node-thread mapping
        nodeToThreads: new Map(),        // nodeId → Set<internalIds>
        threadToNodes: new Map(),        // internalId → Set<nodeIds>

        // Lookups
        victimRootThreads: new Map(),    // 'V1' → Set<root internalIds>
        notationToIds: new Map(),        // 'V1-T2' → Set<internalIds>
        terminalAncestors: new Map()     // terminalNodeId → Set<ancestor internalIds>
    };

    let nodeIdCounter = 0;

    // INDEX STEP 1: Index all threads from investigation.availableThreads
    for (const currency in investigation.availableThreads) {
        for (const internalId in investigation.availableThreads[currency]) {
            const thread = investigation.availableThreads[currency][internalId];

            this.provenanceIndex.threads.set(internalId, thread);

            // Map notation → internalIds
            if (!this.provenanceIndex.notationToIds.has(thread.notation)) {
                this.provenanceIndex.notationToIds.set(thread.notation, new Set());
            }
            this.provenanceIndex.notationToIds.get(thread.notation).add(internalId);

            // Build parent-child relationships
            if (thread.parentInternalIds && thread.parentInternalIds.length > 0) {
                // Register as child of parents
                thread.parentInternalIds.forEach(parentId => {
                    if (!this.provenanceIndex.descendants.has(parentId)) {
                        this.provenanceIndex.descendants.set(parentId, new Set());
                    }
                    this.provenanceIndex.descendants.get(parentId).add(internalId);
                });

                // Register parents as ancestors
                if (!this.provenanceIndex.ancestors.has(internalId)) {
                    this.provenanceIndex.ancestors.set(internalId, new Set());
                }
                thread.parentInternalIds.forEach(pid => {
                    this.provenanceIndex.ancestors.get(internalId).add(pid);
                });
            }

            // Track victim root threads
            if (thread.victimId && thread.transactionId) {
                const victimKey = `V${thread.victimId}`;
                if (!this.provenanceIndex.victimRootThreads.has(victimKey)) {
                    this.provenanceIndex.victimRootThreads.set(victimKey, new Set());
                }
                this.provenanceIndex.victimRootThreads.get(victimKey).add(internalId);
            }
        }
    }

    // CREATE NODES: Victims
    investigation.victims.forEach((victim, vIndex) => {
        victim.transactions.forEach(tx => {
            const nodeId = `victim_${nodeIdCounter++}`;
            const notation = `V${victim.id}-T${tx.id}`;

            // Find internal IDs for this notation
            const threadIds = this.provenanceIndex.notationToIds.get(notation) || new Set();

            this.graph.addNode(nodeId, {
                type: 'victim',
                label: this.formatWalletLabel(tx.receivingWallet || tx.redWallet),
                amount: parseFloat(tx.amount),
                currency: tx.currency,
                layer: 0,
                data: tx,

                // Thread tracking
                threadNotation: notation,
                threadInternalIds: Array.from(threadIds),
                victimId: `V${victim.id}`
            });

            // Map node ↔ threads
            this.provenanceIndex.nodeToThreads.set(nodeId, threadIds);
            threadIds.forEach(tid => {
                if (!this.provenanceIndex.threadToNodes.has(tid)) {
                    this.provenanceIndex.threadToNodes.set(tid, new Set());
                }
                this.provenanceIndex.threadToNodes.get(tid).add(nodeId);
            });
        });
    });

    // CREATE NODES: Hops
    investigation.hops.forEach((hop, hopIndex) => {
        hop.entries.forEach(entry => {
            const nodeId = `hop_${nodeIdCounter++}`;

            // Get thread IDs for this entry
            const threadIds = entry.notation ?
                (this.provenanceIndex.notationToIds.get(entry.notation) || new Set()) :
                new Set();

            // Get source thread IDs
            const sourceIds = entry.sourceThreadInternalId ?
                [entry.sourceThreadInternalId] :
                (entry.multipleSourceInternalIds || []);

            this.graph.addNode(nodeId, {
                type: entry.entryType || 'hop',
                label: this.formatWalletLabel(entry.toWallet),
                layer: hopIndex + 1,
                data: entry,

                // Thread tracking
                threadNotation: entry.notation,
                threadInternalIds: Array.from(threadIds),
                sourceThreadInternalIds: sourceIds
            });

            // Map node ↔ threads
            this.provenanceIndex.nodeToThreads.set(nodeId, threadIds);
            threadIds.forEach(tid => {
                if (!this.provenanceIndex.threadToNodes.has(tid)) {
                    this.provenanceIndex.threadToNodes.set(tid, new Set());
                }
                this.provenanceIndex.threadToNodes.get(tid).add(nodeId);
            });

            // Build terminal ancestor index
            if (entry.entryType === 'terminal') {
                const allAncestors = new Set();
                threadIds.forEach(tid => {
                    this.getAllAncestors(tid, allAncestors);
                });
                this.provenanceIndex.terminalAncestors.set(nodeId, allAncestors);
            }

            // CREATE EDGES: Based on source thread provenance
            sourceIds.forEach(sourceInternalId => {
                const sourceNodes = this.provenanceIndex.threadToNodes.get(sourceInternalId);
                if (sourceNodes) {
                    sourceNodes.forEach(sourceNodeId => {
                        const edgeId = `edge_${sourceNodeId}_${nodeId}_${sourceInternalId}`;
                        const thread = this.provenanceIndex.threads.get(sourceInternalId);

                        this.graph.addEdge(edgeId, sourceNodeId, nodeId, {
                            threadNotation: thread?.notation,
                            threadInternalId: sourceInternalId,
                            amount: thread?.totalAmount,
                            currency: thread?.currency
                        });
                    });
                }
            });
        });
    });

    console.log('✅ Provenance index built:', {
        threads: this.provenanceIndex.threads.size,
        victims: this.provenanceIndex.victimRootThreads.size,
        terminals: this.provenanceIndex.terminalAncestors.size,
        nodes: this.graph.nodes.size,
        edges: this.graph.edges.size
    });

    // Apply layout and render
    this.applyLayout('hierarchical');
    this.render();
    this.interaction.fitToScreen();
}

// Helper: Get all ancestors recursively (for backward tracing)
getAllAncestors(internalId, result = new Set()) {
    if (result.has(internalId)) return result;  // Prevent cycles
    result.add(internalId);

    const parents = this.provenanceIndex.ancestors.get(internalId);
    if (parents) {
        parents.forEach(parentId => {
            this.getAllAncestors(parentId, result);
        });
    }

    return result;
}

// Helper: Get all descendants recursively (for forward tracing)
getAllDescendants(internalId, result = new Set()) {
    if (result.has(internalId)) return result;  // Prevent cycles
    result.add(internalId);

    const children = this.provenanceIndex.descendants.get(internalId);
    if (children) {
        children.forEach(childId => {
            this.getAllDescendants(childId, result);
        });
    }

    return result;
}

// Helper: Format wallet label
formatWalletLabel(address) {
    if (!address || typeof address !== 'string') return 'Unknown';
    return address.length > 12 ? address.substring(0, 8) + '...' : address;
}
```

### Phase 2: Filter Manager

```javascript
class FocusedFilterManager {
    constructor(engine) {
        this.engine = engine;
        this.activeFilter = null;
    }

    // MODE 1: Filter by victim (forward trace)
    filterByVictim(victimId) {
        const rootThreads = this.engine.provenanceIndex.victimRootThreads.get(victimId);
        if (!rootThreads || rootThreads.size === 0) {
            console.warn(`No threads found for victim ${victimId}`);
            return this.getEmptyResult();
        }

        // Get all descendants of victim's root threads (forward trace)
        const allThreads = new Set();
        rootThreads.forEach(rootId => {
            this.engine.getAllDescendants(rootId, allThreads);
        });

        console.log(`${victimId}: ${rootThreads.size} root threads → ${allThreads.size} total threads`);

        return this.buildFilterResult(allThreads, {
            type: 'victim',
            value: victimId,
            description: `${victimId} - All funds traced forward`
        });
    }

    // MODE 2: Filter by root thread notation (forward trace)
    filterByRootThread(notation) {
        const threadIds = this.engine.provenanceIndex.notationToIds.get(notation);
        if (!threadIds || threadIds.size === 0) {
            console.warn(`No threads found for notation ${notation}`);
            return this.getEmptyResult();
        }

        // Get all descendants of this root thread (forward trace)
        const allThreads = new Set();
        threadIds.forEach(threadId => {
            this.engine.getAllDescendants(threadId, allThreads);
        });

        console.log(`${notation}: ${threadIds.size} thread(s) → ${allThreads.size} descendants`);

        return this.buildFilterResult(allThreads, {
            type: 'rootThread',
            value: notation,
            description: `${notation} - Traced forward to terminal(s)`
        });
    }

    // MODE 3: Filter by terminal (backward trace)
    filterByTerminal(terminalNodeId) {
        const ancestorThreads = this.engine.provenanceIndex.terminalAncestors.get(terminalNodeId);
        if (!ancestorThreads || ancestorThreads.size === 0) {
            console.warn(`No ancestor threads found for terminal ${terminalNodeId}`);
            return this.getEmptyResult();
        }

        const terminalNode = this.engine.graph.getNode(terminalNodeId);
        console.log(`Terminal ${terminalNode?.label}: ${ancestorThreads.size} ancestor threads`);

        return this.buildFilterResult(ancestorThreads, {
            type: 'terminal',
            value: terminalNodeId,
            description: `${terminalNode?.label || 'Terminal'} - Traced backward to sources`
        }, terminalNodeId);
    }

    // Build filter result from thread set
    buildFilterResult(threadSet, filterInfo, includeTerminalNode = null) {
        // Find all nodes containing these threads
        const visibleNodes = new Set();
        threadSet.forEach(threadId => {
            const nodes = this.engine.provenanceIndex.threadToNodes.get(threadId);
            if (nodes) {
                nodes.forEach(nodeId => visibleNodes.add(nodeId));
            }
        });

        // Include terminal node if specified
        if (includeTerminalNode) {
            visibleNodes.add(includeTerminalNode);
        }

        // Get edges where both source and target are visible AND thread is in set
        const visibleEdges = new Set();
        this.engine.graph.edges.forEach((edge, edgeId) => {
            if (visibleNodes.has(edge.source) &&
                visibleNodes.has(edge.target) &&
                threadSet.has(edge.threadInternalId)) {
                visibleEdges.add(edgeId);
            }
        });

        this.activeFilter = filterInfo;

        return {
            nodes: visibleNodes,
            edges: visibleEdges,
            filter: filterInfo
        };
    }

    getEmptyResult() {
        return {
            nodes: new Set(),
            edges: new Set(),
            filter: null
        };
    }

    clearFilter() {
        this.activeFilter = null;
        return {
            nodes: new Set(this.engine.graph.nodes.keys()),
            edges: new Set(this.engine.graph.edges.keys()),
            filter: null
        };
    }
}
```

### Phase 3: Update Renderer

```javascript
// Update CanvasRenderer.render() to accept visible set
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

### Phase 4: Integrate into BATSVisualizationEngine

```javascript
class BATSVisualizationEngine {
    constructor(containerId) {
        // ... existing initialization ...

        this.filterManager = null;  // Created after loadInvestigation
        this.currentFilterResult = null;
    }

    loadInvestigation(investigation) {
        // ... build provenance index and graph (from Phase 1) ...

        // Create filter manager after index is built
        this.filterManager = new FocusedFilterManager(this);

        // Initial render (no filter)
        this.render();
        this.interaction.fitToScreen();
    }

    // Public API: Filter by victim
    filterByVictim(victimId) {
        this.currentFilterResult = this.filterManager.filterByVictim(victimId);
        this.render();
        this.interaction.fitToScreen();
        return this.currentFilterResult;
    }

    // Public API: Filter by root thread
    filterByRootThread(notation) {
        this.currentFilterResult = this.filterManager.filterByRootThread(notation);
        this.render();
        this.interaction.fitToScreen();
        return this.currentFilterResult;
    }

    // Public API: Filter by terminal
    filterByTerminal(terminalNodeId) {
        this.currentFilterResult = this.filterManager.filterByTerminal(terminalNodeId);
        this.render();
        this.interaction.fitToScreen();
        return this.currentFilterResult;
    }

    // Public API: Clear filter
    clearFilter() {
        this.currentFilterResult = this.filterManager.clearFilter();
        this.render();
        this.interaction.fitToScreen();
        return this.currentFilterResult;
    }

    // Override render to use current filter
    render() {
        if (this.currentFilterResult) {
            this.renderer.render(this.graph, {
                visibleNodes: this.currentFilterResult.nodes,
                visibleEdges: this.currentFilterResult.edges
            });
        } else {
            this.renderer.render(this.graph);
        }
    }
}
```

### Phase 5: UI Controls

Add to visualization page in `index.html`:

```html
<div id="visualization-container" style="position: relative;">
    <!-- Filter Panel -->
    <div id="viz-filter-panel" style="position: absolute; top: 10px; right: 10px;
                                       background: white; border: 2px solid #2563eb;
                                       border-radius: 8px; padding: 15px;
                                       max-width: 350px; z-index: 1000;
                                       box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h4 style="margin: 0 0 15px 0; color: #2563eb;">🔍 Filter Visualization</h4>

        <!-- Filter by Victim -->
        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">
                📍 Filter by Victim (Forward Trace)
            </label>
            <select id="filter-victim-select" class="form-control"
                    onchange="applyVictimFilter(this.value)">
                <option value="">-- Select Victim --</option>
                <!-- Populated dynamically -->
            </select>
        </div>

        <!-- Filter by Root Thread -->
        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">
                🔗 Filter by Root Thread (Forward Trace)
            </label>
            <select id="filter-root-thread-select" class="form-control"
                    onchange="applyRootThreadFilter(this.value)">
                <option value="">-- Select Transaction --</option>
                <!-- Populated dynamically -->
            </select>
        </div>

        <!-- Filter by Terminal -->
        <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">
                🎯 Filter by Terminal (Backward Trace)
            </label>
            <select id="filter-terminal-select" class="form-control"
                    onchange="applyTerminalFilter(this.value)">
                <option value="">-- Select Terminal --</option>
                <!-- Populated dynamically -->
            </select>
        </div>

        <!-- Clear Filter Button -->
        <button onclick="clearVizFilter()" class="btn btn-secondary"
                style="width: 100%; background: #dc3545; color: white;">
            Clear Filter
        </button>

        <!-- Active Filter Status -->
        <div id="active-filter-status" style="margin-top: 15px; padding: 10px;
                                              background: #e3f2fd; border-left: 4px solid #2563eb;
                                              border-radius: 4px; font-size: 13px; display: none;">
            <strong>Active:</strong> <span id="filter-description"></span>
        </div>
    </div>

    <!-- Canvas -->
    <canvas id="visualization-canvas"></canvas>
</div>

<script>
// Populate filter dropdowns
function populateVizFilters() {
    if (!visualizationEngine || !visualizationEngine.provenanceIndex) return;

    const idx = visualizationEngine.provenanceIndex;

    // Populate victim filter
    const victimSelect = document.getElementById('filter-victim-select');
    victimSelect.innerHTML = '<option value="">-- Select Victim --</option>';

    idx.victimRootThreads.forEach((threads, victimId) => {
        const victimNum = parseInt(victimId.substring(1));
        const victim = investigation.victims[victimNum - 1];
        const option = document.createElement('option');
        option.value = victimId;
        option.textContent = `${victimId} - ${victim?.name || 'Unknown'} (${threads.size} transactions)`;
        victimSelect.appendChild(option);
    });

    // Populate root thread filter (all victim transactions)
    const rootThreadSelect = document.getElementById('filter-root-thread-select');
    rootThreadSelect.innerHTML = '<option value="">-- Select Transaction --</option>';

    const rootNotations = new Set();
    idx.victimRootThreads.forEach((threads, victimId) => {
        threads.forEach(internalId => {
            const thread = idx.threads.get(internalId);
            if (thread && thread.notation) {
                rootNotations.add(thread.notation);
            }
        });
    });

    Array.from(rootNotations).sort().forEach(notation => {
        const option = document.createElement('option');
        option.value = notation;
        option.textContent = notation;
        rootThreadSelect.appendChild(option);
    });

    // Populate terminal filter
    const terminalSelect = document.getElementById('filter-terminal-select');
    terminalSelect.innerHTML = '<option value="">-- Select Terminal --</option>';

    idx.terminalAncestors.forEach((ancestors, terminalNodeId) => {
        const node = visualizationEngine.graph.getNode(terminalNodeId);
        if (node) {
            const option = document.createElement('option');
            option.value = terminalNodeId;
            option.textContent = `${node.label} (${ancestors.size} source threads)`;
            terminalSelect.appendChild(option);
        }
    });
}

// Filter functions
function applyVictimFilter(victimId) {
    if (!victimId) {
        clearVizFilter();
        return;
    }

    const result = visualizationEngine.filterByVictim(victimId);

    if (result.nodes.size === 0) {
        alert(`No data found for ${victimId}`);
        return;
    }

    showFilterStatus(result.filter.description);
    console.log(`Filter applied: ${result.nodes.size} nodes, ${result.edges.size} edges`);
}

function applyRootThreadFilter(notation) {
    if (!notation) {
        clearVizFilter();
        return;
    }

    const result = visualizationEngine.filterByRootThread(notation);

    if (result.nodes.size === 0) {
        alert(`No path found for ${notation}`);
        return;
    }

    showFilterStatus(result.filter.description);
    console.log(`Filter applied: ${result.nodes.size} nodes, ${result.edges.size} edges`);
}

function applyTerminalFilter(terminalNodeId) {
    if (!terminalNodeId) {
        clearVizFilter();
        return;
    }

    const result = visualizationEngine.filterByTerminal(terminalNodeId);

    if (result.nodes.size === 0) {
        alert(`No source data found for this terminal`);
        return;
    }

    showFilterStatus(result.filter.description);
    console.log(`Filter applied: ${result.nodes.size} nodes, ${result.edges.size} edges`);
}

function clearVizFilter() {
    visualizationEngine.clearFilter();

    document.getElementById('filter-victim-select').value = '';
    document.getElementById('filter-root-thread-select').value = '';
    document.getElementById('filter-terminal-select').value = '';

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

// Call after visualization loads
// Update the existing visualization code around line 17699:
visualizationEngine = new BATSVisualizationEngine('visualization-canvas');
visualizationEngine.loadInvestigation(investigation);
populateVizFilters();  // Add this line
</script>
```

---

## Summary

**Three focused filtering modes:**

1. **By Victim** - "Where did V1's funds go?"
   - Forward trace from all V1 root transactions
   - Shows complete descendant tree

2. **By Root Thread** - "Where did V1-T2 specifically go?"
   - Forward trace from single transaction
   - Shows one specific path

3. **By Terminal** - "Where did this terminal's funds come from?"
   - Backward trace to all source victims
   - Shows complete ancestor tree

**Implementation is simplified:**
- Only 3 filter modes (not comprehensive filtering)
- Clean UI with dropdowns pre-populated
- Uses provenance index for fast lookups
- Respects thread uniqueness (internal IDs)
- Maintains data integrity through parent-child tracking

Ready to implement?
