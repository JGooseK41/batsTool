# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 20:37)

**Commit:** e1ad0ba2e4c599b81a80002ee34e25087f254fe9
**Author:** Your Name
**Message:** Fix incorrect 'All threads fully traced' message on empty hop

Critical fix for false completion message when starting a new hop:

Problem:
- System was checking threads for NEXT hop instead of CURRENT hop
- When no entries existed, it found no threads for next hop and showed "fully traced"
- This was completely backwards - empty hop should show AVAILABLE threads

Solution:
- Check threads available for CURRENT hop when no entries exist
- Show available threads that need to be traced
- Only show "fully traced" when entries exist AND all threads are allocated
- Added proper edge case handling for various states

The fix properly distinguishes between:
1. No entries yet → Show available threads for current hop
2. Has entries, threads remain → Show threads for next hop
3. All accounted for → Show "fully traced" message
4. Edge cases → Show appropriate warnings

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 57 ++++++++++++---------------------------------
 index.html | 78 +++++++++++++++++++++++++++++++++++++++++++++++++++-----------
 2 files changed, 80 insertions(+), 55 deletions(-)
```

## Recent Commits History

- e1ad0ba Fix incorrect 'All threads fully traced' message on empty hop (0 seconds ago)
- a7114b7 Update CLAUDE.md with latest commit info (4 minutes ago)
- ec6396e Add pre-configured test investigation files (6 minutes ago)
- b6d2280 Add comprehensive test suite and documentation (10 minutes ago)
- 77a039b Fix missing Finalize Hop button and improve hop progression (15 minutes ago)
- a8c73c0 Add detailed debugging to hop finalization process (18 minutes ago)
- f78b054 Update CLAUDE.md with latest changes (23 minutes ago)
- 4aa4619 Fix trace completion incorrectly showing complete with unallocated swap outputs (25 minutes ago)
- d919071 Fix swap validation bug where converted funds showed as balanced (31 minutes ago)
- 37a8ed5 Fix swap validation incorrectly showing balanced with unallocated outputs (43 minutes ago)

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
