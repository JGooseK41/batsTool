# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-24 20:31)

**Commit:** 96ee49ad6d85504c435f9a4118280573dac3bab5
**Author:** Your Name
**Message:** Add provenance-based visualization filtering with multi-select and saved views

Implement complete filtering system for B.A.T.S. visualization that leverages
thread provenance tracking to filter by victims, root threads, and terminals.

**Provenance Index System:**
- Build complete thread DAG from investigation.availableThreads
- Track parent-child relationships via parentInternalIds
- Map notation → internal IDs for flexible searching
- Index victim root threads and terminal ancestors
- Support forward tracing (victim → terminal) and backward (terminal → victim)

**Filter Manager (FocusedFilterManager):**
- Filter by Victim: Show all descendant threads (forward trace)
- Filter by Root Thread: Trace specific transaction path
- Filter by Terminal: Show all ancestor threads (backward trace)
- Combine multiple selections (multi-select support)
- Respect thread uniqueness via internal IDs

**Enhanced UI Features:**
- Single "Display Filter" button opens modal workflow
- Select filter mode dropdown (victim/rootThread/terminal)
- Multi-select checkboxes with item details
- Select All / Deselect All shortcuts
- Active filter badge with quick clear
- Save named views (persisted to localStorage)
- Quick-load saved views from dropdown
- Export filtered views as PNG with descriptive filenames
- Manage saved views (load, export, delete)

**Visualization Engine Updates:**
- Updated loadInvestigation() to build provenance index
- Added helper methods: getAllAncestors(), getAllDescendants()
- Updated render() to accept visible node/edge filters
- Added public API: filterByVictim(), filterByRootThread(), filterByTerminal()
- Canvas renderer updated to honor visible sets

**Data Compatibility:**
- Works with existing .bats files (no schema changes)
- Handles both parentInternalIds and parentThreads field names
- Builds index dynamically from investigation data

**Use Cases:**
- "Show where V1 and V3 funds went" → Select V1 + V3, apply filter
- "Show all funds at Coinbase" → Select Coinbase terminals, backward trace
- "Compare first vs second transactions" → Save separate views for each
- Export focused views for court presentations

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 VISUALIZATION-FILTER-ENHANCED-UI.md | 747 ++++++++++++++++++++++++++++++++++++
 VISUALIZATION-FILTER-FOCUSED.md     | 708 ++++++++++++++++++++++++++++++++++
 bats-visualization-engine.js        | 511 ++++++++++++++++++------
 index.html                          | 607 +++++++++++++++++++++++++++++
 4 files changed, 2456 insertions(+), 117 deletions(-)
```

## Recent Commits History

- 96ee49a Add provenance-based visualization filtering with multi-select and saved views (0 seconds ago)
- 2035a72 Update CLAUDE.md with latest commit info (14 hours ago)
- 2c960c0 Update CLAUDE.md with latest commit info (14 hours ago)
- eb192ed Add LIBR (Lowest Intermediate Balance Rule) tracing method support (14 hours ago)
- ad5bf5c Fix getCurrentART to exclude terminal wallets from next hop ART (2 weeks ago)
- d9d1ded Revert "Fix hop auto-close bug when multiple threads are active" (2 weeks ago)
- b9556f9 Fix hop auto-close bug when multiple threads are active (2 weeks ago)
- 2a9a1a2 Update CLAUDE.md with latest commit info (2 weeks ago)
- 93d4bf3 Reposition ART box to appear below T-account instead of above (2 weeks ago)
- d3306b6 Fix hop increment for bridge output convergence - swaps don't create hops (3 weeks ago)

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
