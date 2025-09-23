# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 10:37)

**Commit:** ddb77b28a80ecfec419a2810c18d79e20d365904
**Author:** Your Name
**Message:** Fix over-allocation bug - properly limit thread consumption to transaction amount

- When allocating more than transaction contains, now proportionally reduces allocations
- If allocating 79,929 to a 45,000 transaction, only 45,000 is consumed
- Remaining 34,929 stays available for next entries
- Allocations are adjusted proportionally to match transaction limits
- Fixes issue where full thread was consumed despite limiting entry amount

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 38 +++++++++++++-------------------------
 index.html | 18 ++++++++++++++----
 2 files changed, 27 insertions(+), 29 deletions(-)
```

## Recent Commits History

- ddb77b2 Fix over-allocation bug - properly limit thread consumption to transaction amount (0 seconds ago)
- 9bcc336 Update CLAUDE.md with latest changes (6 minutes ago)
- 7c01752 Simplify swap handling and fix over-allocation bug (8 minutes ago)
- 8784749 Fix thread database consistency and availability calculations (19 minutes ago)
- aaf556b Implement universal threads database as single source of truth (32 minutes ago)
- ee8ce28 Enable same-hop swap tracing - swap outputs immediately available within same hop (34 minutes ago)
- a365dc3 Fix swap thread replacement - original threads now completely replaced by swap outputs (44 minutes ago)
- b558cc0 Fix swap currency tracking - ensure threads use output currency after swap conversion (52 minutes ago)
- 4e0d269 Fix swap wizard to properly handle currency conversion and auto-create entries (62 minutes ago)
- 4b64742 Fix renderHopEntry missing hop parameter causing undefined error (2 hours ago)

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
