# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 09:45)

**Commit:** b558cc0de85eb3d9adff08e800c942abab278b7f
**Author:** Your Name
**Message:** Fix swap currency tracking - ensure threads use output currency after swap conversion

- Fixed thread ID consistency between updateThreadsAfterSwap and updateThreadAvailabilityFromSwap
- Both functions now use swap entry's notation as thread ID (includes [SWAP: X → Y] suffix)
- Added proper availableAmount and thread properties to swap output threads
- Enhanced logging to track currency conversions in lookup wizard
- Swap entries correctly maintain same hop number (no advancement)
- After swapping USDC to USDT, the system now correctly tracks USDT in next hop

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 46 +++++++++++++++++++++++++++-------------------
 index.html | 40 +++++++++++++++++++++++++++-------------
 2 files changed, 54 insertions(+), 32 deletions(-)
```

## Recent Commits History

- b558cc0 Fix swap currency tracking - ensure threads use output currency after swap conversion (0 seconds ago)
- 4e0d269 Fix swap wizard to properly handle currency conversion and auto-create entries (10 minutes ago)
- 4b64742 Fix renderHopEntry missing hop parameter causing undefined error (49 minutes ago)
- 0ed7ee6 Update CLAUDE.md with latest changes (57 minutes ago)
- a2465ca Remove duplicate functions and clean up redundant code (58 minutes ago)
- b66d53d Remove duplicate nextBtn declaration in checkWizardButtonState (66 minutes ago)
- abdd5b5 Fix duplicate hopNumber declaration in reopenHop function (68 minutes ago)
- 0883ca5 Fix duplicate hopNumber declaration in showSwapWizard (78 minutes ago)
- a86c083 Fix hop wizard progression and remove all hop ID references (2 hours ago)
- bf1e5df Fix hop wizard step 3 'Log Entry' button disabled issue (4 hours ago)

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
