# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 11:40)

**Commit:** 9196e899a8ba751f5f559411384a59823b4ee91e
**Author:** Your Name
**Message:** Fix currency filtering in wizard to only show outputs matching tracked currency

- Filter transaction outputs to only show transfers matching the source thread currency
- When tracking USDC, ETH transfers are now properly ignored
- Updated multiple output detection to use filtered transfers
- Display currency name in output count message for clarity

### Changed Files:
```
 CLAUDE.md  | 37 +++++++++++------------------
 index.html | 78 +++++++++++++++++++++++++++++++++++++++++++++++---------------
 2 files changed, 72 insertions(+), 43 deletions(-)
```

## Recent Commits History

- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (1 second ago)
- 6154337 Fix wizardData undefined error in transaction lookup (2 hours ago)
- e8209a8 Fix 'wizardData is not defined' error with robust error handling (2 hours ago)
- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (4 hours ago)
- 486affc Add comprehensive DEX swap documentation system (5 hours ago)
- 87758d9 Use BROWN wallet classification for DEX swaps (5 hours ago)
- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (5 hours ago)
- d510574 Fix wizard transaction lookup and add close button (15 hours ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (17 hours ago)
- e10954c Strengthen currency separation to ensure proper scaling (17 hours ago)

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
