# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-11 10:42)

**Commit:** 9e8eb55de6feb5514f88a7745b0fec3d31c6b7df
**Author:** Your Name
**Message:** Fix persistent JavaScript errors in hop creation and wallet index

- Remove duplicate renderUniversalWalletIndex function that was causing orphaned code
- Add null check for hop.entries in renderARTProgressBars function
- Add data sanitization on load to ensure all hops have entries arrays
- Fix missing export button header in Universal Wallet Index

These fixes address the "container is not defined" and "Cannot read properties of undefined" errors

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  39 +++++++++----------
 index.html | 128 ++++++++++++++-----------------------------------------------
 2 files changed, 48 insertions(+), 119 deletions(-)
```

## Recent Commits History

- 9e8eb55 Fix persistent JavaScript errors in hop creation and wallet index (0 seconds ago)
- 2c6ef9f Fix critical JavaScript errors in hop creation (65 minutes ago)
- 85941f5 Remove inaccurate graph from training page (5 hours ago)
- 17741d5 Fix training visualization layout - clean structured flow (12 hours ago)
- 9fbbc33 Add dynamic BATS training visualization to training page (12 hours ago)
- 1cfb83b Add comprehensive BATS training example visualization (12 hours ago)
- cf80a17 Redesign flow diagram with ledger-style layout (12 hours ago)
- f1304c8 Add auto-fix option to chronological order errors (12 hours ago)
- b2528cf Fix blockTimestamp scope error for multi-chain support (13 hours ago)
- 53dc631 Add chain selector to blockchain lookup modal (13 hours ago)

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
