# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 19:41)

**Commit:** db2a50ac8d501b885aa400788d3cb32930b87da9
**Author:** Your Name
**Message:** Make active tab blue much darker for better contrast

- Changed active tab background from #3498db to #1a5490
- Updated shadow color to match darker blue
- Improved readability with white text on dark blue background

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 index.html | 8 ++++----
 1 file changed, 4 insertions(+), 4 deletions(-)
```

## Recent Commits History

- db2a50a Make active tab blue much darker for better contrast (0 seconds ago)
- 89e87dc Enhance tab visibility with distinct active state styling (12 minutes ago)
- 489d501 Fix syntax error - remove extra closing brace (5 hours ago)
- e0e4fb0 Fix indentation of entryTypes declaration (5 hours ago)
- 7e5e367 Fix duplicate currencies and timezones declarations (5 hours ago)
- 564e247 Fix duplicate entryTypes declaration error (6 hours ago)
- 7a3113c Fix JavaScript errors preventing page from loading (6 hours ago)
- 428cb65 Update CLAUDE.md with latest commit info (9 hours ago)
- 5acd918 Complete wallet classification hierarchy system implementation (9 hours ago)
- 2de6ec0 Revert PINK wallet to flower emoji - no pink circle exists (9 hours ago)

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
