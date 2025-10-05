# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-05 18:46)

**Commit:** c91a5d3722675ac0718b9466a8cf53e84747c937
**Author:** Your Name
**Message:** Fix brown wallet consolidation and positioning - complete rewrite

CRITICAL FIXES:
1. Brown wallets ONLY in hop space (0.5, 1.5, 2.5) - NEVER in wallet columns
   - Internal swaps: No output nodes created in hop columns
   - External swaps: Consolidated by wallet address with same key pattern
   - Brown wallet registers as thread source for next hop connections

2. Eliminate duplicate brown wallets
   - Both internal and external swaps check for existing brown wallet by address
   - Single brown wallet per unique address per hop
   - Track input/output threads within brown wallet node

3. Fix initial node positioning to respect header boundary
   - Changed startY from (height - totalHeight) / 2 to Math.max(200, ...)
   - Ensures nodes never start above column headers
   - Prevents drag issues with wallets positioned too high

4. Output nodes properly typed and connected
   - Internal swap: Brown wallet stores output thread info, no output node
   - External swap: Black/purple output nodes in hop columns connect to brown wallet
   - Edge labels show currency conversion (HYPE → USDC)

Fixes all reported issues:
- 10 duplicate brown wallets → 1 consolidated brown wallet
- Brown wallets in wallet columns → Only in hop space
- Disconnected black wallets → Properly connected to brown wallets
- Drag above header breaking layout → Initial position enforced below header

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                |  58 +++++++++++++++++----------
 bats-d3-visualization.js | 101 +++++++++++++++++++----------------------------
 2 files changed, 78 insertions(+), 81 deletions(-)
```

## Recent Commits History

- c91a5d3 Fix brown wallet consolidation and positioning - complete rewrite (0 seconds ago)
- 7005083 Fix brown wallet positioning and consolidation in D3 visualization (12 minutes ago)
- 7da7783 Fix missing hops section - add to victims tab (40 minutes ago)
- 0887cef Add comprehensive workflow test documentation and sample data (48 minutes ago)
- e36e6bb Fix root total confirmation tab navigation (50 minutes ago)
- fff08da Update CLAUDE.md with latest commit info (56 minutes ago)
- 1ccaa49 Add debug logging to Sankey diagram for swap tracking (57 minutes ago)
- 1ef5bab Fix drag behavior to prevent column movement (61 minutes ago)
- 9aad5f4 Make T-account reconciliation boxes visible and dynamic (64 minutes ago)
- 1f0a947 Fix zoom behavior to keep columns and wallets in sync (66 minutes ago)

## Key Features
- **Multi-blockchain support**: Bitcoin, Ethereum, ERC-20 tokens
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
