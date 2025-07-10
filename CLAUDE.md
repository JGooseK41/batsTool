# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 18:49)

**Commit:** 49a06360d3c47ae891b2f19d1c14a0fda2773a83
**Author:** Your Name
**Message:** Fix initial white screen and missing blockchain lookup functions

- Added switchTab('victims') on page load to show Victims tab by default
- Created individual blockchain lookup functions (lookupEthereumTransaction, lookupBitcoinTransaction, etc.)
- Fixed "lookupEthereumTransaction is not defined" error in hop entry

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  39 ++++++++-------
 index.html | 160 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 181 insertions(+), 18 deletions(-)
```

## Recent Commits History

- 49a0636 Fix initial white screen and missing blockchain lookup functions (0 seconds ago)
- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (32 minutes ago)
- c803494 Fix template literal syntax error on line 5557 (37 minutes ago)
- ef38132 Fix template literal structure on line 5557 (63 minutes ago)
- 6cd39e0 Fix missing backtick in template expression (65 minutes ago)
- 4782757 Fix template literal syntax - swap backtick and brace position (69 minutes ago)
- aa39a3a Remove carriage return characters causing syntax error (86 minutes ago)
- a865d8b Fix extra closing brace in template literal (88 minutes ago)
- 8fbd79e Fix template literal syntax error in renderVictims function (2 hours ago)
- 15406db Fix missing closing brace in template literal interpolation (2 hours ago)

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
