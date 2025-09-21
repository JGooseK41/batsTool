# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 06:31)

**Commit:** 45b3b16e47fe1bd5bb5358905d1cc05088e2dd8b
**Author:** Your Name
**Message:** Major improvements to wizard transaction handling and DEX swap support

Fixes:
- Wizard now properly populates notation field with thread IDs (e.g., V1-T1-H1)
- Auto-detects currency from transaction lookup data
- Currency properly set when multiple source threads are selected
- Fixed issue where source threads weren't being recognized after wizard selection

New Features:
- Added DEX swap detection and tracking
- When source currency differs from transaction currency, marks as swap
- Swap details shown in wizard with warning/notification
- Swap notation added to entry (e.g., [SWAP: LINK → ETH])
- Automatic notes added documenting the swap

UI Improvements:
- Better feedback when transaction is found and ready to create
- Clear success indicators in wizard
- Shows swap detection warnings when applicable
- Improved summary display in step 3 of wizard

### Changed Files:
```
 CLAUDE.md  |  44 +++++++++++-----------
 index.html | 124 +++++++++++++++++++++++++++++++++++++++++++++++++++++++------
 2 files changed, 133 insertions(+), 35 deletions(-)
```

## Recent Commits History

- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (0 seconds ago)
- d510574 Fix wizard transaction lookup and add close button (10 hours ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (12 hours ago)
- e10954c Strengthen currency separation to ensure proper scaling (12 hours ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (12 hours ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (16 hours ago)
- 1558665 Auto-update CLAUDE.md (16 hours ago)
- 28311c6 Improve visual contrast for work area and input fields (16 hours ago)
- 0ba9e4f Auto-update CLAUDE.md (16 hours ago)
- 2c9a44e Enhance main work area visual differentiation (16 hours ago)

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
