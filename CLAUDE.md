# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 22:52)

**Commit:** 9fbbc33bad3eb93538e4a7d13235a10a8ac738af
**Author:** Your Name
**Message:** Add dynamic BATS training visualization to training page

- Replace static SVG with dynamic training example
- Shows multiple victim types and wallet classifications
- Demonstrates hub wallets, cold storage, exchanges, and write-offs
- Includes color-coded legend and educational notes
- Loads automatically when training page opens
- Ledger-style visualization with hop lanes and sum calculations

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     |  46 +++--
 training.html | 554 ++++++++++++++++++++++++++++++++++++++++++++--------------
 2 files changed, 440 insertions(+), 160 deletions(-)
```

## Recent Commits History

- 9fbbc33 Add dynamic BATS training visualization to training page (1 second ago)
- 1cfb83b Add comprehensive BATS training example visualization (8 minutes ago)
- cf80a17 Redesign flow diagram with ledger-style layout (12 minutes ago)
- f1304c8 Add auto-fix option to chronological order errors (37 minutes ago)
- b2528cf Fix blockTimestamp scope error for multi-chain support (48 minutes ago)
- 53dc631 Add chain selector to blockchain lookup modal (57 minutes ago)
- 38e3ce6 Upgrade to Etherscan API v2 and add multi-chain support (59 minutes ago)
- 51c3e12 Add warnings when actual transaction timestamp cannot be retrieved (71 minutes ago)
- 884ac3a Restore block timestamp fetching with better error handling (74 minutes ago)
- 8286bde Remove block timestamp fetching to fix token transfer detection (77 minutes ago)

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
