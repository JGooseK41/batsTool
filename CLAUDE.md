# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 21:34)

**Commit:** a19640248ac13217c74435073821171c291a4488
**Author:** Your Name
**Message:** Fix: Only highlight incoming threads, gray out committed outgoing threads

Problem: User reported that outgoing threads were being highlighted in blue/yellow
- Outgoing threads are already committed (traced in previous hop)
- They're not "threads" in the current hop - only become threads when they're incoming in next hop
- User requested: only incoming threads should be yellow/gold, outgoing should be grayed
- Exception: Partially allocated outgoing transactions should remain available

Conceptual Clarification:
A "thread" represents funds you're actively tracing in the CURRENT hop:
- Incoming transaction = Active thread (funds arriving at wallet to trace)
- Outgoing transaction = Already committed (traced in previous hop, will become thread in next hop)

Solution:

**1. Updated Initial Highlighting (lines 16580-16588):**
- Removed blue highlighting for outgoing threads
- ONLY incoming threads get yellow/gold: `(isInvestigationThread && tx.type === 'IN')`
- Outgoing threads will be handled by "used transaction" graying logic

**2. Updated Thread Badges (lines 16634-16641):**
- Only show yellow/gold badge for incoming threads
- Removed blue badge for outgoing threads
- Outgoing threads will show "allocated" badge from used transaction logic

**3. Added Partial Allocation Detection (lines 16655-16666):**
```javascript
const isPartiallyAllocated = isUsedTransaction &&
                            usageInfo.amount &&
                            tx.amount &&
                            Math.abs(usageInfo.amount - tx.amount) > 0.01;

const isCommittedOutgoingThread = isInvestigationThread &&
                                  tx.type === 'OUT' &&
                                  isUsedTransaction &&
                                  !isPartiallyAllocated;
```
- Checks if allocated amount is less than total transaction amount
- Partially allocated transactions remain available (not grayed)

**4. Updated Graying Logic (lines 16678-16690):**
- Added `isCommittedOutgoingThread` to gray-out condition
- Exception: `!isPartiallyAllocated` keeps partial allocations available
- Updated tooltip: "committed in previous hop" vs "allocated"

**5. Protected Partial Allocations (line 16682):**
- Added `&& !isPartiallyAllocated` to prevent graying
- Partially used transactions remain clickable for further allocation

**6. Removed Outgoing Thread Re-highlighting (lines 16687-16696):**
- Deleted blue re-highlighting for outgoing threads
- Only incoming threads get re-highlighted with yellow/gold

Now wallet explorer correctly shows:
✅ Incoming threads: Bright yellow/gold with 🎯 badge
✅ Outgoing committed threads: Grayed out with "committed in previous hop" tooltip
✅ Partially allocated: Remain available (not grayed)
✅ Clear visual distinction between active threads and committed transactions

This matches investigation workflow:
- Hop 1: Victim wallet → Outgoing to Wallet A (create thread for Hop 2)
- Hop 2: Wallet A → Incoming from Hop 1 (yellow/gold) + Outgoing to Wallet B (grayed, committed)
- Hop 3: Wallet B → Incoming from Hop 2 (yellow/gold) + Outgoing to Wallet C (grayed, committed)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 145 ++++++++++++++++++++++++++++---------------------------------
 index.html |  64 ++++++++++++++-------------
 2 files changed, 102 insertions(+), 107 deletions(-)
```

## Recent Commits History

- a196402 Fix: Only highlight incoming threads, gray out committed outgoing threads (1 second ago)
- 3a27c79 UX: Enhanced wallet explorer visibility with table borders and thread highlighting (5 minutes ago)
- d3ba2f9 Fix: Complete migration of ALL remaining nested thread structures (18 minutes ago)
- 02dbede Fix: Hop finalization crash from nested thread structure (69 minutes ago)
- ffa9dc2 Sync CLAUDE.md (75 minutes ago)
- a86e0ff Final CLAUDE.md update (75 minutes ago)
- b35aa18 Update CLAUDE.md timestamp (75 minutes ago)
- 36b3398 Update CLAUDE.md with latest commit info (75 minutes ago)
- 6c99cd4 Feature: Add resizable sidebar to wallet explorer with drag-to-resize (81 minutes ago)
- 5332e67 Fix: Wallet explorer crash from nested thread structure in ART tracking (2 hours ago)

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
