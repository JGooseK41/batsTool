# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 16:34)

**Commit:** 6a29b42dbbb41a88d34453a059dbecdd3f56ca1f
**Author:** Your Name
**Message:** Improve victim workflow and fix hop entry timestamps

- Add victim completion process - must complete current victim before adding new
- Make 'Add New Victim' button conditional and less prominent
- Add visual indicators for complete (green) vs incomplete (orange) victims
- Fix hop entry dates pulling from blockchain instead of defaulting to today
- Restore professional emojis for navigation and UI clarity
- Fix wizard modal visual layout with entry type icons
- Mirror victim transaction API workflow for hop entries

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 34 ++++++++++++-----------
 index.html | 94 ++++++++++++++++++++++++++++++++++++++++++++++++++------------
 2 files changed, 94 insertions(+), 34 deletions(-)
```

## Recent Commits History

- 6a29b42 Improve victim workflow and fix hop entry timestamps (0 seconds ago)
- 29e2b27 Major UI/UX improvements and token transfer fix (17 minutes ago)
- c4f0890 Reorganize case setup workflow (60 minutes ago)
- 260d643 Enhance welcome screen and onboarding workflow (69 minutes ago)
- fdb325b Enhance hop entry wizard with manual entry and better control options (5 days ago)
- 2ccef07 Improve hop progression clarity and finalization UX (5 days ago)
- 9e8eb55 Fix persistent JavaScript errors in hop creation and wallet index (5 days ago)
- 2c6ef9f Fix critical JavaScript errors in hop creation (5 days ago)
- 85941f5 Remove inaccurate graph from training page (5 days ago)
- 17741d5 Fix training visualization layout - clean structured flow (6 days ago)

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
