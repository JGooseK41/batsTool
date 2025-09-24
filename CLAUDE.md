# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-24 05:56)

**Commit:** ab2dc0e449dea65f2319c4d31fe249acd0d03d65
**Author:** Your Name
**Message:** Fix graph visualization error with terminal wallets

The issue occurred when processing terminal wallet entries in the graph visualization.
The code would create a 'terminalNode' variable for terminal wallets but then
incorrectly reference an undefined 'toNode' variable when creating edges.

Fix:
- Added conditional check to only create edges for non-terminal wallets
- Terminal wallet edges are already created in the terminal wallet processing block
- Added null check for toNode existence before creating edges

This resolves the 'Uncaught ReferenceError: toNode is not defined' error that
occurred when trying to visualize investigations with terminal wallets.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                           | 101 ++++--
 docs/BATS-Updated-Training-Guide.md | 620 ++++++++++++++++++++++++++++++++++++
 index.html                          |  37 ++-
 3 files changed, 708 insertions(+), 50 deletions(-)
```

## Recent Commits History

- ab2dc0e Fix graph visualization error with terminal wallets (0 seconds ago)
- 0d63436 Complete comprehensive B.A.T.S. tool testing and bug analysis (6 hours ago)
- c36475d Implement comprehensive Word-format narrative investigation report (7 hours ago)
- 0448ce8 Disable Add Entry button for completed hops with reopen option (7 hours ago)
- eb5a4c9 Add critical wallet validation for transaction lookups (7 hours ago)
- bb1cb97 Fix center alignment of Generate Root Total button (7 hours ago)
- 6d41977 Add comprehensive PDF report export for case presentations (7 hours ago)
- ba22286 Enhanced UI to highlight PNG metadata embedding feature (8 hours ago)
- 542a891 Add PNG metadata embedding for round-trip export/import (8 hours ago)
- 206b607 Enhanced graph UX: clickable transaction lines, export dialog, and improved scrolling (8 hours ago)

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
