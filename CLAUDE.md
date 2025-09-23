# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-22 20:51)

**Commit:** a2647b19f1d0f5689bcd7038edcfc012b4bf5c9c
**Author:** Your Name
**Message:** Add transaction hash lookup for DEX/Swap wizard

- Added lookupSwapTransaction function to analyze swap transactions
- Automatically detects what left and came back to user's wallet
- Filters transfers to show only user wallet interactions
- Auto-fills output amounts and currencies from transaction data
- Gets user wallet from source thread's last receiving wallet
- Added UI for transaction hash input with lookup button
- Exposed all swap wizard functions globally for onclick handlers

The lookup feature allows users to enter a transaction hash and have the swap details automatically populated based on the blockchain analysis, focusing only on what left and returned to their wallet address.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md            |  57 ++++-----
 automated_test.js    | 235 ++++++++++++++++++++++++++++++++++
 check_victim.js      |  69 ++++++++++
 diagnostic.js        |  58 +++++++++
 index.html           | 215 ++++++++++++++++++++++++++++++-
 run_tests.js         | 348 +++++++++++++++++++++++++++++++++++++++++++++++++++
 test_core_fixes.html | 201 +++++++++++++++++++++++++++++
 7 files changed, 1144 insertions(+), 39 deletions(-)
```

## Recent Commits History

- a2647b1 Add transaction hash lookup for DEX/Swap wizard (0 seconds ago)
- 5624070 Remove redundant createSwapEntryFromWizard function (8 minutes ago)
- 0e6eda8 Fix duplicate createSwapEntry function causing swap wizard to fail (10 minutes ago)
- 8e60274 Add better debugging for swap wizard hop finding issue (18 minutes ago)
- 90726bb Fix DEX/Swap entry not showing in Add Entry wizard (48 minutes ago)
- e3d9d02 Fix UI not updating after applying transfer to victim (55 minutes ago)
- a7a9dd6 Fix removeTransaction function definition (62 minutes ago)
- 995000a Implement core behavior fixes based on user requirements (84 minutes ago)
- 31185bb Implement partial tracing and optional thread review modal (2 hours ago)
- 1cd28c4 Update commingling notation to parentheses format (2 hours ago)

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
