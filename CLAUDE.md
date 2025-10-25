# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Work Session (2025-10-25)

**Topic:** Multi-Thread LIBR with PIFO Ordering

Implemented comprehensive multi-thread support for LIBR monitored wallets, allowing proper tracking of multiple criminal proceeds threads entering the same wallet with chronological (PIFO) consumption tracking.

## Multi-Thread LIBR Implementation

### Overview

When multiple criminal proceeds threads enter the same wallet, the system now:
1. **Tracks all threads** in chronological order (PIFO: Proceeds In, First Out)
2. **Monitors only the oldest unconsumed thread** at any given time
3. **Auto-advances** to the next thread when current is fully consumed
4. **Documents total values** of all threads for proper accounting

### Key Principle: LIBR + PIFO Integration

**LIBR methodology** (balance drop detection) is applied to **ONE thread at a time**.
**PIFO ordering** determines **WHICH thread** to monitor (always the oldest unconsumed).

This prevents the complexity of trying to track multiple threads simultaneously while maintaining proper chronological consumption tracking.

### Enhanced libr_wallet_status Structure

```javascript
{
    type: 'libr_wallet_status',
    walletAddress: '0xABC...',
    blockchain: 'ethereum',
    currency: 'USDT',

    // Thread queue (chronologically ordered - oldest first)
    threads: [
        {
            notation: 'V1-T1',                // Thread identifier
            depositTimestamp: 1698765432000,  // When thread entered wallet
            originalAmount: 50000,            // Initial thread value
            remainingAmount: 25000,           // Current remaining value
            status: 'consumed',               // consumed | monitoring | pending
            depositTxHash: '0x123...'         // Transaction that deposited thread
        },
        {
            notation: 'V2-T1',
            depositTimestamp: 1698765500000,
            originalAmount: 30000,
            remainingAmount: 30000,
            status: 'monitoring',             // Currently being monitored
            depositTxHash: '0x456...'
        },
        {
            notation: 'V3-T1',
            depositTimestamp: 1698765600000,
            originalAmount: 20000,
            remainingAmount: 20000,
            status: 'pending',                // Waiting for V2-T1 to be consumed
            depositTxHash: '0x789...'
        }
    ],

    currentThreadIndex: 1,  // Index of thread being monitored (V2-T1)

    // Aggregate totals for accounting
    totalOriginalProceeds: 100000,   // Sum of all thread original amounts
    totalRemainingProceeds: 75000,   // Sum of all thread remaining amounts
    totalConsumed: 25000,            // Total consumed across all threads

    // Legacy fields (maintained for backwards compatibility)
    remainingProceeds: 75000,        // = totalRemainingProceeds
    originalProceeds: 100000,        // = totalOriginalProceeds

    lastAnalyzed: '2025-10-25T...',
    notes: '...'
}
```

### New Helper Functions (lines 36713-36910)

**`ensureThreadStructure(monitoredEntry)`**
- Migrates old single-thread format to new multi-thread structure
- Called automatically on all monitored entries
- Preserves backwards compatibility with existing data

**`addThreadToMonitoredWallet(monitoredEntry, threadData)`**
- Adds new thread to wallet's thread queue
- Inserts in chronological order (PIFO)
- Sets status to 'pending' (monitored when older threads consumed)

**`getCurrentMonitoredThread(monitoredEntry)`**
- Returns the thread currently being monitored
- Used by LIBR analysis to get threshold amount

**`reduceCurrentThreadAmount(monitoredEntry, amountTraced)`**
- Reduces current thread's remaining amount after tracing
- Updates aggregate totals
- Auto-calls `checkAndAdvanceToNextThread()`

**`checkAndAdvanceToNextThread(monitoredEntry)`**
- Checks if current thread is consumed (< 0.000001)
- Marks thread as 'consumed'
- Finds next 'pending' thread in chronological order
- Advances currentThreadIndex and sets new thread to 'monitoring'
- Adds audit note about thread advancement

**`updateMonitoredWalletTotals(monitoredEntry)`**
- Recalculates aggregate values from all threads
- Updates totalOriginalProceeds, totalRemainingProceeds, totalConsumed
- Maintains legacy fields for backwards compatibility

