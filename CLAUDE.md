# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 17:02)

**Commit:** f64360ddb83a74ab5310613ec8d1fffd46b42090
**Author:** Your Name
**Message:** Fix syntax error in renderVictims function

- Fixed template literal syntax in victim transaction rendering
- Properly closed template string for minimized view
- Corrected bracket placement in transactions.map().join()

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 44 +++++++++++++++++++++++---------------------
 index.html |  4 ++--
 2 files changed, 25 insertions(+), 23 deletions(-)
```

## Recent Commits History

- f64360d Fix syntax error in renderVictims function (0 seconds ago)
- 4924b33 Fix hop entry functionality and token value handling (6 minutes ago)
- 07f9461 Improve hop entry UX with transaction hash at top (11 minutes ago)
- 2383e3f UI improvements for victim transactions (17 minutes ago)
- a0fecda Add SSL success documentation and update troubleshooting guides (42 minutes ago)
- 7dd59b9 Add Netlify DNS setup guide (50 minutes ago)
- c214168 Add SSL certificate troubleshooting guide (53 minutes ago)
- 4145bde Fix error preventing progression after root total generation (61 minutes ago)
- 1ae3b49 Add BATS Investigation Graph Structure illustration to training (66 minutes ago)
- 4295dde Fix SSL certificate mismatch and improve domain handling (70 minutes ago)

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
