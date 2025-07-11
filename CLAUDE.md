# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 21:32)

**Commit:** 756e97e6308f5bf6e964ce814c4ad309aefac7dc
**Author:** Your Name
**Message:** Remove delays and debug logging since rate limits aren't the issue

- Remove 600ms delays between API calls
- Remove verbose debug logging for token transfers
- Keep error checking for Etherscan API responses

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 33 ++++++++++++++++-----------------
 index.html | 18 +++---------------
 2 files changed, 19 insertions(+), 32 deletions(-)
```

## Recent Commits History

- 756e97e Remove delays and debug logging since rate limits aren't the issue (0 seconds ago)
- 732ce97 Fix API key not being used from localStorage (4 minutes ago)
- b88ff50 Fix Etherscan rate limit errors and add delays between API calls (6 minutes ago)
- ed440c5 Add detailed logging for token transfer detection (10 minutes ago)
- af55c18 Fix token transfer modal not showing and handle 0 ETH transactions (13 minutes ago)
- b69c7b9 Fix token transfer selection modal and display issues (17 minutes ago)
- 5802230 Fix blockchain API transaction date bug (27 minutes ago)
- cc30ae1 Fix UI issues: center modals, make collapsed items thinner, ensure Next Step buttons visible (39 minutes ago)
- c0280a6 Fix save/load functionality and improve state preservation (2 hours ago)
- 65a79eb Fix hop ID type mismatch preventing wizard from showing (2 hours ago)

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
