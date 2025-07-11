# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 22:15)

**Commit:** f1304c80a16cef537cfd33d4edcd0466f2e0f108
**Author:** Your Name
**Message:** Add auto-fix option to chronological order errors

- Change error alerts to confirm dialogs with auto-fix option
- Add 'OK to fix automatically' button when chronological errors detected
- Auto-reorder transactions and update V-T notation when user confirms
- Apply to: real-time entry validation, root total confirmation, and Excel import
- Maintains PIFO compliance by keeping transactions in date order

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 41 ++++++++++++++++++++---------------------
 index.html | 42 +++++++++++++++++++++++++++++++++++++-----
 2 files changed, 57 insertions(+), 26 deletions(-)
```

## Recent Commits History

- f1304c8 Add auto-fix option to chronological order errors (0 seconds ago)
- b2528cf Fix blockTimestamp scope error for multi-chain support (11 minutes ago)
- 53dc631 Add chain selector to blockchain lookup modal (20 minutes ago)
- 38e3ce6 Upgrade to Etherscan API v2 and add multi-chain support (22 minutes ago)
- 51c3e12 Add warnings when actual transaction timestamp cannot be retrieved (33 minutes ago)
- 884ac3a Restore block timestamp fetching with better error handling (36 minutes ago)
- 8286bde Remove block timestamp fetching to fix token transfer detection (40 minutes ago)
- 756e97e Remove delays and debug logging since rate limits aren't the issue (43 minutes ago)
- 732ce97 Fix API key not being used from localStorage (46 minutes ago)
- b88ff50 Fix Etherscan rate limit errors and add delays between API calls (49 minutes ago)

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
