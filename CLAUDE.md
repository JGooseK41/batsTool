# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-06 08:31)

**Commit:** 9f48c458fc94b1819156e929e9da79447b60b9b2
**Author:** Your Name
**Message:** Resurrect audit trail and integrate wallet indexes into Reports tab

- Added comprehensive Reports tab with proper sections:
  - Case information header
  - Universal Wallet Index (all wallets chronologically)
  - Red Wallet Index (victim wallets)
  - Purple Wallet Index (terminal/exchange wallets)
  - Technical Audit Trail (complete transaction flow)
  - Investigation Narrative section

- Fixed "Skip to Reports" button to actually navigate to reports
- Calls generateReportContent() to populate all sections
- Technical audit trail shows hierarchical hop structure with:
  - Initial stolen funds
  - Each hop with entries, threads, conversions
  - Terminal wallets and write-offs
  - Complete V-T-H notation tracking

- Wallet indexes displayed in styled tables
- Ready for export to PDF/HTML

Fixes blank reports tab and restores audit trail functionality.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  50 +++++++++---------
 index.html | 167 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 190 insertions(+), 27 deletions(-)
```

## Recent Commits History

- 9f48c45 Resurrect audit trail and integrate wallet indexes into Reports tab (1 second ago)
- bc167ab Use universal wallet index as master source of truth for wallet IDs (7 minutes ago)
- 7822eb6 Add visual separation to nested T-accounts for clarity (11 minutes ago)
- 08bf82a Implement nested T-accounts with clear balance lines (22 minutes ago)
- 9ecb32d Track both conversion and disposition of swapped assets in same hop (33 minutes ago)
- f0a04df Fix T-account balance - add CONVERTED section to track swapped currencies (35 minutes ago)
- 0885f15 Redesign hop reconciliation using forensic accounting T-account principles (39 minutes ago)
- 3c991d0 Revert edge routing back to smooth curves (48 minutes ago)
- 56b4427 Change edge routing to use sharp angles instead of curves (71 minutes ago)
- 3b6db8e Fix arrowhead connection - edge paths now terminate at arrow center (73 minutes ago)

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
