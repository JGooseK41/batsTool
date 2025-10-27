# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 09:09)

**Commit:** 9dd698d04a20df2656b8a10c55dfe0d22280f8a1
**Author:** Your Name
**Message:** Phase 2 Implementation - Part 2: 2 More Fixes Complete (5/16 Total)

🎯 LOW FIX #1: Wallet Explorer Cache Invalidation on Clustering (COMPLETE)
✅ Added clearWalletCache() function to remove cached data for specific address
✅ Added clearClusterCache() function to clear cache for all cluster addresses
✅ Cache now cleared when address added to existing cluster
✅ Cache now cleared when new cluster created
✅ Prevents stale data showing for up to 5 minutes after clustering

IMPLEMENTATION (lines 14674-14696, 17577, 17660):
- clearWalletCache(address, blockchain) removes sessionStorage entry
- clearClusterCache(cluster) iterates all cluster addresses and clears each
- Called in createAddressCluster() after adding to existing cluster (line 17577)
- Called in createAddressCluster() after creating new cluster (line 17660)
- Logs cache clearing for debugging

BENEFIT:
Before: Cached wallet data stays for 5 minutes even after clustering
After: Cache immediately cleared when cluster modified
Result: Fresh data shown immediately after clustering changes

---

🎯 MEDIUM FIX #7: Cluster Notation in Hop Entry Documentation (COMPLETE)
✅ Automatically detects when source threads come from clustered addresses
✅ Adds cluster context to entry notes
✅ Documents cluster ID, wallet ID, and address count
✅ Explains methodology implications (PIFO/LIBR)
✅ Creates complete audit trail of cluster usage

IMPLEMENTATION (lines 34297-34323):
- Iterates through selected threads in wizard
- Checks if thread's source wallet is part of cluster
- Calls getClusterForAddress() for each source
- Collects all clustered threads
- Appends cluster notation section to entry notes
- Format: "🔗 CLUSTER SOURCE NOTATION:"
- Lists each cluster with thread ID, wallet ID, address count
- Includes methodology note about cluster behavior

BENEFIT:
Before: No indication in entry notes that source was clustered
After: Complete cluster documentation automatically added
Result: Audit trail shows cluster relationships and methodology compliance

EXAMPLE ENTRY NOTE:
```
PIFO allocation applied: V1-T1: 5/10 BTC

🔗 CLUSTER SOURCE NOTATION:
Thread V1-T1 sources from Cluster cluster-1234567890 (Wallet: Red-1)
  - Cluster contains 3 addresses
  - Methodology: PIFO (cluster acts as single entity)
```

---

PROGRESS: 5/16 Phase 2 Fixes Complete (31.25%)
✅ Medium severity: 3/11 complete (27%)
✅ Low severity: 2/5 complete (40%)

COMPLETED SO FAR:
✅ MEDIUM #1: Thread allocation validation gap
✅ MEDIUM #8: Partial allocation documentation
✅ MEDIUM #7: Cluster notation in hop entry documentation
✅ LOW #3: Bridge transactions marked in reports
✅ LOW #1: Wallet explorer cache invalidation

REMAINING: 11 fixes
- 8 Medium-severity
- 3 Low-severity

Next batch: Cluster transaction source, duplicate detection, undo system

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 197 +++++++++++++++++++++++++++++--------------------------------
 index.html |  59 ++++++++++++++++++
 2 files changed, 151 insertions(+), 105 deletions(-)
```

## Recent Commits History

- 9dd698d Phase 2 Implementation - Part 2: 2 More Fixes Complete (5/16 Total) (0 seconds ago)
- 8803873 Phase 2 Implementation - Part 1: 3 Fixes Complete (3/16) (2 minutes ago)
- 21d9947 Implement High-Priority Fix #3: PIFO Chronological Validation - 100% COMPLETE (12 minutes ago)
- 40b6c36 Implement High-Priority Fixes #1 and #2 - Write-off timing and ART panel for clusters (25 minutes ago)
- 23732b2 Add implementation progress report - Critical fixes complete (30 minutes ago)
- 5c72216 Implement Critical Bugs #1, #2, #3 - Methodology locking, Cluster index, LIBR+Clustering (32 minutes ago)
- 1fff957 Update bug analysis: Remove High #1 and High #5 as correctly implemented features (42 minutes ago)
- 06cbd12 Add cluster view toggle button to visualization UI (2 hours ago)
- 557163f Add Bitcoin clustering visualization support with cluster/individual view toggle (2 hours ago)
- 2cbc687 Enhance Bitcoin address clustering with wallet ID tracking, detailed documentation, cluster-wide viewing, and final report integration (2 hours ago)

## Key Features

- ✅ One-click add to existing hop
- ✅ Auto-detects correct hop from wallet
- ✅ Uses LIBR-calculated traced amount
- ✅ Auto-updates monitored proceeds
- ✅ Timestamped audit trail in notes
- ✅ Option to defer tracing decision
- ✅ **NEW:** Optional verification modal for transparency
- ✅ **NEW:** Prominent methodology selection with info modals
- ✅ Smooth navigation with visual feedback
- ✅ Maintains data integrity

## Integration with LIBR Methodology

**Proper LIBR workflow now complete:**

1. Run LIBR analysis → Find drops
2. Click "Follow & Trace" → Add to hop
3. Monitored amount auto-reduces
4. Re-analyze later → Uses new threshold
5. Find next drops → Add to same hop
6. Repeat until all traced or remains stable

**Hop 1 stays "open" and can receive entries anytime the monitored
wallet has new activity, maintaining proper LIBR accounting.**

## Files Modified

- index.html:
  * Line 35962: Updated displayLIBRAnalysisResults signature
  * Line 35959: Pass walletAddress, blockchain to display
  * Lines 36006-36023: Auto-detect target hop number
  * Lines 36032-36067: Add action buttons to each transaction
  * Lines 36590-36714: LIBR transaction action functions

### Changed Files:
```
 CLAUDE.md  | 273 ++++++++++++++++++++++++++++++++++++++++++++++---------------
 index.html | 176 ++++++++++++++++++++++++++++++++++++++-
 2 files changed, 381 insertions(+), 68 deletions(-)
```

## Recent Commits History

- f85718c Add ability to add LIBR transactions directly to existing hops (1 second ago)
- 5064e3f Implement comprehensive LIBR Monitoring Dashboard (9 minutes ago)
- b454671 Fix LIBR modal display and implement proper iterative LIBR algorithm (9 hours ago)
- cee9bb2 Remove ALL remaining template literals from filter section - COMPLETE FIX (10 hours ago)
- e55e076 Replace all template literals with string concatenation in filter section (10 hours ago)
- cbf5661 Fix template literal syntax error - use string concatenation instead (10 hours ago)
- 65d5419 Fix critical bugs and migrate API keys to environment variables (10 hours ago)
- 96ee49a Add provenance-based visualization filtering with multi-select and saved views (11 hours ago)
- 2035a72 Update CLAUDE.md with latest commit info (25 hours ago)
- 2c960c0 Update CLAUDE.md with latest commit info (25 hours ago)

## Key Features
- **Multi-blockchain support**: Bitcoin, Ethereum, and 30+ EVM chains including Base, Arbitrum, Optimism, Polygon, BNB Chain, Avalanche, Unichain, Sonic, Abstract, Memecore, Sophon, Berachain, plus Tron, XRP, Sui, and Solana
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
