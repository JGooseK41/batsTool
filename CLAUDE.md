# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 15:34)

**Commit:** c4f08907cc147b0813549e63d49b2f6cdb508464
**Author:** Your Name
**Message:** Reorganize case setup workflow

- Move case details card to dedicated 'Case Details' tab
- Add case synopsis field to welcome screen quick start form
- Remove duplicate setup card from main area
- Add investigation progress statistics to Case Details tab
- Make welcome screen the primary entry point for new investigations
- Clean up obsolete setup card functions
- Improve overall workflow by eliminating duplicate data entry

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  50 +++++-----
 index.html | 321 ++++++++++++++++++++++++++++++-------------------------------
 2 files changed, 183 insertions(+), 188 deletions(-)
```

## Recent Commits History

- c4f0890 Reorganize case setup workflow (0 seconds ago)
- 260d643 Enhance welcome screen and onboarding workflow (8 minutes ago)
- fdb325b Enhance hop entry wizard with manual entry and better control options (5 days ago)
- 2ccef07 Improve hop progression clarity and finalization UX (5 days ago)
- 9e8eb55 Fix persistent JavaScript errors in hop creation and wallet index (5 days ago)
- 2c6ef9f Fix critical JavaScript errors in hop creation (5 days ago)
- 85941f5 Remove inaccurate graph from training page (5 days ago)
- 17741d5 Fix training visualization layout - clean structured flow (6 days ago)
- 9fbbc33 Add dynamic BATS training visualization to training page (6 days ago)
- 1cfb83b Add comprehensive BATS training example visualization (6 days ago)

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
