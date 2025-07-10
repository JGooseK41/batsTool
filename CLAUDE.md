# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 15:01)

**Commit:** 49189494f12a2cbebd998c29b9f4e6ef5c3e277f
**Author:** Your Name
**Message:** Fix JavaScript errors and duplicate variable declarations

- Fixed duplicate txHashInput variable declarations by renaming to unique names
- Made switchTab, toggleFileMenu, and validateAndProceedSetup globally accessible
- Resolved scope issues causing "function not defined" errors
- BATS Info tab now functions correctly

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 53 +++++++++++++++++++++++++++++++----------------------
 index.html | 23 +++++++++++++++--------
 2 files changed, 46 insertions(+), 30 deletions(-)
```

## Recent Commits History

- 4918949 Fix JavaScript errors and duplicate variable declarations (0 seconds ago)
- 5732873 Add comprehensive BATS Info tab and documentation (2 hours ago)
- fcbd8cd Add submit button to investigation setup card (4 hours ago)
- 5e7cad5 Improve UI workflow and fix transfer selection functionality (4 hours ago)
- d724e0c Redesign case details layout for improved UX (4 hours ago)
- efa7956 Fix null reference error in updateValidationStatus (4 hours ago)
- bdbe95c Fix initialization error by moving event listener inside DOMContentLoaded (4 hours ago)
- 175069e Improve UI and fix transfer selection functionality (4 hours ago)
- e376652 Fix transfer selection and add asset filter (5 hours ago)
- 45fb983 Add Flow Diagram visualization - Phase 1 (5 hours ago)

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
