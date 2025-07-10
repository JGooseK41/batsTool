# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 17:05)

**Commit:** b816ed652416c97677f7c087eccb7a1307978718
**Author:** Your Name
**Message:** Fix extra closing brace syntax error

- Removed extra backtick and closing brace in renderVictims
- Fixed template literal closure syntax

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 42 +++++++++++++++++++-----------------------
 index.html |  2 +-
 2 files changed, 20 insertions(+), 24 deletions(-)
```

## Recent Commits History

- b816ed6 Fix extra closing brace syntax error (0 seconds ago)
- f64360d Fix syntax error in renderVictims function (3 minutes ago)
- 4924b33 Fix hop entry functionality and token value handling (9 minutes ago)
- 07f9461 Improve hop entry UX with transaction hash at top (14 minutes ago)
- 2383e3f UI improvements for victim transactions (20 minutes ago)
- a0fecda Add SSL success documentation and update troubleshooting guides (45 minutes ago)
- 7dd59b9 Add Netlify DNS setup guide (53 minutes ago)
- c214168 Add SSL certificate troubleshooting guide (56 minutes ago)
- 4145bde Fix error preventing progression after root total generation (64 minutes ago)
- 1ae3b49 Add BATS Investigation Graph Structure illustration to training (69 minutes ago)

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
