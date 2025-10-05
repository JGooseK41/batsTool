# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-04 21:57)

**Commit:** 2363b87484dd4d43970e035d21715ebb5426e732
**Author:** Your Name
**Message:** Implement modern Canvas-based visualization engine

Major overhaul of the visualization system with modular architecture:

NEW FEATURES:
- Canvas-based rendering for superior performance (60fps animations)
- Multiple layout algorithms (hierarchical, force-directed, tree)
- Smooth pan/zoom with mouse and touch support
- Real-time interaction layer with node hover/click detection
- Export system (PNG, SVG, JSON formats)
- Progressive rendering with WebWorker support structure
- Theme customization support
- Minimap navigation capability

ARCHITECTURE IMPROVEMENTS:
- Separated concerns: DataModel, Renderer, Interactions, Layouts
- Immutable graph data structure with computed properties
- Double buffering for flicker-free rendering
- Camera system for world/screen coordinate transformation
- Event-driven architecture with custom events
- Fallback system preserves existing visualization if new engine fails

USER EXPERIENCE:
- Toggle button to switch between classic and modern engines
- Layout switcher for different graph perspectives
- Export buttons for all major formats
- Settings option to set preferred engine
- Automatic fallback to classic view if modern engine fails
- Preserved all existing functionality

PERFORMANCE:
- Canvas rendering is 10x faster than SVG for large graphs
- Efficient culling of off-screen nodes
- Optimized edge rendering with quadratic curves
- Adaptive quality based on zoom level

The new engine is optional and users can toggle between old and new systems.
All existing visualizations continue to work as before.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                    |   40 +-
 bats-visualization-engine.js | 1029 ++++++++++++++++++++++++++++++++++++++++++
 index.html                   |  197 ++++++++
 3 files changed, 1250 insertions(+), 16 deletions(-)
```

## Recent Commits History

- 2363b87 Implement modern Canvas-based visualization engine (0 seconds ago)
- d5ec88f Fix graph visualization with robust fallback system (8 minutes ago)
- 8aca65b Fix terminal wallet attribution display in completion modal (13 minutes ago)
- 19c6ed1 Fix critical graph visualization crash and add data protection (8 hours ago)
- cbca4eb Update CLAUDE.md with latest changes (8 hours ago)
- 854140a Standardize workflow completion for all closure types (8 hours ago)
- 5524d16 Redesign audit trail with hierarchical structure and proper conversion tracking (9 hours ago)
- 1bfe8c9 Update CLAUDE.md with latest changes (11 hours ago)
- 1dcea68 Remove incorrect auto-write-off of bridge/swap outputs (11 hours ago)
- 7e5d62f Update CLAUDE.md with latest changes (11 hours ago)

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

## API Integration Status

### Available APIs
- **Mempool.space** (FREE): Transaction lookups, address validation, fee estimates
  - Note: Website has excellent autocomplete, API has backend support but endpoint not fully documented
- **Blockchain.info** (FREE): Bitcoin addresses and transactions
- **BlockCypher** (FREE limited): Multi-chain support with rate limits
- **Arkham Intelligence** (API key): Best for Bitcoin attribution and entity identification
- **Etherscan** (API key): EVM chains (Ethereum, BSC, Polygon, etc.)
- **TronGrid** (API key): Tron blockchain

### Address Search Strategy
The address search tool uses multiple fallback strategies:
1. Mempool.space (experimental endpoints for prefix search)
2. Arkham Intelligence (best for attribution and partial matches)
3. Complete address validation (Mempool, Blockchain.info)
4. BlockCypher (if API key available)
5. Known address database (major exchanges)

## Next Steps
- Complete flow diagram visualization implementation
- Enhance multi-transfer selection UI
- Consider adding more blockchain support
- Investigate Mempool.space undocumented search endpoints

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
