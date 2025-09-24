# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-24 07:05)

**Commit:** ed49d5d25cf27f03672eec3f1815738376277b18
**Author:** Your Name
**Message:** Add comprehensive report viewer and improved navigation

- Added Full Report button to graph tab for easy access to all indices
- Created comprehensive report modal with all investigation data
- Includes tabbed navigation between Narrative, Victims, Wallets, Terminals, and Red Wallets
- Added export options for HTML, PDF (via print), and clipboard
- Shows summary statistics at top (total traced, victims, hops, terminals)
- Added Summary button to graph tab for quick navigation

The comprehensive report provides investigators with a single view of:
- Complete narrative report with chronological events
- Victim index with all loss details
- Universal wallet index showing all addresses
- Terminal wallet report for exchange arrivals
- Red wallet index for suspicious addresses

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  45 ++++-----
 index.html | 315 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 338 insertions(+), 22 deletions(-)
```

## Recent Commits History

- ed49d5d Add comprehensive report viewer and improved navigation (1 second ago)
- b3885d2 Fix currency mismatch after swap - prevent duplicate thread creation (8 minutes ago)
- 751b868 Fix duplicate swap output thread creation bug (14 minutes ago)
- 9d3b5fd Fix syntax error in swap wizard template string (22 minutes ago)
- 9a9c03d Update CLAUDE.md with latest commits (23 minutes ago)
- ca3f69c Fix critical thread tracking and validation issues (24 minutes ago)
- 5783f8b Update CLAUDE.md with latest commits (38 minutes ago)
- 8d27f9f Simplify available threads display - remove separate swap thread section (39 minutes ago)
- 6f99660 Fix available threads display to show current hop allocation status (41 minutes ago)
- 9f00870 Update CLAUDE.md with latest commits (53 minutes ago)

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
