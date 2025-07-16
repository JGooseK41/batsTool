# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-11 19:04)

**Commit:** fdb325bdc8267cc8daf63085c5dcd2bd7faa7871
**Author:** Your Name
**Message:** Enhance hop entry wizard with manual entry and better control options

- Add manual transaction entry mode in wizard without requiring API lookup
- Add toggle between API Lookup and Manual Entry modes in step 3
- Add "Cancel to Manual" button that transfers wizard data to manual entry form
- Add "Skip This Time" button to skip wizard for current entry only
- Rename "Don't show this wizard again" to clarify it disables for future entries
- Pre-fill manual entry form when canceling wizard with any data already entered
- Manual mode includes fields for tx hash, from/to wallets, and timestamp
- Automatically scroll to and highlight new entry when canceling to manual

These improvements give users more flexibility to use the wizard when helpful while easily bypassing it when needed.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  45 ++++++------
 index.html | 244 +++++++++++++++++++++++++++++++++++++++++++++++++++++++------
 2 files changed, 245 insertions(+), 44 deletions(-)
```

## Recent Commits History

- fdb325b Enhance hop entry wizard with manual entry and better control options (0 seconds ago)
- 2ccef07 Improve hop progression clarity and finalization UX (12 minutes ago)
- 9e8eb55 Fix persistent JavaScript errors in hop creation and wallet index (8 hours ago)
- 2c6ef9f Fix critical JavaScript errors in hop creation (9 hours ago)
- 85941f5 Remove inaccurate graph from training page (13 hours ago)
- 17741d5 Fix training visualization layout - clean structured flow (20 hours ago)
- 9fbbc33 Add dynamic BATS training visualization to training page (20 hours ago)
- 1cfb83b Add comprehensive BATS training example visualization (20 hours ago)
- cf80a17 Redesign flow diagram with ledger-style layout (20 hours ago)
- f1304c8 Add auto-fix option to chronological order errors (21 hours ago)

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
