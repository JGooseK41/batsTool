# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 13:30)

**Commit:** e788fdac0837d67f67d31c747ce1b71894be02de
**Author:** Your Name
**Message:** Fix: Replace auto-adjustment with proper partial trace support

Reverts auto-adjustment and implements proper thread allocation philosophy: threads contribute what they can, transactions can be partially traced.

## CONCEPTUAL FIX: How Thread Allocation Should Work

**User's Insight** (correct):
"We have a thread of a specific value:
- If we commit that thread to a LARGER transaction → We have a claim to the equivalent value of our thread (partial trace)
- If we commit that thread to a SMALLER transaction → We have leftover value that is still available for reallocation"

**Previous Implementation** (incorrect):
- Auto-adjusted transaction amounts to match available threads
- Example: 2.101 ETH transaction auto-reduced to 2.1 ETH
- Problem: Modified the actual transaction amount in the blockchain

**New Implementation** (correct):
- Threads contribute what they can to transactions
- Transaction amounts stay true to blockchain reality
- Example: 2.101 ETH transaction, 2.1 ETH available → trace 2.1, leave 0.001 untraced

## SCENARIOS PROPERLY HANDLED:

### Scenario 1: Thread < Transaction (Partial Trace)
**Blockchain Reality:**
- Transaction: 2.101 ETH
- Thread Available: 2.1 ETH

**System Behavior:**
```
Total Available: 2.1 ETH
Will Allocate: 2.1 ETH (of 2.101 ETH transaction)
Remaining: 0 ETH

ℹ️ Partial Trace: This transaction is 2.101 ETH, but you only have
2.1 ETH available. Your thread(s) will contribute their full value
(2.1 ETH), and 0.001 ETH will remain untraced.
```

**Result:**
- ✅ Thread fully consumed (2.1 ETH allocated)
- ✅ Transaction partially traced (2.1 of 2.101 ETH)
- ✅ Shortfall documented (0.001 ETH untraced)
- ✅ No blockchain amount modified

### Scenario 2: Thread > Transaction (Leftover Available)
**Blockchain Reality:**
- Transaction: 2.1 ETH
- Thread Available: 2.5 ETH

**System Behavior:**
```
Total Available: 2.5 ETH
Will Allocate: 2.1 ETH
Remaining: 0.4 ETH
```

**Result:**
- ✅ Thread partially consumed (2.1 of 2.5 ETH allocated)
- ✅ Transaction fully traced (2.1 ETH)
- ✅ Thread has leftover (0.4 ETH remains available)
- ✅ Leftover can be used in future traces

### Scenario 3: Thread = Transaction (Perfect Match)
**Blockchain Reality:**
- Transaction: 2.1 ETH
- Thread Available: 2.1 ETH

**System Behavior:**
```
Total Available: 2.1 ETH
Will Allocate: 2.1 ETH
Remaining: 0 ETH
```

**Result:**
- ✅ Thread fully consumed
- ✅ Transaction fully traced
- ✅ Clean accounting

## IMPLEMENTATION DETAILS:

**Enhanced calculateAndShowARTImpact()** (lines 17277-17281):
```javascript
// Don't modify transaction amount - show what WILL be allocated
const willAllocate = Math.min(entryAmount, totalCurrentART);
const isPartialTrace = entryAmount > totalCurrentART;
const shortfall = isPartialTrace ? entryAmount - totalCurrentART : 0;
```

**Key Changes:**
- Removed auto-adjustment logic
- Calculate `willAllocate` based on availability (not modify entry)
- Detect partial traces (transaction > available)
- Show informative message instead of error

**UI Messaging** (lines 17302-17305):
- Orange color (#f39c12) for partial traces (informative, not error)
- Clear explanation: "Your thread(s) will contribute their full value"
- Documents untraced amount: "X will remain untraced"
- Updated helper text: "Threads contribute what they can"

## WHY THIS IS CORRECT:

**Respects Blockchain Reality:**
- Transaction amounts are facts on the blockchain
- We don't modify them to fit our accounting
- We document what we can trace

**Flexible Thread Usage:**
- Thread = Pool of value
- Can be fully or partially consumed
- Leftovers stay available
- Natural accounting flow

**Proper Documentation:**
- Partial traces clearly marked
- Untraced amounts documented
- Complete audit trail
- Court-defensible

## FILES MODIFIED:
- index.html:
  * Lines 17277-17281: Calculate allocation without modifying entry
  * Lines 17283-17284: Color coding for partial traces
  * Lines 17294-17295: Show "of X transaction" for partial traces
  * Lines 17302-17305: Informative message for partial traces
  * Line 17308: Updated helper text

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 118 ++++++++++++++++++++++++++++++++++++++++++++++++++++++-------
 index.html |  37 +++++++------------
 2 files changed, 118 insertions(+), 37 deletions(-)
```

## Recent Commits History

- e788fda Fix: Replace auto-adjustment with proper partial trace support (0 seconds ago)
- 6a3a2af UX: Auto-adjust entry amounts for dust/gas shortfalls (2 minutes ago)
- a3e864d Update CLAUDE.md with latest commit info (6 minutes ago)
- 8ff7c47 Fix: Bridge output logging blocked due to missing conversion wallet type (7 minutes ago)
- 4127c39 Update CLAUDE.md with latest commit info (12 minutes ago)
- 5b66f89 Fix: Bridge tracing with undefined transaction hash (13 minutes ago)
- fd8d8fa UX: Remove redundant confirmation popups in setup and entry phases (28 minutes ago)
- 9524dae Critical Fix: Write-off and cold storage thread allocation (35 minutes ago)
- 0638d63 Feature: Court-ready clustering documentation with justification and source/destination tracking (7 hours ago)
- 0d51afe Critical: Apply Ethereum-level data validity across ALL blockchains (8 hours ago)

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
