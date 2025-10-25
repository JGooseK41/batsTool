# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-25 07:43)

**Commit:** 5064e3f5b4c8f3a1792b6d6240b9fbaf0806dbc7
**Author:** Your Name
**Message:** Implement comprehensive LIBR Monitoring Dashboard

Adds complete monitoring infrastructure for LIBR methodology, allowing users
to track and re-analyze wallets containing untraced criminal proceeds.

## Core Monitoring Functions (lines 36084-36489)

### getAllMonitoredWallets()
- Scans all hops for entries with type 'libr_wallet_status'
- Returns array of monitored wallets with hop context
- Used throughout dashboard for wallet enumeration

### daysSinceAnalysis() & getMonitoringStatus()
- Calculate freshness of last analysis
- Return color-coded status indicators:
  * ✅ Green (<7 days) - Fresh
  * ⚠️ Orange (7-30 days) - Needs review
  * 🔴 Red (>30 days) - Urgent review needed

### updateMonitoredWallet()
- Updates monitored entry after re-analysis
- Adjusts remainingProceeds based on new traces
- Appends timestamped notes documenting changes
- Saves to storage automatically

### jumpToHopForMonitoredWallet()
- Switches to Hops tab
- Scrolls to specific hop
- Applies highlight-flash animation for 2 seconds
- Smooth user navigation from dashboard to hop

## Dashboard UI (showLIBRMonitoringDashboard)

**Main Features:**
- Full-screen modal with wallet cards
- Each card shows:
  * Wallet address (copyable, monospace)
  * Blockchain and currency
  * Monitored amount (prominently displayed)
  * Last analyzed timestamp with status icon
  * Original deposit vs traced vs remaining breakdown
  * Percentage remaining visualization
- Action buttons per wallet:
  * 🔄 Re-analyze Now - Launch LIBR analysis
  * 📊 View Hop - Jump to hop in investigation
- Summary footer:
  * Total monitored wallets count
  * Total value by currency
  * Wallets needing review count with warning

## Single Wallet Re-analysis

**reanalyzeSingleMonitoredWallet():**
- Launches LIBR balance tracker with current monitored amount as threshold
- Uses last analyzed date as starting point for new analysis
- Opens familiar LIBR modal for transaction selection
- User can add new entries to existing hop directly

## Batch Operations

### reanalyzeAllMonitoredWallets()
**Progress Modal:**
- Shows real-time progress: "Analyzing 0xABC... (2 of 5)"
- Animated progress bar
- Fetches complete transaction history for each wallet
- Runs LIBR analysis with monitored amount as threshold
- Handles errors gracefully per wallet

**Results Collection:**
- Success + New Activity: Transactions to follow found
- Success + Stable: No new outbound transactions
- Failed: Error occurred during analysis

### showBatchResultsSummary()
**Results Modal Sections:**

1. **Summary Cards** (top):
   - New Activity count (orange)
   - Stable count (green)
   - Failed count (red)

2. **Wallets with New Activity** (priority section):
   - Orange highlighted cards
   - Shows new transaction count
   - Total traced amount from new TXs
   - Remaining amount after new traces
   - Buttons: "View Details" and "Add to Hop X"

3. **Stable Wallets** (collapsible):
   - One-line entries
   - "No new activity" badge
   - Balance unchanged confirmation

4. **Failed Analysis** (errors):
   - Red highlighted
   - Error message displayed
   - Helps troubleshoot API issues

## Quick Access Banner (lines 13844-13877)

**Location:** Top of Hops view (only when LIBR method active)

**Conditional Display:**
- Only shows if tracingMethod === 'LIBR'
- Only shows if monitored wallets exist

**Banner Content:**
- Left side:
  * "👁️ LIBR Method Active" header
  * Wallet count and total monitored value
  * Warning if wallets need review
- Right side:
  * "View Monitored Wallets" button
  * "Re-analyze All" button

**Visual Design:**
- Blue gradient background
- Responsive flexbox layout
- Wraps on mobile
- Clear call-to-action

## CSS Animations (lines 803-823)

**@keyframes highlight-flash:**
- Smooth yellow flash animation
- 0% → 25% → 50% → 75% → 100%
- White → Light yellow → Bright yellow → Light yellow → White
- 2-second duration, ease-in-out

**.highlight-flash class:**
- Applied when jumping to hop from dashboard
- Helps user see which hop was navigated to
- Removes automatically after animation

## Integration Points

1. **With existing LIBR analysis:**
   - Re-uses showLIBRBalanceTracker()
   - Passes monitored amount as new threshold
   - Seamless workflow continuation

2. **With hop navigation:**
   - Uses existing switchTab('hops')
   - Scrolls to hop element by ID
   - Highlights with animation

3. **With storage:**
   - Updates investigation.hops entries
   - Calls saveToStorage() after updates
   - Maintains data integrity

## User Workflow

**Scenario: User wants to check monitored wallets**

1. Navigate to Hops tab
2. See banner: "3 wallets monitored (1 needs review)"
3. Click "View Monitored Wallets"
4. Dashboard opens showing all 3 wallets
5. Wallet #1 shows ⚠️ (14 days old)
6. Click "🔄 Re-analyze Now" on Wallet #1
7. LIBR modal opens with new analysis
8. Shows 2 new outbound transactions found
9. User clicks "Add to Hop 1" for first TX
10. Returns to hop view, entry added
11. Dashboard auto-updates monitored amount

**Scenario: Bulk check after 1 month**

1. Click "🔄 Re-analyze All" from banner
2. Progress modal: "Analyzing 3 wallets..."
3. Results summary appears:
   - 1 wallet with new activity 🔔
   - 2 wallets stable ✅
4. Click "Add to Hop 2" for active wallet
5. Manually add transactions to hop
6. Monitored amounts automatically reduced

## Benefits

- ✅ Central location to view all monitored wallets
- ✅ Visual indicators show which need attention
- ✅ One-click re-analysis saves time
- ✅ Batch mode for periodic review
- ✅ Seamless integration with existing workflow
- ✅ No data entry required (auto-updates)
- ✅ Clear visibility of LIBR method status

## Files Modified

- index.html:
  * Lines 36084-36489: LIBR monitoring functions
  * Lines 13844-13877: Hops view banner injection
  * Lines 803-823: CSS highlight-flash animation

### Changed Files:
```
 CLAUDE.md  |  92 ++++++++----
 index.html | 464 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 527 insertions(+), 29 deletions(-)
```

## Recent Commits History

- 5064e3f Implement comprehensive LIBR Monitoring Dashboard (0 seconds ago)
- b454671 Fix LIBR modal display and implement proper iterative LIBR algorithm (9 hours ago)
- cee9bb2 Remove ALL remaining template literals from filter section - COMPLETE FIX (10 hours ago)
- e55e076 Replace all template literals with string concatenation in filter section (10 hours ago)
- cbf5661 Fix template literal syntax error - use string concatenation instead (10 hours ago)
- 65d5419 Fix critical bugs and migrate API keys to environment variables (10 hours ago)
- 96ee49a Add provenance-based visualization filtering with multi-select and saved views (11 hours ago)
- 2035a72 Update CLAUDE.md with latest commit info (25 hours ago)
- 2c960c0 Update CLAUDE.md with latest commit info (25 hours ago)
- eb192ed Add LIBR (Lowest Intermediate Balance Rule) tracing method support (25 hours ago)

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
