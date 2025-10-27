# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-26 23:03)

**Commit:** 4a2996c3eb3bf582ea35e542f6361c366823f3da
**Author:** Your Name
**Message:** Add intelligent commingling detection and multi-thread selector

Automatically detects when a transaction requires multiple source threads and provides smooth UI for thread selection.

**Scenario:**
- Thread V1-T1: 100 ETH → Wallet A
- Thread V1-T2: 100 ETH → Wallet A
- Thread V1-T3: 100 ETH → Wallet A
- Outbound from Wallet A: 300 ETH (requires all 3 threads)

**How It Works:**

1. **Automatic Commingling Detection:**
   - User opens Wallet Explorer from V1-T1 (only 100 ETH)
   - User clicks "Add to Investigation" on 300 ETH outbound
   - System detects: Transaction (300 ETH) > Thread capacity (100 ETH)
   - Searches for other threads entering same wallet
   - Finds V1-T2 (100 ETH) and V1-T3 (100 ETH)

2. **Smart Thread Selector Modal:**
   - Shows "🔀 Commingling Detected" dialog
   - Displays transaction details (amount, wallets, hash)
   - Lists all threads entering the wallet with checkboxes:
     * V1-T1: 100 ETH (auto-selected - original thread)
     * V1-T2: 100 ETH (available to select)
     * V1-T3: 100 ETH (available to select)
   - Real-time total calculation as user selects threads

3. **Live Validation Display:**
   - Selected Total: Updates as checkboxes change
   - Required: Shows transaction amount
   - Validation messages:
     * "⚠️ Insufficient: Need 100 ETH more" (if under)
     * "✅ Perfect match!" (if exact)
     * "✅ Sufficient: 50 ETH will remain available" (if over)
   - Confirm button disabled until sufficient threads selected

4. **Entry Creation:**
   - Creates hop entry with multipleSourceThreads array
   - Sets isConvergence: true
   - Stores convergenceData with thread details
   - Proper notation generation for commingled entries
   - Full audit trail in notes

**User Experience:**

**Without Commingling:**
- Click "Add to Investigation" → Standard entry created

**With Commingling:**
- Click "Add to Investigation" on 300 ETH transaction
- System shows: "🔀 Commingling Detected"
- V1-T1 already checked (100 ETH selected)
- Status: "⚠️ Insufficient: Need 200 ETH more"
- User checks V1-T2 (200 ETH selected)
- Status: "⚠️ Insufficient: Need 100 ETH more"
- User checks V1-T3 (300 ETH selected)
- Status: "✅ Perfect match!"
- Click "✅ Create Commingled Entry"
- Entry created with all 3 threads properly allocated

**Benefits:**
✅ Automatic detection - no manual calculation needed
✅ Visual feedback - see totals update in real-time
✅ Error prevention - can't create entry until sufficient
✅ Smart defaults - original thread auto-selected
✅ Flexible - user can select any combination
✅ Clear status - always know if selection is valid
✅ Proper accounting - multipleSourceThreads handled correctly

**Technical Details:**
- Searches threads by destinationWallet and currency match
- Only shows threads entering the same wallet
- Filters by currency to prevent cross-currency commingling
- Validates total >= required before allowing creation
- Creates entry with convergenceData for thread allocation
- Maintains full audit trail with all thread IDs in notes

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 index.html | 322 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 1 file changed, 320 insertions(+), 2 deletions(-)
```

## Recent Commits History

- 4a2996c Add intelligent commingling detection and multi-thread selector (1 second ago)
- 78d3160 Update CLAUDE.md (4 minutes ago)
- 0a09335 Update CLAUDE.md with bulk select documentation (4 minutes ago)
- 46d2a54 Implement bulk multi-select for hop entries with over-allocation prevention (4 minutes ago)
- 940a77b Sync CLAUDE.md (7 minutes ago)
- 7c87616 Update CLAUDE.md (7 minutes ago)
- b198a8e Final CLAUDE.md update (8 minutes ago)
- 76aab97 Update CLAUDE.md (8 minutes ago)
- 30833ef Update CLAUDE.md with write-off feature documentation (8 minutes ago)
- d11ed6b Add Write Off functionality to Wallet Explorer with full documentation (8 minutes ago)

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
