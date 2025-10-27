# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 11:25)

**Commit:** 2874d87b34a012ee53a8b99eaca9b40e2a761bac
**Author:** Your Name
**Message:** Feature: Entry confirmation modal for wallet-by-wallet workflow

✨ MAJOR UX ENHANCEMENT: Build multiple entries without leaving wallet explorer

FEATURE: New confirmation modal when creating entries from wallet explorer

USER REQUEST: "build entries from inside the wallet explorer by having a modal
pop up to confirm the entry creation without closing the wallet explorer or going
back into the hop creation page... this way you could build multiple entries
without leaving the wallet explorer and after each one it could show you your
updated art and available threads"

IMPLEMENTATION:

1. Entry Confirmation Modal (lines 2981-3023):
   - Shows entry preview with all details
   - Displays ART impact (current → change → new ART)
   - Shows available threads for current wallet
   - Two action buttons:
     * "Create & Stay in Explorer" (green)
     * "Create & Return to Hops" (blue)
   - Professional styling with color-coded sections

2. Modal Helper Functions (lines 16809-17094):
   - showEntryConfirmationModal(): Main modal display
   - populateEntryPreview(): Shows entry details in grid
   - calculateAndShowARTImpact(): 3-column ART comparison
   - showAvailableThreadsForWallet(): Grouped by currency
   - confirmEntryAndStay(): Creates entry, refreshes explorer
   - confirmEntryAndReturn(): Creates entry, closes explorer
   - createEntryFromPendingData(): Adds entry to hop

3. Modified writeOffWalletTransaction() (lines 16696-16763):
   - Creates write-off entry data
   - Shows confirmation modal instead of direct creation
   - Removed closeWalletExplorer() call
   - Added writeoffApplied: false flag

4. Modified addWalletTransactionToInvestigation() (lines 16071-16292):
   - Creates trace entry data directly
   - Shows confirmation modal for non-commingling traces
   - Removed premature closeWalletExplorer() call
   - Kept close for victim setup mode only

5. "Create & Stay" Workflow (lines 17005-17034):
   - Creates entry in hop
   - Closes confirmation modal
   - Refreshes transaction table (grays out used transactions)
   - Updates ART tracking panel
   - Shows success notification
   - Keeps wallet explorer open

6. "Create & Return" Workflow (lines 17036-17069):
   - Creates entry in hop
   - Closes confirmation modal
   - Closes wallet explorer
   - Shows success notification
   - Scrolls to hop section

FEATURES:

Entry Preview Section:
- Amount and currency (large, bold)
- Entry type (trace/writeoff/swap/bridge)
- From/to wallets (truncated addresses)
- Blockchain and transaction hash
- Source thread (highlighted)

ART Impact Section:
- Current ART (before)
- Change amount (red if negative)
- New ART (after, red if negative)
- Warning if new ART would be negative

Available Threads Section:
- Grouped by currency
- Shows thread ID and available amount
- Highlights currently selected thread (orange border)
- Shows "No available threads" if exhausted

USER BENEFIT:
✅ Build multiple entries from one wallet without navigation
✅ See ART impact before confirming
✅ See all available threads at a glance
✅ Choose to continue or finish after each entry
✅ Transactions automatically gray out after use
✅ Real-time ART updates after each entry
✅ Smooth, professional workflow
✅ Reduces errors from context switching
✅ Perfect for complex multi-hop investigations

WORKFLOW EXAMPLE:
1. Open wallet 0xabc... from Available Threads
2. See 5 OUT transactions
3. Click "Add to Investigation" on first transaction
4. Modal shows: Entry preview + "ART: 10→9 ETH" + "3 threads available"
5. Click "Create & Stay in Explorer"
6. First transaction grays out, ART updates to 9 ETH
7. Click "Add to Investigation" on second transaction
8. Modal shows: "ART: 9→7 ETH" + "2 threads available"
9. Click "Create & Stay in Explorer"
10. Continue building entries without leaving wallet
11. When done, close wallet explorer manually

TECHNICAL NOTES:
- Global state: pendingEntryData stores entry before confirmation
- Entry IDs calculated: hop.entries.length + 1
- writeoffApplied flag for proper ART timing
- Commingling path unchanged (still uses selector)
- Victim setup mode unchanged (still closes explorer)

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 104 +++++++++------
 index.html | 432 ++++++++++++++++++++++++++++++++++++++++++++++++++++---------
 2 files changed, 440 insertions(+), 96 deletions(-)
```

## Recent Commits History

- 2874d87 Feature: Entry confirmation modal for wallet-by-wallet workflow (0 seconds ago)
- 5b5fc21 Feature: Gray out already-allocated transactions in wallet explorer (45 minutes ago)
- ad37883 Feature: Add info icon with tooltip explaining negative token balances (73 minutes ago)
- d2aa686 Fix: Improve ETH variant filtering to catch Unicode characters (EꓔH) (79 minutes ago)
- 1489539 Fix: Exclude native currency (ETH) from token API to prevent double-counting - CRITICAL BUG #3 (83 minutes ago)
- 25d0eef Auto-sync CLAUDE.md (88 minutes ago)
- 532cfca Sync CLAUDE.md (final) (88 minutes ago)
- 6f8070b Update CLAUDE.md with latest commit info (88 minutes ago)
- 8716015 Fix: Deduplicate transactions to prevent double-counting - CRITICAL BUG #2 (2 hours ago)
- 8447862 Docs: Add comprehensive coverage analysis for internal transaction fix (2 hours ago)

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
