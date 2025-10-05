# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-05 16:59)

**Commit:** bf1cfdee5db5ebe45b6fa43244463c90db91a2a2
**Author:** Your Name
**Message:** Add drag-and-drop nodes and enhanced modal popups

**Drag & Drop Features:**
- Nodes can now be dragged vertically within their columns
- Edges automatically update positions during drag
- Constrained to vertical movement only (stays in column)
- Cursor changes to grabbing during drag
- All connected threads move with the node

**Enhanced Wallet Modal:**
- Professional popup modal with color-coded wallet ID badge
- Full wallet address with copy button
- Total incoming/outgoing funds display
- List of all unique VTH notations connected to wallet
- Wallet type and special flags (swap, terminal, etc.)
- Click outside or Close button to dismiss

**Enhanced Thread/Edge Modal:**
- Comprehensive entry details in professional layout
- Shows notation, amount, entry type
- Source thread and destination wallet
- Transaction hash with copy button
- Timestamp if available
- Special swap/conversion section with input→output display
- Entry notes preserved and displayed
- All metadata from hop entry visible

Both modals replace simple alert() dialogs with rich, styled popups.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                |  39 +++---
 bats-d3-visualization.js | 346 ++++++++++++++++++++++++++++++++++++++++++-----
 2 files changed, 330 insertions(+), 55 deletions(-)
```

## Recent Commits History

- bf1cfde Add drag-and-drop nodes and enhanced modal popups (0 seconds ago)
- bb5dee7 Fix layer ordering: nodes and edges now visible above backgrounds (4 minutes ago)
- 4293663 Fix amount parsing error in reconciliation display (6 minutes ago)
- 3b9b6b0 Update CLAUDE.md with latest commit info (8 minutes ago)
- 5ba1cdd Implement hop column T-account reconciliation system (9 minutes ago)
- 2dfd7ff Implement complete Sankey diagram visualization for BATS (27 minutes ago)
- 2e34fb4 Add interactive click handlers: view wallet details and thread notes (30 minutes ago)
- 39243dc Add wallet IDs and increase spacing to prevent text overlap (32 minutes ago)
- db3497d Add DEX/conversion nodes in hop spaces with dual-currency flow (35 minutes ago)
- 623ed32 Redesign layout: Wallet columns with shaded backgrounds, hop spaces between (38 minutes ago)

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
