# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 17:12)

**Commit:** d3c18fae944042c264ff9f05fda1143e7e7da5ab
**Author:** Your Name
**Message:** Add mobile device detection and automatic redirection

- Implement automatic mobile detection in index.html
- Show confirmation dialog before redirecting to mobile version
- Add user preference storage to remember desktop/mobile choice
- Add "Mobile Version" button to desktop navigation
- Add "View Desktop Version" link to mobile footer
- Show notice bar when desktop users view mobile version
- Clear preferences when manually switching versions

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md   | 36 +++++++++++++++++-------------------
 index.html  | 33 +++++++++++++++++++++++++++++++++
 mobile.html | 30 +++++++++++++++++++++++++++++-
 3 files changed, 79 insertions(+), 20 deletions(-)
```

## Recent Commits History

- d3c18fa Add mobile device detection and automatic redirection (0 seconds ago)
- 3e9c8e6 Add mobile showcase version for browsing B.A.T.S. capabilities (6 minutes ago)
- 1af5938 Implement UI/UX improvements and bug fixes (9 minutes ago)
- 6a29b42 Improve victim workflow and fix hop entry timestamps (38 minutes ago)
- 29e2b27 Major UI/UX improvements and token transfer fix (55 minutes ago)
- c4f0890 Reorganize case setup workflow (2 hours ago)
- 260d643 Enhance welcome screen and onboarding workflow (2 hours ago)
- fdb325b Enhance hop entry wizard with manual entry and better control options (5 days ago)
- 2ccef07 Improve hop progression clarity and finalization UX (5 days ago)
- 9e8eb55 Fix persistent JavaScript errors in hop creation and wallet index (5 days ago)

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
