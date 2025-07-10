# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 10:57)

**Commit:** d724e0c78036e83f31df9c7ae5a499d9564fb93a
**Author:** Your Name
**Message:** Redesign case details layout for improved UX

- Move case details card from sidebar to above welcome tab
- Convert from vertical to horizontal layout using CSS Grid
- Make form fields responsive with auto-fit columns
- Remove sidebar/main panel split for cleaner interface
- Improve visual flow for more intuitive investigation setup

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 40 ++++++++++++++++++++++++++++++++++++++++
 index.html | 52 ++++++++++++++++++++++++++++++++--------------------
 2 files changed, 72 insertions(+), 20 deletions(-)
```

## Recent Commits History

- d724e0c Redesign case details layout for improved UX (0 seconds ago)
- efa7956 Fix null reference error in updateValidationStatus (19 minutes ago)
- bdbe95c Fix initialization error by moving event listener inside DOMContentLoaded (20 minutes ago)
- 175069e Improve UI and fix transfer selection functionality (23 minutes ago)
- e376652 Fix transfer selection and add asset filter (53 minutes ago)
- 45fb983 Add Flow Diagram visualization - Phase 1 (61 minutes ago)
- 31ec874 Fix white screen issue when starting investigation (79 minutes ago)
- 521a99d Implement required save with file path capture and autosave functionality (86 minutes ago)
- a7852cd Add terminal wallet popup notification for detected exchanges (2 hours ago)
- ba07f89 Add wallet entity detection to identify exchanges automatically (2 hours ago)


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
