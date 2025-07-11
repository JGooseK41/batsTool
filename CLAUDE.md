# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 22:04)

**Commit:** b2528cf27b4e30bc0ef93c84496e66e074ed89a7
**Author:** Your Name
**Message:** Fix blockTimestamp scope error for multi-chain support

- Move blockTimestamp declaration to outer scope to fix 'not defined' error
- Add block timestamp fetching for all EVM chains (Base, Arbitrum, etc)
- Update parseResponse calls to handle all EVM chains properly
- Fix scope issues in both lookupTransaction and lookupVictimTransaction

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 42 +++++++++++++++++++++---------------------
 index.html | 15 ++++++++-------
 2 files changed, 29 insertions(+), 28 deletions(-)
```

## Recent Commits History

- b2528cf Fix blockTimestamp scope error for multi-chain support (0 seconds ago)
- 53dc631 Add chain selector to blockchain lookup modal (9 minutes ago)
- 38e3ce6 Upgrade to Etherscan API v2 and add multi-chain support (11 minutes ago)
- 51c3e12 Add warnings when actual transaction timestamp cannot be retrieved (22 minutes ago)
- 884ac3a Restore block timestamp fetching with better error handling (26 minutes ago)
- 8286bde Remove block timestamp fetching to fix token transfer detection (29 minutes ago)
- 756e97e Remove delays and debug logging since rate limits aren't the issue (32 minutes ago)
- 732ce97 Fix API key not being used from localStorage (36 minutes ago)
- b88ff50 Fix Etherscan rate limit errors and add delays between API calls (38 minutes ago)
- ed440c5 Add detailed logging for token transfer detection (42 minutes ago)

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
