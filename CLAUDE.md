# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 13:17)

**Commit:** 9fc5142031627739750d0ca2eb17052c276ed861
**Author:** Your Name
**Message:** Fix wizard freeze when looking up transactions with single token transfer

The wizard was getting stuck in a loop when a transaction had exactly one token transfer
after currency filtering. The issue was caused by:

1. When relevantTransfers.length === 1, the code would set txData but not exit
2. Execution would fall through and process the same transfer again
3. This caused duplicate processing and UI updates

Fixed by:
- Adding early return after handling multi-output selection UI
- Properly structuring the if-else flow for single vs multiple transfers
- Ensuring single transfers are processed only once
- Fixed indentation and removed redundant else blocks

### Changed Files:
```
 CLAUDE.md  | 33 +++++++++++++-------------
 index.html | 79 +++++++++++++++++++++++++++++++++-----------------------------
 2 files changed, 59 insertions(+), 53 deletions(-)
```

## Recent Commits History

- 9fc5142 Fix wizard freeze when looking up transactions with single token transfer (0 seconds ago)
- 3992784 Fix missing closing braces in lookupWizardTransaction (8 minutes ago)
- 304c674 Fix syntax errors in lookupWizardTransaction (11 minutes ago)
- 3b84fc6 Complete remaining bug fixes and optimizations (15 minutes ago)
- db59b81 Major bug fixes and security improvements (18 minutes ago)
- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (2 hours ago)
- 6154337 Fix wizardData undefined error in transaction lookup (4 hours ago)
- e8209a8 Fix 'wizardData is not defined' error with robust error handling (4 hours ago)
- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (5 hours ago)
- 486affc Add comprehensive DEX swap documentation system (7 hours ago)

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
