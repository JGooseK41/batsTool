# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 18:53)

**Commit:** d4eb0090241b03556bdde859a1e2f6506f943ed3
**Author:** Your Name
**Message:** Improve hop entry workflow with wizard and better button explanations

- Added step-by-step wizard for hop trace entries:
  - Step 1: Select source threads
  - Step 2: Allocate amounts from each thread
  - Step 3: Enter transaction hash and lookup details
- Wizard is dismissible with "Don't show again" preference
- Added clear explanations for Smart Amount Allocation vs Max buttons:
  - Smart Allocation: For tracing specific total amounts across multiple sources
  - Max button: For quickly allocating all available funds
- Fixed workflow to select threads and amounts before entering transaction hash

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  38 +++---
 index.html | 433 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 452 insertions(+), 19 deletions(-)
```

## Recent Commits History

- d4eb009 Improve hop entry workflow with wizard and better button explanations (0 seconds ago)
- 49a0636 Fix initial white screen and missing blockchain lookup functions (4 minutes ago)
- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (35 minutes ago)
- c803494 Fix template literal syntax error on line 5557 (41 minutes ago)
- ef38132 Fix template literal structure on line 5557 (67 minutes ago)
- 6cd39e0 Fix missing backtick in template expression (69 minutes ago)
- 4782757 Fix template literal syntax - swap backtick and brace position (73 minutes ago)
- aa39a3a Remove carriage return characters causing syntax error (2 hours ago)
- a865d8b Fix extra closing brace in template literal (2 hours ago)
- 8fbd79e Fix template literal syntax error in renderVictims function (2 hours ago)

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
