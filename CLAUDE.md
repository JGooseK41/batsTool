# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 14:21)

**Commit:** 05061c101b8d99514edfb239f38dc9c150e4674e
**Author:** Your Name
**Message:** Improve UI professionalism and focus

- Replaced rainbow/bright colors with consistent blue-gray professional color scheme
- Changed progress indicators from green to blue for consistency
- Updated step indicators to use subtle grays and blues instead of bright greens
- Enhanced main work panel with subtle blue border and shadow for better focus
- Converted validation panels from gradient backgrounds to bordered cards
- Standardized wallet display colors to be more muted and professional
- Removed excessive use of gradients in favor of clean, flat design
- Added subtle shadow effect to main panel to differentiate work area

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 44 ++++++++++++++++---------------
 index.html | 87 +++++++++++++++++++++++++++++++++++++++-----------------------
 2 files changed, 78 insertions(+), 53 deletions(-)
```

## Recent Commits History

- 05061c1 Improve UI professionalism and focus (0 seconds ago)
- e417e92 Clean up UI by removing cluttered buttons and reorganizing menu (28 minutes ago)
- 0fe0e9d Separate landing page from app structure (4 hours ago)
- 007d264 Implement URL-based routing to fix single-click navigation (7 hours ago)
- 9080882 Fix landing page UX issues and improve navigation (7 hours ago)
- ccdd816 Final CLAUDE.md auto-update (22 hours ago)
- 86570d6 Update CLAUDE.md with latest commit information (22 hours ago)
- 10c1feb Fix landing page scrolling and improve tool purpose explanation (22 hours ago)
- 57b7772 Transform landing page to professional dark theme design (22 hours ago)
- 23813d6 Simplify landing page with clean card-based design (24 hours ago)

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
