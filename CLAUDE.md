# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-19 09:06)

**Commit:** f92e38183cad94117c99058c3af58fa03719c3d5
**Author:** Your Name
**Message:** Simplify CORS handling to work seamlessly without user configuration

- Remove CORS proxy configuration from API settings UI
- Implement automatic CORS proxy fallback that tries multiple proxies
- Add global fetchWithCORS() helper function
- Auto-enable CORS proxy with best available option (corsproxy.io)
- Update error messages to remove CORS configuration references
- Make Address Finder work out-of-the-box without setup

Users no longer need to configure CORS proxies - the app handles it automatically.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  43 +++++++++----------
 index.html | 142 ++++++++++++++++++++-----------------------------------------
 2 files changed, 68 insertions(+), 117 deletions(-)
```

## Recent Commits History

- f92e381 Simplify CORS handling to work seamlessly without user configuration (0 seconds ago)
- f807b20 Simplify landing page and fix Address Finder CORS/CSP issues (7 minutes ago)
- 1305e25 Redesign landing page to emphasize B.A.T.S. as a documentation standard (2 hours ago)
- 10be1b4 Add production-ready PK Converter and Address Finder tools (2 hours ago)
- 5c52cc0 Add streamlined B.A.T.S. workflow with level selector (9 days ago)
- 2861c83 Add multi-output selection and change address tracking (10 days ago)
- 4d20525 Fix hop completion and thread status visualization issues (11 days ago)
- 7f4018d Improve transition from victims to Hop 1 with clearer guidance (11 days ago)
- 68b8964 Fix blockchain.info API field naming issue (11 days ago)
- 86b9ea0 Fix Bitcoin timestamp retrieval bug (11 days ago)

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
