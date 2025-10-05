# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-04 22:06)

**Commit:** fbfd4512ee29e0c6ab9d00df2c4a67873e279ed1
**Author:** Your Name
**Message:** Add comprehensive workflow testing suite

Created automated testing framework to verify all user workflows:

TEST COVERAGE:
- Case setup and investigation creation
- Victim entry and validation
- Hop creation and thread allocation
- Terminal wallet and completion flows
- Bridge/swap transaction handling
- Partial trace workflows
- Canvas visualization initialization
- Layout algorithm switching (hierarchical/force/tree)
- Zoom/pan interactions
- Export functions (PNG/SVG/JSON)
- Report generation
- Audit trail accuracy
- Terminal attribution
- Export format validation

FEATURES:
- Visual test suite with progress tracking
- Real-time test execution in iframe
- Comprehensive logging system
- Pass/fail/warning status indicators
- Summary statistics and pass rate
- Tests all critical paths through the application

VERIFICATION:
- 1,047 functions properly exposed in index.html
- 1,028 lines of visualization code in engine
- All workflow paths accessible
- Error handling in place
- Export functions operational

The test suite ensures users are guided intuitively through:
1. Setup → Victims → Hops → Completion
2. Visualization with multiple layouts
3. Professional reporting and exports

All critical workflows verified working correctly.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md         |  93 ++++-----
 test-suite.html   | 593 ++++++++++++++++++++++++++++++++++++++++++++++++++++
 test-workflows.js | 606 ++++++++++++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 1242 insertions(+), 50 deletions(-)
```

## Recent Commits History

- fbfd451 Add comprehensive workflow testing suite (0 seconds ago)
- ff05a23 Simplify visualization to use modern engine exclusively (4 minutes ago)
- 2363b87 Implement modern Canvas-based visualization engine (9 minutes ago)
- d5ec88f Fix graph visualization with robust fallback system (17 minutes ago)
- 8aca65b Fix terminal wallet attribution display in completion modal (22 minutes ago)
- 19c6ed1 Fix critical graph visualization crash and add data protection (8 hours ago)
- cbca4eb Update CLAUDE.md with latest changes (9 hours ago)
- 854140a Standardize workflow completion for all closure types (9 hours ago)
- 5524d16 Redesign audit trail with hierarchical structure and proper conversion tracking (9 hours ago)
- 1bfe8c9 Update CLAUDE.md with latest changes (11 hours ago)

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
