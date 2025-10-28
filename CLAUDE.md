# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 13:27)

**Commit:** 6a3a2afbe87eb94960f9e3ddf449e26e3ac2a50e
**Author:** Your Name
**Message:** UX: Auto-adjust entry amounts for dust/gas shortfalls

Automatically adjusts traced amounts when shortfall is dust (< 0.01), preventing confusing warnings for gas fees.

## ISSUE: Confusing Warning for Dust Amounts

**User Experience Problem**:
User tries to trace 2.101 ETH but only has 2.1 ETH available:
- Shortfall: 0.001 ETH (basically gas fees)
- System shows: "⚠️ Warning: This entry will result in negative ART (insufficient funds)"
- User asks: "Why doesn't it auto-adjust?"

**They're right** - for such tiny differences, the system should automatically adjust the traced amount rather than showing a scary warning.

## FIX: Smart Auto-Adjustment

**Enhanced calculateAndShowARTImpact()** (lines 17278-17286):

**Detection Logic**:
```javascript
const DUST_THRESHOLD = 0.01; // Anything less than this is gas/rounding
const shortfall = entryAmount - totalCurrentART;

if (shortfall > 0 && shortfall < DUST_THRESHOLD) {
    // Auto-adjust to match available
    entryAmount = totalCurrentART;
    entryData.amount = totalCurrentART.toString();
    autoAdjusted = true;
}
```

**New UI Message** (lines 17309-17312):
Instead of error warning, shows informative success message:
```
✓ Auto-adjusted: Entry amount reduced by 0.001 ETH (dust/gas) to match available ART.
```

## THRESHOLD RATIONALE:

**0.01 threshold chosen because**:
- ETH gas fees: Typically 0.0001 - 0.005 ETH
- BTC dust: < 0.001 BTC
- Rounding errors: Usually < 0.01 in any currency
- Real shortfalls: Usually > 0.1 (indicates actual problem)

**Examples of what gets auto-adjusted**:
- ✅ 2.101 → 2.1 ETH (0.001 shortfall = gas)
- ✅ 1.0056 → 1.0 BTC (0.0056 shortfall = gas)
- ✅ 100.005 → 100 USDT (0.005 shortfall = rounding)

**Examples of what still shows warning**:
- ❌ 2.5 ETH when only 2.1 available (0.4 shortfall = real problem)
- ❌ 1.2 BTC when only 1.0 available (0.2 shortfall = real problem)

## USER EXPERIENCE IMPACT:

**Before**:
```
Total Available: 2.1 ETH
Will Allocate: 2.101 ETH
Remaining: -0.001 ETH
⚠️ Warning: negative ART (insufficient funds)
```
User confused - "It's just gas fees!"

**After**:
```
Total Available: 2.1 ETH
Will Allocate: 2.1 ETH
Remaining: 0 ETH
✓ Auto-adjusted: Entry amount reduced by 0.001 ETH (dust/gas)
```
User happy - system handled it intelligently!

## BENEFITS:

✅ **Smarter UX**: System handles obvious gas/rounding differences
✅ **Less Confusion**: No scary warnings for dust amounts
✅ **Still Safe**: Real shortfalls (>0.01) still show warning
✅ **Transparent**: User sees adjustment was made and why
✅ **Accurate Accounting**: Entry matches actual available threads

## FILES MODIFIED:
- index.html:
  * Lines 17278-17286: Auto-adjustment logic
  * Lines 17309-17312: Success message for auto-adjustments
  * Line 17264: Changed entryAmount to let (was const)
  * Line 17276: Calculate shortfall explicitly

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 113 ++++++-------------------------------------------------------
 index.html |  20 +++++++++--
 2 files changed, 29 insertions(+), 104 deletions(-)
```

## Recent Commits History

- 6a3a2af UX: Auto-adjust entry amounts for dust/gas shortfalls (0 seconds ago)
- a3e864d Update CLAUDE.md with latest commit info (3 minutes ago)
- 8ff7c47 Fix: Bridge output logging blocked due to missing conversion wallet type (4 minutes ago)
- 4127c39 Update CLAUDE.md with latest commit info (9 minutes ago)
- 5b66f89 Fix: Bridge tracing with undefined transaction hash (10 minutes ago)
- fd8d8fa UX: Remove redundant confirmation popups in setup and entry phases (25 minutes ago)
- 9524dae Critical Fix: Write-off and cold storage thread allocation (33 minutes ago)
- 0638d63 Feature: Court-ready clustering documentation with justification and source/destination tracking (7 hours ago)
- 0d51afe Critical: Apply Ethereum-level data validity across ALL blockchains (8 hours ago)
- a78a36e Feature: Comprehensive blockchain integration across all 35+ chains (8 hours ago)

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
