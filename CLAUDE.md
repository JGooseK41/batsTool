# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 14:43)

**Commit:** 97cb71df6e2af59be0c74678a5b2fc047cb71980
**Author:** Your Name
**Message:** Fix terminal wallet thread creation and display issues

- Prevent creation of output threads for terminal wallets (purple, gray, blue)
- Fix swap entry display to show input→output amounts correctly
- Add terminal wallet detection to thread creation logic
- Update entry summaries to properly display swap conversions
- Ensure terminal wallets don't generate V-T-H2 threads

Key fixes:
1. Terminal wallets no longer create confusing output threads
2. Swap entries now display "79,999 USDC → 79,929 USDT" format
3. Available threads correctly shows only valid threads for tracing
4. Progress tracking properly handles currency conversions

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 84 +++++++++++++++++++++-----------------------------------------
 index.html | 72 ++++++++++++++++++++++++++++++++++++++++++-----------
 2 files changed, 85 insertions(+), 71 deletions(-)
```

## Recent Commits History

- 97cb71d Fix terminal wallet thread creation and display issues (0 seconds ago)
- 9f06495 Fix terminal wallet allocation and thread tracking issues (44 minutes ago)
- 0479806 Add comprehensive terminal wallet tracking and reporting system (78 minutes ago)
- 8f66faa Implement dynamic wallet attribution via Etherscan API (87 minutes ago)
- 3a6026f Add automatic exchange detection with Bybit and other major exchanges (2 hours ago)
- abe51e1 Fix Total Accounted display to not double-count swap amounts (2 hours ago)
- 1a425c5 Fix duplicate availableThreads declaration causing syntax error (2 hours ago)
- de7d528 Fix wizard-created entries not auto-collapsing and manual form appearing (2 hours ago)
- b8336a8 Fix ART and remaining calculations to properly handle currency swaps (2 hours ago)
- e62e16c Fix updateThreadAvailabilityFromSwap to properly convert threads between currencies (2 hours ago)

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
