# Visualization Filtering with Provenance-Based Thread Tracking

## Correct Understanding of Dual Tracking System

### Thread Provenance Architecture

Each thread in batsTool is a **unique artifact** with complete provenance:

```javascript
// Example thread object
{
    notation: 'V1-T1-H1',              // Human-readable label (may be shared)
    internalId: 'V1-T1-H1_ETH_abc123', // UNIQUE identifier for this artifact

    // Provenance chain
    parentInternalIds: ['V1-T1_ETH_xyz789'],  // Parent thread(s) this came from
    childThreads: [],                          // Children created from this thread

    // Metadata
    hopLevel: 1,
    currency: 'ETH',
    totalAmount: 5.0,
    availableAmount: 5.0,
    chainId: 'ethereum'
}
```

### Why This Matters

**Notation (V1-T1-H1)** is:
- Human-readable display
- NOT unique (multiple threads can share same notation when split)
- Used for user search/filtering

**Internal ID (V1-T1-H1_ETH_abc123)** is:
- Globally unique identifier
- Tracks individual thread artifact through entire investigation
- Maintains parent-child relationships (provenance chain)
- Used for data integrity

### Example: Split Scenario

```
Victim Transaction: V1-T1 (10 ETH)
  └─ internalId: "root_V1T1_ETH"
      parentInternalIds: []
      childThreads: ["child_H1_out1", "child_H1_out2"]

Hop 1 Entry splits into 2 outputs:
  ├─ Output 1: 6 ETH
  │   notation: "V1-T1-H1"
  │   internalId: "child_H1_out1"
  │   parentInternalIds: ["root_V1T1_ETH"]
  │   childThreads: ["child_H2_out1"]
  │
  └─ Output 2: 4 ETH
      notation: "V1-T1-H1" (SAME notation, different artifact!)
      internalId: "child_H1_out2"
      parentInternalIds: ["root_V1T1_ETH"]
      childThreads: ["child_H2_out2"]
```

Both outputs have notation **V1-T1-H1** but are **different threads** with unique internal IDs.

### Example: Commingling Scenario

```
V1-T1 (5 ETH) + V2-T1 (3 ETH) → Merge at Hop 2

Input threads:
  V1-T1-H1:
    internalId: "thread_V1_A"
    parentInternalIds: ["root_V1T1_ETH"]

  V2-T1-H1:
    internalId: "thread_V2_B"
    parentInternalIds: ["root_V2T1_ETH"]

Output thread (commingled):
  Notation: "(V1-T1)(V2-T1)H2"
  internalId: "commingled_H2_xyz"
  parentInternalIds: ["thread_V1_A", "thread_V2_B"]  // Multiple parents!
  totalAmount: 8 ETH
```

## Implementation Strategy

### Phase 1: Build Provenance Graph Index

When loading investigation into visualization, build a **provenance graph** that maps:
1. Each unique thread (by internalId) to its parents and children
2. Each notation to all internalIds that use it
3. Each victim to all thread descendants (full provenance tree)
4. Each terminal to all thread ancestors (reverse provenance)

#### Data Structure

```javascript
class ProvenanceIndex {
    constructor() {
        // Core provenance graph
        this.threads = new Map();  // internalId → thread data

        // Forward tracking (roots → descendants)
        this.descendants = new Map();  // internalId → Set<descendant internalIds>

        // Backward tracking (leaves → ancestors)
        this.ancestors = new Map();  // internalId → Set<ancestor internalIds>

        // Notation → internal IDs mapping
        this.notationToIds = new Map();  // notation → Set<internalIds>

        // Victim → all descendant threads
        this.victimThreads = new Map();  // victimId → Set<internalIds>

        // Terminal → all ancestor threads
        this.terminalThreads = new Map();  // terminalNodeId → Set<internalIds>

        // Node → threads relationship
        this.nodeToThreads = new Map();  // nodeId → Set<internalIds>
        this.threadToNodes = new Map();  // internalId → Set<nodeIds>
    }
}
```

#### Build Index During loadInvestigation()

