# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 21:42)

**Commit:** 51c3e1288f6cdb26f2313015e95e6a51afa323a0
**Author:** Your Name
**Message:** Add warnings when actual transaction timestamp cannot be retrieved

- Add hasRealTimestamp flag to track when real timestamps are available
- Show warning in alerts when current time is used instead of actual timestamp
- Prompt users to manually update date/time field when timestamp unavailable
- Pass flag through all transaction lookup flows

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 41 +++++++++++++++++++++--------------------
 index.html | 43 ++++++++++++++++++++++++++++++++-----------
 2 files changed, 53 insertions(+), 31 deletions(-)
```

## Recent Commits History

- 51c3e12 Add warnings when actual transaction timestamp cannot be retrieved (0 seconds ago)
- 884ac3a Restore block timestamp fetching with better error handling (3 minutes ago)
- 8286bde Remove block timestamp fetching to fix token transfer detection (6 minutes ago)
- 756e97e Remove delays and debug logging since rate limits aren't the issue (10 minutes ago)
- 732ce97 Fix API key not being used from localStorage (13 minutes ago)
- b88ff50 Fix Etherscan rate limit errors and add delays between API calls (16 minutes ago)
- ed440c5 Add detailed logging for token transfer detection (20 minutes ago)
- af55c18 Fix token transfer modal not showing and handle 0 ETH transactions (23 minutes ago)
- b69c7b9 Fix token transfer selection modal and display issues (27 minutes ago)
- 5802230 Fix blockchain API transaction date bug (37 minutes ago)

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
