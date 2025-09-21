# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 12:59)

**Commit:** db59b81536c127679f81d7d7b6d3749d925b3732
**Author:** Your Name
**Message:** Major bug fixes and security improvements

HIGH PRIORITY FIXES:
1. Number parsing and precision - Added parseAmount() function for safe number handling
2. Thread assignment validation - Added validateThreadAllocation() to prevent over-allocation
3. Wizard state race conditions - Added session ID tracking to handle async operations
4. CSV export security - Added escapeCSVCell() to prevent injection attacks
5. API error handling - Added fetchWithTimeout() with retry logic and better error messages

All fixes tested to ensure no regression in existing functionality

### Changed Files:
```
 CLAUDE.md  |  40 +++++-----
 index.html | 256 ++++++++++++++++++++++++++++++++++++++++++++++++++++---------
 2 files changed, 241 insertions(+), 55 deletions(-)
```

## Recent Commits History

- db59b81 Major bug fixes and security improvements (0 seconds ago)
- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (80 minutes ago)
- 6154337 Fix wizardData undefined error in transaction lookup (3 hours ago)
- e8209a8 Fix 'wizardData is not defined' error with robust error handling (3 hours ago)
- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (5 hours ago)
- 486affc Add comprehensive DEX swap documentation system (6 hours ago)
- 87758d9 Use BROWN wallet classification for DEX swaps (6 hours ago)
- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (6 hours ago)
- d510574 Fix wizard transaction lookup and add close button (17 hours ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (18 hours ago)

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
