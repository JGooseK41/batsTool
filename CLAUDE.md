# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 21:28)

**Commit:** 732ce9770917ad62b2ad1df2423e11c46b52cd63
**Author:** Your Name
**Message:** Fix API key not being used from localStorage

- Directly check localStorage for Etherscan API key
- Ensures user's saved API key is used instead of default
- Fixes rate limit issues when user has their own API key

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 32 ++++++++++++++++----------------
 index.html |  8 ++++----
 2 files changed, 20 insertions(+), 20 deletions(-)
```

## Recent Commits History

- 732ce97 Fix API key not being used from localStorage (0 seconds ago)
- b88ff50 Fix Etherscan rate limit errors and add delays between API calls (3 minutes ago)
- ed440c5 Add detailed logging for token transfer detection (6 minutes ago)
- af55c18 Fix token transfer modal not showing and handle 0 ETH transactions (9 minutes ago)
- b69c7b9 Fix token transfer selection modal and display issues (14 minutes ago)
- 5802230 Fix blockchain API transaction date bug (24 minutes ago)
- cc30ae1 Fix UI issues: center modals, make collapsed items thinner, ensure Next Step buttons visible (35 minutes ago)
- c0280a6 Fix save/load functionality and improve state preservation (2 hours ago)
- 65a79eb Fix hop ID type mismatch preventing wizard from showing (2 hours ago)
- feef15b Debug hop entry wizard not showing after trace selection (2 hours ago)

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