### Updated Functions

**`followLIBRTransaction()` (lines 36595-36681)**
- Uses `reduceCurrentThreadAmount()` instead of direct assignment
- Includes thread notation in trace notes
- Creates monitored entry with thread structure if it doesn't exist

**`reanalyzeSingleMonitoredWallet()` (lines 36276-36308)**
- Gets current thread via `getCurrentMonitoredThread()`
- Uses **current thread's remaining amount** as LIBR threshold
- Alerts if all threads consumed

**`reanalyzeAllMonitoredWallets()` (lines 36465+)**
- Skips wallets where all threads consumed
- Analyzes only current thread for each wallet
- Reports skipped wallets in results

**`getAllMonitoredWallets()` (lines 36187-36211)**
- Calls `ensureThreadStructure()` on all entries
- Ensures all old entries migrated to new format

### Monitoring Dashboard Display (lines 36357-36440)

Each wallet card now shows:

**Thread Queue Section:**
- All threads in chronological order
- Status indicator: ✅ Consumed | 👁️ Monitoring | ⏳ Pending
- Highlight current thread with yellow background
- Show remaining/original amounts for each thread
- Note: "Currently monitoring this thread (PIFO: oldest first)"

**Total Values Section:**
- Total Original Proceeds (sum of all threads)
- Total Consumed (sum of consumed amounts)
- Total Remaining (sum of remaining amounts)
- Progress percentage

**Current Thread Indicator:**
- Green box showing which thread is being analyzed
- Amount remaining in that thread
- Or "All threads consumed" if none remain

### Workflow Example: Multiple Threads in Same Wallet

**Scenario:** Wallet 0xABC receives three criminal proceeds deposits

**Step 1: First Thread Arrives**
```
V1-T1: 50,000 USDT deposited at timestamp 1000
→ Created as monitoring thread
→ LIBR threshold: 50,000 USDT
```

**Step 2: Second Thread Arrives While First Still Being Traced**
```
V2-T1: 30,000 USDT deposited at timestamp 2000
→ Added to thread queue as 'pending'
→ LIBR still monitoring V1-T1 (ignore V2-T1 for now)
→ Total in wallet: 80,000 USDT
→ Monitoring: 50,000 USDT (V1-T1 only)
```

**Step 3: Third Thread Arrives**
```
V3-T1: 20,000 USDT deposited at timestamp 3000
→ Added to queue as 'pending'
→ Total in wallet: 100,000 USDT
→ Still monitoring V1-T1 only
```

**Step 4: Trace V1-T1 Activity**
```
User traces 25,000 USDT from V1-T1
→ V1-T1 remaining: 25,000 USDT
→ Total remaining: 75,000 USDT
→ Still monitoring V1-T1 (not consumed yet)
```

**Step 5: V1-T1 Fully Consumed**
```
User traces final 25,000 USDT from V1-T1
→ V1-T1 remaining: 0 (consumed)
→ Auto-advance to V2-T1
→ V2-T1 status: 'pending' → 'monitoring'
→ New LIBR threshold: 30,000 USDT (V2-T1 amount)
→ Audit note: "Advanced to thread V2-T1 (30,000 USDT) after V1-T1 fully consumed"
```

**Step 6: Continue with V2-T1**
```
LIBR analysis now checks balance drops below 30,000 USDT
Ignores V3-T1 until V2-T1 consumed
```

### Benefits

✅ **Proper PIFO ordering** - Oldest thread consumed first, automatically
✅ **Clear methodology** - LIBR applied to one thread, PIFO chooses which
✅ **Complete accounting** - Total values documented alongside individual threads
✅ **Auto-advancement** - System progresses through threads without manual intervention
✅ **Backwards compatible** - Old single-thread entries auto-migrate
✅ **Audit trail** - Thread advancement logged with timestamps

### Technical Notes

