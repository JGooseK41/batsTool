# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 18:17)

**Commit:** 58f354833c8c5254c3acb11889c556550e18aac6
**Author:** Your Name
**Message:** Fix template literal syntax errors on lines 5557 and 5592

- Line 5557: Moved closing brace inside the template literal interpolation
- Line 5592: Swapped backtick and brace order to properly close the ternary expression

This resolves the "Missing } in template expression" error by ensuring proper nesting of template literals and expressions.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 index.html | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
```

## Recent Commits History

- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (0 seconds ago)
- c803494 Fix template literal syntax error on line 5557 (5 minutes ago)
- ef38132 Fix template literal structure on line 5557 (31 minutes ago)
- 6cd39e0 Fix missing backtick in template expression (33 minutes ago)
- 4782757 Fix template literal syntax - swap backtick and brace position (38 minutes ago)
- aa39a3a Remove carriage return characters causing syntax error (54 minutes ago)
- a865d8b Fix extra closing brace in template literal (56 minutes ago)
- 8fbd79e Fix template literal syntax error in renderVictims function (58 minutes ago)
- 15406db Fix missing closing brace in template literal interpolation (63 minutes ago)
- 84be191 Fix unexpected closing brace in template literal (67 minutes ago)

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
