# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 19:04)

**Commit:** 9b04c735da60f80a6a0c4f793a214fff7642374e
**Author:** Your Name
**Message:** Remove redundant Quick Trace button from Available Threads modal

🗑️ CLEANUP: Remove duplicate Quick Trace button

USER REQUEST: "get rid of it"

ISSUE: Quick Trace button was redundant
- Did the exact same thing as Wallet Explorer button
- Confusing to have two buttons with same functionality
- New entry confirmation modal already makes workflow fast

CHANGES:

1. Removed Quick Trace Button (lines 22376-22399):
   ❌ Removed: "⚡ Quick Trace" button
   ✅ Kept: "🔍 View & Trace" button (renamed from "Wallet Explorer")
   ✅ Kept: "❌ Write Off" button
   ✅ Kept: "❄️ Cold Storage" button

2. Simplified Button Layout:
   Before:
   - ⚡ Quick Trace (only if not fully assigned)
   - ❌ Write Off (only if not fully assigned)
   - ❄️ Cold Storage (only if not fully assigned)
   - 🔍 Wallet Explorer (always visible)

   After:
   - 🔍 View & Trace (always visible - primary action)
   - ❌ Write Off (only if not fully assigned)
   - ❄️ Cold Storage (only if not fully assigned)

3. Renamed Button:
   "🔍 Wallet Explorer" → "🔍 View & Trace"
   - Clearer what the button does
   - Emphasizes that you can trace from the wallet explorer
   - Updated tooltip: "Open Wallet Explorer to view and trace transactions"

4. Removed Function (line 22430):
   - quickTraceThread() function removed
   - Left comment for code archaeology

BENEFITS:
✅ Less confusing - one clear action button
✅ Cleaner UI - fewer buttons in the list
✅ Primary action always visible (even for fully assigned threads)
✅ Better button naming - "View & Trace" is more descriptive

WORKFLOW NOW:
1. Open Available Threads modal
2. Click "🔍 View & Trace" for any thread
3. Wallet explorer opens
4. Click "Add to Investigation" on any transaction
5. Entry confirmation modal appears
6. Create entry and choose to stay or return

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 94 ++++++++++++++++++++++++++++++++++----------------------------
 index.html | 32 +++++----------------
 2 files changed, 58 insertions(+), 68 deletions(-)
```

## Recent Commits History

- 9b04c73 Remove redundant Quick Trace button from Available Threads modal (0 seconds ago)
- 0f487ff Fix: Wallet Explorer now works with finalized hop notation (2 hours ago)
- 4b2fb46 Fix: Quick Trace button now works with new entry confirmation workflow (2 hours ago)
- dc1b7bc Auto-sync CLAUDE.md (8 hours ago)
- 2874d87 Feature: Entry confirmation modal for wallet-by-wallet workflow (8 hours ago)
- 5b5fc21 Feature: Gray out already-allocated transactions in wallet explorer (8 hours ago)
- ad37883 Feature: Add info icon with tooltip explaining negative token balances (9 hours ago)
- d2aa686 Fix: Improve ETH variant filtering to catch Unicode characters (EꓔH) (9 hours ago)
- 1489539 Fix: Exclude native currency (ETH) from token API to prevent double-counting - CRITICAL BUG #3 (9 hours ago)
- 25d0eef Auto-sync CLAUDE.md (9 hours ago)

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
