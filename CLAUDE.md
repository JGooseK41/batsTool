# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 22:52)

**Commit:** ebad04237d7ee3d8bd7ae8a3a6fc11f5ea711aa7
**Author:** Your Name
**Message:** Fix JavaScript errors in hop finalization

- Fix undefined confirmRootTotal by changing to generateRootTotal
- Move walletTypes to global scope to fix reference errors
- Remove duplicate walletTypes definitions
- Remove undefined walletTypeColors reference

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 37 +++++++++++++++++++++----------------
 index.html | 20 +++++---------------
 2 files changed, 26 insertions(+), 31 deletions(-)
```

## Recent Commits History

- ebad042 Fix JavaScript errors in hop finalization (0 seconds ago)
- 1ca5ecd Fix hop finalization loop - add thread review before moving to next hop (7 minutes ago)
- 27b4b51 Fix manual entry modal and add debugging for thread availability (22 minutes ago)
- d3c18fa Add mobile device detection and automatic redirection (6 hours ago)
- 3e9c8e6 Add mobile showcase version for browsing B.A.T.S. capabilities (6 hours ago)
- 1af5938 Implement UI/UX improvements and bug fixes (6 hours ago)
- 6a29b42 Improve victim workflow and fix hop entry timestamps (6 hours ago)
- 29e2b27 Major UI/UX improvements and token transfer fix (7 hours ago)
- c4f0890 Reorganize case setup workflow (7 hours ago)
- 260d643 Enhance welcome screen and onboarding workflow (7 hours ago)

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
