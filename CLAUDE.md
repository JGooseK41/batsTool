# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 21:12)

**Commit:** f47cb44b8692865e8f6a7ec56c506bf97b5e86f4
**Author:** Your Name
**Message:** Add comprehensive graph visualization with proper navigation from trace completion

Major improvements to post-completion flow and visualization:

## Navigation Fix
- Changed 'Go to Analysis' button to 'View Investigation Graph' with gradient purple styling
- Redirects to Flow Diagram tab instead of Analysis tab after trace completion
- Automatically initializes graph visualization when navigating from completion ceremony

## Comprehensive Graph Visualization System
- Fully interactive, zoomable, pannable graph visualization
- Multiple layout algorithms:
  - Hierarchical (default) - Shows hop progression
  - Force-directed - Physics-based layout
  - Circular - Radial arrangement
  - Timeline - Temporal progression
  - DAG Layout - Directed acyclic graph

## Interactive Features
- Zoom controls (mouse wheel + buttons)
- Pan by dragging
- Zoom level indicator (percentage)
- Fit to screen functionality
- Search wallets with live filtering
- Toggle labels and amounts
- Click nodes for detailed information
- Hover tooltips

## Visual Design
- Color-coded nodes by wallet type (gradients for special types)
- Terminal wallets with purple glow effect
- Exchange names displayed on terminal nodes
- Edge amounts shown on connections
- Comprehensive legend
- Statistics panel with totals

## Export Capabilities
- Export to SVG (vector format, fully zoomable)
- Export to PNG (high resolution image)
- Export to PDF-ready format
- Share functionality with clipboard support

## Technical Implementation
- Pure SVG rendering for crisp visuals at any zoom
- Efficient graph data structure from investigation
- Real-time layout recalculation
- Node clustering by hop number
- Minimap placeholder for large graphs
- Responsive design

This provides users with a clear, guided path from trace completion to a detailed, professional visualization of their investigation that can be zoomed, exported, and shared.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  61 ++--
 index.html | 935 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 957 insertions(+), 39 deletions(-)
```

## Recent Commits History

- f47cb44 Add comprehensive graph visualization with proper navigation from trace completion (0 seconds ago)
- dcd1638 Fix validation incorrectly showing traced funds as unaccounted (14 minutes ago)
- 3774502 Prevent finalizing empty hops and fix editing completed hops (28 minutes ago)
- e1ad0ba Fix incorrect 'All threads fully traced' message on empty hop (35 minutes ago)
- a7114b7 Update CLAUDE.md with latest commit info (39 minutes ago)
- ec6396e Add pre-configured test investigation files (41 minutes ago)
- b6d2280 Add comprehensive test suite and documentation (45 minutes ago)
- 77a039b Fix missing Finalize Hop button and improve hop progression (50 minutes ago)
- a8c73c0 Add detailed debugging to hop finalization process (53 minutes ago)
- f78b054 Update CLAUDE.md with latest changes (58 minutes ago)

## Key Features
- **Multi-blockchain support**: Bitcoin, Ethereum, ERC-20 tokens
- **4-step investigation workflow**: Setup → Victims → Hops → Analysis
- **Thread tracking system**: Uses V-T-H notation (Victim-Transaction-Hop)
- **Real-time validation**: Validates traced amounts against ART (Available Running Total)
- **Wallet entity detection**: Identifies known exchanges and services
- **Export capabilities**: Multiple formats for investigation reports
- **Undo system**: Supports up to 20 undo states
- **Auto-save functionality**: File system integration

## Current State
- Main functionality is working
- Flow diagram visualization is next priority (Phase 1 started but needs implementation)
- UI recently improved for multi-transfer handling
- Validation system fixed and operational

## Technical Notes
- Single-file application in `index.html`
- Uses vanilla JavaScript with no build process
- Includes embedded styles and scripts
- Supports file operations through browser File API

## Next Steps
- Complete flow diagram visualization implementation
- Enhance multi-transfer selection UI
- Consider adding more blockchain support

## Implementation Plan - Core Behavior Fixes

### Phase 1: Thread Management & Allocation
1. ✅ Implement PIFO (Proceeds In First Out) allocation
   - Auto-allocate using V1-T1 before V2-T1, etc.
   - Document allocation in entry notes
   - Allow manual override for matching specific transactions

2. ⬜ Fix change address handling
   - Funds returning to sender address stay in original thread
   - Don't create new hop for change outputs
   - Properly detect change vs. payment outputs

3. ⬜ Implement allocation validation
   - Hard block if total allocation exceeds available threads
   - Allow partial tracing (trace portion of larger transaction)
   - Validate before entry creation

### Phase 2: Notation & Display
4. ⬜ Update commingling notation format
   - Use parentheses: `(V1-T1) (V2-T1) H2`
   - Multiple transactions: `(V1-T2,3) (V2-T1,2,4) H3`
   - Keep notation unchanged through swaps

5. ⬜ Make thread review modal optional
   - Add setting to disable/enable
   - Only show if warnings/issues detected
   - Remove automatic popup on hop completion

### Phase 3: Validation & Constraints
6. ⬜ Enforce victim completion workflow
   - Require completion before adding new victim
   - Allow reopening before root total generation
   - Maintain green summary view for completed victims

7. ⬜ Update write-off behavior
   - Reduce ART (Adjusted Root Total) on hop close
   - Not immediately on entry
   - Track write-offs separately in totals

### Phase 4: Transaction Handling
8. ⬜ Fix ERC-20/gas fee handling
   - Ignore ETH gas unless ETH is source thread
   - Filter by tracked currency only
   - No multi-output selection for single token transfers

9. ⬜ Manual entry flexibility
   - Don't require transaction hash for off-chain
   - Allow CEX internal transfers
   - Support incomplete transaction data

### Testing Scenarios
- Simple linear flow (1 victim → 3 hops)
- Commingling (multiple victims → merged hop)
- Split threads (one thread → multiple outputs)
- DEX swaps (currency conversion)
- Complex combination flows
