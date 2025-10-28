# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 05:18)

**Commit:** 7e89d3f0a90215dd08a3d4fd6c1779c1dc780d68
**Author:** Your Name
**Message:** Feature: Multi-thread allocation in Wallet Explorer entry confirmation

🎯 COMPLETE IMPLEMENTATION: Replicate hop wizard allocation logic in wallet explorer

PROBLEM:
- Wallet Explorer entry confirmation modal only supported single thread allocation
- No way to handle commingling, partial spends, or bridges properly
- Users had to manually calculate thread allocation
- System could allow over-allocation (e.g., 49,975 USDT with only 908 USDT thread)

SOLUTION:
Implemented full multi-thread selection and allocation in entry confirmation modal,
matching the sophisticated logic that already exists in the hop wizard.

NEW FEATURES:

1. **Thread Selection Interface** (lines 17252-17312)
   - Interactive checkboxes for each available thread
   - Shows available amount for each thread
   - Auto-selects pre-assigned thread if one exists
   - Visual feedback with green borders for selected threads
   - Real-time allocation calculation on selection change

2. **PIFO Allocation Calculation** (lines 17331-17396)
   - Automatic PIFO ordering by victim ID and transaction ID
   - Calculates how to allocate selected threads to transaction amount
   - Handles partial spends correctly
   - Tracks remaining amounts for each thread
   - Identifies which threads will be fully depleted

3. **Allocation Preview Display** (lines 17398-17474)
   - Shows detailed breakdown of each thread's allocation
   - Color-coded indicators (red = fully depleted, green = partial)
   - Displays remaining amounts (future change threads)
   - Total allocated vs transaction amount comparison
   - Warning messages for partial traces (shortfall)
   - Warning messages for excess allocation

4. **Enhanced Entry Data** (lines 17479-17525)
   - Applies multi-thread allocation to entry before creation
   - Handles both single and multiple thread cases
   - Stores allocation details in entry data
   - Adds comprehensive allocation notes to entry
   - Documents partial traces with shortfall amounts
   - Validation prevents entries without thread selection

5. **Updated ART Impact Display** (lines 17196-17247)
   - Shows total available ART across all threads
   - Displays transaction amount to allocate
   - Calculates remaining ART after allocation
   - Clear guidance to select threads below
   - Warning for insufficient funds scenarios

BEHAVIOR:

**Before:**
- Entry confirmation showed simple thread list
- Single thread auto-assigned
- No way to select multiple threads
- Could create entries with massive over-allocation ❌

**After:**
- Interactive thread selection with checkboxes ✅
- Real-time allocation preview ✅
- Automatic PIFO ordering ✅
- Partial spend handling ✅
- Change thread identification ✅
- Prevents entries without proper allocation ✅
- Full documentation in entry notes ✅

WORKFLOW EXAMPLE:

1. User clicks "Follow & Trace" on transaction in Wallet Explorer
2. Entry confirmation modal opens
3. **NEW:** Thread Selection Section shows all available threads with checkboxes
4. User selects multiple threads (e.g., V1-T1, V1-T2)
5. **NEW:** Allocation Preview shows:
   - V1-T1: Use 908 of 908 USDT (fully depleted)
   - V1-T2: Use 49,067 of 49,980 USDT (913 USDT will remain)
   - Total Allocated: 49,975 USDT
6. User confirms entry
7. Entry created with proper multi-thread allocation
8. System automatically handles partial spends and change threads

USE CASES NOW SUPPORTED:

✅ **Commingling:** Select multiple victim threads merging at same wallet
✅ **Partial Spends:** Allocate portion of thread, remainder becomes change
✅ **Bridges:** Properly allocate across thread boundaries
✅ **Complex Flows:** Any combination of multi-thread scenarios
✅ **Audit Trail:** Full documentation of allocation in entry notes

TECHNICAL IMPLEMENTATION:

- **Global State:** window.walletExplorerThreadSelection tracks selections
- **PIFO Sorting:** Matches hop wizard's victim/transaction ordering
- **Allocation Algorithm:** Same logic as applyPIFOAllocation()
- **Entry Enhancement:** applyMultiThreadAllocationToEntry() adds allocation data
- **Validation:** Prevents confirmation without thread selection
- **Notes Documentation:** Automatic allocation notes for audit trail

TESTING:

Test Scenario 1: Single thread
- Select V1-T1 (1000 USDT available)
- Transaction amount: 500 USDT
- Preview shows: Use 500 of 1000 (500 will remain)
- Entry created with partial allocation ✅

Test Scenario 2: Multiple threads (commingling)
- Select V1-T1 (908 USDT) and V1-T2 (49,980 USDT)
- Transaction amount: 49,975 USDT
- Preview shows both allocations in PIFO order
- Entry created with proper multi-thread allocation ✅

Test Scenario 3: Insufficient funds
- Select V1-T1 (100 USDT)
- Transaction amount: 1000 USDT
- Preview shows shortfall warning
- Entry documents partial trace ✅

IMPACT:

🎯 Wallet Explorer now has SAME power as Hop Wizard
🎯 Users can log complex transactions easily
🎯 Prevents allocation errors automatically
🎯 Maintains full audit trail in entry notes
🎯 Significantly improves workflow for commingling cases

FILES MODIFIED:
- index.html (lines 17119-17525, 3023-3040)

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 106 ++++++++++-------
 index.html | 381 +++++++++++++++++++++++++++++++++++++++++++++++++++----------
 2 files changed, 380 insertions(+), 107 deletions(-)
```

## Recent Commits History

- 7e89d3f Feature: Multi-thread allocation in Wallet Explorer entry confirmation (0 seconds ago)
- f219cd1 Fix: Commingling detection for victim transaction threads (8 hours ago)
- e378163 Fix: ART tracking panel thread lookup using notation instead of internal ID (8 hours ago)
- f48d691 Feature: Batch entry logging workflow in Wallet Explorer (9 hours ago)
- b02f459 Feature: Toggle to hide/show zero-balance transfers in Wallet Explorer (9 hours ago)
- 16dcb5a Auto-sync CLAUDE.md (10 hours ago)
- 2bd784f Fix: Include transaction hash in entry notes for audit trail (10 hours ago)
- 127e40a Feature: Thread allocation progress visualization in Wallet Explorer (10 hours ago)
- b716ef0 Fix: Active thread highlighting and auto-pagination in Wallet Explorer (10 hours ago)
- f1ad696 Fix: Incorrect incomplete history warning in Wallet Explorer (10 hours ago)

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
