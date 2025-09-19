# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-19 08:59)

**Commit:** f807b20a55221fe9b73f499a103f458bba9b22c3
**Author:** Your Name
**Message:** Simplify landing page and fix Address Finder CORS/CSP issues

- Redesigned landing page with clean header and card-based layout
- Created prominent card for BATS Documentation Tool
- Added smaller utility cards for PK Converter, Address Finder, and Training
- Fixed CSP blocking crypto-js by adding dynamic loading fallback
- Fixed CORS issues in Address Finder by adding proxy support
- Updated default CORS proxy to corsproxy.io (more reliable)
- Added CORS proxy test button in API Settings
- Added user prompts when CORS proxy not configured
- Hide navigation tabs on welcome screen for cleaner appearance

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  57 ++++------
 index.html | 359 ++++++++++++++++++++++++++++++++-----------------------------
 2 files changed, 209 insertions(+), 207 deletions(-)
```

## Recent Commits History

- f807b20 Simplify landing page and fix Address Finder CORS/CSP issues (1 second ago)
- 1305e25 Redesign landing page to emphasize B.A.T.S. as a documentation standard (2 hours ago)
- 10be1b4 Add production-ready PK Converter and Address Finder tools (2 hours ago)
- 5c52cc0 Add streamlined B.A.T.S. workflow with level selector (9 days ago)
- 2861c83 Add multi-output selection and change address tracking (10 days ago)
- 4d20525 Fix hop completion and thread status visualization issues (11 days ago)
- 7f4018d Improve transition from victims to Hop 1 with clearer guidance (11 days ago)
- 68b8964 Fix blockchain.info API field naming issue (11 days ago)
- 86b9ea0 Fix Bitcoin timestamp retrieval bug (11 days ago)
- ab704ec Fix Bitcoin timestamp handling and improve debugging (11 days ago)

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
