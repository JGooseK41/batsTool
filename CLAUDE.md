# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 22:43)

**Commit:** eb5a4c9fde4e25c7e3d787a0e9406594214fb0d6
**Author:** Your Name
**Message:** Add critical wallet validation for transaction lookups

Implements validation to ensure transaction integrity when using blockchain lookups:

## Validation Features
- Verifies transaction actually spends from the source thread's wallet
- Compares transaction 'from' address with thread's known wallet location
- Prevents investigators from accidentally using wrong transactions

## Two-Stage Validation

### 1. Lookup Stage (Visual Feedback)
- Shows green success box when wallet matches thread
- Shows red warning box when wallet doesn't match
- Changes button appearance based on validation status
- Displays both expected and actual wallet addresses

### 2. Apply Stage (Enforcement)
- Blocks application of mismatched transactions
- Shows detailed error explaining the issue
- Lists possible causes (wrong hash, wrong thread, etc.)
- Provides guidance for resolution

## Additional Checks
- Amount validation warns if transaction exceeds available thread amount
- Allows override for legitimate cases (commingling, additional funds)
- Success message confirms wallet validation passed

## Benefits
- Prevents trace chain breaks
- Ensures fund flow integrity
- Reduces investigation errors
- Maintains chain of custody
- Improves accuracy of traces

This validation ensures investigators can't accidentally apply transactions that don't actually continue the fund flow from the selected source thread, maintaining the integrity of the investigation.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  70 ++++++++------------------
 index.html | 168 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----
 2 files changed, 176 insertions(+), 62 deletions(-)
```

## Recent Commits History

- eb5a4c9 Add critical wallet validation for transaction lookups (0 seconds ago)
- bb1cb97 Fix center alignment of Generate Root Total button (7 minutes ago)
- 6d41977 Add comprehensive PDF report export for case presentations (12 minutes ago)
- ba22286 Enhanced UI to highlight PNG metadata embedding feature (16 minutes ago)
- 542a891 Add PNG metadata embedding for round-trip export/import (19 minutes ago)
- 206b607 Enhanced graph UX: clickable transaction lines, export dialog, and improved scrolling (27 minutes ago)
- 09dcf23 Enforce terminal wallet treatment for exchange arrivals (42 minutes ago)
- fbbcd7e Add protection against adding entries to fully allocated hops (49 minutes ago)
- 3d0af9d Fix syntax error - remove extra closing brace at end of file (58 minutes ago)
- 5dcf6fa Implement progressive disclosure and improved spatial organization for DAG (62 minutes ago)

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
