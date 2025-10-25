# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-24 22:24)

**Commit:** b454671012df4689f4eb54b5ed0788075561ee82
**Author:** Your Name
**Message:** Fix LIBR modal display and implement proper iterative LIBR algorithm

PART 1: Fixed Template Literal Syntax Errors
- Removed ALL template literals from LIBR section (lines 35548-36020)
- Replaced with string concatenation for browser compatibility
- Fixed 20+ instances in:
  * fetchCompleteTransactionHistory()
  * calculateRunningBalance()
  * findLIBRTransactionPoint()
  * showLIBRBalanceTracker()
  * displayLIBRAnalysisResults()
- Modal now displays correctly

PART 2: Implemented Proper Iterative LIBR Algorithm
Previously: Only found FIRST transaction where balance dropped below proceeds
Now: Properly implements LIBR methodology by:

1. Starting with initial criminal proceeds amount (e.g., $100K)
2. Finding FIRST outbound transaction where balance drops below $100K
3. Calculating how much of the proceeds went into that transaction
4. Creating thread with traced amount
5. Reducing tracked amount to the new balance (e.g., $75K remaining)
6. CONTINUING to monitor for next drop below $75K
7. Repeating until all proceeds traced or determined to remain in wallet

Algorithm Details:
- trackedAmount starts at criminalProceedsAmount
- For each outbound transaction where balance < trackedAmount:
  * Calculate tracedInThisTx = min(tx.amount, trackedAmount - balance)
  * Add transaction to transactionsToFollow array
  * Update trackedAmount = balance (the new threshold)
  * Continue monitoring
- Stops when trackedAmount reaches near-zero or no more drops

UI Improvements:
- Shows ALL transactions that need to be followed (not just first)
- Displays traced amount for each transaction
- Shows remaining proceeds amount in wallet
- Transaction table highlights ALL traced transactions
- Numbered list of transactions to follow in order
- Color-coded: First transaction gets blue border, all get "TRACE" badge

New Return Fields:
- transactionsToFollow: Array of ALL transactions containing proceeds
- totalTransactionsToTrace: Count of transactions to follow
- remainingProceedsInWallet: Amount still in wallet after all drops
- Each transaction includes: txHash, amount, tracedAmount, balanceBefore, balanceAfter

This is the correct LIBR methodology as described by the user.

### Changed Files:
```
 CLAUDE.md  |  94 +++++------------
 index.html | 349 ++++++++++++++++++++++++++++++++-----------------------------
 2 files changed, 211 insertions(+), 232 deletions(-)
```

## Recent Commits History

- b454671 Fix LIBR modal display and implement proper iterative LIBR algorithm (0 seconds ago)
- cee9bb2 Remove ALL remaining template literals from filter section - COMPLETE FIX (23 minutes ago)
- e55e076 Replace all template literals with string concatenation in filter section (32 minutes ago)
- cbf5661 Fix template literal syntax error - use string concatenation instead (37 minutes ago)
- 65d5419 Fix critical bugs and migrate API keys to environment variables (44 minutes ago)
- 96ee49a Add provenance-based visualization filtering with multi-select and saved views (2 hours ago)
- 2035a72 Update CLAUDE.md with latest commit info (16 hours ago)
- 2c960c0 Update CLAUDE.md with latest commit info (16 hours ago)
- eb192ed Add LIBR (Lowest Intermediate Balance Rule) tracing method support (16 hours ago)
- ad5bf5c Fix getCurrentART to exclude terminal wallets from next hop ART (2 weeks ago)

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
