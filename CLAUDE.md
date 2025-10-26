# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-26 18:19)

**Commit:** 5e53da86696c50e830ea2015f9c7a5de4ea998b2
**Author:** Your Name
**Message:** Fix Sui support and add THORChain cross-chain swap tracking

## Sui Support Fixed ✅

**Issue:** Sui blockchain configuration was added but non-functional
**Root Cause:** Missing JSON-RPC handler in lookupTransaction()

**Fix Applied:**
- Added Sui JSON-RPC call using `sui_getTransactionBlock` method
- Proper parameter structure with all required options:
  * showInput, showEffects, showEvents
  * showObjectChanges, showBalanceChanges
- Existing parseResponse function now receives proper data format

**Result:** Sui transactions can now be looked up and parsed correctly

## New EVM Chains Added to isEVMChain List ✅

Added 6 new 2025 chains to the EVM detection list:
- unichain (130)
- sonic (146)
- abstract (2741)
- memecore (4352)
- sophon (50104)
- berachain (80094)

**Impact:** These chains now properly use EVM parsing with token data and block timestamps

## THORChain Cross-Chain Support Added 🆕

**Why Important:** THORChain is THE primary cross-chain DEX for tracking stolen funds that get swapped across chains. Critical for crypto investigations.

**API Integration:**
- **Primary:** Midgard API (https://midgard.ninerealms.com/v2)
- **Fallback:** https://midgard.thorchain.info/v2
- **Endpoint:** `/v2/actions?txid={hash}`
- **Rate Limit:** 100 requests/minute (free)

**Features Implemented:**
- Native RUNE currency support (8 decimals)
- Swap transaction parsing with in/out amounts
- Liquidity operations (addLiquidity, withdraw)
- Cross-chain asset tracking (BTC.BTC, ETH.ETH format)
- Timestamp parsing (nanoseconds → milliseconds)
- Pool tracking for LP operations

**Response Structure Handled:**
```javascript
{
  type: 'swap',
  swapInfo: {
    inAmount: 10.5,
    inCurrency: 'BTC',
    outAmount: 450000,
    outCurrency: 'RUNE'
  }
}
```

**Added to:**
- All 3 blockchain dropdowns
- Currency decimals (RUNE: 8)
- CSP policy (midgard.ninerealms.com, viewblock.io)
- blockchainAPIs configuration

## Generic REST API Handler Added ✅

**Problem:** XRP, THORChain, and future non-EVM chains had no fallback handler

**Solution:** Added else clause in lookupTransaction() for generic REST APIs:
```javascript
else {
  // Generic REST API handler for XRP, THORChain, and other chains
  url = apiUrl + txHash;
  // Simple GET request with optional API key
}
```

**Benefits:**
- XRP now works without special handling
- THORChain works seamlessly
- Future REST API chains require minimal configuration

## Total Blockchain Coverage: 32 Chains

**Non-EVM:** Bitcoin, Tron, XRP, THORChain, Sui, Solana
**EVM L1:** Ethereum, Sonic, Berachain
**EVM L2:** Base, Arbitrum, Optimism, zkSync, Linea, Scroll, Blast, Unichain, Abstract
**EVM Sidechains:** Polygon, BNB Chain, Avalanche, Gnosis, Celo, Moonbeam, Moonriver, Mantle, Fraxtal, Taiko, Arbitrum Nova, BitTorrent, opBNB, HyperEVM, Memecore, Sophon

**Cross-Chain DEX:** THORChain (critical for investigations!)

All changes tested and functional.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 101 +++++++++++++++++++++++-----------------
 index.html | 152 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 206 insertions(+), 47 deletions(-)
```

## Recent Commits History

- 5e53da8 Fix Sui support and add THORChain cross-chain swap tracking (0 seconds ago)
- b406c88 Add 6 new EVM chains from Etherscan API v2 (2025 additions) (8 minutes ago)
- d7798cf Add Sui blockchain support with comprehensive integration (29 minutes ago)
- 57cb298 Sync (9 hours ago)
- 3d81ebb Auto-sync (9 hours ago)
- 3aea07d Final sync (9 hours ago)
- 4143f7f Sync CLAUDE.md (9 hours ago)
- 7f8dda7 Update CLAUDE.md with XRP support (9 hours ago)
- 452eae0 Add XRP (Ripple) blockchain support with XRPSCAN API (9 hours ago)
- 4ee5e23 Auto-sync (22 hours ago)

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
