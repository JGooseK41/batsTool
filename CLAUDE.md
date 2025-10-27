# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 19:33)

**Commit:** 127e40ae942c49291361b84c2e0db761f0896dd6
**Author:** Your Name
**Message:** Feature: Thread allocation progress visualization in Wallet Explorer

✨ UX ENHANCEMENT: Real-time visual feedback for thread consumption

USER REQUEST: "how can we make it easier to show the user the progression
of thread assignment while they are in the wallet explorer? If I have 2
threads coming into a wallet, one for 50 and another for 150, i may just
want to stay in that wallet explorer view until i have traced out 200. I
may select a 2 transaction as write off and I should see that the 1st
thread now is down to 48 then i can assign to an outbound transaction of
75 which would consume the rest of that 1st thread and a portion of the
2nd. I should be able to see that the 1st thread is fully allocated and
what remains of the second."

IMPLEMENTATION:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEW FEATURE: Thread Allocation Progress Panel

Added visual progress tracking panel in Wallet Explorer that shows:
- All threads entering the current wallet
- Original amount vs available amount for each thread
- Visual progress bars showing allocation percentage
- Color-coded status indicators
- Real-time updates after each entry creation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTS ADDED:

1. HTML Panel (lines 2855-2864):
   - Thread Progression container
   - Blue gradient background with visual hierarchy
   - Positioned between Source Thread Info and Selection Summary

2. displayThreadProgression() Function (lines 15108-15259):
   - Finds all threads for current wallet + selected currency
   - Calculates consumption metrics per thread:
     * Original total amount
     * Amount consumed
     * Amount remaining
     * Percentage allocated
   - Generates visual progress bars with color coding:
     * 🟢 Green = Available (0% consumed)
     * 🟠 Orange = In Progress (partial consumption)
     * ⚪ Gray = Fully Allocated (100% consumed)
   - Shows summary totals when multiple threads present

3. Integration Points:
   - Called from initializeARTTracking() (line 15414)
   - Auto-updates when creating entries via confirmEntryAndStay()
   - Refreshes when selecting different assets
   - Updates in real-time as threads are consumed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VISUAL DESIGN:

Each Thread Card Shows:
┌─────────────────────────────────────────────────────┐
│ ⚡ V1-T1  [In Progress]     Available: 48 / 50 BTC │
│ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░  96% allocated            │
│ Consumed: 48 BTC          Remaining: 2 BTC         │
└─────────────────────────────────────────────────────┘

Summary (Multiple Threads):
┌─────────────────────────────────────────────────────┐
│ TOTAL (2 threads)            Combined Progress      │
│ 127 / 200 BTC                   63.5% allocated     │
└─────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

USAGE SCENARIO (User's Example):

Starting State:
- Thread V1-T1: 50 BTC (available)
- Thread V2-T1: 150 BTC (available)
- Total: 200 BTC to trace

After 2 BTC Write-Off:
✓ Panel updates immediately
- Thread V1-T1: 48 / 50 BTC (4% allocated)
- Thread V2-T1: 150 / 150 BTC (0% allocated)

After 75 BTC Trace:
✓ Panel updates immediately
- Thread V1-T1: 0 / 50 BTC (100% allocated) ✓
- Thread V2-T1: 127 / 150 BTC (15.3% allocated) ⚡

User can see at a glance:
- First thread fully consumed
- Second thread partially allocated
- 127 BTC still available to trace

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEHAVIOR:

✅ Shows all threads entering the wallet (not just source thread)
✅ Updates in real-time after each entry creation
✅ Works with "Create & Stay in Explorer" workflow
✅ Handles single or multiple threads
✅ Color-coded for instant visual feedback
✅ Shows both individual and aggregate progress
✅ Persists across asset selection changes
✅ Automatically hidden when no threads present

BENEFITS:

- Eliminates need to close/reopen wallet explorer to check progress
- Provides immediate visual feedback on thread consumption
- Helps investigators efficiently allocate threads wallet-by-wallet
- Clear indication when threads are fully consumed
- Summary view for complex multi-thread scenarios

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 165 ++++++++++++++++++++++++++++++++++--------------------------
 index.html | 167 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 261 insertions(+), 71 deletions(-)
```

## Recent Commits History

- 127e40a Feature: Thread allocation progress visualization in Wallet Explorer (0 seconds ago)
- b716ef0 Fix: Active thread highlighting and auto-pagination in Wallet Explorer (12 minutes ago)
- f1ad696 Fix: Incorrect incomplete history warning in Wallet Explorer (20 minutes ago)
- 9982aee Enhancement: Add labels and total volume to asset cards in Wallet Explorer (23 minutes ago)
- a1e1795 Auto-sync CLAUDE.md (28 minutes ago)
- 9b04c73 Remove redundant Quick Trace button from Available Threads modal (29 minutes ago)
- 0f487ff Fix: Wallet Explorer now works with finalized hop notation (2 hours ago)
- 4b2fb46 Fix: Quick Trace button now works with new entry confirmation workflow (2 hours ago)
- dc1b7bc Auto-sync CLAUDE.md (8 hours ago)
- 2874d87 Feature: Entry confirmation modal for wallet-by-wallet workflow (8 hours ago)

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
