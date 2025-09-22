# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-22 19:15)

**Commit:** 31185bb1001d59e1a26d840ef4ffbb48798d5838
**Author:** Your Name
**Message:** Implement partial tracing and optional thread review modal

- Allow partial tracing when transaction exceeds available source threads
- Document partial traces in entry notes (e.g., 'Following 1000 of 1500 total')
- PIFO now caps allocation at available amount for partial traces
- Thread review modal only shows when there are unaccounted threads
- Modal can be disabled via localStorage preference
- Added proceedToNextHop function for direct hop transitions

This allows investigators to trace their portion of larger transactions without being blocked.

### Changed Files:
```
 CLAUDE.md  | 31 ++++++++++------------
 index.html | 89 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++----
 2 files changed, 98 insertions(+), 22 deletions(-)
```

## Recent Commits History

- 31185bb Implement partial tracing and optional thread review modal (0 seconds ago)
- 1cd28c4 Update commingling notation to parentheses format (3 minutes ago)
- 82110d8 Implement PIFO allocation and expose wizard functions (7 minutes ago)
- b55fac7 Fix broken Complete Victim button and other victim-related functions (2 hours ago)
- c4b118d Fix ERC-20 token filtering regression in wizard (2 hours ago)
- 7bdc0f8 Fix critical swap wizard bugs: Add missing showThreadReviewModal function and ensure swap wizard displays properly (2 hours ago)
- f89a74e Major improvements to swap handling and UI/UX enhancements (3 hours ago)
- a48616a Streamline wizard workflow - entries now create directly without manual form step (3 hours ago)
- 150f54c Improve post-wizard UI clarity and workflow guidance (4 hours ago)
- 9fc5142 Fix wizard freeze when looking up transactions with single token transfer (30 hours ago)

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
