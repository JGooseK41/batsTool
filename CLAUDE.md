# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 14:39)

**Commit:** 1558665c24c98d97856dd4ba142c537276bb0b3c
**Author:** Your Name
**Message:** Auto-update CLAUDE.md

### Changed Files:
```
 CLAUDE.md | 37 +++++++++++++++++++++++++------------
 1 file changed, 25 insertions(+), 12 deletions(-)
```

## Recent Commits History

- 1558665 Auto-update CLAUDE.md (1 second ago)
- 28311c6 Improve visual contrast for work area and input fields (19 seconds ago)
- 0ba9e4f Auto-update CLAUDE.md (7 minutes ago)
- 2c9a44e Enhance main work area visual differentiation (7 minutes ago)
- 7d2dff8 Remove rainbow colors from investigation progress cards (10 minutes ago)
- c535605 Auto-update CLAUDE.md with latest changes (16 minutes ago)
- 05061c1 Improve UI professionalism and focus (18 minutes ago)
- e417e92 Clean up UI by removing cluttered buttons and reorganizing menu (46 minutes ago)
- 0fe0e9d Separate landing page from app structure (4 hours ago)
- 007d264 Implement URL-based routing to fix single-click navigation (8 hours ago)

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
