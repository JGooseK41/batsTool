# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-04 10:49)

**Commit:** 1dcea6897b5e78586e9e69e6bab4993da585990d
**Author:** Your Name
**Message:** Remove incorrect auto-write-off of bridge/swap outputs

CRITICAL FIX: Bridge and swap outputs are NOT fees - they are legitimate traced funds!

The system was incorrectly auto-writing off ALL bridge/swap outputs as 'fees', which prevented users from tracing their converted funds. This was catastrophically wrong.

Changes:
- Removed auto-write-off logic for bridge/swap outputs entirely
- Bridge outputs (e.g., HYPE→USDC) are the actual converted funds to trace
- Only actual fees (gas in different currency) should be written off
- Added validation to require allocation of ALL bridge/swap outputs before finalization
- Separate handling for partial trace vs full bridge outputs

Bridge/swap outputs represent the continuation of the trace in the new currency. They must be allocated to continue tracing, not written off as fees.

Users must now manually:
1. Allocate bridge/swap outputs to continue the trace
2. OR explicitly write off actual fees/slippage if needed

### Changed Files:
```
 CLAUDE.md  |  32 +++++--------------
 index.html | 102 +++++++++++++++++++++----------------------------------------
 2 files changed, 41 insertions(+), 93 deletions(-)
```

## Recent Commits History

- 1dcea68 Remove incorrect auto-write-off of bridge/swap outputs (1 second ago)
- 7e5d62f Update CLAUDE.md with latest changes (11 minutes ago)
- 6ca8f4d Fix critical partial trace bridge handling bug (12 minutes ago)
- b584699 Add chain mismatch detection with clear error messaging (4 hours ago)
- c4a57c6 Add attribution override feature and improve write-off entry display (4 hours ago)
- 0d90653 Fix flow diagram visualization not initializing when trace is complete (5 hours ago)
- 39674c8 Fix report generation issues and improve Technical Audit Trail (28 hours ago)
- 77a65c2 Fix trace completion detection and add navigation options when investigation complete (3 days ago)
- 15138ba Fix hop entry wizard buttons and bridge name display in collapsed view (3 days ago)
- 4941da2 Fix bridge entry handling and ensure consistent treatment across all code paths (3 days ago)

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

## API Integration Status

### Available APIs
- **Mempool.space** (FREE): Transaction lookups, address validation, fee estimates
  - Note: Website has excellent autocomplete, API has backend support but endpoint not fully documented
- **Blockchain.info** (FREE): Bitcoin addresses and transactions
- **BlockCypher** (FREE limited): Multi-chain support with rate limits
- **Arkham Intelligence** (API key): Best for Bitcoin attribution and entity identification
- **Etherscan** (API key): EVM chains (Ethereum, BSC, Polygon, etc.)
- **TronGrid** (API key): Tron blockchain

### Address Search Strategy
The address search tool uses multiple fallback strategies:
1. Mempool.space (experimental endpoints for prefix search)
2. Arkham Intelligence (best for attribution and partial matches)
3. Complete address validation (Mempool, Blockchain.info)
4. BlockCypher (if API key available)
5. Known address database (major exchanges)

## Next Steps
- Complete flow diagram visualization implementation
- Enhance multi-transfer selection UI
- Consider adding more blockchain support
- Investigate Mempool.space undocumented search endpoints

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
