# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 16:56)

**Commit:** 4924b3329cced9e2260f9620a5eb1a1a3ee0a6fa
**Author:** Your Name
**Message:** Fix hop entry functionality and token value handling

- Fixed assignMaxAmount to properly update input fields with force change event
- Added debug logging to track Max button functionality
- Fixed lookupHopTransaction to use 'amount' property instead of 'value'
- Added support for multiple transfers in hop entries (batch transactions)
- Fixed timestamp handling to use 'time' property consistently
- Added from wallet field population in hop entry auto-fill
- Improved error messages and user feedback

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  43 ++++++++++++------------
 index.html | 112 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++----
 2 files changed, 127 insertions(+), 28 deletions(-)
```

## Recent Commits History

- 4924b33 Fix hop entry functionality and token value handling (0 seconds ago)
- 07f9461 Improve hop entry UX with transaction hash at top (5 minutes ago)
- 2383e3f UI improvements for victim transactions (10 minutes ago)
- a0fecda Add SSL success documentation and update troubleshooting guides (36 minutes ago)
- 7dd59b9 Add Netlify DNS setup guide (44 minutes ago)
- c214168 Add SSL certificate troubleshooting guide (47 minutes ago)
- 4145bde Fix error preventing progression after root total generation (55 minutes ago)
- 1ae3b49 Add BATS Investigation Graph Structure illustration to training (60 minutes ago)
- 4295dde Fix SSL certificate mismatch and improve domain handling (64 minutes ago)
- 13e9872 Add HTTPS enforcement and security features (66 minutes ago)

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
