# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-22 14:53)

**Commit:** 150f54c81f2b16a8b8b141c2bef9baeebc2f07f9
**Author:** Your Name
**Message:** Improve post-wizard UI clarity and workflow guidance

Major improvements to address user confusion after completing wizard entries:

1. Added showRemainingThreadsSummary() function
   - Shows alert with remaining threads after wizard completion
   - Lists each thread ID and available amount
   - Provides clear guidance on next steps

2. Enhanced hop UI with 'Threads Still to Trace' section
   - Visual list showing all remaining threads with amounts
   - Clear indication when all threads are fully traced
   - Better separation between completed work and next actions

3. Improved workflow transitions
   - Success message after entry creation
   - Auto-highlight 'Add Entry' button for next action
   - Clear visual hierarchy: completed entries → remaining threads → action buttons

This resolves the confusion where users didn't know:
- What threads still needed tracing
- Whether they had completed their current work
- What to do next after creating an entry

The UI now provides clear, contextual guidance throughout the tracing workflow.

### Changed Files:
```
 CLAUDE.md  | 42 ++++++++++++++++-------------
 index.html | 91 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----
 2 files changed, 108 insertions(+), 25 deletions(-)
```

## Recent Commits History

- 150f54c Improve post-wizard UI clarity and workflow guidance (0 seconds ago)
- 9fc5142 Fix wizard freeze when looking up transactions with single token transfer (26 hours ago)
- 3992784 Fix missing closing braces in lookupWizardTransaction (26 hours ago)
- 304c674 Fix syntax errors in lookupWizardTransaction (26 hours ago)
- 3b84fc6 Complete remaining bug fixes and optimizations (26 hours ago)
- db59b81 Major bug fixes and security improvements (26 hours ago)
- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (27 hours ago)
- 6154337 Fix wizardData undefined error in transaction lookup (29 hours ago)
- e8209a8 Fix 'wizardData is not defined' error with robust error handling (29 hours ago)
- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (31 hours ago)

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
