# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-25 08:14)

**Commit:** 44cc3038235a831f4e93bb96e6d7552e0dbc3857
**Author:** Your Name
**Message:** Implement multi-thread LIBR with PIFO ordering

Enables proper tracking of multiple criminal proceeds threads entering
the same wallet, with automatic chronological consumption tracking.

Key Features:
- Thread queue structure with PIFO ordering (oldest first)
- Monitor only ONE thread at a time (simplifies LIBR analysis)
- Auto-advance to next thread when current consumed
- Document total values of all threads for accounting
- Backwards compatible with existing single-thread entries

Implementation:
- Enhanced libr_wallet_status structure with threads array
- Added thread management helper functions:
  * ensureThreadStructure() - Auto-migrate old format
  * addThreadToMonitoredWallet() - Add threads chronologically
  * getCurrentMonitoredThread() - Get active monitoring thread
  * reduceCurrentThreadAmount() - Update after tracing
  * checkAndAdvanceToNextThread() - Auto-progress through queue
  * updateMonitoredWalletTotals() - Recalculate aggregates

- Updated LIBR functions to use thread structure:
  * followLIBRTransaction() - Reduce current thread amount
  * reanalyzeSingleMonitoredWallet() - Use current thread threshold
  * reanalyzeAllMonitoredWallets() - Skip consumed wallets
  * getAllMonitoredWallets() - Auto-migrate all entries

- Enhanced monitoring dashboard display:
  * Show full thread queue with status indicators
  * Highlight current thread being monitored
  * Display individual thread amounts and totals
  * Show progress percentage across all threads

Methodology:
LIBR balance analysis applied to ONE thread (current/oldest).
PIFO ordering determines WHICH thread to analyze.
Clean separation prevents complexity of simultaneous tracking.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 561 +++++++++++++++++++++++++++++++++++++++----------------------
 index.html | 332 +++++++++++++++++++++++++++++++++---
 2 files changed, 675 insertions(+), 218 deletions(-)
```

## Recent Commits History

- 44cc303 Implement multi-thread LIBR with PIFO ordering (0 seconds ago)
- f85718c Add ability to add LIBR transactions directly to existing hops (21 minutes ago)
- 5064e3f Implement comprehensive LIBR Monitoring Dashboard (30 minutes ago)
- b454671 Fix LIBR modal display and implement proper iterative LIBR algorithm (10 hours ago)
- cee9bb2 Remove ALL remaining template literals from filter section - COMPLETE FIX (10 hours ago)
- e55e076 Replace all template literals with string concatenation in filter section (10 hours ago)
- cbf5661 Fix template literal syntax error - use string concatenation instead (10 hours ago)
- 65d5419 Fix critical bugs and migrate API keys to environment variables (11 hours ago)
- 96ee49a Add provenance-based visualization filtering with multi-select and saved views (12 hours ago)
- 2035a72 Update CLAUDE.md with latest commit info (25 hours ago)

## LIBR Verification Modal (New Feature - Session 2)

### Overview

Optional transparency feature that displays complete transaction history for LIBR-analyzed wallets, allowing investigators to verify the analysis against block explorer data.

### Purpose

- Provides full transparency into LIBR methodology
- Allows verification against external block explorer records
- Documents all transactions in standard credit/debit format
- Highlights key transactions for easy identification

### How It Works

**Access:** Click "📋 View Verification Details" button in LIBR analysis modal

**Display:**
- Full transaction history from source deposit onwards
- Date/Time, Type, Credit (In), Debit (Out), Running Balance, TX Hash
- Color-coded highlights:
  - 🟢 **Green**: Source thread deposit (criminal proceeds entering wallet)
  - 🟡 **Yellow**: LIBR-identified outbound transactions (new threads)
- Clickable transaction hashes linking to block explorers

**Safety Features:**
- **1000 Transaction Limit**: If wallet has > 1,000 transactions since source deposit:
  - Shows most recent 1,000 transactions
  - Displays warning banner
  - Advises user to obtain full records from block explorer
  - Provides direct links to Etherscan/Blockchain.com

### Implementation (lines 36123-36287)

**`showLIBRVerificationModal()`**
- Accepts: wallet address, balance history, LIBR analysis, proceeds amount/date, currency, blockchain
- Filters history to show only transactions after source deposit
- Identifies source deposits (within 1 minute, 99%+ of amount)
- Identifies LIBR-detected outbound transactions
- Truncates to 1000 if necessary
- Builds table with highlights and block explorer links

**`openLIBRVerificationFromModal()`**
- Helper function called by verification button
- Retrieves data from `window.librVerificationData`
- Opens verification modal

**Data Storage:**
- `window.librVerificationData` stores all analysis data
- Set by `displayLIBRAnalysisResults()` (lines 36120-36129)
- Available throughout LIBR modal session

### Verification Table Columns

| Column | Description |
|--------|-------------|
| Date/Time | Transaction timestamp in local format |
| Type | 📥 Inbound or 📤 Outbound |
| Credit (In) | Amount received (green text) |
| Debit (Out) | Amount sent (red text) |
| Running Balance | Balance after transaction (bold) |
| Transaction Hash | Abbreviated hash with block explorer link 🔗 |

### Block Explorer Links

- **Ethereum/EVM**: https://etherscan.io/tx/{hash}
- **Bitcoin**: https://www.blockchain.com/explorer/transactions/btc/{hash}

### Verification Summary Footer

Shows:
- Total transactions displayed
- Number of source deposits found
- Number of LIBR-identified outbound transactions

### Use Cases

1. **Audit Trail**: Document methodology for court proceedings
2. **Verification**: Cross-check LIBR analysis with manual review
3. **Training**: Demonstrate LIBR methodology to new investigators
4. **Quality Assurance**: Verify analysis before creating threads
5. **Large Wallets**: Identify if full block explorer export needed (>1000 TXs)

### User Control

This is an **optional feature** - investigators choose when to view verification details. Does not interfere with normal LIBR workflow.

---

## Key Features

- ✅ One-click add to existing hop
- ✅ Auto-detects correct hop from wallet
- ✅ Uses LIBR-calculated traced amount
- ✅ Auto-updates monitored proceeds
- ✅ Timestamped audit trail in notes
- ✅ Option to defer tracing decision
- ✅ **NEW:** Optional verification modal for transparency
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
