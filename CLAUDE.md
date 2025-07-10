# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 17:44)

**Commit:** 6cd39e06ad19ee18b485f5feba21b3baaff21d8a
**Author:** Your Name
**Message:** Fix missing backtick in template expression

Added missing backtick before colon in ternary operator on line 5557 to properly close the template literal

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 34 +++++++++++++++++-----------------
 index.html |  2 +-
 2 files changed, 18 insertions(+), 18 deletions(-)
```

## Recent Commits History

- 6cd39e0 Fix missing backtick in template expression (0 seconds ago)
- 4782757 Fix template literal syntax - swap backtick and brace position (4 minutes ago)
- aa39a3a Remove carriage return characters causing syntax error (21 minutes ago)
- a865d8b Fix extra closing brace in template literal (23 minutes ago)
- 8fbd79e Fix template literal syntax error in renderVictims function (25 minutes ago)
- 15406db Fix missing closing brace in template literal interpolation (29 minutes ago)
- 84be191 Fix unexpected closing brace in template literal (34 minutes ago)
- b9ab7bb Fix template literal syntax error in renderVictims (36 minutes ago)
- b816ed6 Fix extra closing brace syntax error (38 minutes ago)
- f64360d Fix syntax error in renderVictims function (42 minutes ago)

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
