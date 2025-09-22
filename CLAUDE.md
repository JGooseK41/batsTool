# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-22 17:43)

**Commit:** b55fac70815b535f475d5ac8bbab076a0154c5d0
**Author:** Your Name
**Message:** Fix broken Complete Victim button and other victim-related functions

- Exposed victim functions to global scope so onclick handlers work properly
- Added completeVictim, reopenVictim, removeVictim, addTransaction, etc. to window object
- Fixed issue where buttons appeared broken but were actually inaccessible due to scope
- Restored victim completion restriction (must complete before adding another)

This fixes the regression where victim management buttons stopped working.

### Changed Files:
```
 CLAUDE.md  | 32 +++++++++++++++-----------------
 index.html | 59 +++++++++++++++++++++++++++++++++++------------------------
 2 files changed, 50 insertions(+), 41 deletions(-)
```

## Recent Commits History

- b55fac7 Fix broken Complete Victim button and other victim-related functions (0 seconds ago)
- c4b118d Fix ERC-20 token filtering regression in wizard (24 minutes ago)
- 7bdc0f8 Fix critical swap wizard bugs: Add missing showThreadReviewModal function and ensure swap wizard displays properly (52 minutes ago)
- f89a74e Major improvements to swap handling and UI/UX enhancements (78 minutes ago)
- a48616a Streamline wizard workflow - entries now create directly without manual form step (2 hours ago)
- 150f54c Improve post-wizard UI clarity and workflow guidance (3 hours ago)
- 9fc5142 Fix wizard freeze when looking up transactions with single token transfer (28 hours ago)
- 3992784 Fix missing closing braces in lookupWizardTransaction (29 hours ago)
- 304c674 Fix syntax errors in lookupWizardTransaction (29 hours ago)
- 3b84fc6 Complete remaining bug fixes and optimizations (29 hours ago)

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
