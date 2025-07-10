# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 11:19)

**Commit:** 5e7cad5ba7a9095e522b0f0f12a32277cca66e48
**Author:** Your Name
**Message:** Improve UI workflow and fix transfer selection functionality

- Add color-coded cards with clear workflow definition (Step 1a, 1b, Step 2)
- Implement collapsible investigation setup card with green completion state
- Auto-collapse setup card when navigating to victim transactions
- Highlight transaction hash field as primary starting point with blue background
- Fix transfer selection modal by correcting event.target reference error
- Improve visual hierarchy and user guidance throughout the application

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  52 ++++++++++++++++++++++++-------
 index.html | 104 ++++++++++++++++++++++++++++++++++++++++++++++++++-----------
 2 files changed, 125 insertions(+), 31 deletions(-)
```

## Recent Commits History

- 5e7cad5 Improve UI workflow and fix transfer selection functionality (0 seconds ago)
- d724e0c Redesign case details layout for improved UX (22 minutes ago)
- efa7956 Fix null reference error in updateValidationStatus (41 minutes ago)
- bdbe95c Fix initialization error by moving event listener inside DOMContentLoaded (42 minutes ago)
- 175069e Improve UI and fix transfer selection functionality (45 minutes ago)
- e376652 Fix transfer selection and add asset filter (75 minutes ago)
- 45fb983 Add Flow Diagram visualization - Phase 1 (83 minutes ago)
- 31ec874 Fix white screen issue when starting investigation (2 hours ago)
- 521a99d Implement required save with file path capture and autosave functionality (2 hours ago)
- a7852cd Add terminal wallet popup notification for detected exchanges (2 hours ago)

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
