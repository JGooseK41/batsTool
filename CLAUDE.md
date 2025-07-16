# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 15:26)

**Commit:** 260d643707235b22f478d296f1fb350483a65bdb
**Author:** Your Name
**Message:** Enhance welcome screen and onboarding workflow

- Add professional gradient background to welcome screen
- Implement step progress indicator (Setup → Add Victims → Trace Funds)
- Add quick start form directly on welcome screen
- Include feature cards highlighting B.A.T.S. capabilities
- Auto-show welcome screen for new users
- Add pulse animation to guide users to next steps
- Improve transition from setup to victim entry
- Add validation for required fields in quick start form

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  33 ++++-----
 index.html | 238 +++++++++++++++++++++++++++++++++++++++++++++++++++----------
 2 files changed, 219 insertions(+), 52 deletions(-)
```

## Recent Commits History

- 260d643 Enhance welcome screen and onboarding workflow (0 seconds ago)
- fdb325b Enhance hop entry wizard with manual entry and better control options (5 days ago)
- 2ccef07 Improve hop progression clarity and finalization UX (5 days ago)
- 9e8eb55 Fix persistent JavaScript errors in hop creation and wallet index (5 days ago)
- 2c6ef9f Fix critical JavaScript errors in hop creation (5 days ago)
- 85941f5 Remove inaccurate graph from training page (5 days ago)
- 17741d5 Fix training visualization layout - clean structured flow (6 days ago)
- 9fbbc33 Add dynamic BATS training visualization to training page (6 days ago)
- 1cfb83b Add comprehensive BATS training example visualization (6 days ago)
- cf80a17 Redesign flow diagram with ledger-style layout (6 days ago)

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
