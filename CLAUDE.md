# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 17:00)

**Commit:** deb63629bcb307542ddf54a28dbaf314d4bef2d1
**Author:** Your Name
**Message:** Implement hop-centric DAG visualization for investigation traces

Created comprehensive Directed Acyclic Graph visualization that combines forensic tracing with T-account accounting principles:

## DAG Structure
- Hop-centric layout with vertical columns for each hop
- Wallet nodes positioned by first appearance in trace
- Thread edges showing amount flows between nodes
- T-account style ART (Available Running Total) boxes between hops

## Wallet Classification
- Color-coded nodes based on wallet behavior:
  - Red: Victim wallets
  - Purple: Terminal wallets (exchanges)
  - Orange: DEX/Bridge wallets
  - Yellow: Tumbler wallets
  - Blue: Smart contracts
  - Green: Normal wallets
  - Gray: Unknown wallets

## Visual Features
- Node size reflects transaction count
- Edge thickness represents relative amount
- ART validation boxes show starting/ending balances
- Multi-currency support with separate tracking
- Legend and summary statistics

## Integration
- Added flow-diagram-enhanced.js with complete DAG implementation
- Updated generateFlowDiagram() to use new visualization
- Maintains fallback to simple visualization if needed
- SVG-based for scalability and export capability

This visualization provides investigators with an intuitive view of fund flows, making it easy to identify patterns, validate amounts at each hop, and understand the complete trace path from victims to terminal wallets.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                |  38 ++-
 flow-diagram-enhanced.js | 737 +++++++++++++++++++++++++++++++++++++++++++++++
 index.html               |  27 +-
 3 files changed, 779 insertions(+), 23 deletions(-)
```

## Recent Commits History

- deb6362 Implement hop-centric DAG visualization for investigation traces (0 seconds ago)
- 313d765 Show investigation complete view when all threads reach terminal wallets (2 hours ago)
- 4c78dca Fix missing closing brace in template expression (2 hours ago)
- fcc2596 Add multi-currency progress bars for swapped assets (2 hours ago)
- 97cb71d Fix terminal wallet thread creation and display issues (2 hours ago)
- 9f06495 Fix terminal wallet allocation and thread tracking issues (3 hours ago)
- 0479806 Add comprehensive terminal wallet tracking and reporting system (4 hours ago)
- 8f66faa Implement dynamic wallet attribution via Etherscan API (4 hours ago)
- 3a6026f Add automatic exchange detection with Bybit and other major exchanges (4 hours ago)
- abe51e1 Fix Total Accounted display to not double-count swap amounts (4 hours ago)

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

## Next Steps
- Complete flow diagram visualization implementation
- Enhance multi-transfer selection UI
- Consider adding more blockchain support

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
