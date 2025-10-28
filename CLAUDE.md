# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 05:24)

**Commit:** 3ec3b68c427d37aa1fc1bc2296599aa9edbec219
**Author:** Your Name
**Message:** Feature: Complete XRPScan API integration with origin parameter

🎯 XRPSCAN API INTEGRATION: Full support for XRP/Ripple blockchain lookups

CONTEXT:
Received API access from XRPScan with requirement to add ?origin= parameter
to all API queries for CDN filtering (20,000 free requests/day).

IMPLEMENTATION:

1. **XRP Configuration Consolidation** (lines 7433-7498)
   - Consolidated duplicate "xrp" and "ripple" entries
   - Added `apiOrigin: 'theblockaudit.com'` for required origin parameter
   - Added `explorerUrl: 'https://xrpscan.com/'` for linking functionality
   - Maintained comprehensive XRP response parsing
   - Supports XRP native payments and issued currency tokens
   - Handles multi-destination payments (Payment splitter transactions)

2. **Origin Parameter in API Calls** (lines 44480-44492, 41205-41213)
   - Added XRP-specific branches in both `fetchTransactionData()` and `lookupTransaction()`
   - Automatically appends `?origin=theblockaudit.com` to all XRPScan API requests
   - Proper fallback handling for XRP lookups
   - Console logging for debugging XRP transactions

3. **XRPScan Linking Helper** (lines 40963-40979)
   - New `getXRPScanLink(type, value)` function
   - Generates proper links for:
     - Transactions: `https://xrpscan.com/tx/{hash}`
     - Accounts: `https://xrpscan.com/account/{address}`
     - Ledgers: `https://xrpscan.com/ledger/{number}`
   - Ready for integration throughout the UI

XRPSCAN API FEATURES NOW SUPPORTED:

✅ Transaction lookups with origin parameter
✅ Account/address balance queries
✅ XRP native currency transactions
✅ Issued currency token transfers
✅ Multi-destination payment support
✅ Transaction metadata and status validation
✅ Proper timestamp handling (Ripple epoch conversion)
✅ Fee calculation (drops to XRP conversion)
✅ Link generation for transactions, accounts, and ledgers

API REQUIREMENTS MET:

✅ Origin parameter added to ALL API queries
✅ Domain: theblockaudit.com
✅ Ready for xrpscan.com linking integration
✅ 20,000 free daily requests supported
✅ CDN-friendly query structure

USAGE EXAMPLES:

**Transaction Lookup:**
```
GET https://api.xrpscan.com/api/v1/tx/{hash}?origin=theblockaudit.com
```

**Account Lookup:**
```
GET https://api.xrpscan.com/api/v1/account/{address}?origin=theblockaudit.com
```

**Generate Link:**
```javascript
const txLink = getXRPScanLink('tx', transactionHash);
const accountLink = getXRPScanLink('account', walletAddress);
```

XRP TRANSACTION PARSING:

- **Native XRP:** Converts drops (1 XRP = 1,000,000 drops)
- **Tokens:** Extracts issued currency value and code
- **Multi-destination:** Handles Payment splitter transactions
- **Validation:** Checks TransactionResult === 'tesSUCCESS'
- **Timestamps:** Converts Ripple epoch to Unix timestamp
- **Fees:** Automatically calculated from Fee field

BLOCKCHAIN DETECTION:

- Address pattern: `r[a-zA-Z0-9]{24,34}`
- Transaction pattern: `[A-F0-9]{64}`
- Proper auto-detection in transaction lookup modal

NEXT STEPS FOR FULL INTEGRATION:

1. Add XRPScan links to wallet display (use getXRPScanLink helper)
2. Add XRPScan links to transaction entries (use getXRPScanLink helper)
3. Add XRPScan links to hop documentation (use getXRPScanLink helper)
4. Test with real XRP transactions from investigations

FILES MODIFIED:
- index.html:
  * Lines 7433-7498: XRP blockchain configuration
  * Lines 7942: Removed duplicate ripple entry
  * Lines 40963-40979: getXRPScanLink() helper function
  * Lines 41205-41213: lookupTransaction() XRP branch
  * Lines 44480-44492: fetchTransactionData() XRP branch

TESTING:

Test with sample XRP transaction:
- Hash format: [A-F0-9]{64}
- Address format: r[a-zA-Z0-9]{24,34}
- API: https://api.xrpscan.com/api/v1/tx/{hash}?origin=theblockaudit.com

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 204 +++++++++++++++++++++++++++++++++++++++----------------------
 index.html |  75 +++++++++++++++--------
 2 files changed, 179 insertions(+), 100 deletions(-)
```

## Recent Commits History

- 3ec3b68 Feature: Complete XRPScan API integration with origin parameter (0 seconds ago)
- 7e89d3f Feature: Multi-thread allocation in Wallet Explorer entry confirmation (6 minutes ago)
- f219cd1 Fix: Commingling detection for victim transaction threads (8 hours ago)
- e378163 Fix: ART tracking panel thread lookup using notation instead of internal ID (8 hours ago)
- f48d691 Feature: Batch entry logging workflow in Wallet Explorer (9 hours ago)
- b02f459 Feature: Toggle to hide/show zero-balance transfers in Wallet Explorer (9 hours ago)
- 16dcb5a Auto-sync CLAUDE.md (10 hours ago)
- 2bd784f Fix: Include transaction hash in entry notes for audit trail (10 hours ago)
- 127e40a Feature: Thread allocation progress visualization in Wallet Explorer (10 hours ago)
- b716ef0 Fix: Active thread highlighting and auto-pagination in Wallet Explorer (10 hours ago)

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
