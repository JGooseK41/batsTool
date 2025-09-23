# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 17:43)

**Commit:** 05e95d33b94e87c09d14715273a3c4c17613af8e
**Author:** Your Name
**Message:** Fix swap currency tracking in hop validation

Fixed issue where swapped currencies incorrectly showed as "remaining" during hop finalization:

## Problem
- After swapping USDC to USDT, the original USDC amount showed as "remaining to trace"
- System didn't recognize that swapped currencies are fully accounted for
- Validation incorrectly warned about untraced amounts for converted currencies

## Solution
- Track which currencies have been swapped out in validateHopCompletion()
- Mark swapped currencies as fully accounted when entire amount is converted
- Only show remaining amounts for currencies that weren't swapped
- Count swap entries as accounting for their source currency

## Validation Logic
1. Identify all swap entries and their source/target currencies
2. Track swapped-out currencies in a Set
3. For swapped currencies:
   - Don't show as "remaining" if fully converted
   - Only warn if partial amount wasn't swapped
4. For non-swapped currencies:
   - Normal validation applies
   - Show remaining amounts that need tracing

## User Experience
- Hop finalization now correctly handles currency conversions
- No false warnings about "unaccounted" swapped funds
- Clear distinction between swapped and untraced amounts
- Proper thread creation for converted currencies

This ensures investigators can complete hops with swaps without confusion about phantom "remaining" amounts.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 84 ++++++++++++++++++++++++++++++++------------------------------
 index.html | 65 +++++++++++++++++++++++++++++++++++++++++-------
 2 files changed, 100 insertions(+), 49 deletions(-)
```

## Recent Commits History

- 05e95d3 Fix swap currency tracking in hop validation (0 seconds ago)
- 1db32cf Enhanced investigation summary dashboard on file load (12 minutes ago)
- eed83c3 Fix saved file loading and thread availability issues (25 minutes ago)
- cb65a32 Fix investigation completion detection to prevent premature display (34 minutes ago)
- deb6362 Implement hop-centric DAG visualization for investigation traces (43 minutes ago)
- 313d765 Show investigation complete view when all threads reach terminal wallets (3 hours ago)
- 4c78dca Fix missing closing brace in template expression (3 hours ago)
- fcc2596 Add multi-currency progress bars for swapped assets (3 hours ago)
- 97cb71d Fix terminal wallet thread creation and display issues (3 hours ago)
- 9f06495 Fix terminal wallet allocation and thread tracking issues (4 hours ago)

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