```javascript
loadInvestigation(investigation) {
    this.graph.clear();
    this.provenanceIndex = new ProvenanceIndex();

    let nodeIdCounter = 0;

    // Step 1: Index all threads from investigation.availableThreads
    for (const currency in investigation.availableThreads) {
        for (const internalId in investigation.availableThreads[currency]) {
            const thread = investigation.availableThreads[currency][internalId];

            // Store thread data
            this.provenanceIndex.threads.set(internalId, thread);

            // Map notation → internalIds
            if (!this.provenanceIndex.notationToIds.has(thread.notation)) {
                this.provenanceIndex.notationToIds.set(thread.notation, new Set());
            }
            this.provenanceIndex.notationToIds.get(thread.notation).add(internalId);

            // Build ancestor/descendant maps
            if (thread.parentInternalIds && thread.parentInternalIds.length > 0) {
                // This thread has parents - register as descendant
                thread.parentInternalIds.forEach(parentId => {
                    if (!this.provenanceIndex.descendants.has(parentId)) {
                        this.provenanceIndex.descendants.set(parentId, new Set());
                    }
                    this.provenanceIndex.descendants.get(parentId).add(internalId);

                    // Also track ancestors
                    if (!this.provenanceIndex.ancestors.has(internalId)) {
                        this.provenanceIndex.ancestors.set(internalId, new Set());
                    }
                    this.provenanceIndex.ancestors.get(internalId).add(parentId);
                });
            }

            // Track victim roots
            if (thread.victimId) {
                const victimKey = `V${thread.victimId}`;
                if (!this.provenanceIndex.victimThreads.has(victimKey)) {
                    this.provenanceIndex.victimThreads.set(victimKey, new Set());
                }
                this.provenanceIndex.victimThreads.get(victimKey).add(internalId);
            }
        }
    }

    // Step 2: Create nodes and associate with threads
    investigation.victims.forEach((victim, vIndex) => {
        victim.transactions.forEach(tx => {
            const nodeId = `victim_${nodeIdCounter++}`;
            const threadNotation = `V${victim.id}-T${tx.id}`;

            // Find all internal IDs for this notation
            const threadIds = this.provenanceIndex.notationToIds.get(threadNotation) || new Set();

            this.graph.addNode(nodeId, {
                type: 'victim',
                label: this.formatWalletLabel(tx.receivingWallet),
                amount: parseFloat(tx.amount),
                currency: tx.currency,
                layer: 0,
                data: tx,

                // Thread associations
                threadNotation: threadNotation,
                threadInternalIds: Array.from(threadIds),
                victimId: `V${victim.id}`
            });

            // Map node → threads
            this.provenanceIndex.nodeToThreads.set(nodeId, threadIds);
            threadIds.forEach(tid => {
                if (!this.provenanceIndex.threadToNodes.has(tid)) {
                    this.provenanceIndex.threadToNodes.set(tid, new Set());
                }
                this.provenanceIndex.threadToNodes.get(tid).add(nodeId);
            });
        });
    });

    // Step 3: Create hop nodes and edges with provenance tracking
    investigation.hops.forEach((hop, hopIndex) => {
        hop.entries.forEach(entry => {
            const nodeId = `hop_${nodeIdCounter++}`;

            // Get thread internal IDs for this entry
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

                // Thread associations
                threadNotation: entry.notation,
                threadInternalIds: Array.from(threadIds),
                sourceThreadInternalIds: sourceIds,

                // Provenance metadata
                isCommingled: sourceIds.length > 1,
                isSplit: false  // Will be determined by checking if parent has multiple children
            });

            // Map node → threads
            this.provenanceIndex.nodeToThreads.set(nodeId, threadIds);
            threadIds.forEach(tid => {
                if (!this.provenanceIndex.threadToNodes.has(tid)) {
                    this.provenanceIndex.threadToNodes.set(tid, new Set());
                }
                this.provenanceIndex.threadToNodes.get(tid).add(nodeId);
            });

            // Track terminals
            if (entry.entryType === 'terminal') {
                // For this terminal, find all ancestor threads
                const allAncestors = new Set();
                threadIds.forEach(tid => {
                    this.getAllAncestors(tid, allAncestors);
                });
                this.provenanceIndex.terminalThreads.set(nodeId, allAncestors);
            }

            // Create edges based on provenance
            sourceIds.forEach(sourceInternalId => {
                // Find which node(s) contain this source thread
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

    console.log('Provenance index built:', {
        totalThreads: this.provenanceIndex.threads.size,
        victims: this.provenanceIndex.victimThreads.size,
        terminals: this.provenanceIndex.terminalThreads.size,
        nodes: this.graph.nodes.size,
        edges: this.graph.edges.size
    });
}

// Helper: Get all ancestors recursively
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

// Helper: Get all descendants recursively
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
```

