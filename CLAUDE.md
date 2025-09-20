# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 18:15)

**Commit:** e10954cdf9cf67a120a306073d9341ad4e1b72c7
**Author:** Your Name
**Message:** Strengthen currency separation to ensure proper scaling

- Fixed calculateRootTotal() to return object with totals by currency
- Fixed convergence handling to track each currency separately
- Removed duplicate currency calculation in import function
- Ensured all currency totals are kept separate throughout the system
- Convergence now shows '100 ETH | 50 LINK' instead of mixing currencies

This ensures the fix scales properly for any number of different currencies
and maintains BATS requirement of never mixing different asset types.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 42 +++++++++++++++++++++---------------------
 index.html | 52 +++++++++++++++++++++++++++++++++-------------------
 2 files changed, 54 insertions(+), 40 deletions(-)
```

## Recent Commits History

- e10954c Strengthen currency separation to ensure proper scaling (0 seconds ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (10 minutes ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (4 hours ago)
- 1558665 Auto-update CLAUDE.md (4 hours ago)
- 28311c6 Improve visual contrast for work area and input fields (4 hours ago)
- 0ba9e4f Auto-update CLAUDE.md (4 hours ago)
- 2c9a44e Enhance main work area visual differentiation (4 hours ago)
- 7d2dff8 Remove rainbow colors from investigation progress cards (4 hours ago)
- c535605 Auto-update CLAUDE.md with latest changes (4 hours ago)
- 05061c1 Improve UI professionalism and focus (4 hours ago)

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
