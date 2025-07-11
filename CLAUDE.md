# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 22:44)

**Commit:** 1cfb83b178f76a3c8482ba3ff2d27f91cb65042c
**Author:** Your Name
**Message:** Add comprehensive BATS training example visualization

- Create detailed example showing multiple BATS principles
- Include victims, hub wallets, cold storage, and exchanges
- Show write-offs to mixers and unknown destinations
- Add color-coded legend and explanatory notes
- Display realistic fund flows with proper notation
- Add 'Show Training Example' button to flow diagram controls

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  45 +++++----
 index.html | 326 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 349 insertions(+), 22 deletions(-)
```

## Recent Commits History

- 1cfb83b Add comprehensive BATS training example visualization (0 seconds ago)
- cf80a17 Redesign flow diagram with ledger-style layout (4 minutes ago)
- f1304c8 Add auto-fix option to chronological order errors (29 minutes ago)
- b2528cf Fix blockTimestamp scope error for multi-chain support (40 minutes ago)
- 53dc631 Add chain selector to blockchain lookup modal (49 minutes ago)
- 38e3ce6 Upgrade to Etherscan API v2 and add multi-chain support (51 minutes ago)
- 51c3e12 Add warnings when actual transaction timestamp cannot be retrieved (62 minutes ago)
- 884ac3a Restore block timestamp fetching with better error handling (66 minutes ago)
- 8286bde Remove block timestamp fetching to fix token transfer detection (69 minutes ago)
- 756e97e Remove delays and debug logging since rate limits aren't the issue (72 minutes ago)

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
