# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 10:16)

**Commit:** 0fe0e9da9084ef8a63789413a3637280c83d9d95
**Author:** Your Name
**Message:** Separate landing page from app structure

- Moved landing page out of tab structure into its own container
- Landing page now in landingPageContainer, completely separate from app
- Fixed issue where landing page appeared as tab when entering app
- Updated show/hide functions to work with separated structure
- Cleaned up tab management to not interfere with landing page

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  29 +++---
 index.html | 335 ++++++++++++++++++++++++++++++-------------------------------
 2 files changed, 177 insertions(+), 187 deletions(-)
```

## Recent Commits History

- 0fe0e9d Separate landing page from app structure (1 second ago)
- 007d264 Implement URL-based routing to fix single-click navigation (3 hours ago)
- 9080882 Fix landing page UX issues and improve navigation (3 hours ago)
- ccdd816 Final CLAUDE.md auto-update (18 hours ago)
- 86570d6 Update CLAUDE.md with latest commit information (18 hours ago)
- 10c1feb Fix landing page scrolling and improve tool purpose explanation (18 hours ago)
- 57b7772 Transform landing page to professional dark theme design (18 hours ago)
- 23813d6 Simplify landing page with clean card-based design (20 hours ago)
- e0c57df Fix utility tools accessibility and update branding colors (20 hours ago)
- e2b2f8f Fix utility tools accessibility from landing page (20 hours ago)

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
