# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-11 09:37)

**Commit:** 2c6ef9fec3cf5ffd820d92b3fd9cc0dfe41924c5
**Author:** Your Name
**Message:** Fix critical JavaScript errors in hop creation

- Fix undefined container error by wrapping orphaned code in renderUniversalWalletIndex function
- Fix "Cannot read properties of undefined" error by adding null check for hop.entries
- Both errors were preventing hop creation in the wizard tool

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 44 ++++++++++++++++++++------------------------
 index.html | 20 ++++++++++++++++++--
 2 files changed, 38 insertions(+), 26 deletions(-)
```

## Recent Commits History

- 2c6ef9f Fix critical JavaScript errors in hop creation (0 seconds ago)
- 85941f5 Remove inaccurate graph from training page (4 hours ago)
- 17741d5 Fix training visualization layout - clean structured flow (11 hours ago)
- 9fbbc33 Add dynamic BATS training visualization to training page (11 hours ago)
- 1cfb83b Add comprehensive BATS training example visualization (11 hours ago)
- cf80a17 Redesign flow diagram with ledger-style layout (11 hours ago)
- f1304c8 Add auto-fix option to chronological order errors (11 hours ago)
- b2528cf Fix blockTimestamp scope error for multi-chain support (12 hours ago)
- 53dc631 Add chain selector to blockchain lookup modal (12 hours ago)
- 38e3ce6 Upgrade to Etherscan API v2 and add multi-chain support (12 hours ago)

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
