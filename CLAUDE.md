# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-26 18:42)

**Commit:** a7c8c8a01080c7ed499b772ffd9fee1752adea0a
**Author:** Your Name
**Message:** Complete Bridgers cross-chain bridge auto-detection UI (Part 2)

PART 2 COMPLETE: Full UI integration with auto-trace workflow

## What's New:

### 1. Bridge Detection Badge (Both Views)
- Shows "🌉 Bridgers DETECTED" when contract address is recognized
- Appears in both collapsed and expanded entry views
- Automatically runs detection on every entry render
- Takes priority over manual bridge classification

### 2. Auto-Trace Button
- "🔍 Auto-Trace Bridgers" button appears for detected bridges
- Only shows for unlogged bridge outputs (entry.bridgeOutputLogged === false)
- Stops event propagation to prevent view toggle
- Tooltip explains it fetches bridge details from Bridgers API

### 3. Bridge Output Dialog Pre-fill
- Auto-populates destination chain dropdown
- Pre-fills destination transaction hash
- Pre-fills destination wallet address
- Pre-fills destination amount and asset
- Shows success message: "✅ Bridge transaction data auto-loaded from Bridgers!"

### 4. Risk Warning Display
- Detects blacklisted addresses (refundReason === '4')
- Detects risky address interactions (refundReason === '8')
- Shows prominent warning banner at top of dialog
- Red border with yellow background for visibility

### 5. Universal Pattern Established
This implementation provides the template for ALL future bridge/DEX integrations:
- Detection → Badge → Auto-Trace → Pre-fill → Same Hop
- Ready for: Wormhole, Axelar, LayerZero, Uniswap, PancakeSwap

## Files Modified:

**index.html**
- Lines 7775-7798: Fixed showBridgeOutputDialog() to call logBridgeOutput()
- Lines 13841-13858: Added bridge detection badge in collapsed view
- Lines 13911-13923: Added Auto-Trace button in action buttons
- Lines 13955-13980: Added bridge detection badge in expanded view
- Lines 29036-29109: Integrated pre-fill mechanism in logBridgeOutput()

**CLAUDE.md**
- Updated latest commit info
- Cleaned up documentation structure

## How It Works:

1. **User adds transaction** → Entry is rendered
2. **Detection runs** → toAddress matches Bridgers contract
3. **Badge appears** → "🌉 Bridgers DETECTED"
4. **Button shows** → "🔍 Auto-Trace Bridgers"
5. **User clicks** → autoTraceBridge() queries API
6. **API returns** → Bridge data with source/dest info
7. **Dialog opens** → Pre-filled with all destination details
8. **Risk check** → Warning banner if flagged
9. **User confirms** → Same workflow as manual bridge logging

## Testing Checklist:
- ✅ Badge displays in collapsed view when Bridgers contract detected
- ✅ Badge displays in expanded view when Bridgers contract detected
- ✅ Auto-Trace button appears for detected bridges
- ✅ Button calls autoTraceBridge() with correct hopNumber and entryId
- ⏳ Dialog pre-fills with API data (needs real transaction to test)
- ⏳ Risk warnings display correctly (needs flagged transaction to test)

## Ready For Production:
All code complete. Ready to test with real Bridgers transactions.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 149 +++++++++++++--------------------
 index.html | 275 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++----
 2 files changed, 315 insertions(+), 109 deletions(-)
```

## Recent Commits History

- a7c8c8a Complete Bridgers cross-chain bridge auto-detection UI (Part 2) (0 seconds ago)
- c77262d Add Bridgers cross-chain bridge auto-detection framework (Part 1) (8 minutes ago)
- 5e53da8 Fix Sui support and add THORChain cross-chain swap tracking (23 minutes ago)
- b406c88 Add 6 new EVM chains from Etherscan API v2 (2025 additions) (31 minutes ago)
- d7798cf Add Sui blockchain support with comprehensive integration (52 minutes ago)
- 57cb298 Sync (10 hours ago)
- 3d81ebb Auto-sync (10 hours ago)
- 3aea07d Final sync (10 hours ago)
- 4143f7f Sync CLAUDE.md (10 hours ago)
- 7f8dda7 Update CLAUDE.md with XRP support (10 hours ago)

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
