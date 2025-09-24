# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 19:54)

**Commit:** 37a8ed55fdd0251a6ae9458a510f7c297236304a
**Author:** Your Name
**Message:** Fix swap validation incorrectly showing balanced with unallocated outputs

Critical bug fix: Hop validation now properly detects unallocated swap outputs.

## The Problem
After converting USDC to USDT via swap:
- System correctly created USDT thread from swap
- BUT validation showed hop as 'balanced' even though USDT wasn't traced
- Would allow closing hop without allocating converted funds

## Root Cause
Validation was only checking if swap INPUT was accounted for, not if swap OUTPUT was allocated to subsequent transactions.

## The Solution
Enhanced validation to check available threads for next hop, which includes:
1. Remainder threads from partial allocations
2. Swap output threads that haven't been traced yet
3. Any other unallocated funds

## Technical Details
- validateHopCompletion() now checks getAvailableSourcesForHop(hopNumber + 1)
- Specifically logs swap_output threads for debugging
- Properly sums all unallocated amounts regardless of source
- Shows correct remaining amount (e.g., '79,999 USDT remaining' after swap)

## Result
- Cannot close hop with unallocated swap outputs
- Proper warning: 'X USDT remaining' after USDC→USDT swap
- Forces allocation of converted funds before proceeding
- Maintains trace integrity through currency conversions

This ensures swaps are fully traced, not just executed.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 71 +++++++++++++++++++++++++++++++-------------------------------
 index.html | 16 +++++++++++---
 2 files changed, 49 insertions(+), 38 deletions(-)
```

## Recent Commits History

- 37a8ed5 Fix swap validation incorrectly showing balanced with unallocated outputs (0 seconds ago)
- 0c24e1f CRITICAL FIX: Hop validation now properly detects unallocated remainder threads (12 minutes ago)
- c0571a1 Improve network resilience and error handling for blockchain lookups (14 minutes ago)
- d402adc Streamline hop workflow and reduce redundant clicks (23 minutes ago)
- 5804b61 Fix terminal wallet detection and trace completion logic (30 minutes ago)
- a771d15 Implement auto-save after hop completion (44 minutes ago)
- 10cf459 Add comprehensive trace completion ceremony (52 minutes ago)
- c9f7c5b CRITICAL FIX: Use validated swap handling in hop finalization (56 minutes ago)
- 39e5b12 Fix terminal wallet detection in hop completion (2 hours ago)
- 05e95d3 Fix swap currency tracking in hop validation (2 hours ago)

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
