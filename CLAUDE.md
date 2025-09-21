# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 08:00)

**Commit:** bd628a6a5827224ceba0f1d543000a2e86ecd7f4
**Author:** Your Name
**Message:** Remove external crypto-js CDN to eliminate CSP warnings

- Removed attempt to load crypto-js from CDN
- Always use Web Crypto API fallback to avoid CSP violations
- Eliminates console error about blocked script
- Tool continues to work perfectly with Web Crypto API

### Changed Files:
```
 CLAUDE.md  | 57 +++++++++++++++++++++++++++++++++++++++++----------------
 index.html | 19 ++-----------------
 2 files changed, 43 insertions(+), 33 deletions(-)
```

## Recent Commits History

- bd628a6 Remove external crypto-js CDN to eliminate CSP warnings (0 seconds ago)
- 486affc Add comprehensive DEX swap documentation system (74 minutes ago)
- 87758d9 Use BROWN wallet classification for DEX swaps (85 minutes ago)
- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (89 minutes ago)
- d510574 Fix wizard transaction lookup and add close button (12 hours ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (13 hours ago)
- e10954c Strengthen currency separation to ensure proper scaling (14 hours ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (14 hours ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (17 hours ago)
- 1558665 Auto-update CLAUDE.md (17 hours ago)

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
