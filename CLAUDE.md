# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-24 10:17)

**Commit:** cd72cb87ad062dc18596c3b5f4369fc1a6e4449d
**Author:** Your Name
**Message:** Fix PIFO allocation - replace proportional distribution with proper sequential allocation

Critical fix for multi-thread assignment:

BEFORE (Incorrect - Proportional):
- V1-T1: 53,388 USDT (54% assigned)
- V1-T2: 53,383 USDT (54% assigned)
- V1-T3: 552,735 USDT (54% assigned)
- V1-T4: 552,873 USDT (54% assigned)
Total: 1,212,380 USDT (evenly distributed)

AFTER (Correct - PIFO):
- V1-T1: 98,145 USDT (100% assigned)
- V1-T2: 98,135 USDT (100% assigned)
- V1-T3: 1,016,099 USDT (100% assigned)
- V1-T4: 0 USDT (0% assigned - not needed)
Total: 1,212,380 USDT (sequential allocation)

Changes:
1. Fixed createHopEntryFromWizard() to use PIFO instead of proportional ratio
2. Fixed autoAllocateMaxForMultipleSources() to use PIFO order
3. Threads now consumed sequentially (V1-T1, then V1-T2, then V1-T3, etc.)

PIFO (Proceeds In First Out) ensures:
- Maintains golden thread chronologically
- Uses earliest transactions first
- Matches court-accepted tracing methodology
- Prevents artificial spreading of funds

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 72 ++++++++++++++++++++++++++++----------------------------------
 index.html | 63 ++++++++++++++++++++++++++++++++++++++++--------------
 2 files changed, 79 insertions(+), 56 deletions(-)
```

## Recent Commits History

- cd72cb8 Fix PIFO allocation - replace proportional distribution with proper sequential allocation (0 seconds ago)
- 4cde5fe Add unnecessary input heuristic - most reliable change detection method (87 minutes ago)
- d51c880 Add advanced Bitcoin change address detection heuristics (2 hours ago)
- 8feac2a Improve change address detection with automatic and optional modes (2 hours ago)
- b8d3614 Implement change address handling as same-hop threads (like swaps) (2 hours ago)
- ed49d5d Add comprehensive report viewer and improved navigation (3 hours ago)
- b3885d2 Fix currency mismatch after swap - prevent duplicate thread creation (3 hours ago)
- 751b868 Fix duplicate swap output thread creation bug (3 hours ago)
- 9d3b5fd Fix syntax error in swap wizard template string (4 hours ago)
- 9a9c03d Update CLAUDE.md with latest commits (4 hours ago)

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