### Phase 2: Filtering Logic

#### FilterManager with Provenance Support

```javascript
class ProvenanceFilterManager {
    constructor(graph, provenanceIndex) {
        this.graph = graph;
        this.provenance = provenanceIndex;
        this.activeFilter = null;
    }

    // Filter by victim - show all descendant threads
    filterByVictim(victimId) {
        const rootThreads = this.provenance.victimThreads.get(victimId);
        if (!rootThreads) return { nodes: new Set(), edges: new Set() };

        // Get all descendants of victim's root threads
        const allThreads = new Set();
        rootThreads.forEach(rootId => {
            this.graph.getAllDescendants(rootId, allThreads);
        });

        // Find all nodes that contain any of these threads
        const visibleNodes = new Set();
        allThreads.forEach(threadId => {
            const nodes = this.provenance.threadToNodes.get(threadId);
            if (nodes) {
                nodes.forEach(nodeId => visibleNodes.add(nodeId));
            }
        });

        // Get edges between visible nodes where edge thread is in allThreads
        const visibleEdges = new Set();
        this.graph.edges.forEach((edge, edgeId) => {
            if (visibleNodes.has(edge.source) &&
                visibleNodes.has(edge.target) &&
                allThreads.has(edge.threadInternalId)) {
                visibleEdges.add(edgeId);
            }
        });

        this.activeFilter = {
            type: 'victim',
            value: victimId,
            description: `Showing all funds from ${victimId}`
        };

        return { nodes: visibleNodes, edges: visibleEdges };
    }

    // Filter by terminal - show all ancestor threads
    filterByTerminal(terminalNodeId) {
        const ancestorThreads = this.provenance.terminalThreads.get(terminalNodeId);
        if (!ancestorThreads) return { nodes: new Set(), edges: new Set() };

        // Find all nodes that contain any ancestor threads
        const visibleNodes = new Set([terminalNodeId]);  // Include terminal itself
        ancestorThreads.forEach(threadId => {
            const nodes = this.provenance.threadToNodes.get(threadId);
            if (nodes) {
                nodes.forEach(nodeId => visibleNodes.add(nodeId));
            }
        });

        // Get edges where thread is in ancestorThreads
        const visibleEdges = new Set();
        this.graph.edges.forEach((edge, edgeId) => {
            if (visibleNodes.has(edge.source) &&
                visibleNodes.has(edge.target) &&
                ancestorThreads.has(edge.threadInternalId)) {
                visibleEdges.add(edgeId);
            }
        });

        const terminalNode = this.graph.getNode(terminalNodeId);
        this.activeFilter = {
            type: 'terminal',
            value: terminalNodeId,
            description: `Showing all paths to ${terminalNode?.label}`
        };

        return { nodes: visibleNodes, edges: visibleEdges };
    }

    // Filter by notation (may match multiple internal IDs)
    filterByNotation(notation) {
        const matchingIds = this.provenance.notationToIds.get(notation);
        if (!matchingIds || matchingIds.size === 0) {
            return { nodes: new Set(), edges: new Set() };
        }

        // Get all ancestors AND descendants of matching threads
        const allRelatedThreads = new Set();
        matchingIds.forEach(internalId => {
            this.graph.getAllAncestors(internalId, allRelatedThreads);
            this.graph.getAllDescendants(internalId, allRelatedThreads);
        });

        // Find nodes containing these threads
        const visibleNodes = new Set();
        allRelatedThreads.forEach(threadId => {
            const nodes = this.provenance.threadToNodes.get(threadId);
            if (nodes) {
                nodes.forEach(nodeId => visibleNodes.add(nodeId));
            }
        });

        // Get connecting edges
        const visibleEdges = new Set();
        this.graph.edges.forEach((edge, edgeId) => {
            if (visibleNodes.has(edge.source) &&
                visibleNodes.has(edge.target) &&
                allRelatedThreads.has(edge.threadInternalId)) {
                visibleEdges.add(edgeId);
            }
        });

        this.activeFilter = {
            type: 'notation',
            value: notation,
            description: `Showing thread path: ${notation} (${matchingIds.size} unique thread${matchingIds.size > 1 ? 's' : ''})`
        };

        return { nodes: visibleNodes, edges: visibleEdges };
    }

    // Filter by specific internal ID
    filterByInternalId(internalId) {
        const thread = this.provenance.threads.get(internalId);
        if (!thread) return { nodes: new Set(), edges: new Set() };

        // Get complete provenance chain
        const allRelatedThreads = new Set();
        this.graph.getAllAncestors(internalId, allRelatedThreads);
        this.graph.getAllDescendants(internalId, allRelatedThreads);

        const visibleNodes = new Set();
        allRelatedThreads.forEach(threadId => {
            const nodes = this.provenance.threadToNodes.get(threadId);
            if (nodes) {
                nodes.forEach(nodeId => visibleNodes.add(nodeId));
            }
        });

        const visibleEdges = new Set();
        this.graph.edges.forEach((edge, edgeId) => {
            if (visibleNodes.has(edge.source) &&
                visibleNodes.has(edge.target) &&
                allRelatedThreads.has(edge.threadInternalId)) {
                visibleEdges.add(edgeId);
            }
        });

        this.activeFilter = {
            type: 'internalId',
            value: internalId,
            description: `Showing thread: ${thread.notation} (${thread.currency})`
        };

        return { nodes: visibleNodes, edges: visibleEdges };
    }

    clearFilter() {
        this.activeFilter = null;
        return {
            nodes: new Set(this.graph.nodes.keys()),
            edges: new Set(this.graph.edges.keys())
        };
    }
}
```

