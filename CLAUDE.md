# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 17:23)

**Commit:** aa39a3a64bde9bfdc4d828b1aca1600506f37c12
**Author:** Your Name
**Message:** Remove carriage return characters causing syntax error

Fixed line ending issues that were causing 'Unexpected token' error on line 5592

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |    32 +-
 index.html | 31856 +++++++++++++++++++++++++++++------------------------------
 2 files changed, 15944 insertions(+), 15944 deletions(-)
```

## Recent Commits History

- aa39a3a Remove carriage return characters causing syntax error (0 seconds ago)
- a865d8b Fix extra closing brace in template literal (2 minutes ago)
- 8fbd79e Fix template literal syntax error in renderVictims function (4 minutes ago)
- 15406db Fix missing closing brace in template literal interpolation (8 minutes ago)
- 84be191 Fix unexpected closing brace in template literal (13 minutes ago)
- b9ab7bb Fix template literal syntax error in renderVictims (15 minutes ago)
- b816ed6 Fix extra closing brace syntax error (17 minutes ago)
- f64360d Fix syntax error in renderVictims function (21 minutes ago)
- 4924b33 Fix hop entry functionality and token value handling (27 minutes ago)
- 07f9461 Improve hop entry UX with transaction hash at top (31 minutes ago)

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
