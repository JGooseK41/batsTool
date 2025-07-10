# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 15:19)

**Commit:** c775b9aee0c366a6e67c2c300e3b5a1bc90d589b
**Author:** Your Name
**Message:** Create dedicated B.A.T.S. Training page

- Created standalone training.html with comprehensive documentation
- Moved all educational content from BATS Info tab to dedicated page
- Added Training Materials button in main app navigation bar
- Removed BATS Info tab from main app navigation
- Training page includes all documentation: Overview, Methodology, V-T-H Notation, Wallet Colors, Golden Thread, Quick Start, FAQ, and Benefits
- Added smooth scrolling navigation and responsive design
- Maintains consistent styling with main application

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     |  51 ++--
 index.html    |   5 +-
 training.html | 884 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 908 insertions(+), 32 deletions(-)
```

## Recent Commits History

- c775b9a Create dedicated B.A.T.S. Training page (0 seconds ago)
- 4918949 Fix JavaScript errors and duplicate variable declarations (18 minutes ago)
- 5732873 Add comprehensive BATS Info tab and documentation (2 hours ago)
- fcbd8cd Add submit button to investigation setup card (4 hours ago)
- 5e7cad5 Improve UI workflow and fix transfer selection functionality (4 hours ago)
- d724e0c Redesign case details layout for improved UX (4 hours ago)
- efa7956 Fix null reference error in updateValidationStatus (5 hours ago)
- bdbe95c Fix initialization error by moving event listener inside DOMContentLoaded (5 hours ago)
- 175069e Improve UI and fix transfer selection functionality (5 hours ago)
- e376652 Fix transfer selection and add asset filter (5 hours ago)

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
