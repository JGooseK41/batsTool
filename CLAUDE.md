# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 21:29)

**Commit:** 3a27c7986152f66e3b8651de6976ad8c0b73ed76
**Author:** Your Name
**Message:** UX: Enhanced wallet explorer visibility with table borders and thread highlighting

Problem 1: No visible table lines between transactions
- Transactions blended together visually
- Hard to distinguish between individual transaction rows
- User requested faint table lines for clear delineation

Problem 2: Incoming thread transactions not showing yellow/gold in Hop 2+
- Only the specifically highlighted transaction showed yellow/gold
- Other incoming thread transactions (from previous hops) showed blue
- Made it hard to identify which transactions were thread sources
- User requested ALL incoming thread transactions show yellow/gold with VT notation

Solution 1: Added faint row borders (line 16578)
```javascript
row.style.borderBottom = '1px solid #e9ecef';
```
- Applied to all transaction rows
- Light gray color (#e9ecef) for subtle but clear separation
- Improves visual scanning of transaction list

Solution 2: Enhanced thread transaction highlighting

**A. Updated initial highlighting logic (lines 16580-16592):**
- ALL incoming thread transactions get yellow/gold: `(isInvestigationThread && tx.type === 'IN')`
- Outgoing thread transactions keep blue
- Highlighted/current thread also gets yellow/gold

**B. Updated thread badges (lines 16638-16647):**
- Incoming threads: Yellow/gold badge with 🎯 icon
- Outgoing threads: Blue badge with 📍 icon
- Displays full VT notation (e.g., "V1-T1", "V1-T1-H1")

**C. Protected thread transactions from graying (lines 16657-16686):**
- Created `isThreadTransaction` flag for all incoming thread txs
- Change outputs don't gray out thread transactions
- Used transactions don't gray out thread transactions
- ART selections don't override thread transactions

**D. Re-applied highlighting at END (lines 16688-16703):**
- Ensures thread highlighting takes absolute precedence
- Overrides any opacity/cursor settings
- Incoming threads: Yellow/gold with full opacity
- Outgoing threads: Blue with full opacity

Now wallet explorer clearly shows:
✅ Faint borders between all transaction rows
✅ ALL incoming thread transactions in bright yellow/gold
✅ Outgoing thread transactions in blue
✅ VT notation badges on all thread transactions
✅ Thread transactions always visible (never grayed out)
✅ Works correctly in all hops (Hop 1, 2, 3, etc.)

This makes it easy to:
- Scan through transaction list with clear visual separation
- Immediately identify which transactions are thread sources
- See the provenance notation for each thread
- Follow the investigation thread through multiple hops

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 125 +++++++++++++++++++++++++++++++++++--------------------------
 index.html |  50 +++++++++++++++++++------
 2 files changed, 110 insertions(+), 65 deletions(-)
```

## Recent Commits History

- 3a27c79 UX: Enhanced wallet explorer visibility with table borders and thread highlighting (0 seconds ago)
- d3ba2f9 Fix: Complete migration of ALL remaining nested thread structures (13 minutes ago)
- 02dbede Fix: Hop finalization crash from nested thread structure (64 minutes ago)
- ffa9dc2 Sync CLAUDE.md (70 minutes ago)
- a86e0ff Final CLAUDE.md update (70 minutes ago)
- b35aa18 Update CLAUDE.md timestamp (70 minutes ago)
- 36b3398 Update CLAUDE.md with latest commit info (71 minutes ago)
- 6c99cd4 Feature: Add resizable sidebar to wallet explorer with drag-to-resize (76 minutes ago)
- 5332e67 Fix: Wallet explorer crash from nested thread structure in ART tracking (2 hours ago)
- a0e9406 Fix: Transaction list not displaying when asset selected in wallet explorer (2 hours ago)

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
