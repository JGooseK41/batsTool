# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-05 15:08)

**Commit:** 1087c485d8e4c9888fd6eec54a32b0658407c871
**Author:** Your Name
**Message:** Replace visualization system with proper BATS flow diagram engine

**PERMANENT FIXES - All visualization now uses flow-diagram-enhanced.js**

Changes:
1. Replaced BATSVisualizationEngine (generic canvas) with generateHopCentricDAG (BATS-specific SVG)
2. Updated initializeGraphVisualization() to render proper hop-centric DAG with:
   - Hop columns with dividers
   - ART (Available Running Total) calculations
   - V-T-H notation on edges
   - BATS color scheme (red/purple/brown/etc)
   - Professional forensic layout

3. Fixed completion modal buttons to use switchTab('flowdiagram') instead of opening popups
4. Removed outdated Canvas-based export/layout functions (exportVisualization, changeLayout)
5. Added new exportFlowDiagram() for SVG export
6. Cleaned up unused vizEngine variable
7. switchTab already properly handles flowdiagram tab initialization

**What was wrong:**
- Generic graph visualization (bats-visualization-engine.js) showed random node layouts
- No hop grouping, no ART display, no BATS notation
- Completion buttons opened popup windows that got blocked

**What's fixed:**
- Professional BATS hop-centric DAG visualization
- Shows victims → hops → terminals with proper accounting
- Click "Visualize Flow" button now properly switches to flowdiagram tab
- SVG-based for crisp rendering and easy export

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  44 ++++++----------
 index.html | 169 ++++++++++++++++++++++---------------------------------------
 2 files changed, 76 insertions(+), 137 deletions(-)
```

## Recent Commits History

- 1087c48 Replace visualization system with proper BATS flow diagram engine (0 seconds ago)
- 17f898e Fix visualization bugs: add missing writeoffs/swaps arrays to victim column and add safety check (6 minutes ago)
- 4c95723 Fix visualization canvas sizing and add missing flowdiagram tab (17 minutes ago)
- f5529fb Enable flow diagram visualization in training page (5 hours ago)
- dbdcf41 Adjust B.A.T.S. header text to amber gold (#FFBF00) (6 hours ago)
- 31ae650 Update CLAUDE.md with latest commit info (6 hours ago)
- 61bdff7 Update B.A.T.S. header text to better gold color (#FFA500) (6 hours ago)
- c662191 Update CLAUDE.md with latest commit info (6 hours ago)
- 633149f Change gold color from orange (#f39c12) to yellow (#FFD700) (6 hours ago)
- e0c9c3a Update CLAUDE.md (6 hours ago)

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
