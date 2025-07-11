# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-11 05:50)

**Commit:** 85941f5fd3d0d120910e5a4a2bbda33e9eab90b9
**Author:** Your Name
**Message:** Remove inaccurate graph from training page

- Replace dynamic visualization with placeholder message
- Keep visualization code commented for future development
- Add tip box explaining interactive diagram coming soon
- Maintain clean training page without confusing graphics

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     | 46 ++++++++++++++++++++++++----------------------
 training.html | 20 ++++++++++----------
 2 files changed, 34 insertions(+), 32 deletions(-)
```

## Recent Commits History

- 85941f5 Remove inaccurate graph from training page (0 seconds ago)
- 17741d5 Fix training visualization layout - clean structured flow (7 hours ago)
- 9fbbc33 Add dynamic BATS training visualization to training page (7 hours ago)
- 1cfb83b Add comprehensive BATS training example visualization (7 hours ago)
- cf80a17 Redesign flow diagram with ledger-style layout (7 hours ago)
- f1304c8 Add auto-fix option to chronological order errors (8 hours ago)
- b2528cf Fix blockTimestamp scope error for multi-chain support (8 hours ago)
- 53dc631 Add chain selector to blockchain lookup modal (8 hours ago)
- 38e3ce6 Upgrade to Etherscan API v2 and add multi-chain support (8 hours ago)
- 51c3e12 Add warnings when actual transaction timestamp cannot be retrieved (8 hours ago)

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
