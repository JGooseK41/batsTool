# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-22 16:25)

**Commit:** f89a74e26c15e124da9d222c1bd5a4f70fed5194
**Author:** Your Name
**Message:** Major improvements to swap handling and UI/UX enhancements

Swap Wizard Improvements:
- Created dedicated swap wizard with full manual control
- Support for both DEX (on-chain) and CEX (off-chain) swaps
- Manual input for output amounts and currencies
- Handles complex swaps that automation might miss
- Proper BROWN wallet classification for swap services

UI/UX Improvements:
- Changed 'Add Transaction' to 'Add Entry' throughout app
- Auto-collapse completed hops when proceeding to next hop
- Fixed DEX/swap entry creation that was auto-closing hop
- Streamlined wizard workflow for direct entry creation
- Added notes field to both lookup and manual modes

Documentation:
- Added comprehensive hop/entry/source thread explainer to FAQ
- Clarified terminology: Transaction vs Hop vs Entry vs Source Thread
- Added visual flow examples in documentation

Bug Fixes:
- Fixed undefined finalizeHopEntry function error
- Fixed wizard not collapsing entries after creation
- Fixed swap entries not allowing proper input

### Changed Files:
```
 CLAUDE.md        |  61 ++++------
 docs/BATS-FAQ.md |  44 ++++++-
 index.html       | 365 +++++++++++++++++++++++++++++++++++++++++++++++++++++--
 3 files changed, 421 insertions(+), 49 deletions(-)
```

## Recent Commits History

- f89a74e Major improvements to swap handling and UI/UX enhancements (0 seconds ago)
- a48616a Streamline wizard workflow - entries now create directly without manual form step (31 minutes ago)
- 150f54c Improve post-wizard UI clarity and workflow guidance (2 hours ago)
- 9fc5142 Fix wizard freeze when looking up transactions with single token transfer (27 hours ago)
- 3992784 Fix missing closing braces in lookupWizardTransaction (27 hours ago)
- 304c674 Fix syntax errors in lookupWizardTransaction (27 hours ago)
- 3b84fc6 Complete remaining bug fixes and optimizations (27 hours ago)
- db59b81 Major bug fixes and security improvements (27 hours ago)
- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (29 hours ago)
- 6154337 Fix wizardData undefined error in transaction lookup (31 hours ago)

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
