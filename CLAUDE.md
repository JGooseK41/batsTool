# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-05 18:53)

**Commit:** 9f94636c239695074f55237dbb8a2f533d3c0cf3
**Author:** Your Name
**Message:** Fix thread connections from brown wallets to next hop

Ensures swapped threads properly connect to brown wallets that created them.

Changes:
1. Enhanced findSourceNode() to try direct notation lookup first
   - Brown wallets registered with notation like "(V1-T1) H1" can be found directly
   - Falls back to parsing and searching through output threads if needed
   - Handles parentheses notation format correctly

2. Register all nodes by notation in addition to node ID
   - External swap output nodes: registered by both H{hop}-E{index} AND notation
   - Regular nodes: registered by both H{hop}-E{index} AND notation
   - Brown wallets: already registered by notation (line 224)

3. Improved thread ID parsing
   - Handles both "(V1-T1) H1" and "V1-T1 H1" formats
   - Removes parentheses before parsing
   - Splits on both spaces and dashes

Flow example:
- Hop 1: V1-T1 (500 HYPE) → Br-1 (brown wallet with notation "(V1-T1) H1")
- Hop 2: Entry has sourceThreadId "(V1-T1) H1" → findSourceNode() finds Br-1 directly
- Result: Hop 2 wallet connects FROM brown wallet, showing converted currency

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                | 57 +++++++++++++-----------------------------------
 bats-d3-visualization.js | 46 ++++++++++++++++++++++++++++++--------
 2 files changed, 52 insertions(+), 51 deletions(-)
```

## Recent Commits History

- 9f94636 Fix thread connections from brown wallets to next hop (0 seconds ago)
- ca4dc39 Update CLAUDE.md with latest commit info (2 minutes ago)
- 82952b6 Consolidate brown wallets by attribution instead of address (3 minutes ago)
- c91a5d3 Fix brown wallet consolidation and positioning - complete rewrite (7 minutes ago)
- 7005083 Fix brown wallet positioning and consolidation in D3 visualization (19 minutes ago)
- 7da7783 Fix missing hops section - add to victims tab (47 minutes ago)
- 0887cef Add comprehensive workflow test documentation and sample data (55 minutes ago)
- e36e6bb Fix root total confirmation tab navigation (58 minutes ago)
- fff08da Update CLAUDE.md with latest commit info (63 minutes ago)
- 1ccaa49 Add debug logging to Sankey diagram for swap tracking (64 minutes ago)

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
