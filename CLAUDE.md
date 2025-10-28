# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 13:17)

**Commit:** 5b66f89ef46f21e8d065318c44d230b84f8693f5
**Author:** Your Name
**Message:** Fix: Bridge tracing with undefined transaction hash

Fixes critical bug preventing bridge transaction tracing through Bridgers and other bridge providers.

## BUG: Transaction Hash Undefined in Bridge Query

**Problem**: When tracing through bridges, getting error:
```
Error querying Bridgers API: TypeError: Cannot read properties of undefined (reading 'toLowerCase')
    at queryBridgersAPI (?app=true:8284:44)
```

**Root Cause**: Field name mismatch between entry creation and bridge query
- Entries created with: `transactionHash` (line 16651)
- Bridge function looking for: `txHash` (line 8704)
- Result: `entry.txHash` was undefined → API query failed

## FIX IMPLEMENTED:

**Enhanced autoTraceBridge() function** (lines 8703-8724):
- Added transaction hash extraction with fallback:
  ```javascript
  const txHash = entry.transactionHash || entry.txHash;
  ```
- Added validation to catch missing hash early:
  ```javascript
  if (!txHash) {
      throw new Error('Transaction hash not found in entry');
  }
  ```
- Now works with both field names for compatibility

**Affected Bridge Providers**:
- ✅ Bridgers (primary use case)
- ✅ LayerZero
- ✅ Stargate
- ✅ Wormhole
- ✅ Synapse

## WHY THE INCONSISTENCY:

**Entry Creation** (line 16651):
```javascript
const traceEntry = {
    // ... other fields
    transactionHash: tx.hash,  // ← Uses transactionHash
    // ...
};
```

**Bridge Query** (before fix):
```javascript
bridgeData = await queryBridgersAPI(entry.fromWallet, entry.txHash);  // ← Was looking for txHash
```

## IMPACT:

**Before**:
- ❌ Bridge tracing completely broken
- ❌ "Trace Bridge" button causes JavaScript error
- ❌ Cannot query Bridgers/LayerZero/etc APIs
- ❌ Investigation blocked at bridge transactions

**After**:
- ✅ Bridge tracing works for all providers
- ✅ Transaction hash properly passed to API
- ✅ Supports both field names for robustness
- ✅ Clear error if hash truly missing

## FILES MODIFIED:
- index.html:
  * Lines 8703-8724: Enhanced bridge transaction hash extraction

## TESTING:
1. Create hop entry from Wallet Explorer
2. Detect Bridgers bridge transaction
3. Click "Trace Bridge" → ✅ Now queries API with correct hash
4. Bridge data retrieved and displayed

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 180 ++++++++++++++++++++++++++++++-------------------------------
 index.html |  19 ++++---
 2 files changed, 101 insertions(+), 98 deletions(-)
```

## Recent Commits History

- 5b66f89 Fix: Bridge tracing with undefined transaction hash (0 seconds ago)
- fd8d8fa UX: Remove redundant confirmation popups in setup and entry phases (15 minutes ago)
- 9524dae Critical Fix: Write-off and cold storage thread allocation (22 minutes ago)
- 0638d63 Feature: Court-ready clustering documentation with justification and source/destination tracking (7 hours ago)
- 0d51afe Critical: Apply Ethereum-level data validity across ALL blockchains (7 hours ago)
- a78a36e Feature: Comprehensive blockchain integration across all 35+ chains (8 hours ago)
- 4cee3c6 Complete: Full XRP integration across all B.A.T.S. features (8 hours ago)
- c36bcf7 Update XRPScan API origin parameter to Batstool.com (8 hours ago)
- 3ec3b68 Feature: Complete XRPScan API integration with origin parameter (8 hours ago)
- 7e89d3f Feature: Multi-thread allocation in Wallet Explorer entry confirmation (8 hours ago)

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
