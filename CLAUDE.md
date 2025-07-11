# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 22:56)

**Commit:** 17741d5153228d82054d4642af6cb2cdcd6cbc98
**Author:** Your Name
**Message:** Fix training visualization layout - clean structured flow

- Replace spaghetti-like connections with organized column layout
- Use fixed positions for victims, hops, and final destinations
- Add curved paths for better visual flow
- Include V-T-H notation on connections
- Add legend box at bottom with clear explanations
- Show write-offs clearly in Hop 2
- Use consistent spacing and alignment
- Add column headers and guide lines

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     |  44 ++---
 training.html | 507 ++++++++++++++++++++++++++++++++++------------------------
 2 files changed, 319 insertions(+), 232 deletions(-)
```

## Recent Commits History

- 17741d5 Fix training visualization layout - clean structured flow (0 seconds ago)
- 9fbbc33 Add dynamic BATS training visualization to training page (4 minutes ago)
- 1cfb83b Add comprehensive BATS training example visualization (12 minutes ago)
- cf80a17 Redesign flow diagram with ledger-style layout (16 minutes ago)
- f1304c8 Add auto-fix option to chronological order errors (42 minutes ago)
- b2528cf Fix blockTimestamp scope error for multi-chain support (52 minutes ago)
- 53dc631 Add chain selector to blockchain lookup modal (61 minutes ago)
- 38e3ce6 Upgrade to Etherscan API v2 and add multi-chain support (63 minutes ago)
- 51c3e12 Add warnings when actual transaction timestamp cannot be retrieved (75 minutes ago)
- 884ac3a Restore block timestamp fetching with better error handling (78 minutes ago)

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
