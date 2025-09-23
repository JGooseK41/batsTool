# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 12:34)

**Commit:** de7d528c26edfc40fa2d224e9802c9f84dae84bd
**Author:** Your Name
**Message:** Fix wizard-created entries not auto-collapsing and manual form appearing

Issues fixed:
1. Wizard-created entries now auto-collapse immediately
2. Manual entry form no longer appears after wizard completion
3. Entries marked for collapse BEFORE rendering to prevent flashing

Changes:
- Set entryCollapseState before rendering for wizard entries
- Close wizard before re-rendering to prevent form conflicts
- Added explicit returns to prevent further processing
- Force collapse after render as double-check
- Improved timing to ensure smooth UX

The wizard now properly closes entries and doesn't show the confusing
manual form after completion.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 51 ++++++++++++++++++++++----------------------
 index.html | 72 ++++++++++++++++++++++++++++++++++++++++++++++++++------------
 2 files changed, 83 insertions(+), 40 deletions(-)
```

## Recent Commits History

- de7d528 Fix wizard-created entries not auto-collapsing and manual form appearing (0 seconds ago)
- b8336a8 Fix ART and remaining calculations to properly handle currency swaps (4 minutes ago)
- e62e16c Fix updateThreadAvailabilityFromSwap to properly convert threads between currencies (13 minutes ago)
- e3e9a2f Fix swap currency lookup issue in hop wizard (21 minutes ago)
- 094ed34 Implement dual-layer thread tracking system for complex swap handling (30 minutes ago)
- 45ce04e WIP: Begin implementation of dual-layer thread tracking system (38 minutes ago)
- 2406827 Fix swap thread replacement in universal database (57 minutes ago)
- cd2d729 Fix swap thread ID collision causing double-counting (62 minutes ago)
- 84cb001 Fix wizard completion and thread allocation tracking issues (83 minutes ago)
- 4243a35 Fix thread display clarity for swaps within same hop (89 minutes ago)

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
