# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-19 14:16)

**Commit:** e2b2f8f0095f195c5b4a70a888cc6722af1b1eb4
**Author:** Your Name
**Message:** Fix utility tools accessibility from landing page

- Updated openPKConverter() and openAddressFinder() to ensure modals display properly
- Set z-index to 10000 for modals to appear above landing page
- Added null checks to prevent errors when elements don't exist
- Fixed modal display issues so tools are accessible without entering the app

The PK Converter and Address Finder tools can now be opened directly from the landing page cards.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 43 ++++++++++++-------------------------------
 index.html | 36 ++++++++++++++++++++++++++++--------
 2 files changed, 40 insertions(+), 39 deletions(-)
```

## Recent Commits History

- e2b2f8f Fix utility tools accessibility from landing page (0 seconds ago)
- 741a016 Fix syntax error in initializeApp function - remove extra closing parenthesis (3 minutes ago)
- 96ebc4e Major UI restructuring: Clean landing page separate from app (5 hours ago)
- f92e381 Simplify CORS handling to work seamlessly without user configuration (5 hours ago)
- f807b20 Simplify landing page and fix Address Finder CORS/CSP issues (5 hours ago)
- 1305e25 Redesign landing page to emphasize B.A.T.S. as a documentation standard (7 hours ago)
- 10be1b4 Add production-ready PK Converter and Address Finder tools (7 hours ago)
- 5c52cc0 Add streamlined B.A.T.S. workflow with level selector (9 days ago)
- 2861c83 Add multi-output selection and change address tracking (10 days ago)
- 4d20525 Fix hop completion and thread status visualization issues (11 days ago)

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
