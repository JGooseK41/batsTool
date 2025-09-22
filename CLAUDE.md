# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-22 15:54)

**Commit:** a48616a2b28aab258b2cc93070cac670f5717e9c
**Author:** Your Name
**Message:** Streamline wizard workflow - entries now create directly without manual form step

- Fixed wizard to create entries directly when clicking 'Log Entry'
- Entries now appear collapsed immediately after creation
- Removed redundant manual form confirmation step
- Added notes field to both lookup and manual modes in wizard
- Fixed undefined finalizeHopEntry function error
- Improved user flow: wizard closes → entry appears collapsed → ready for next entry

### Changed Files:
```
 CLAUDE.md  |  63 +++++++++++++++++++--------------
 index.html | 118 +++++++++++++++++++++++++++++++++++++------------------------
 2 files changed, 108 insertions(+), 73 deletions(-)
```

## Recent Commits History

- a48616a Streamline wizard workflow - entries now create directly without manual form step (0 seconds ago)
- 150f54c Improve post-wizard UI clarity and workflow guidance (61 minutes ago)
- 9fc5142 Fix wizard freeze when looking up transactions with single token transfer (27 hours ago)
- 3992784 Fix missing closing braces in lookupWizardTransaction (27 hours ago)
- 304c674 Fix syntax errors in lookupWizardTransaction (27 hours ago)
- 3b84fc6 Complete remaining bug fixes and optimizations (27 hours ago)
- db59b81 Major bug fixes and security improvements (27 hours ago)
- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (28 hours ago)
- 6154337 Fix wizardData undefined error in transaction lookup (30 hours ago)
- e8209a8 Fix 'wizardData is not defined' error with robust error handling (30 hours ago)

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