### Phase 3: UI Integration

Same UI as before, but with enhanced filtering that understands splits and commingling:

```javascript
function applyThreadFilter() {
    const input = document.getElementById('filter-thread-input').value.trim();

    // Check if it's a notation or internal ID
    if (input.includes('_')) {
        // Looks like internal ID
        const result = visualizationEngine.filterManager.filterByInternalId(input);
        visualizationEngine.render(result);

        if (result.nodes.size === 0) {
            alert(`Internal ID "${input}" not found`);
            return;
        }
    } else {
        // Treat as notation
        const result = visualizationEngine.filterManager.filterByNotation(input);
        visualizationEngine.render(result);

        if (result.nodes.size === 0) {
            alert(`Thread notation "${input}" not found`);
            return;
        }

        // If notation matches multiple internal IDs, show info
        const matchingIds = visualizationEngine.provenanceIndex.notationToIds.get(input);
        if (matchingIds && matchingIds.size > 1) {
            console.log(`Notation ${input} matches ${matchingIds.size} unique threads:`,
                       Array.from(matchingIds));
        }
    }

    showFilterStatus(visualizationEngine.filterManager.activeFilter.description);
}
```

### Phase 4: Advanced Features

#### 4.1: Show Thread Splits

Highlight when one thread splits into multiple:

```javascript
function highlightSplits(internalId) {
    const descendants = visualizationEngine.provenanceIndex.descendants.get(internalId);

    if (descendants && descendants.size > 1) {
        // This thread split into multiple outputs
        console.log(`Thread ${internalId} split into ${descendants.size} outputs:`,
                   Array.from(descendants));

        // Highlight split edges in visualization
        descendants.forEach(childId => {
            const edges = findEdgesBetween(internalId, childId);
            edges.forEach(edge => edge.highlighted = true);
        });
    }
}
```

#### 4.2: Show Commingling Points

Highlight nodes where multiple threads merge:

```javascript
function highlightCommingling() {
    const comminglingNodes = [];

    visualizationEngine.graph.nodes.forEach((node, nodeId) => {
        if (node.sourceThreadInternalIds && node.sourceThreadInternalIds.length > 1) {
            // This node commingles multiple threads
            comminglingNodes.push({
                nodeId: nodeId,
                label: node.label,
                sourceCount: node.sourceThreadInternalIds.length,
                sources: node.sourceThreadInternalIds
            });
        }
    });

    console.log(`Found ${comminglingNodes.length} commingling points:`, comminglingNodes);
    return comminglingNodes;
}
```

## Summary

This implementation correctly handles the provenance-based thread tracking system:

✅ **Unique thread artifacts** - Each thread has unique internal ID
✅ **Parent-child relationships** - Full DAG of provenance chains
✅ **Splits** - One parent → multiple children tracked precisely
✅ **Commingling** - Multiple parents → one child tracked with all sources
✅ **Notation vs Internal ID** - User searches by notation, system tracks by internal ID
✅ **Complete paths** - Can trace any thread back to root victim transaction
✅ **Flexible filtering** - Filter by victim, terminal, notation, or specific internal ID

The provenance index enables powerful filtering while maintaining data integrity through unique thread identifiers.
