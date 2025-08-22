# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-20 14:33)

**Commit:** e53c443ee3fa92ba422ad9c0d4d9b8f6c7ede253
**Author:** Your Name
**Message:** Fix split source thread assignment blocking issue

Fixed double-counting in getMaxAssignableAmount function that was preventing
the first entry from being passed when applying multiple source threads together.

The function now properly distinguishes between:
- Entries with multiple sources (uses only individualSourceAssignments)
- Entries with single source (uses only sourceThreadId)

This prevents double-counting and ensures accurate available amount calculations.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md        | 37 ++++++++++++++++++-------------------
 index.html       | 19 +++++++++++--------
 test-syntax.html | 31 +++++++++++++++++++++++++++++++
 3 files changed, 60 insertions(+), 27 deletions(-)
```

## Recent Commits History

- e53c443 Fix split source thread assignment blocking issue (0 seconds ago)
- db2a50a Make active tab blue much darker for better contrast (3 days ago)
- 89e87dc Enhance tab visibility with distinct active state styling (3 days ago)
- 489d501 Fix syntax error - remove extra closing brace (3 days ago)
- e0e4fb0 Fix indentation of entryTypes declaration (3 days ago)
- 7e5e367 Fix duplicate currencies and timezones declarations (3 days ago)
- 564e247 Fix duplicate entryTypes declaration error (3 days ago)
- 7a3113c Fix JavaScript errors preventing page from loading (3 days ago)
- 428cb65 Update CLAUDE.md with latest commit info (3 days ago)
- 5acd918 Complete wallet classification hierarchy system implementation (3 days ago)

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
