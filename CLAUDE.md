# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 21:28)

**Commit:** 1caa3907e74ea33c9c10f4ccb26c34d1ab77ddde
**Author:** Your Name
**Message:** Implement T-account DAG visualization with hop-centric ART reconciliation

Major improvements to create a focused T-account style DAG visualization:

## Core Design Changes
- Simplified to DAG-only layout (removed unnecessary layout options)
- Hop-centric vertical layers with shaded backgrounds
- T-account style positioning (source nodes left, terminal/writeoff right)
- Wallet duplication per hop to prevent cyclic flows

## Universal Wallet Index Integration
- Uses friendly names from UWI (RED 1, BLACK 2, YELLOW 3, etc.)
- Correlates directly with permanent wallet IDs
- Falls back to generating temporary friendly names for unindexed wallets

## ART (Adjusted Root Total) Reconciliation
- ART displayed at TOP of each hop (what's coming IN)
- ART displayed at BOTTOM of each hop (what's going OUT)
- Green background for incoming ART
- Red background for outgoing ART
- Visual reconciliation by looking down each hop's shaded area
- Automatic validation with warning for unbalanced hops

## Currency Swap Handling
- Diamond-shaped nodes for swaps with ⇄ symbol
- Shows currency conversion (e.g., 'SWAP USDC→USDT')
- Properly calculates ART changes when currencies convert
- Displays conversion amounts on swap nodes
- Accounts for currency changes in hop validation

## Thread-Based Edge Rendering
- Color-coded edges by source thread
- Thread notation shown on edges (V1-T1, etc.)
- Amounts displayed with thread information
- Dashed lines for inter-hop connections
- Terminal wallet edges highlighted in purple

## Visual Hierarchy
- Alternating hop background colors for clarity
- Hop titles (VICTIMS, HOP 1, HOP 2, etc.)
- Triangle nodes for writeoffs
- Glowing purple circles for terminal/exchange wallets
- Clear T-account structure within each hop

## Validation Features
- Real-time ART validation per hop
- Warning indicators for unaccounted funds
- Shows differences when hop is unbalanced
- Accounts for swaps, writeoffs, and terminal wallets

This creates a clear, accountant-friendly visualization where each hop can be reconciled by looking at the IN amount at top, following the transactions through the hop, and verifying the OUT amount at bottom matches expectations.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  94 ++++---
 index.html | 813 ++++++++++++++++++++++++++++++++++++++++++-------------------
 2 files changed, 633 insertions(+), 274 deletions(-)
```

## Recent Commits History

- 1caa390 Implement T-account DAG visualization with hop-centric ART reconciliation (0 seconds ago)
- f47cb44 Add comprehensive graph visualization with proper navigation from trace completion (16 minutes ago)
- dcd1638 Fix validation incorrectly showing traced funds as unaccounted (30 minutes ago)
- 3774502 Prevent finalizing empty hops and fix editing completed hops (44 minutes ago)
- e1ad0ba Fix incorrect 'All threads fully traced' message on empty hop (51 minutes ago)
- a7114b7 Update CLAUDE.md with latest commit info (55 minutes ago)
- ec6396e Add pre-configured test investigation files (57 minutes ago)
- b6d2280 Add comprehensive test suite and documentation (61 minutes ago)
- 77a039b Fix missing Finalize Hop button and improve hop progression (66 minutes ago)
- a8c73c0 Add detailed debugging to hop finalization process (70 minutes ago)

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
