# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 09:33)

**Commit:** e8209a8506c12c715eb292893bcb627db6957ede
**Author:** Your Name
**Message:** Fix 'wizardData is not defined' error with robust error handling

Added Safety Checks:
- Check for window.hopWizardData existence in showHopWizardStep
- Check for wizardData in updateWizardTotal function
- Better error messages when wizard session is lost
- Added 'Close Wizard' button in error states

Improved Error Handling:
- Transaction lookup now shows specific session error if wizardData is lost
- Clear instructions to close and restart wizard if session error occurs
- Console logging for debugging when wizardData is missing

User Experience:
- Clearer error messages explaining what happened
- One-click close button to exit broken wizard state
- Prevents undefined reference errors from crashing the wizard

### Changed Files:
```
 CLAUDE.md  | 67 +++++++++++++++++++-------------------------------------------
 index.html | 45 +++++++++++++++++++++++++++++++++++------
 2 files changed, 59 insertions(+), 53 deletions(-)
```

## Recent Commits History

- e8209a8 Fix 'wizardData is not defined' error with robust error handling (0 seconds ago)
- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (2 hours ago)
- 486affc Add comprehensive DEX swap documentation system (3 hours ago)
- 87758d9 Use BROWN wallet classification for DEX swaps (3 hours ago)
- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (3 hours ago)
- d510574 Fix wizard transaction lookup and add close button (13 hours ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (15 hours ago)
- e10954c Strengthen currency separation to ensure proper scaling (15 hours ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (15 hours ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (19 hours ago)

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
