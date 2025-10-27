# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 06:33)

**Commit:** bbe846b4fcaa36a560dab9c38770b2d6b4295de1
**Author:** Your Name
**Message:** Implement Bitcoin address clustering for UTXO change to new addresses

PROBLEM ADDRESSED:
When Bitcoin change goes to a NEW address (not the same address), it creates a
critical decision point for investigators:
- Is this a payment to a different entity (new thread)?
- OR is this change controlled by the same entity (cluster addresses)?

For PIFO methodology, clustered addresses need DUAL MONITORING to determine
which address "moves first" (Proceeds In First Out).

SOLUTION - COMPLETE ADDRESS CLUSTERING SYSTEM:

## 1. Data Model
- Added `investigation.addressClusters` object to track address relationships
- Each cluster stores:
  * List of addresses
  * Thread ID (original thread)
  * Monitored amounts for each address
  * Methodology-specific tracking notes
  * Creation timestamp and activity log

## 2. UTXO Change Detection Enhancement
- Modified `getBitcoinWalletHistory()` with smart heuristics:
  * Detects non-round amounts (likely change)
  * Identifies smaller outputs in multi-output transactions
  * Flags `potentialNewAddressChange` for user decision
  * Stores complete UTXO context for clustering

## 3. Decision Modal UI
- `showChangeAddressDecision()` - Interactive decision point
- Two clear options:
  * 🆕 Create New Thread - Treat as separate payment
  * 🔗 Cluster Addresses - Link as same entity for dual monitoring
- Shows transaction analysis with heuristic reasoning
- Displays all outputs with change/payment indicators
- Methodology-specific guidance (PIFO vs LIBR)

## 4. Clustering Management Functions
- `createAddressCluster()` - Creates new cluster or adds to existing
- `getClusterForAddress()` - Find cluster containing address
- `removeAddressFromCluster()` - Break clustering relationship
- `showClusterMonitoringView()` - View all clustered addresses
- `displayClustersInWalletExplorer()` - Show active clusters in UI

## 5. Transaction Table Indicators
- Orange badge: "🔗 Potential Change to New Address - Click to Decide"
- Blue badge: "🔗 Clustered (X addresses) - Click for Details"
- Interactive badges open decision/monitoring modals
- Visual distinction from regular payments

## 6. Cluster Monitoring Panel
- Dedicated UI panel in Wallet Explorer
- Shows all active clusters for current thread
- Methodology-specific instructions:
  * PIFO: "Monitoring all addresses to see which moves first"
  * LIBR: "Balance analysis considers all addresses together"
- Quick access to detailed cluster view
- Individual wallet explorer buttons for each address

## 7. Cluster Monitoring View
- Complete cluster details modal
- Shows all addresses with status:
  * 🏠 Original Address (first in cluster)
  * 🔄 Change Address N (subsequent addresses)
- Monitored amounts for each address
- Remove address functionality
- Direct wallet explorer access
- Cluster activity notes with timestamps

## 8. ART Tracking Integration
- Selection list shows cluster membership
- "🔗 From Clustered Address (X addresses)" indicator
- Entry notes include complete clustering context:
  * Cluster ID and address count
  * PIFO/LIBR methodology notes
  * Full list of all clustered addresses
  * Dual monitoring explanation

## PIFO METHODOLOGY SUPPORT:

For PIFO investigations with clustered addresses:
1. **Dual Monitoring**: Both (or all) addresses tracked simultaneously
2. **First Movement Tracking**: Whichever address moves first is traced
3. **Thread Continuity**: Value "remains" in both until one moves
4. **Proper Allocation**: ART tracking accounts for cluster as single unit

Example PIFO Scenario:
```
Thread V1-T1: 1.0 BTC traced to Address A
Address A sends:
  - 0.6 BTC → Address X (Payment)
  - 0.3 BTC → Address B (Change to new address)

USER DECISION: Cluster A + B

RESULT:
- Both Address A and B are monitored for V1-T1
- If Address A moves 0.1 BTC first → Trace from A (0.3 BTC remains in cluster)
- If Address B moves 0.2 BTC first → Trace from B (0.1 BTC remains in cluster)
- Cluster ensures proper PIFO accounting
```

## LIBR METHODOLOGY SUPPORT:

For LIBR investigations with clustered addresses:
- Balance analysis considers all clustered addresses together
- Combined balance determines traceability
- Cluster acts as single "wallet entity" for balance calculations

## KEY FEATURES:

✅ **Smart Detection**: Heuristic analysis flags likely change to new addresses
✅ **User Control**: Investigators make clustering decisions with full context
✅ **Dual Monitoring**: PIFO-compliant tracking of all clustered addresses
✅ **Visual Clarity**: Badges, colors, and indicators throughout UI
✅ **Complete Integration**: Works seamlessly with ART tracking
✅ **Audit Trail**: Comprehensive notes document clustering decisions
✅ **Flexible Management**: Add/remove addresses from clusters anytime
✅ **Methodology Aware**: Adapts behavior for PIFO vs LIBR

## BENEFITS:

**For Bitcoin Investigations:**
✅ Handles complex UTXO scenarios correctly
✅ Prevents thread tracking errors from change to new addresses
✅ Maintains PIFO compliance with dual monitoring
✅ Provides clear decision points for investigators

**For Investigators:**
✅ Clear guidance on change vs payment identification
✅ Transparent clustering process with full explanations
✅ Easy cluster management and monitoring
✅ Complete audit trail for legal/reporting purposes

**For PIFO/LIBR:**
✅ PIFO: Proper "which moves first" tracking
✅ LIBR: Correct balance analysis across clustered addresses
✅ Both: Maintained thread integrity and accurate allocation

## FILES MODIFIED:
- index.html (lines 4801, 16998-17083, 17094-17527, 15592-15603, 15626-15632,
  15175-15183, 15370-15397, 2815-2827, 14872-14873)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 264 +++++++++++++++++++++++++++++++--
 index.html | 495 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 738 insertions(+), 21 deletions(-)
```

## Recent Commits History

- bbe846b Implement Bitcoin address clustering for UTXO change to new addresses (1 second ago)
- 0bf302e Implement UTXO change detection for Bitcoin wallet explorer (15 minutes ago)
- 780e905 Make Wallet Explorer methodology-aware: PIFO vs LIBR support (25 minutes ago)
- fb1edeb Implement ART (Adjusted Root Total) Tracking in Wallet Explorer (5 hours ago)
- f2cb229 Implement Feature 6: Batch write-offs for multiple threads (7 hours ago)
- f511400 Implement Feature 5: Quick actions from Available Threads modal (7 hours ago)
- c606314 Implement Feature 4: Entry preview before hop finalization (7 hours ago)
- 7ede838 Implement Feature 3: Duplicate transaction detection with comprehensive search (7 hours ago)
- 0788489 Implement Features 1-2: Auto-populate source thread + Smart contract detection (7 hours ago)
- 2398a4f Final sync CLAUDE.md (7 hours ago)

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
