# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 06:03)

**Commit:** bf1e5df8b850c89cff0dd33b330b4d1456894f70
**Author:** Your Name
**Message:** Fix hop wizard step 3 'Log Entry' button disabled issue

The Log Entry button in step 3 was incorrectly disabled even when transaction
hash was entered. Step 3 is essential for entering transaction details and notes.

Changes:
- Restored proper step 3 flow (not skipping it)
- Fixed button enablement logic to check just for txHash in lookup mode
- Added checkWizardButtonState() function to update button when data changes
- Button now enables when txHash is entered, even without clicking Lookup
- Manual mode still requires both txHash and toWallet as expected

This ensures users can properly enter transaction details and notes in step 3.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md         |  55 ++++++++-------
 index.html        |  61 +++++++++++++----
 verify_hop_fix.js | 200 ++++++++++++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 279 insertions(+), 37 deletions(-)
```

## Recent Commits History

- bf1e5df Fix hop wizard step 3 'Log Entry' button disabled issue (0 seconds ago)
- b1058ab Fix thread ID format to prevent hop number accumulation (8 hours ago)
- 7954cb3 Fix unintended consequences of hop ID removal (8 hours ago)
- 01bf713 Remove hop IDs and use hop numbers as primary identifier (8 hours ago)
- 1c99f22 Document hop ID refactoring needs (9 hours ago)
- 9fb980d Fix swap wizard hop ID lookup issue by storing hop object (9 hours ago)
- 72014da Update CLAUDE.md with latest commit info (9 hours ago)
- 2d6ff79 Fix swap wizard issues: duplicate hash fields and button functionality (9 hours ago)
- c012b7f Enhance swap wizard with checkboxes and partial swap support (9 hours ago)
- a768bdd Streamline hop completion to single click instead of 4 modals (9 hours ago)

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
