# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-30 09:30)

**Commit:** 13f52d2222c3585ab7ad4a4d638a41e12b144b4c
**Author:** Your Name
**Message:** Implement comprehensive professional reporting system

Created dedicated Reports tab with six sub-sections as specified:

1. Cover Page:
   - Case ID, investigator, agency, date
   - Case type and synopsis
   - Investigation summary metrics

2. Victim Index:
   - Complete victim listing with details
   - Total loss amounts
   - Contact information

3. Red Wallet Index:
   - All victim deposit wallets
   - V-T notation tracking
   - Amounts and dates

4. Terminal Wallet Index:
   - Exchange arrivals
   - Wallet addresses and amounts
   - Hop tracking

5. Narrative Report:
   - Custom text editor (NOT auto-generated)
   - Rich text formatting tools (bold, italic, underline, lists)
   - Save functionality to preserve narrative
   - Investigator writes their own analysis

6. Technical Audit Trail:
   - Hop-by-hop documentation
   - Opening ART for each hop
   - All entries with transaction notes
   - Hop reconciliation showing:
     - Terminal deposits
     - Continuing threads
     - Write-offs
     - ART validation
   - Mathematical validation between hops

Export Features:
- Export individual tabs
- Export complete report with all sections
- Multiple format options (PDF, Word, HTML)
- Print preview functionality
- Page breaks for professional layout

The system creates court-ready documentation with proper hop-based technical audit trail showing all transaction notes and mathematical validations.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  56 +++---
 index.html | 625 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 646 insertions(+), 35 deletions(-)
```

## Recent Commits History

- 13f52d2 Implement comprehensive professional reporting system (0 seconds ago)
- 8588d1c Fix conversion wallet diamond positioning within hops (29 minutes ago)
- 470563d Implement modern, cutting-edge graph visualization system (38 minutes ago)
- 2402812 Add Save Investigation button to trace completion modals (50 minutes ago)
- 78a86cb Add 'Edit Entries' option to investigation completion modal (2 hours ago)
- 7298723 Fix write-off modal auto-log and add color-coded backgrounds for entries (3 hours ago)
- 48a0820 Simplify entry type selection and rename cold storage option (3 hours ago)
- 30619e1 Fix critical bugs in partial trace calculations and add multi-chain test suite (5 hours ago)
- 8f9c550 Fix bridge output button unresponsive due to variable initialization error (5 hours ago)
- e282f88 Prevent hop finalization when threads are at conversion wallets (6 hours ago)

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
