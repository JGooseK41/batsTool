# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-24 10:45)

**Commit:** 33f6d1c44f474ce1d95f6527fddae8f58b50180a
**Author:** Your Name
**Message:** Add detailed logging to debug token transfer parsing in bulk upload

- Added comprehensive logging to parseEVMResponse
- Will show receipt data structure and logs detection
- Helps identify why token transfers aren't being parsed correctly

### Changed Files:
```
 CLAUDE.md  | 31 +++++++++++++++----------------
 index.html |  9 +++++++++
 2 files changed, 24 insertions(+), 16 deletions(-)
```

## Recent Commits History

- 33f6d1c Add detailed logging to debug token transfer parsing in bulk upload (0 seconds ago)
- 2cb002c Fix bulk upload token transfer detection for all EVM chains (2 minutes ago)
- ad194ac Fix bulk upload API calls and add error handling for extension interference (6 minutes ago)
- 140cd3f Add bulk upload test file and complete implementation (13 minutes ago)
- 66b6133 Fix bulk upload to use parseTransactionData and add multi-transfer selection modal (14 minutes ago)
- cd72cb8 Fix PIFO allocation - replace proportional distribution with proper sequential allocation (28 minutes ago)
- 4cde5fe Add unnecessary input heuristic - most reliable change detection method (2 hours ago)
- d51c880 Add advanced Bitcoin change address detection heuristics (2 hours ago)
- 8feac2a Improve change address detection with automatic and optional modes (2 hours ago)
- b8d3614 Implement change address handling as same-hop threads (like swaps) (2 hours ago)

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
