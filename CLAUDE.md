# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 09:39)

**Commit:** 6154337969478a424463a75fee83f2ca6f037405
**Author:** Your Name
**Message:** Fix wizardData undefined error in transaction lookup

- Fixed missing 'window.' prefix on line 14899
- Changed wizardData.outputClassifications to window.hopWizardData.outputClassifications
- This was causing ReferenceError when looking up transactions with multiple outputs
- All wizardData references now properly use window.hopWizardData

### Changed Files:
```
 CLAUDE.md  | 51 +++++++++++++++++++++++++++++++--------------------
 index.html |  4 ++--
 2 files changed, 33 insertions(+), 22 deletions(-)
```

## Recent Commits History

- 6154337 Fix wizardData undefined error in transaction lookup (0 seconds ago)
- e8209a8 Fix 'wizardData is not defined' error with robust error handling (6 minutes ago)
- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (2 hours ago)
- 486affc Add comprehensive DEX swap documentation system (3 hours ago)
- 87758d9 Use BROWN wallet classification for DEX swaps (3 hours ago)
- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (3 hours ago)
- d510574 Fix wizard transaction lookup and add close button (13 hours ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (15 hours ago)
- e10954c Strengthen currency separation to ensure proper scaling (15 hours ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (16 hours ago)

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
