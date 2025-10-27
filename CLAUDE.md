# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 17:25)

**Commit:** 0f487ff033a6fa9aa2a0694105a74e419e7da9d4
**Author:** Your Name
**Message:** Fix: Wallet Explorer now works with finalized hop notation

🐛 BUG FIX: Could not open wallet explorer for threads after hop completion

ISSUE: After completing Hop 1 and moving to Hop 2, clicking "Wallet Explorer"
button for the thread from Hop 1 showed error:
"Could not find wallet address for this thread."

ROOT CAUSE (line 22237):
- Thread notation changes from "V1-T1" to "V(1)-T(1)-H1" after hop finalization
- viewThreadInWalletExplorer() didn't recognize this notation format
- Code tried to access entry.destinationWallet (wrong field name)
- Should access entry.toWallet (actual field used in entries)

THREAD NOTATION FORMATS:
Before hop finalized: "V1-T1"
After hop finalized:  "V(1)-T(1)-H1"
Commingled format:    "(V1-T1) H1"

SOLUTION (lines 22225-22242):
1. Updated comment to document all supported notation formats
2. Changed entry.destinationWallet to entry.toWallet
3. Added fallback: entry.toWallet || entry.destinationWallet
4. Added debug logging to show what was found

BEHAVIOR:

Before (broken):
1. Complete Hop 1 with entry (creates thread "V(1)-T(1)-H1")
2. Move to Hop 2
3. Click "Wallet Explorer" for "V(1)-T(1)-H1"
4. Error: "Could not find wallet address for this thread"

After (fixed):
1. Complete Hop 1 with entry (creates thread "V(1)-T(1)-H1")
2. Move to Hop 2
3. Click "Wallet Explorer" for "V(1)-T(1)-H1"
4. ✅ Wallet explorer opens for the destination wallet
5. Shows all transactions from that wallet
6. Can add more entries using confirmation modal

TECHNICAL DETAILS:
- Notation "V(1)-T(1)-H1" extracts hop number: H1
- Finds hop 1 entries
- Gets first entry (all entries go to same destination)
- Extracts toWallet field (destination address)
- Opens wallet explorer with that address
- Highlights the original transaction hash if available

SUPPORTED FORMATS NOW:
✅ "V1-T1" - Victim 1, Transaction 1 (before hop creation)
✅ "V(1)-T(1)-H1" - Finalized hop 1 notation
✅ "(V1-T1) H1" - Commingled thread notation
✅ "(V1-T1,T2) H2" - Multiple transactions commingled

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 80 ++++++++++++++++++++++++++++++++++++++++++++++++++------------
 index.html | 14 +++++++----
 2 files changed, 75 insertions(+), 19 deletions(-)
```

## Recent Commits History

- 0f487ff Fix: Wallet Explorer now works with finalized hop notation (1 second ago)
- 4b2fb46 Fix: Quick Trace button now works with new entry confirmation workflow (8 minutes ago)
- dc1b7bc Auto-sync CLAUDE.md (6 hours ago)
- 2874d87 Feature: Entry confirmation modal for wallet-by-wallet workflow (6 hours ago)
- 5b5fc21 Feature: Gray out already-allocated transactions in wallet explorer (7 hours ago)
- ad37883 Feature: Add info icon with tooltip explaining negative token balances (7 hours ago)
- d2aa686 Fix: Improve ETH variant filtering to catch Unicode characters (EꓔH) (7 hours ago)
- 1489539 Fix: Exclude native currency (ETH) from token API to prevent double-counting - CRITICAL BUG #3 (7 hours ago)
- 25d0eef Auto-sync CLAUDE.md (7 hours ago)
- 532cfca Sync CLAUDE.md (final) (7 hours ago)

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
