# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 22:31)

**Commit:** 6d41977bb3fcf4a9d44f7e9b0d362d20fd903f46
**Author:** Your Name
**Message:** Add comprehensive PDF report export for case presentations

Created a printer-friendly PDF report perfect for legal proceedings and case presentations:

## PDF Report Features
- Professional header with case ID, investigator, and date
- Investigation summary with key statistics grid
- Victim information table with losses and wallets
- Full-page fund flow visualization graph
- Terminal wallet (exchange) analysis section
- Complete transaction flow details by hop
- Legal action guidance for asset recovery
- Print-optimized CSS with page breaks
- Browser print dialog for PDF generation

## Enhanced All Export Formats
- PNG exports now include case header (Case ID, Investigator, Date)
- SVG exports include metadata header section
- All formats properly labeled with investigation details
- Consistent naming convention with case ID and date

## Export Dialog Updates
- PDF option now describes comprehensive report capability
- Emphasizes suitability for court filings and legal proceedings
- Clear differentiation between format purposes

## Report Sections
1. Investigation Summary (6 key metrics)
2. Victim Information with contact details
3. Graph Visualization (full page)
4. Terminal Wallet Analysis with exchange details
5. Transaction Flow Details (all hops)
6. Legal disclaimers and timestamps

This provides investigators with a professional, court-ready document that includes all investigation details in a clear, organized format suitable for presentation to legal teams, law enforcement, and judicial proceedings.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  73 +++++----
 index.html | 489 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----
 2 files changed, 482 insertions(+), 80 deletions(-)
```

## Recent Commits History

- 6d41977 Add comprehensive PDF report export for case presentations (0 seconds ago)
- ba22286 Enhanced UI to highlight PNG metadata embedding feature (5 minutes ago)
- 542a891 Add PNG metadata embedding for round-trip export/import (8 minutes ago)
- 206b607 Enhanced graph UX: clickable transaction lines, export dialog, and improved scrolling (15 minutes ago)
- 09dcf23 Enforce terminal wallet treatment for exchange arrivals (30 minutes ago)
- fbbcd7e Add protection against adding entries to fully allocated hops (38 minutes ago)
- 3d0af9d Fix syntax error - remove extra closing brace at end of file (47 minutes ago)
- 5dcf6fa Implement progressive disclosure and improved spatial organization for DAG (50 minutes ago)
- 1caa390 Implement T-account DAG visualization with hop-centric ART reconciliation (63 minutes ago)
- f47cb44 Add comprehensive graph visualization with proper navigation from trace completion (79 minutes ago)

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
