# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 19:25)

**Commit:** feef15b9e1c09b786454eb9c7774cd2f2b25e836
**Author:** Your Name
**Message:** Debug hop entry wizard not showing after trace selection

- Added extensive console logging to trace the issue
- Increased setTimeout delay from 100ms to 250ms to prevent race condition
- Added z-index to both wizards to ensure proper layering
- Added verification checks after wizard HTML insertion
- Added logging in selectEntryType, showAddEntryWizard, and showHopEntryWizard

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 41 ++++++++++++++++++++--------------------
 index.html | 64 ++++++++++++++++++++++++++++++++++++++++++++++++++------------
 2 files changed, 72 insertions(+), 33 deletions(-)
```

## Recent Commits History

- feef15b Debug hop entry wizard not showing after trace selection (0 seconds ago)
- a48f4a5 Fix missing function and victim completion workflow (9 minutes ago)
- fd803ec Add purple segment to progress bars for VASP/exchange deposits (17 minutes ago)
- b7b101f Add visual ART progress bars for fund tracking (20 minutes ago)
- ff7f197 Add entry type selection wizard for better UX (27 minutes ago)
- d4eb009 Improve hop entry workflow with wizard and better button explanations (32 minutes ago)
- 49a0636 Fix initial white screen and missing blockchain lookup functions (36 minutes ago)
- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (68 minutes ago)
- c803494 Fix template literal syntax error on line 5557 (73 minutes ago)
- ef38132 Fix template literal structure on line 5557 (2 hours ago)

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
