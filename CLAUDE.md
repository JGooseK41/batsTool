# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 20:29)

**Commit:** d5105740f70d45df9b0f8474b7f23034a94aa033
**Author:** Your Name
**Message:** Fix wizard transaction lookup and add close button

- Added X close button to wizard modal for better UX
- Fixed 'wizardData is not defined' error by adding safety checks
- Added validation to ensure window.hopWizardData exists before use
- Added error handling for cases where wizard state is lost
- Improved error messages to guide users when wizard needs to be reopened

### Changed Files:
```
 CLAUDE.md  | 37 ++++++++++++++++---------------------
 index.html | 37 ++++++++++++++++++++++++++++++++++---
 2 files changed, 50 insertions(+), 24 deletions(-)
```

## Recent Commits History

- d510574 Fix wizard transaction lookup and add close button (0 seconds ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (2 hours ago)
- e10954c Strengthen currency separation to ensure proper scaling (2 hours ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (2 hours ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (6 hours ago)
- 1558665 Auto-update CLAUDE.md (6 hours ago)
- 28311c6 Improve visual contrast for work area and input fields (6 hours ago)
- 0ba9e4f Auto-update CLAUDE.md (6 hours ago)
- 2c9a44e Enhance main work area visual differentiation (6 hours ago)
- 7d2dff8 Remove rainbow colors from investigation progress cards (6 hours ago)

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
