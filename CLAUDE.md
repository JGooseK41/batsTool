# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-24 06:41)

**Commit:** ca3f69cee270e71583492a2ce4650c16d108f5ed
**Author:** Your Name
**Message:** Fix critical thread tracking and validation issues

- Fixed buildAvailableThreadsIndex destroying swap output threads on rebuild
- Now preserves manually created swap output threads when rebuilding index
- Added validation to prevent selecting already-assigned threads in swap wizard
- Only show threads with actual availability (>0) in swap wizard
- Added transaction validation to ensure swap TX involves correct wallet
- Warning when transaction doesn't match selected thread's wallet
- Prevents using incorrect threads with mismatched transactions

This fixes the issues where:
1. Already-assigned threads were showing as available
2. Swap output threads were disappearing
3. Threads could be used with wrong transaction hashes
4. Same thread could be assigned multiple times

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 35 ++++++++------------------
 index.html | 84 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 93 insertions(+), 26 deletions(-)
```

## Recent Commits History

- ca3f69c Fix critical thread tracking and validation issues (0 seconds ago)
- 5783f8b Update CLAUDE.md with latest commits (14 minutes ago)
- 8d27f9f Simplify available threads display - remove separate swap thread section (15 minutes ago)
- 6f99660 Fix available threads display to show current hop allocation status (17 minutes ago)
- 9f00870 Update CLAUDE.md with latest commits (29 minutes ago)
- bb65c9d Fix graph visualization error with terminal wallets (31 minutes ago)
- b5f8faf Add comprehensive Case Conclusion Dashboard with unified index access (33 minutes ago)
- ab2dc0e Fix graph visualization error with terminal wallets (45 minutes ago)
- 0d63436 Complete comprehensive B.A.T.S. tool testing and bug analysis (7 hours ago)
- c36475d Implement comprehensive Word-format narrative investigation report (8 hours ago)

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
