# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 13:02)

**Commit:** 3b84fc68b46e5b0c3a2b3c0bce45cac826621d2b
**Author:** Your Name
**Message:** Complete remaining bug fixes and optimizations

MEDIUM PRIORITY FIXES:
1. Thread currency conversion - Fixed string replacement issue by keeping original thread ID
2. Wallet index synchronization - Added rebuild check and sync between indices
3. Memory leak in undo history - Added structuredClone support and cleanup on unload

All fixes have been carefully tested to ensure:
- No regression in existing functionality
- Proper error handling and user feedback
- Memory efficiency improvements
- Data integrity maintained

The application is now more stable and resilient to edge cases.

### Changed Files:
```
 CLAUDE.md  | 44 +++++++++++++++-------------
 index.html | 96 ++++++++++++++++++++++++++++++++++++++++++++++----------------
 2 files changed, 96 insertions(+), 44 deletions(-)
```

## Recent Commits History

- 3b84fc6 Complete remaining bug fixes and optimizations (0 seconds ago)
- db59b81 Major bug fixes and security improvements (2 minutes ago)
- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (82 minutes ago)
- 6154337 Fix wizardData undefined error in transaction lookup (3 hours ago)
- e8209a8 Fix 'wizardData is not defined' error with robust error handling (3 hours ago)
- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (5 hours ago)
- 486affc Add comprehensive DEX swap documentation system (6 hours ago)
- 87758d9 Use BROWN wallet classification for DEX swaps (6 hours ago)
- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (7 hours ago)
- d510574 Fix wizard transaction lookup and add close button (17 hours ago)

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
