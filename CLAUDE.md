# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-04 10:37)

**Commit:** 6ca8f4dcffa592534b7299515efdf8866fcc58a5
**Author:** Your Name
**Message:** Fix critical partial trace bridge handling bug

CRITICAL BUG FIX: System was incorrectly auto-writing off ALL bridge/swap outputs including unowned portions from partial traces.

When user only owns partial amount (e.g., 86 of 306 HYPE = 28.94%), the system must:
- Calculate proportional share of bridge output (e.g., 3959 USDC from 13680 USDC total)
- Create thread for ONLY the owned portion
- NOT write off these funds as fees - they are actual traced funds
- Require allocation before hop finalization

Changes:
- Store wasPartialTrace flag and proportionalMultiplier in bridge output threads
- Skip auto-write-off for partial trace outputs in finalizeHop
- Block hop finalization if partial trace outputs remain unallocated
- Add visual indicators showing ownership percentage in thread selection
- Show warning when selecting partial trace threads

This prevents incorrect write-offs of funds the user doesn't own and ensures proper tracking of proportional ownership through bridge conversions.

### Changed Files:
```
 CLAUDE.md  | 44 +++++++++++++++++++----------------------
 index.html | 66 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----
 2 files changed, 81 insertions(+), 29 deletions(-)
```

## Recent Commits History

- 6ca8f4d Fix critical partial trace bridge handling bug (0 seconds ago)
- b584699 Add chain mismatch detection with clear error messaging (4 hours ago)
- c4a57c6 Add attribution override feature and improve write-off entry display (4 hours ago)
- 0d90653 Fix flow diagram visualization not initializing when trace is complete (4 hours ago)
- 39674c8 Fix report generation issues and improve Technical Audit Trail (28 hours ago)
- 77a65c2 Fix trace completion detection and add navigation options when investigation complete (3 days ago)
- 15138ba Fix hop entry wizard buttons and bridge name display in collapsed view (3 days ago)
- 4941da2 Fix bridge entry handling and ensure consistent treatment across all code paths (3 days ago)
- 8ac514b Fix brown conversion wallets being treated as terminal (4 days ago)
- af50966 Fix bridge conversions being treated as terminal wallets (4 days ago)

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
