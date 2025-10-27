# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 06:42)

**Commit:** 2cbc687befd290af525311887056b5fe41fe1a7a
**Author:** Your Name
**Message:** Enhance Bitcoin address clustering with wallet ID tracking, detailed documentation, cluster-wide viewing, and final report integration

USER REQUIREMENTS ADDRESSED:
1. ✅ Retain wallet ID (Black 2, Yellow 3, etc.) from Universal Wallet Index
2. ✅ Specific detailed documentation explaining when/why wallets added to clusters
3. ✅ User-initiated cluster-wide transaction view (all addresses in one view)
4. ✅ Wallet Cluster Index in final reports for complete audit trail

ENHANCEMENTS IMPLEMENTED:

## 1. Wallet ID Tracking & Retention
- Modified cluster data structure to store:
  * `walletId`: Permanent ID from Universal Wallet Index (e.g., "B-2", "BL-3")
  * `walletLabel`: Human-readable label
  * `walletType`: Wallet type (black, blue, yellow, etc.)
- `createAddressCluster()` automatically finds and stores wallet ID
- Wallet ID prominently displayed in:
  * Cluster monitoring modal (17494-17503)
  * Cluster index report (25462-25465)
  * ART tracking panel
  * Entry notes

## 2. Enhanced Documentation & Timestamping
### Cluster Creation Notes (17346-17411):
- Complete header with all metadata (Date, ClusterID, WalletID, Thread, Currency, Methodology)
- Original vs new address details
- Clustering reason explanation
- PIFO/LIBR methodology implications
- Full audit trail format

### Cluster Update Notes (17320-17333):
- Timestamp header with full date/time
- ACTION field documenting what was done
- WALLET ID retained and displayed
- THREAD context
- NEW ADDRESS added
- AMOUNT being monitored
- REASON for clustering
- METHODOLOGY used
- TOTAL ADDRESSES count

Example Documentation:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 ADDRESS CLUSTER CREATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 DATE/TIME: 10/27/2025, 3:45:12 PM
🆔 CLUSTER ID: cluster-1730058312456
💼 WALLET ID: B-2
🏷️  WALLET LABEL: Black Wallet 2
🎨 WALLET TYPE: BLACK
🧵 THREAD: V1-T1
💰 CURRENCY: BTC
📋 METHODOLOGY: PIFO
...
```

## 3. Cluster-Wide Transaction Viewing
### viewClusterTransactions() Function (17595-17740):
- **User-initiated** (button click, not automatic)
- Fetches transactions from ALL clustered addresses in parallel
- Combines and sorts chronologically
- Marks each transaction with source address:
  * 🏠 Original (first address)
  * 🔄 Change 1, Change 2, etc.
- Displays unified transaction history
- Calculates aggregate balance across cluster
- Shows cluster info banner

### Transaction Table Enhancement (15662):
- Blue badge shows which address transaction came from
- "🏠 Original" or "🔄 Change N" label
- Only visible in cluster view mode

### UI Integration:
- "View All Cluster Transactions" button in monitoring modal (17515-17522)
- Clear description: "Shows combined transaction history from all X clustered addresses"
- Loads in Wallet Explorer with special cluster view mode

## 4. Wallet Cluster Index for Final Reports
### New Report Section (2235-2242):
- "🔗 Wallet Cluster Index (UTXO Address Clustering)"
- Tab button in Wallet Indexes section (2212-2214)
- Orange theme (#ff9800) for cluster-related UI

### generateClusterIndex() Function (25419-25494):
- Summary statistics (total clusters, total addresses)
- Table showing:
  * Cluster ID
  * **Wallet ID** (prominently displayed)
  * Thread
  * Number of addresses
  * Currency
  * Creation date
  * View Details button

### showClusterDetailsInReport() Function (25499-25576):
- Complete cluster modal in report view
- Shows wallet ID and label prominently
- All clustered addresses with labels
- Full cluster documentation
- Monitored amounts for each address
- Methodology implications

## 5. Entry Notes Enhancement (15370-15397):
When creating entries from ART tracker with clustered addresses:
```
Created from Wallet Explorer ART Tracker
Thread: V1-T1
Transaction: abc123...
Amount: 0.5 BTC
Action: trace
Counterparty: bc1q...

🔗 ADDRESS CLUSTERING:
This transaction is from a clustered address.
Cluster ID: cluster-1730058312456
Cluster contains 3 addresses (UTXO change tracking).
PIFO: Dual monitoring - first movement from any clustered address will be tracked.
Cluster addresses:
1. bc1qoriginaladdress...
2. bc1qchangeaddr1...
3. bc1qchangeaddr2...
```

## KEY FEATURES:

✅ **Wallet ID Retention**: Every cluster stores and displays the original wallet ID (Black 2, Yellow 3, etc.)
✅ **Detailed Timestamping**: Every cluster action documented with full date/time
✅ **Comprehensive Notes**: Clear explanations of WHY addresses were clustered
✅ **Audit Trail**: Complete history of cluster creation and modifications
✅ **User-Initiated Viewing**: Cluster-wide view only on explicit user request
✅ **Unified Transaction History**: All cluster addresses shown in single view
✅ **Source Address Labels**: Each transaction marked with which address it came from
✅ **Final Report Integration**: Dedicated Wallet Cluster Index section
✅ **Methodology Awareness**: PIFO/LIBR implications explained in all documentation

## BENEFITS:

**For Investigators:**
✅ Always know which wallet (Black 2, etc.) a cluster belongs to
✅ Complete audit trail with specific timestamps
✅ Easy to review clustering decisions months later
✅ Single view shows all activity across clustered addresses
✅ Clear documentation for legal/compliance purposes

**For Reports:**
✅ Wallet Cluster Index provides complete record
✅ Each cluster links back to Universal Wallet Index
✅ Detailed notes explain clustering rationale
✅ Timestamps prove when decisions were made
✅ Professional formatting for legal proceedings

**For Compliance:**
✅ Every clustering decision fully documented
✅ Clear methodology (PIFO/LIBR) recorded
✅ Timestamps for all actions
✅ Original wallet ID maintained throughout
✅ Complete chain of custody for address relationships

## FILES MODIFIED:
- index.html (lines 17290-17418, 17488-17522, 17595-17740, 15662, 15370-15397,
  2212-2214, 2235-2242, 25386-25576)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 365 +++++++++++++++++++------------------------------
 index.html | 453 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 584 insertions(+), 234 deletions(-)
```

## Recent Commits History

- 2cbc687 Enhance Bitcoin address clustering with wallet ID tracking, detailed documentation, cluster-wide viewing, and final report integration (2 seconds ago)
- bbe846b Implement Bitcoin address clustering for UTXO change to new addresses (9 minutes ago)
- 0bf302e Implement UTXO change detection for Bitcoin wallet explorer (24 minutes ago)
- 780e905 Make Wallet Explorer methodology-aware: PIFO vs LIBR support (34 minutes ago)
- fb1edeb Implement ART (Adjusted Root Total) Tracking in Wallet Explorer (6 hours ago)
- f2cb229 Implement Feature 6: Batch write-offs for multiple threads (7 hours ago)
- f511400 Implement Feature 5: Quick actions from Available Threads modal (7 hours ago)
- c606314 Implement Feature 4: Entry preview before hop finalization (7 hours ago)
- 7ede838 Implement Feature 3: Duplicate transaction detection with comprehensive search (7 hours ago)
- 0788489 Implement Features 1-2: Auto-populate source thread + Smart contract detection (7 hours ago)

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
