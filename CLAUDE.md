# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 10:30)

**Commit:** 7c01752308b220e2241096d57cb1078139b762ec
**Author:** Your Name
**Message:** Simplify swap handling and fix over-allocation bug

- Swaps now keep the same thread ID, just change currency (no [SWAP:] suffix)
- Thread V1-T1-H1 in USDC becomes same V1-T1-H1 in USDT after swap
- Fixed max allocation to not exceed transaction amount
- When allocating max to a smaller transaction, only allocates what fits
- Remaining amount stays available for next entries
- Cleaner, simpler thread tracking after swaps

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 44 ++++++++++++++++++++++----------------------
 index.html | 62 +++++++++++++++++++++++++++++++++++---------------------------
 2 files changed, 57 insertions(+), 49 deletions(-)
```

## Recent Commits History

- 7c01752 Simplify swap handling and fix over-allocation bug (0 seconds ago)
- 8784749 Fix thread database consistency and availability calculations (11 minutes ago)
- aaf556b Implement universal threads database as single source of truth (25 minutes ago)
- ee8ce28 Enable same-hop swap tracing - swap outputs immediately available within same hop (27 minutes ago)
- a365dc3 Fix swap thread replacement - original threads now completely replaced by swap outputs (36 minutes ago)
- b558cc0 Fix swap currency tracking - ensure threads use output currency after swap conversion (45 minutes ago)
- 4e0d269 Fix swap wizard to properly handle currency conversion and auto-create entries (54 minutes ago)
- 4b64742 Fix renderHopEntry missing hop parameter causing undefined error (2 hours ago)
- 0ed7ee6 Update CLAUDE.md with latest changes (2 hours ago)
- a2465ca Remove duplicate functions and clean up redundant code (2 hours ago)

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
