# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 22:16)

**Commit:** 206b607b2ac90545a5a51a5709f3eb9723d3af24
**Author:** Your Name
**Message:** Enhanced graph UX: clickable transaction lines, export dialog, and improved scrolling

- Added clickable transaction lines that show notes on click
- Consolidated export buttons into single button with format selection dialog
- Fixed scroll issue by separating graph and page scrolling
- Added notes field to edge data structures for transaction information
- Implemented popup display for transaction notes (3-second auto-dismiss)
- Created modal dialog for export format selection (PDF/SVG/PNG)
- Improved container scrolling with max-height constraint

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 105 ++++-----
 index.html | 736 +++++++++++++++++++++++++++++++++++++++++++++----------------
 2 files changed, 591 insertions(+), 250 deletions(-)
```

## Recent Commits History

- 206b607 Enhanced graph UX: clickable transaction lines, export dialog, and improved scrolling (0 seconds ago)
- 09dcf23 Enforce terminal wallet treatment for exchange arrivals (15 minutes ago)
- fbbcd7e Add protection against adding entries to fully allocated hops (23 minutes ago)
- 3d0af9d Fix syntax error - remove extra closing brace at end of file (32 minutes ago)
- 5dcf6fa Implement progressive disclosure and improved spatial organization for DAG (35 minutes ago)
- 1caa390 Implement T-account DAG visualization with hop-centric ART reconciliation (48 minutes ago)
- f47cb44 Add comprehensive graph visualization with proper navigation from trace completion (64 minutes ago)
- dcd1638 Fix validation incorrectly showing traced funds as unaccounted (78 minutes ago)
- 3774502 Prevent finalizing empty hops and fix editing completed hops (2 hours ago)
- e1ad0ba Fix incorrect 'All threads fully traced' message on empty hop (2 hours ago)

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
