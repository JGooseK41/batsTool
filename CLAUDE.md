# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 16:51)

**Commit:** 07f9461bc704c5b467afea9cae4e292fb30f27c1
**Author:** Your Name
**Message:** Improve hop entry UX with transaction hash at top

- Moved transaction hash field to top of hop entry form
- Added prominent styling to match victim transaction layout
- Implemented inline auto-fill functionality (no modal)
- Added lookupHopTransaction function for direct API calls
- Removed redundant transaction hash field from bottom

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  43 +++++++++++-----------
 index.html | 120 ++++++++++++++++++++++++++++++++++++++++++++++++++++---------
 2 files changed, 125 insertions(+), 38 deletions(-)
```

## Recent Commits History

- 07f9461 Improve hop entry UX with transaction hash at top (0 seconds ago)
- 2383e3f UI improvements for victim transactions (6 minutes ago)
- a0fecda Add SSL success documentation and update troubleshooting guides (31 minutes ago)
- 7dd59b9 Add Netlify DNS setup guide (39 minutes ago)
- c214168 Add SSL certificate troubleshooting guide (42 minutes ago)
- 4145bde Fix error preventing progression after root total generation (50 minutes ago)
- 1ae3b49 Add BATS Investigation Graph Structure illustration to training (55 minutes ago)
- 4295dde Fix SSL certificate mismatch and improve domain handling (59 minutes ago)
- 13e9872 Add HTTPS enforcement and security features (61 minutes ago)
- f8a59a5 Fix critical transaction selection modal data population issue (72 minutes ago)

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
