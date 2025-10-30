# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-30 10:47)

**Commit:** 5763f21dfaac7744ea768bbf3984c4fa07470e7d
**Author:** Your Name
**Message:** UX: Replace single amount filter with separate min/max inputs

Problem: User put "0.06" in amount field and "0.07" in address field,
thinking they were separate min/max inputs. This caused all transfers
to be filtered out (no addresses contain "0.07").

Root Cause: Single amount filter field with range syntax "0.06-0.07"
was not intuitive. Users expected separate min/max inputs for range filtering.

Solution: Split amount filter into two separate number inputs

## Changes:

### 1. New Min/Max Input Fields (Lines 2656-2666)
- Replaced single "Filter by Amount" text input
- Added "Amount Range" label with two number inputs:
  - transferAmountMin: Minimum amount (placeholder: "Min (e.g., 0.06)")
  - transferAmountMax: Maximum amount (placeholder: "Max (e.g., 0.07)")
- Visual layout: [Min] to [Max] with "to" text between
- Both inputs trigger filterTransfers() on input

### 2. Updated Filter Logic (Lines 50805-50818)
- Reads from transferAmountMin and transferAmountMax fields
- Treats empty min as -Infinity (no lower bound)
- Treats empty max as Infinity (no upper bound)
- Allows filtering by:
  - Only min: "Show >= 0.06"
  - Only max: "Show <= 0.07"
  - Both: "Show 0.06 to 0.07"

### 3. Updated clearTransferFilters() (Lines 50848-50851)
- Clears transferAmountMin instead of transferAmountFilter
- Clears transferAmountMax (new field)

### 4. Updated showTransferSelectionModal() (Lines 50705-50707)
- Clears transferAmountMin instead of transferAmountFilter
- Clears transferAmountMax (new field)

### 5. Enhanced Address Placeholder (Line 2670)
- Added "(partial match works)" to help text
- Educates users they can type partial addresses

## User Experience:

**Before:**
- Amount field: "0.06-0.07" (non-intuitive syntax)
- Users confused about how to enter ranges

**After:**
- Min field: "0.06"
- Max field: "0.07"
- Clear, intuitive separate inputs

## Grid Layout Adjustment:
Changed from 1fr 1fr 1fr to 1fr 2fr 2fr to accommodate:
- Asset filter: 1 column
- Amount range (2 inputs + "to"): 2 columns
- Address filter: 2 columns
- Clear button: auto width

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 index.html | 67 ++++++++++++++++++++++++++++----------------------------------
 1 file changed, 30 insertions(+), 37 deletions(-)
```

## Recent Commits History

- 5763f21 UX: Replace single amount filter with separate min/max inputs (0 seconds ago)
- 7f02b12 Feat: Add range filtering and debug logging to transfer selection modal (17 minutes ago)
- bbd41f4 Update CLAUDE.md with latest commit info (23 minutes ago)
- d0ff0b6 Fix: Multiple UTXO wallet explorer issues (7 hours ago)
- 6148579 Fix: Remove duplicate isPartiallyAllocated declaration causing syntax error (7 hours ago)
- 966b4fd Feat: Implement Bitcoin UTXO multi-output transaction handling (13 hours ago)
- 3c89d76 Update CLAUDE.md with latest commit info (13 hours ago)
- 4cda57c Fix: Transaction graying now tracks partial allocation (14 hours ago)
- a4e4764 Fix: Add exit button and enable partial thread allocation (15 hours ago)
- e200c36 Feature: Log movement from cold storage with audit trail (28 hours ago)

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
