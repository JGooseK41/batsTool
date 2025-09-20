# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 18:05)

**Commit:** d3a73d87a80c0a7bef6649d6442c23d289f4c57e
**Author:** Your Name
**Message:** Fix critical currency mixing bug in victim transaction totals

- Fixed bug where ETH and LINK (or any different currencies) were being added together
- Properly calculate and display totals by currency separately
- Show '2.653457 ETH | 408.943 LINK' instead of incorrect '411.595457 ETH'
- Updated victim header and table footer to show proper multi-currency totals
- Each currency is now tracked and displayed independently as required by BATS

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 39 +++++++++++++++++++++++++--------------
 index.html | 33 ++++++++++++++++++++++-----------
 2 files changed, 47 insertions(+), 25 deletions(-)
```

## Recent Commits History

- d3a73d8 Fix critical currency mixing bug in victim transaction totals (0 seconds ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (3 hours ago)
- 1558665 Auto-update CLAUDE.md (3 hours ago)
- 28311c6 Improve visual contrast for work area and input fields (3 hours ago)
- 0ba9e4f Auto-update CLAUDE.md (4 hours ago)
- 2c9a44e Enhance main work area visual differentiation (4 hours ago)
- 7d2dff8 Remove rainbow colors from investigation progress cards (4 hours ago)
- c535605 Auto-update CLAUDE.md with latest changes (4 hours ago)
- 05061c1 Improve UI professionalism and focus (4 hours ago)
- e417e92 Clean up UI by removing cluttered buttons and reorganizing menu (4 hours ago)

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
