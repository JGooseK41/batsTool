# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-05 18:58)

**Commit:** 2ac47a3f5031083bef471be2341b4408c1e574ca
**Author:** Your Name
**Message:** Fix zoom behavior to prevent white space and keep graph/columns scaled together

Ensures graph always fills viewport and zooms/pans without showing white space.

Changes:
1. Graph and column backgrounds always scale together
   - Both are in mainGroup which transforms together
   - Zoom applies to entire mainGroup including backgrounds

2. Constrained zoom bounds to prevent white space
   - Min scale: 0.8 (allows slight zoom out but prevents excessive white space)
   - Max scale: 4 (allows detailed zoom in)
   - Dynamic translation constraints based on current scale

3. Translation clamping algorithm
   - At scale 1: content fills viewport perfectly (no translation needed)
   - At scale < 1: restrict panning to prevent white space edges
   - At scale > 1: allow panning to view zoomed areas
   - Formulas: minTranslateX = width * (1 - scale), maxTranslateX = 0
   - Same for Y axis

4. Modified fitToView() to not scale down
   - Graph columns already extend to full viewport height
   - Only centers content horizontally/vertically at scale 1
   - No shrinking - graph always fills available space

Result: Zoom in/out always shows full graph without white space.
Columns and node network stay perfectly aligned at all zoom levels.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                | 58 +++++++++++++++++++++++++++++++++++-------------
 bats-d3-visualization.js | 48 ++++++++++++++++++++++++++++-----------
 2 files changed, 78 insertions(+), 28 deletions(-)
```

## Recent Commits History

- 2ac47a3 Fix zoom behavior to prevent white space and keep graph/columns scaled together (0 seconds ago)
- 9f94636 Fix thread connections from brown wallets to next hop (5 minutes ago)
- ca4dc39 Update CLAUDE.md with latest commit info (7 minutes ago)
- 82952b6 Consolidate brown wallets by attribution instead of address (8 minutes ago)
- c91a5d3 Fix brown wallet consolidation and positioning - complete rewrite (13 minutes ago)
- 7005083 Fix brown wallet positioning and consolidation in D3 visualization (25 minutes ago)
- 7da7783 Fix missing hops section - add to victims tab (53 minutes ago)
- 0887cef Add comprehensive workflow test documentation and sample data (60 minutes ago)
- e36e6bb Fix root total confirmation tab navigation (63 minutes ago)
- fff08da Update CLAUDE.md with latest commit info (68 minutes ago)

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
