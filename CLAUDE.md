# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 14:29)

**Commit:** 7d2dff836747930af1bd333a4810ea58f26ea044
**Author:** Your Name
**Message:** Remove rainbow colors from investigation progress cards

- Replaced rainbow gradient colors in investigation statistics cards
- Changed from green/blue/purple/orange/pink gradients to consistent blue-gray scheme
- All progress cards now use #f8f9fa background with #3498db borders
- Total Traced card slightly emphasized with #e8f4f8 background
- Maintains professional appearance consistent with rest of UI

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 30 ++++++++----------------------
 index.html | 30 +++++++++++++++---------------
 2 files changed, 23 insertions(+), 37 deletions(-)
```

## Recent Commits History

- 7d2dff8 Remove rainbow colors from investigation progress cards (1 second ago)
- c535605 Auto-update CLAUDE.md with latest changes (6 minutes ago)
- 05061c1 Improve UI professionalism and focus (8 minutes ago)
- e417e92 Clean up UI by removing cluttered buttons and reorganizing menu (36 minutes ago)
- 0fe0e9d Separate landing page from app structure (4 hours ago)
- 007d264 Implement URL-based routing to fix single-click navigation (7 hours ago)
- 9080882 Fix landing page UX issues and improve navigation (8 hours ago)
- ccdd816 Final CLAUDE.md auto-update (22 hours ago)
- 86570d6 Update CLAUDE.md with latest commit information (22 hours ago)
- 10c1feb Fix landing page scrolling and improve tool purpose explanation (22 hours ago)

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
