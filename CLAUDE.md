# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-30 08:52)

**Commit:** 470563dbf30d1afdf50d906a8969d3ce3f5639f5
**Author:** Your Name
**Message:** Implement modern, cutting-edge graph visualization system

Major visualization improvements:
- Removed redundant simple flow diagram section - now using only enhanced version
- Implemented smart edge angle calculation based on output count for uniform appearance
- Created optimal node positioning algorithm to minimize edge crossings
- Added clickable nodes with detailed modal showing inbound/outbound threads
- Implemented brown diamond nodes for conversion wallets/swaps
- Modernized visual design with gradients, shadows, and smooth transitions
- Added smooth entrance animations for nodes and edges
- Enhanced pan and zoom with smooth cubic-bezier transitions

Visual improvements:
- Modern gradient fills for all node types (red, purple, black, brown, etc.)
- Drop shadows and hover effects for depth
- Smooth curved edges with calculated angles
- Animated edge flow indicators
- Clean, modern typography with Inter and SF Mono fonts
- Backdrop blur effects on modals
- Conversion wallets shown as brown diamonds positioned vertically

Interaction features:
- Click any node to see full wallet details
- Click threads to view original entry form data
- Smooth pan with grab cursor
- Scroll wheel zoom with limits
- Hover effects on all interactive elements

The visualization now looks sharp, modern, and professional rather than dated.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  43 +++--
 index.html | 619 +++++++++++++++++++++++++++++++++++++++++++++++++++++++------
 2 files changed, 580 insertions(+), 82 deletions(-)
```

## Recent Commits History

- 470563d Implement modern, cutting-edge graph visualization system (0 seconds ago)
- 2402812 Add Save Investigation button to trace completion modals (12 minutes ago)
- 78a86cb Add 'Edit Entries' option to investigation completion modal (2 hours ago)
- 7298723 Fix write-off modal auto-log and add color-coded backgrounds for entries (2 hours ago)
- 48a0820 Simplify entry type selection and rename cold storage option (2 hours ago)
- 30619e1 Fix critical bugs in partial trace calculations and add multi-chain test suite (5 hours ago)
- 8f9c550 Fix bridge output button unresponsive due to variable initialization error (5 hours ago)
- e282f88 Prevent hop finalization when threads are at conversion wallets (5 hours ago)
- 2a6ad63 Add detailed calculation notes for partial trace bridge outputs (5 hours ago)
- 33e0337 Fix bridge output calculation for partial traces (5 hours ago)

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
