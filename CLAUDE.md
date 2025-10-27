# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-26 22:59)

**Commit:** 46d2a54c481273d9cd608c037dd17bcd2903e659
**Author:** Your Name
**Message:** Implement bulk multi-select for hop entries with over-allocation prevention

Investigators can now select multiple transactions and bulk add them as hop entries with automatic validation.

**New Functionality:**

1. **Multi-Transaction Selection:**
   - Select multiple outbound transactions using checkboxes
   - Click "ADD ALL SELECTED TO INVESTIGATION" in green banner
   - Creates one hop entry per selected transaction

2. **Automatic Allocation Math:**
   - Calculates total amount across all selected transactions
   - Validates against available thread amount
   - Shows allocation percentage and remaining amount
   - Example: 10 BTC available, select 3 transactions (2+3+4 = 9 BTC)
     * Allocation: 9 BTC (90%)
     * Remaining: 1 BTC

3. **Over-Allocation Prevention:**
   - Detects when total exceeds available amount
   - Shows detailed warning dialog:
     * Thread ID
     * Available amount
     * Total selected
     * Over-allocation amount
   - Allows user to cancel and adjust selection
   - Can proceed with warning acknowledgment

4. **Currency Validation:**
   - Ensures all selected transactions are same currency
   - Prevents mixing BTC, ETH, etc. in same bulk add
   - Clear error message if mixed currencies detected

5. **Bulk Entry Creation:**
   - Creates separate hop entry for each transaction
   - All entries linked to same source thread (if applicable)
   - Proper transaction hash, wallets, timestamps captured
   - Detailed notes for audit trail
   - Automatically sorted chronologically

6. **Confirmation & Results:**
   - Shows preview before creating entries:
     * Number of entries to create
     * Total amount
     * Thread ID
     * Hop number
   - Success message shows entries created
   - Error handling for partial failures
   - Auto-scrolls to hop after creation

**Example Workflow:**

Thread V1-T1 has 10 BTC available

Investigator selects 3 outbound transactions:
- TX1: 2 BTC to wallet A
- TX2: 3 BTC to wallet B
- TX3: 4 BTC to wallet C

System validates:
✅ Total: 9 BTC < 10 BTC available
✅ All same currency (BTC)
✅ Allocation: 90%
✅ Remaining: 1 BTC

Result:
- 3 hop entries created
- Each linked to V1-T1 source thread
- All properly documented
- ART accounting correct

**Over-Allocation Example:**

Thread V1-T1 has 10 BTC available

Investigator selects 4 transactions totaling 12 BTC

System shows warning:
⚠️ OVER-ALLOCATION WARNING
Available: 10 BTC
Total selected: 12 BTC
Over by: 2 BTC

User can cancel and deselect transactions or proceed with acknowledgment.

**Benefits:**
✅ Faster bulk entry creation
✅ Automatic math validation
✅ Prevents allocation errors
✅ Clear warnings before mistakes
✅ Maintains full audit trail
✅ Chronological sorting

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 index.html | 157 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 1 file changed, 155 insertions(+), 2 deletions(-)
```

## Recent Commits History

- 46d2a54 Implement bulk multi-select for hop entries with over-allocation prevention (0 seconds ago)
- 940a77b Sync CLAUDE.md (3 minutes ago)
- 7c87616 Update CLAUDE.md (4 minutes ago)
- b198a8e Final CLAUDE.md update (4 minutes ago)
- 76aab97 Update CLAUDE.md (4 minutes ago)
- 30833ef Update CLAUDE.md with write-off feature documentation (4 minutes ago)
- d11ed6b Add Write Off functionality to Wallet Explorer with full documentation (4 minutes ago)
- f1a146f Update CLAUDE.md (14 minutes ago)
- 5cf7640 Final CLAUDE.md update (14 minutes ago)
- 501e6fc Update CLAUDE.md (14 minutes ago)

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
