# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-24 08:50)

**Commit:** 4cde5fef48c3ae9c715a8b0bb9e8118739e1500f
**Author:** Your Name
**Message:** Add unnecessary input heuristic - most reliable change detection method

Implemented two powerful change detection heuristics:

1. UNNECESSARY INPUT HEURISTIC (+40 points)
   - Analyzes if payment could have been made with fewer inputs
   - If all inputs used when fewer would suffice, MUST have change
   - Example: Using [5 BTC, 3 BTC] inputs for 6 BTC payment
   - The 2 BTC output MUST be change (why else use both inputs?)

2. PERFECT CHANGE CALCULATION (+25 points)
   - Calculates expected change: inputs - payment - estimated fee
   - If output matches expected change amount (±10%), likely change
   - Provides expected amount for verification

Enhanced Bitcoin transaction parsing:
- Now captures all input amounts and addresses
- Passes total input amount to change detection
- Enables sophisticated UTXO analysis

Example with unnecessary inputs:
- Inputs: [5 BTC, 3 BTC, 1 BTC] = 9 BTC total
- Output 1: 6 BTC (payment)
- Output 2: 2.9998 BTC
- Analysis: Could make 6 BTC with just [5, 3], so 1 BTC input unnecessary
- Result: Output 2 scored as change (unnecessary input + matches expected)

Note: APIs (blockchain.info, BlockCypher) don't explicitly mark change,
but provide sufficient data for these heuristics to work effectively.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 66 +++++++++++++++++++++++++++++++--------------------
 index.html | 80 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++----
 2 files changed, 117 insertions(+), 29 deletions(-)
```

## Recent Commits History

- 4cde5fe Add unnecessary input heuristic - most reliable change detection method (0 seconds ago)
- d51c880 Add advanced Bitcoin change address detection heuristics (6 minutes ago)
- 8feac2a Improve change address detection with automatic and optional modes (9 minutes ago)
- b8d3614 Implement change address handling as same-hop threads (like swaps) (14 minutes ago)
- ed49d5d Add comprehensive report viewer and improved navigation (2 hours ago)
- b3885d2 Fix currency mismatch after swap - prevent duplicate thread creation (2 hours ago)
- 751b868 Fix duplicate swap output thread creation bug (2 hours ago)
- 9d3b5fd Fix syntax error in swap wizard template string (2 hours ago)
- 9a9c03d Update CLAUDE.md with latest commits (2 hours ago)
- ca3f69c Fix critical thread tracking and validation issues (2 hours ago)

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
