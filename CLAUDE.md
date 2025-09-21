# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-20 18:46)

**Commit:** 3d7c67dae6bb811d4717dc19e3763173b979dd30
**Author:** Your Name
**Message:** Remove premature visualization prompts - only show when investigation is complete

- Added visualizationPromptSection div that is hidden by default
- Updated updateInvestigationCompletionStatus() to show visualization prompt only when:
  - All threads have reached terminal wallets
  - All hops are complete
  - No validation errors exist
- Visualization options now only appear when investigation is truly complete
- Prevents user confusion from seeing options that aren't ready yet

### Changed Files:
```
 CLAUDE.md  | 35 +++++++++++++++++++----------------
 index.html | 38 +++++++++++++++++++++-----------------
 2 files changed, 40 insertions(+), 33 deletions(-)
```

## Recent Commits History

- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (0 seconds ago)
- e10954c Strengthen currency separation to ensure proper scaling (31 minutes ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (41 minutes ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (4 hours ago)
- 1558665 Auto-update CLAUDE.md (4 hours ago)
- 28311c6 Improve visual contrast for work area and input fields (4 hours ago)
- 0ba9e4f Auto-update CLAUDE.md (4 hours ago)
- 2c9a44e Enhance main work area visual differentiation (4 hours ago)
- 7d2dff8 Remove rainbow colors from investigation progress cards (4 hours ago)
- c535605 Auto-update CLAUDE.md with latest changes (4 hours ago)

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
