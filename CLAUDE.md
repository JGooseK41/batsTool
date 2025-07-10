# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 18:58)

**Commit:** ff7f197a932d698d8bf6bebad01847d393b47c13
**Author:** Your Name
**Message:** Add entry type selection wizard for better UX

- Replaced dropdown + button with single "Add New Entry" button
- Created visual wizard showing all entry types with icons and descriptions
- Each entry type has clear explanation of when to use it
- Clicking an entry type either launches the trace wizard or creates the entry
- Cleaner, more intuitive interface for adding hop entries

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 42 +++++++++++++++------------
 index.html | 95 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++------
 2 files changed, 111 insertions(+), 26 deletions(-)
```

## Recent Commits History

- ff7f197 Add entry type selection wizard for better UX (0 seconds ago)
- d4eb009 Improve hop entry workflow with wizard and better button explanations (6 minutes ago)
- 49a0636 Fix initial white screen and missing blockchain lookup functions (9 minutes ago)
- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (41 minutes ago)
- c803494 Fix template literal syntax error on line 5557 (46 minutes ago)
- ef38132 Fix template literal structure on line 5557 (73 minutes ago)
- 6cd39e0 Fix missing backtick in template expression (74 minutes ago)
- 4782757 Fix template literal syntax - swap backtick and brace position (79 minutes ago)
- aa39a3a Remove carriage return characters causing syntax error (2 hours ago)
- a865d8b Fix extra closing brace in template literal (2 hours ago)

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
