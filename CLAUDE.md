# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-24 06:41)

**Commit:** eb192ed7eec8f7e8b648924673d8281e93c06f1e
**Author:** Your Name
**Message:** Add LIBR (Lowest Intermediate Balance Rule) tracing method support

Implement complete LIBR methodology as alternative to PIFO, controlled by
investigation.tracingMethod selection during case setup. PIFO behavior
remains completely unchanged when selected.

**Phase 1: Conditional Constraints**
- Made chronological sorting conditional (PIFO only)
- Made chronology validation conditional (PIFO enforces, LIBR optional)
- Allow hop finalization with remaining threads for LIBR
- Add LIBR documentation notes when threads remain unallocated

**Phase 2: API Balance Tracking**
- Added Etherscan API integration for Ethereum transaction history
- Added Blockchain.info API integration for Bitcoin transaction history
- Implemented running balance calculation (UTXO for Bitcoin, account for ETH)
- Created LIBR transaction point finder (identifies when balance drops)
- Added data caching in investigation.librWalletAnalysis

**Phase 3: UI Integration**
- Added LIBR balance analyzer modal with loading states
- Created interactive transaction table with LIBR status indicators
- Added "Analyze Wallet Balance" button in hop wizard (LIBR only)
- Display analysis results with balance drop identification
- Professional UI with color-coded transaction statuses

**Documentation**
- DEMO-PIFO.md: Step-by-step verification PIFO unchanged
- DEMO-LIBR.md: Complete LIBR feature demonstration guide
- API-DATA-FOR-LIBR.md: API capabilities and integration details
- LIBR-IMPLEMENTATION-PLAN.md: Original analysis and blockers
- LIBR-REVISED-IMPLEMENTATION-PLAN.md: Updated plan with automation
- LIBR-IMPLEMENTATION-COMPLETE.md: Final implementation summary
- LIBR-UI-FUNCTIONS.js: Reference implementation code

**Key Features**
- Real-time blockchain balance tracking via public APIs
- Automated identification of first transaction to follow
- Transaction skipping when balance never drops below proceeds
- Flexible hop finalization with LIBR documentation
- Rate limiting and pagination for high-activity wallets
- Complete backwards compatibility with PIFO methodology

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 API-DATA-FOR-LIBR.md                | 504 +++++++++++++++++++++++++
 DEMO-LIBR.md                        | 457 +++++++++++++++++++++++
 DEMO-PIFO.md                        | 225 +++++++++++
 LIBR-IMPLEMENTATION-COMPLETE.md     | 499 +++++++++++++++++++++++++
 LIBR-IMPLEMENTATION-PLAN.md         | 361 ++++++++++++++++++
 LIBR-REVISED-IMPLEMENTATION-PLAN.md | 725 ++++++++++++++++++++++++++++++++++++
 LIBR-UI-FUNCTIONS.js                | 243 ++++++++++++
 index.html                          | 651 ++++++++++++++++++++++++++++++--
 8 files changed, 3629 insertions(+), 36 deletions(-)
```

## Recent Commits History

- eb192ed Add LIBR (Lowest Intermediate Balance Rule) tracing method support (0 seconds ago)
- ad5bf5c Fix getCurrentART to exclude terminal wallets from next hop ART (2 weeks ago)
- d9d1ded Revert "Fix hop auto-close bug when multiple threads are active" (2 weeks ago)
- b9556f9 Fix hop auto-close bug when multiple threads are active (2 weeks ago)
- 2a9a1a2 Update CLAUDE.md with latest commit info (2 weeks ago)
- 93d4bf3 Reposition ART box to appear below T-account instead of above (2 weeks ago)
- d3306b6 Fix hop increment for bridge output convergence - swaps don't create hops (2 weeks ago)
- f75b411 Check same hop for terminal destinations, not future hops (2 weeks ago)
- 0fc3f43 Fix bridge output matching to use startsWith for sourceThreadIds (2 weeks ago)
- a0203ee Fix hopIndex undefined error in forEach loop (3 weeks ago)

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
