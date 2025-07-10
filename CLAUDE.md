# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 19:04)

**Commit:** b7b101f6b622a3c4d8dcae8a8c0de5f667a32f69
**Author:** Your Name
**Message:** Add visual ART progress bars for fund tracking

- Created horizontal progress bars showing fund allocation by currency
- Color-coded segments:
  - Green: Successfully traced funds
  - Gray: Written off funds
  - Blue: Cold storage
  - Red: Remaining unaccounted funds
- Added progress bars to:
  - Root total confirmation modal (preview mode)
  - Each hop's ART summary section
- Includes hover tooltips showing exact amounts and percentages
- Legend shows what each color represents
- Real-time updates as entries are added

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  42 ++++++-------
 index.html | 210 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 228 insertions(+), 24 deletions(-)
```

## Recent Commits History

- b7b101f Add visual ART progress bars for fund tracking (0 seconds ago)
- ff7f197 Add entry type selection wizard for better UX (6 minutes ago)
- d4eb009 Improve hop entry workflow with wizard and better button explanations (12 minutes ago)
- 49a0636 Fix initial white screen and missing blockchain lookup functions (16 minutes ago)
- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (47 minutes ago)
- c803494 Fix template literal syntax error on line 5557 (53 minutes ago)
- ef38132 Fix template literal structure on line 5557 (79 minutes ago)
- 6cd39e0 Fix missing backtick in template expression (81 minutes ago)
- 4782757 Fix template literal syntax - swap backtick and brace position (85 minutes ago)
- aa39a3a Remove carriage return characters causing syntax error (2 hours ago)

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
