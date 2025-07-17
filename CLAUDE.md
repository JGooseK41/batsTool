# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 23:32)

**Commit:** 64c99a19cd89474a1f59ace8196d423fc020e12b
**Author:** Your Name
**Message:** Fix critical bugs in hop completion and validation

- Remove duplicate validateHopCompletion function (keep complete version)
- Remove duplicate getWalletColor functions
- Fix race condition in generateRootTotal with longer timeout
- Add missing openHopEntryWizard function for wizard functionality
- Comment out duplicate functions to avoid conflicts

Remaining known issues to fix:
- Custom currency validation
- Transaction duplicate detection
- Wallet address format validation
- DST timezone handling

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 45 ++++++++++++++++++++++++---------------------
 index.html | 19 +++++++++++--------
 2 files changed, 35 insertions(+), 29 deletions(-)
```

## Recent Commits History

- 64c99a1 Fix critical bugs in hop completion and validation (0 seconds ago)
- a3f9e29 Fix conversion tracking and UI issues (10 minutes ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (28 minutes ago)
- 558ebe9 Fix JavaScript errors - add missing walletTypes global and fix orphaned code (32 minutes ago)
- ebad042 Fix JavaScript errors in hop finalization (40 minutes ago)
- 1ca5ecd Fix hop finalization loop - add thread review before moving to next hop (47 minutes ago)
- 27b4b51 Fix manual entry modal and add debugging for thread availability (62 minutes ago)
- d3c18fa Add mobile device detection and automatic redirection (6 hours ago)
- 3e9c8e6 Add mobile showcase version for browsing B.A.T.S. capabilities (6 hours ago)
- 1af5938 Implement UI/UX improvements and bug fixes (6 hours ago)

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
