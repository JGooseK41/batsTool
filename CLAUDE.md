# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 21:16)

**Commit:** d3ba2f933ba172e67d34ef3d4e6004d48f648b20
**Author:** Your Name
**Message:** Fix: Complete migration of ALL remaining nested thread structures

Problem: User kept hitting nested structure crashes at every step of the investigation workflow. We were fixing reactively, one crash at a time. User requested proactive scan to find and fix ALL remaining instances.

Comprehensive Search Results:
Found 5 more critical functions still using nested structure:
1. calculateTotalAssignedAmount (line 11268)
2. displayThreadProgression (line 15717)
3. viewAvailableThreads (line 23406)
4. bulkWriteOffThreads (line 24391)
5. validateHopForFinalization (line 30079)

All used pattern:
```javascript
availableThreads[currency][threadId]
```

Solution: Migrated ALL 5 functions to flat structure

**1. calculateTotalAssignedAmount (lines 11268-11286)**
Before: `Object.values(investigation.availableThreads[currency])`
After: Iterate all threads, filter by currency
```javascript
for (const internalId in investigation.availableThreads) {
    const thread = investigation.availableThreads[internalId];
    if (!thread || thread.currency !== currency) continue;
```

**2. displayThreadProgression (lines 15717-15734)**
Before: `investigation.availableThreads[selectedCurrency]`
After: Iterate all threads, filter by currency AND wallet
```javascript
if (thread.currency === selectedCurrency &&
    thread.sourceWallet === walletAddress)
```

**3. viewAvailableThreads (lines 23405-23432)**
Before: `availableThreads[currency][sourceId]`
After: Search for thread by notation + currency match
```javascript
for (const internalId in availableThreads) {
    if (t.notation === sourceId && t.currency === currency)
```

**4. bulkWriteOffThreads (lines 24400-24408)**
Before: `availableThreads[currency][threadId]`
After: Search for thread by notation + currency match

**5. validateHopForFinalization (lines 30094-30110)**
Before: `investigation.availableThreads[currency][threadId]`
After: Search for thread by notation + currency match

Impact: These functions are called during:
- Thread availability calculations ✓
- Wallet explorer thread progression display ✓
- View available threads modal ✓
- Bulk write-off operations ✓
- Hop finalization validation ✓

Now the ENTIRE investigative workflow should work without hitting nested structure crashes:
1. Add victim transactions ✓
2. Confirm root total ✓
3. Create hop ✓
4. View available threads ✓
5. Open wallet explorer ✓
6. Create trace entries ✓
7. Finalize hop ✓
8. Create next hop ✓
9. Repeat for multi-hop traces ✓

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 84 +++++++++++++++++++++++++++++++++++++++++++++++++++-----------
 index.html | 79 ++++++++++++++++++++++++++++++++++++++--------------------
 2 files changed, 121 insertions(+), 42 deletions(-)
```

## Recent Commits History

- d3ba2f9 Fix: Complete migration of ALL remaining nested thread structures (1 second ago)
- 02dbede Fix: Hop finalization crash from nested thread structure (51 minutes ago)
- ffa9dc2 Sync CLAUDE.md (57 minutes ago)
- a86e0ff Final CLAUDE.md update (57 minutes ago)
- b35aa18 Update CLAUDE.md timestamp (57 minutes ago)
- 36b3398 Update CLAUDE.md with latest commit info (58 minutes ago)
- 6c99cd4 Feature: Add resizable sidebar to wallet explorer with drag-to-resize (63 minutes ago)
- 5332e67 Fix: Wallet explorer crash from nested thread structure in ART tracking (84 minutes ago)
- a0e9406 Fix: Transaction list not displaying when asset selected in wallet explorer (2 hours ago)
- e5faf43 Fix: Hop validation showing incorrect "Threads need allocation" warning (2 hours ago)

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
