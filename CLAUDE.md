# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 11:24)

**Commit:** fcbd8cd142be5408026f653b69d910db58f19dae
**Author:** Your Name
**Message:** Add submit button to investigation setup card

- Add "Complete Setup & Continue" button for clear progression
- Implement field validation with visual feedback (red borders for empty fields)
- Auto-save case details when submitting
- Show success message and auto-navigate to victims tab
- Load existing values on page refresh
- Fix issue where card wasn't turning green without explicit submission

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 42 +++++++++++++++++------------------
 index.html | 75 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 96 insertions(+), 21 deletions(-)
```

## Recent Commits History

- fcbd8cd Add submit button to investigation setup card (0 seconds ago)
- 5e7cad5 Improve UI workflow and fix transfer selection functionality (5 minutes ago)
- d724e0c Redesign case details layout for improved UX (27 minutes ago)
- efa7956 Fix null reference error in updateValidationStatus (46 minutes ago)
- bdbe95c Fix initialization error by moving event listener inside DOMContentLoaded (47 minutes ago)
- 175069e Improve UI and fix transfer selection functionality (50 minutes ago)
- e376652 Fix transfer selection and add asset filter (80 minutes ago)
- 45fb983 Add Flow Diagram visualization - Phase 1 (88 minutes ago)
- 31ec874 Fix white screen issue when starting investigation (2 hours ago)
- 521a99d Implement required save with file path capture and autosave functionality (2 hours ago)

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
