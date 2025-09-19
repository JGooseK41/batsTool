# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-19 09:39)

**Commit:** 96ebc4eb84f1697559a360e69c7dd09b855c0fd2
**Author:** Your Name
**Message:** Major UI restructuring: Clean landing page separate from app

- Separated landing page from BATS application UI
- Landing page now shows first with only essential elements
- All app UI (tabs, tracker, action bar) hidden until user enters BATS tool
- Added showLandingPage() and showAppUI() functions for proper state management
- Modified initialization to check if user is entering app or viewing landing
- Added returnToLanding() function to allow going back from app
- Fixed welcome screen to use fixed positioning as overlay
- Cleaned up navigation flow to be more intuitive

The app now properly shows a clean landing page first with:
- Brief explanation of BATS
- Main card to enter documentation tool
- Utility tool cards (PK Converter, Address Finder, Training)
- No unnecessary tabs or UI elements visible

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  33 +++++++--------
 index.html | 138 ++++++++++++++++++++++++++++++++++++++++++++++---------------
 2 files changed, 121 insertions(+), 50 deletions(-)
```

## Recent Commits History

- 96ebc4e Major UI restructuring: Clean landing page separate from app (0 seconds ago)
- f92e381 Simplify CORS handling to work seamlessly without user configuration (33 minutes ago)
- f807b20 Simplify landing page and fix Address Finder CORS/CSP issues (40 minutes ago)
- 1305e25 Redesign landing page to emphasize B.A.T.S. as a documentation standard (2 hours ago)
- 10be1b4 Add production-ready PK Converter and Address Finder tools (3 hours ago)
- 5c52cc0 Add streamlined B.A.T.S. workflow with level selector (9 days ago)
- 2861c83 Add multi-output selection and change address tracking (10 days ago)
- 4d20525 Fix hop completion and thread status visualization issues (11 days ago)
- 7f4018d Improve transition from victims to Hop 1 with clearer guidance (11 days ago)
- 68b8964 Fix blockchain.info API field naming issue (11 days ago)

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
