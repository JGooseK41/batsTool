# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 20:31)

**Commit:** ec6396ed5710f57bea3b8bf5bf1f210090db0a32
**Author:** Your Name
**Message:** Add pre-configured test investigation files

Created three .bats test files for different scenarios:

1. test-investigation.bats - Basic swap scenario
   - USDC to USDT swap in Hop 2
   - Unallocated USDT threads for testing validation
   - Tests swap validation and hop progression

2. test-investigation-terminal.bats - Terminal wallet scenario
   - Complete trace to exchanges (Binance & Coinbase)
   - Tests terminal wallet detection
   - Split funds between two exchanges

3. test-investigation-writeoff.bats - Write-off scenario
   - Partial trace with mixer write-off
   - Tests write-off functionality
   - Reduced ART for subsequent hops

All files use the actual transaction hashes provided for realistic testing.
Load any file to instantly test specific functionality without manual entry.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                        |  60 +++++++------
 test-investigation-terminal.bats | 176 +++++++++++++++++++++++++++++++++++++
 test-investigation-writeoff.bats | 133 ++++++++++++++++++++++++++++
 test-investigation.bats          | 181 +++++++++++++++++++++++++++++++++++++++
 4 files changed, 525 insertions(+), 25 deletions(-)
```

## Recent Commits History

- ec6396e Add pre-configured test investigation files (0 seconds ago)
- b6d2280 Add comprehensive test suite and documentation (5 minutes ago)
- 77a039b Fix missing Finalize Hop button and improve hop progression (9 minutes ago)
- a8c73c0 Add detailed debugging to hop finalization process (13 minutes ago)
- f78b054 Update CLAUDE.md with latest changes (17 minutes ago)
- 4aa4619 Fix trace completion incorrectly showing complete with unallocated swap outputs (19 minutes ago)
- d919071 Fix swap validation bug where converted funds showed as balanced (25 minutes ago)
- 37a8ed5 Fix swap validation incorrectly showing balanced with unallocated outputs (37 minutes ago)
- 0c24e1f CRITICAL FIX: Hop validation now properly detects unallocated remainder threads (49 minutes ago)
- c0571a1 Improve network resilience and error handling for blockchain lookups (51 minutes ago)

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
