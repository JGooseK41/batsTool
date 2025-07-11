# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 21:19)

**Commit:** af55c184f536dd8d7e0c306e49b583b953e31a1a
**Author:** Your Name
**Message:** Fix token transfer modal not showing and handle 0 ETH transactions

- Add console logging to debug token transfer detection
- Skip 0 ETH transactions when no token transfers exist
- Improve error message for 0 ETH transactions with no tokens
- Add logging to trace parsed transaction data

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 31 +++++++++++++++----------------
 index.html | 16 +++++++++++++---
 2 files changed, 28 insertions(+), 19 deletions(-)
```

## Recent Commits History

- af55c18 Fix token transfer modal not showing and handle 0 ETH transactions (0 seconds ago)
- b69c7b9 Fix token transfer selection modal and display issues (4 minutes ago)
- 5802230 Fix blockchain API transaction date bug (14 minutes ago)
- cc30ae1 Fix UI issues: center modals, make collapsed items thinner, ensure Next Step buttons visible (26 minutes ago)
- c0280a6 Fix save/load functionality and improve state preservation (88 minutes ago)
- 65a79eb Fix hop ID type mismatch preventing wizard from showing (2 hours ago)
- feef15b Debug hop entry wizard not showing after trace selection (2 hours ago)
- a48f4a5 Fix missing function and victim completion workflow (2 hours ago)
- fd803ec Add purple segment to progress bars for VASP/exchange deposits (2 hours ago)
- b7b101f Add visual ART progress bars for fund tracking (2 hours ago)

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
