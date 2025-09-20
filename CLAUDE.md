# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 07:10)

**Commit:** 007d264c1646d2b64fb4bd67cbef74ac1bc9829e
**Author:** Your Name
**Message:** Implement URL-based routing to fix single-click navigation

- Changed landing page to load at index.html (no parameters)
- App/tool now loads at index.html?app=true
- Fixed double-click issue by navigating directly to app URL
- Added Home button in app navigation to return to landing page
- Moved welcome message to app initialization logic
- Clean separation between landing page and app states

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 41 ++++++++++++++++++++++++++---------------
 index.html | 59 ++++++++++++++++++++++++++++++++---------------------------
 2 files changed, 58 insertions(+), 42 deletions(-)
```

## Recent Commits History

- 007d264 Implement URL-based routing to fix single-click navigation (0 seconds ago)
- 9080882 Fix landing page UX issues and improve navigation (14 minutes ago)
- ccdd816 Final CLAUDE.md auto-update (15 hours ago)
- 86570d6 Update CLAUDE.md with latest commit information (15 hours ago)
- 10c1feb Fix landing page scrolling and improve tool purpose explanation (15 hours ago)
- 57b7772 Transform landing page to professional dark theme design (15 hours ago)
- 23813d6 Simplify landing page with clean card-based design (17 hours ago)
- e0c57df Fix utility tools accessibility and update branding colors (17 hours ago)
- e2b2f8f Fix utility tools accessibility from landing page (17 hours ago)
- 741a016 Fix syntax error in initializeApp function - remove extra closing parenthesis (17 hours ago)

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
