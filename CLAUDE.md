# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-05 16:21)

**Commit:** 623ed32391a2194da6da66e7f06642dd963452c1
**Author:** Your Name
**Message:** Redesign layout: Wallet columns with shaded backgrounds, hop spaces between

Major visual improvement to clarify structure:

**Before:** Columns split through wallet icons
**After:** Distinct wallet columns + hop flow spaces

**New Layout:**
┌─────────┐   HOP 1    ┌─────────┐   HOP 2    ┌─────────┐
│ VICTIMS │ ─────────> │ Wallets │ ─────────> │ Wallets │
│ (pink)  │            │ (blue)  │            │ (blue)  │
└─────────┘            └─────────┘            └─────────┘

**Changes:**
- Wallet columns: 200px wide with shaded backgrounds
  - Victims column: Light pink (#ffe6e6)
  - Other columns: Light blue (#e6f2ff)
- Hop spaces: 300px between columns for edge flow
- Hop labels: "→ HOP 1 →" centered in flow space
- Subtle dashed guides mark column boundaries
- Wallets stay cleanly within their columns

This makes it crystal clear which wallets are in which
investigation stage and where the hops occur.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                |  76 ++++++++++------------------
 bats-d3-visualization.js | 127 +++++++++++++++++++++++++++++++++--------------
 2 files changed, 118 insertions(+), 85 deletions(-)
```

## Recent Commits History

- 623ed32 Redesign layout: Wallet columns with shaded backgrounds, hop spaces between (0 seconds ago)
- ddceaf4 Fix CSP violation by using local D3.js instead of CDN (5 minutes ago)
- 559f86a PROFESSIONAL REBUILD: D3.js visualization engine for BATS (7 minutes ago)
- 550d787 Add setLayout method to BATSVisualizationEngine (15 minutes ago)
- bad4db4 ACTUAL PERMANENT FIX: Create separate visualization.html file (18 minutes ago)
- 6bf9d2c PERMANENT FIX: Pass investigation data via window reference (24 minutes ago)
- 9a70e89 Fix JSON embedding in popup using script type="application/json" (26 minutes ago)
- f5cf777 Fix JavaScript syntax errors in popup visualization HTML (27 minutes ago)
- b711b09 Restore Canvas-based visualization engine with popup window (28 minutes ago)
- c6811da Move flowdiagram-tab to correct location in main app container (35 minutes ago)

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
