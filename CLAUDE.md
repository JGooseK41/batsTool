# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 13:08)

**Commit:** 3992784ea6cbe65fa45f1613c49025ae12af5181
**Author:** Your Name
**Message:** Fix missing closing braces in lookupWizardTransaction

- Added missing closing brace for else block (line 15113)
- Added missing closing brace for outer if block (line 14973)
- Fixed nested if-else structure for token transfer handling
- Resolved 'Unexpected token catch' syntax error

The function now has properly balanced block structures

### Changed Files:
```
 CLAUDE.md  | 39 ++++++++++++++++-----------------------
 index.html |  3 +++
 2 files changed, 19 insertions(+), 23 deletions(-)
```

## Recent Commits History

- 3992784 Fix missing closing braces in lookupWizardTransaction (0 seconds ago)
- 304c674 Fix syntax errors in lookupWizardTransaction (2 minutes ago)
- 3b84fc6 Complete remaining bug fixes and optimizations (7 minutes ago)
- db59b81 Major bug fixes and security improvements (9 minutes ago)
- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (89 minutes ago)
- 6154337 Fix wizardData undefined error in transaction lookup (4 hours ago)
- e8209a8 Fix 'wizardData is not defined' error with robust error handling (4 hours ago)
- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (5 hours ago)
- 486affc Add comprehensive DEX swap documentation system (6 hours ago)
- 87758d9 Use BROWN wallet classification for DEX swaps (7 hours ago)

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
