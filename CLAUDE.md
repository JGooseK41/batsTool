# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 21:38)

**Commit:** 884ac3ab76697b53fbde35848249bcd20f979717
**Author:** Your Name
**Message:** Restore block timestamp fetching with better error handling

- Restore eth_getBlockByNumber to get actual transaction timestamps
- Ensure token transfers still work even if block fetch fails
- Add 300ms delay between API calls only if block fetch succeeds
- Pass blockTimestamp to parseResponse instead of blockData
- Use actual timestamp when available, current time as fallback

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 37 +++++++++++++++---------------
 index.html | 77 ++++++++++++++++++++++++++++++++++++++++++++++++++++----------
 2 files changed, 84 insertions(+), 30 deletions(-)
```

## Recent Commits History

- 884ac3a Restore block timestamp fetching with better error handling (0 seconds ago)
- 8286bde Remove block timestamp fetching to fix token transfer detection (3 minutes ago)
- 756e97e Remove delays and debug logging since rate limits aren't the issue (6 minutes ago)
- 732ce97 Fix API key not being used from localStorage (10 minutes ago)
- b88ff50 Fix Etherscan rate limit errors and add delays between API calls (13 minutes ago)
- ed440c5 Add detailed logging for token transfer detection (16 minutes ago)
- af55c18 Fix token transfer modal not showing and handle 0 ETH transactions (19 minutes ago)
- b69c7b9 Fix token transfer selection modal and display issues (24 minutes ago)
- 5802230 Fix blockchain API transaction date bug (33 minutes ago)
- cc30ae1 Fix UI issues: center modals, make collapsed items thinner, ensure Next Step buttons visible (45 minutes ago)

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
