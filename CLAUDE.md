# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 06:35)

**Commit:** 87758d910811796013278ccaa72abfe2fc153613
**Author:** Your Name
**Message:** Use BROWN wallet classification for DEX swaps

- BROWN wallets now automatically assigned to DEX/swap transactions
- When source currency differs from output currency, marks as BROWN
- Updated swap detection warnings to mention BROWN classification
- Works for both single and multiple output transactions
- Clear visual indicator in UI that swap wallets are BROWN (Asset Conversion)
- Maintains proper wallet color semantics per BATS methodology

### Changed Files:
```
 CLAUDE.md  | 55 +++++++++++++++++++++++++++++++-------------------
 index.html | 68 +++++++++++++++++++++++++++++++++++++++++++++++++++++---------
 2 files changed, 92 insertions(+), 31 deletions(-)
```

## Recent Commits History

- 87758d9 Use BROWN wallet classification for DEX swaps (0 seconds ago)
- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (4 minutes ago)
- d510574 Fix wizard transaction lookup and add close button (10 hours ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (12 hours ago)
- e10954c Strengthen currency separation to ensure proper scaling (12 hours ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (13 hours ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (16 hours ago)
- 1558665 Auto-update CLAUDE.md (16 hours ago)
- 28311c6 Improve visual contrast for work area and input fields (16 hours ago)
- 0ba9e4f Auto-update CLAUDE.md (16 hours ago)

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