- Thread status transitions: `pending` → `monitoring` → `consumed`
- Only ONE thread has `monitoring` status at a time
- `currentThreadIndex` always points to the monitoring thread
- Legacy fields (`remainingProceeds`, `originalProceeds`) maintained = totals
- Threshold for LIBR = current thread's `remainingAmount`, not total balance

---

## Previous LIBR Implementation (2025-10-25 07:53)

**Commit:** f85718cc15f0e1fbcc25e93860f2aa538aaa048f

## New Action Buttons in LIBR Modal (lines 36062-36065)

Each transaction in the "Transactions to Follow" section now has:

**✅ Follow & Trace** (Primary button)
- Adds transaction as outbound entry to the source hop
- Uses traced amount (not full TX amount) per LIBR calculation
- Auto-updates monitored wallet entry with reduced proceeds
- Closes modal and jumps to hop with highlight animation
- Shows success notification

**👁️ Monitor Only** (Secondary button)
- Adds note to monitored wallet about identified transaction
- Doesn't create hop entry (user can trace later)
- Useful for documenting but deferring tracing decisions
- Only shown if wallet already has monitored entry

## Transaction Data Context (lines 36033-36049)

Each action button receives complete context:
- TX Hash, timestamp, amounts (full and traced)
- Balance before/after transaction
- Wallet address (source)
- Blockchain and currency
- Hop number (auto-detected from monitored entries)
- Remaining proceeds in wallet

Auto-detects target hop by finding which hop has a libr_wallet_status
entry for this wallet address.

## followLIBRTransaction() Function (lines 36595-36676)

**Creates outbound entry:**
```javascript
{
  type: 'outbound',
  txHash: '0x...',
  amount: tracedAmount,  // LIBR calculated amount, not full TX
  fromWallet: walletAddress,
  notes: 'LIBR: Traced X from monitored wallet. Balance dropped to Y'
}
```

**Updates or creates monitored entry:**
- Reduces remainingProceeds to new balance
- Adds timestamped note: "[Date] Traced X via TX..."
- Creates entry if first time tracing from this wallet

**User feedback:**
- Saves to storage
- Refreshes hop display
- Closes LIBR modal
- Shows success notification
- Jumps to hop with highlight animation

## markAsMonitoredOnly() Function (lines 36679-36711)

**Alternative action for deferring trace:**
- Finds monitored wallet entry
- Appends note: "Identified but not traced: X in TX..."
- Doesn't create hop entry
- Allows user to document findings without committing to trace
- Useful for large transactions needing approval or complex decisions

## Updated displayLIBRAnalysisResults() (line 35962)

Now accepts walletAddress and blockchain parameters to:
- Find which hop the wallet belongs to
- Pass context to action buttons
- Enable auto-detection of target hop

## Workflow Example

**User traces wallet 0xABC... in Hop 1:**

1. Hop 1 has libr_wallet_status for 0xABC... (100K monitored)
2. User clicks "Re-analyze" from monitoring dashboard
3. LIBR analysis finds 2 outbound transactions:
   - TX #1: Traced 25K (balance drops to 75K)
   - TX #2: Traced 30K (balance drops to 45K)
4. User clicks "✅ Follow & Trace" on TX #1
5. System:
   - Adds outbound entry to Hop 1 (25K amount)
   - Updates monitored: 100K → 75K remaining
   - Adds note with timestamp
6. Modal closes, jumps to Hop 1
7. User sees new entry highlighted
8. Monitored wallet now shows 75K (was 100K)
9. Banner updates: "1 wallet monitored containing 75K"

**Later, user clicks "Re-analyze" again:**

1. LIBR runs with 75K threshold (not 100K)
2. Finds TX #2 still needs tracing
3. User clicks "✅ Follow & Trace"
4. System adds to SAME Hop 1
5. Monitored: 75K → 45K remaining

**Result:** All entries stay in Hop 1 (same source wallet), monitored
amount correctly tracks remaining proceeds.

## Key Features

- ✅ One-click add to existing hop
- ✅ Auto-detects correct hop from wallet
- ✅ Uses LIBR-calculated traced amount
- ✅ Auto-updates monitored proceeds
- ✅ Timestamped audit trail in notes
- ✅ Option to defer tracing decision
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
