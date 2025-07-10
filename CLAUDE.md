# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 15:52)

**Commit:** 4295dde5c5c55caea88b406c4892cc65fcb6d94d
**Author:** Your Name
**Message:** Fix SSL certificate mismatch and improve domain handling

- Updated HTTPS enforcement to handle multiple trusted domains
- Added batstool.com to trusted domains list
- Created netlify.toml configuration file with:
  - Proper redirect rules for HTTPS enforcement
  - Security headers configuration
  - Cache control settings
  - CSP policy allowing required external APIs
- Made HTTPS redirect more intelligent (skip for localhost)
- Added domain validation to prevent redirect loops

To complete SSL setup:
1. Add batstool.com as custom domain in Netlify dashboard
2. Wait for automatic SSL certificate provisioning (5-15 mins)
3. Ensure DNS points to Netlify servers

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md    | 45 ++++++++++++++++++++++-----------------
 index.html   | 27 ++++++++++++++++++++----
 netlify.toml | 69 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 118 insertions(+), 23 deletions(-)
```

## Recent Commits History

- 4295dde Fix SSL certificate mismatch and improve domain handling (0 seconds ago)
- 13e9872 Add HTTPS enforcement and security features (2 minutes ago)
- f8a59a5 Fix critical transaction selection modal data population issue (13 minutes ago)
- 6a44eb2 Update B.A.T.S. training to emphasize documentation over identical results (19 minutes ago)
- c775b9a Create dedicated B.A.T.S. Training page (34 minutes ago)
- 4918949 Fix JavaScript errors and duplicate variable declarations (51 minutes ago)
- 5732873 Add comprehensive BATS Info tab and documentation (2 hours ago)
- fcbd8cd Add submit button to investigation setup card (4 hours ago)
- 5e7cad5 Improve UI workflow and fix transfer selection functionality (5 hours ago)
- d724e0c Redesign case details layout for improved UX (5 hours ago)

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
