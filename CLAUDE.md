# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 21:35)

**Commit:** 8286bded7da17ed99a1e44d072f61c00877794e6
**Author:** Your Name
**Message:** Remove block timestamp fetching to fix token transfer detection

- Remove separate eth_getBlockByNumber API call that was interfering with token detection
- Use current timestamp instead to avoid hitting rate limits
- This fixes the issue where eth_getTransactionReceipt wasn't being called
- Token transfers should now be detected properly again

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 34 +++++++++++++++++-----------------
 index.html | 59 +++++------------------------------------------------------
 2 files changed, 22 insertions(+), 71 deletions(-)
```

## Recent Commits History

- 8286bde Remove block timestamp fetching to fix token transfer detection (0 seconds ago)
- 756e97e Remove delays and debug logging since rate limits aren't the issue (3 minutes ago)
- 732ce97 Fix API key not being used from localStorage (7 minutes ago)
- b88ff50 Fix Etherscan rate limit errors and add delays between API calls (10 minutes ago)
- ed440c5 Add detailed logging for token transfer detection (13 minutes ago)
- af55c18 Fix token transfer modal not showing and handle 0 ETH transactions (16 minutes ago)
- b69c7b9 Fix token transfer selection modal and display issues (20 minutes ago)
- 5802230 Fix blockchain API transaction date bug (30 minutes ago)
- cc30ae1 Fix UI issues: center modals, make collapsed items thinner, ensure Next Step buttons visible (42 minutes ago)
- c0280a6 Fix save/load functionality and improve state preservation (2 hours ago)

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
