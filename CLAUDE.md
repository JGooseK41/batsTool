# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 19:56)

**Commit:** b02f45954dd277cbd438f9655aa765d628553196
**Author:** Your Name
**Message:** Feature: Toggle to hide/show zero-balance transfers in Wallet Explorer

✨ UX ENHANCEMENT: Filter out spam and zero-value transactions

USER REQUEST: "there were a number of 0 balance transfers in the wallet
explorer, we should have the ability to toggle 0 balance transfers in
the display and it should be set to not show 0 balance transfers by
default"

PROBLEM:

Zero-balance transfers clutter the wallet explorer and make it harder to
find meaningful transactions. These are often:
- Contract interactions (approvals, calls)
- Spam tokens sent to many addresses
- Failed transactions
- NFT mints/transfers (value in token, not ETH)

SOLUTION:

Added toggle checkbox to hide/show zero-balance transfers with sensible
default to hide them.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPLEMENTATION:

1. UI Component (lines 2797-2809):
   - Added checkbox "Hide zero-balance transfers"
   - Positioned in filter section next to "Clear All Filters" button
   - Default state: checked (hide zero-balance)
   - Calls toggleZeroBalanceFilter() on change

2. State Management:
   - Added hideZeroBalance flag to walletExplorerState (lines 14335, 14652)
   - Default value: true (hide by default)
   - Persists during wallet explorer session
   - Resets to default when opening new wallet

3. Toggle Function (lines 16257-16263):
   - toggleZeroBalanceFilter()
   - Updates walletExplorerState.hideZeroBalance from checkbox
   - Logs filter state for debugging
   - Re-renders table immediately

4. Filter Logic (lines 15945-15949):
   - Added to renderTransactionTable()
   - Filters transactions where tx.amount > 0
   - Only applies when hideZeroBalance is true
   - Logs number of filtered transactions

5. Integration:
   - clearAllFilters() resets checkbox to default (hide)
   - openWalletExplorer() syncs checkbox with state (lines 16628-16632)
   - Works with all other filters (date, amount ranges)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEHAVIOR:

Default State (Zero-Balance Hidden):
- Checkbox: ✓ checked
- Display: Only shows transactions with amount > 0
- Clean, focused transaction list

User Unchecks (Show Zero-Balance):
- Checkbox: ☐ unchecked
- Display: Shows ALL transactions including zero-balance
- Useful for debugging or investigating contract interactions

Clear All Filters:
- Resets checkbox to ✓ checked (hide zero-balance)
- Restores default clean view

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXAMPLE:

Wallet with 1000 transactions:
- 800 normal transfers (with value)
- 200 zero-balance transfers (spam/approvals)

Before:
- All 1000 transactions shown
- Hard to find relevant transfers
- Cluttered view

After (Default):
- Only 800 value transfers shown
- Zero-balance filtered out
- Clean, focused view

After (Unchecked):
- All 1000 transactions shown
- User can inspect contract interactions if needed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BENEFITS:

✅ Cleaner wallet explorer by default
✅ Faster to find meaningful transactions
✅ Reduces visual clutter from spam tokens
✅ User can still view all transactions if needed
✅ Improves performance (fewer rows to render)
✅ Consistent with "hide scam tokens" pattern
✅ Sensible default for 95% of use cases

TESTING:
- Open wallet with zero-balance transfers
- Verify checkbox is checked by default
- Verify zero-balance transfers are hidden
- Uncheck box → zero-balance transfers appear
- Check box → zero-balance transfers disappear
- Click "Clear All Filters" → checkbox resets to checked

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 118 +++++++------------------------------------------------------
 index.html |  37 +++++++++++++++++--
 2 files changed, 48 insertions(+), 107 deletions(-)
```

## Recent Commits History

- b02f459 Feature: Toggle to hide/show zero-balance transfers in Wallet Explorer (0 seconds ago)
- 16dcb5a Auto-sync CLAUDE.md (13 minutes ago)
- 2bd784f Fix: Include transaction hash in entry notes for audit trail (15 minutes ago)
- 127e40a Feature: Thread allocation progress visualization in Wallet Explorer (23 minutes ago)
- b716ef0 Fix: Active thread highlighting and auto-pagination in Wallet Explorer (35 minutes ago)
- f1ad696 Fix: Incorrect incomplete history warning in Wallet Explorer (44 minutes ago)
- 9982aee Enhancement: Add labels and total volume to asset cards in Wallet Explorer (46 minutes ago)
- a1e1795 Auto-sync CLAUDE.md (51 minutes ago)
- 9b04c73 Remove redundant Quick Trace button from Available Threads modal (52 minutes ago)
- 0f487ff Fix: Wallet Explorer now works with finalized hop notation (3 hours ago)

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
