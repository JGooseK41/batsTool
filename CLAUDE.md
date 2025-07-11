# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 19:51)

**Commit:** c0280a6c43b920f7f8745772a503c68e01122d52
**Author:** Your Name
**Message:** Fix save/load functionality and improve state preservation

- Added wallet index building after victim completion
- Fixed RED wallet index to show even before root total confirmation
- Implemented chronological sorting for hop entries
- Sort entries by timestamp to maintain proper order
- Re-assign IDs after sorting to maintain sequential numbering
- Sort entries on load, after updates, and when new entries are added
- Fixed case synopsis not being restored on load
- Added setupComplete flag to track setup card state
- Update setup card UI state when loading files

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 41 +++++++++++++++--------------
 index.html | 87 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 105 insertions(+), 23 deletions(-)
```

## Recent Commits History

- c0280a6 Fix save/load functionality and improve state preservation (0 seconds ago)
- 65a79eb Fix hop ID type mismatch preventing wizard from showing (20 minutes ago)
- feef15b Debug hop entry wizard not showing after trace selection (26 minutes ago)
- a48f4a5 Fix missing function and victim completion workflow (35 minutes ago)
- fd803ec Add purple segment to progress bars for VASP/exchange deposits (43 minutes ago)
- b7b101f Add visual ART progress bars for fund tracking (46 minutes ago)
- ff7f197 Add entry type selection wizard for better UX (53 minutes ago)
- d4eb009 Improve hop entry workflow with wizard and better button explanations (58 minutes ago)
- 49a0636 Fix initial white screen and missing blockchain lookup functions (62 minutes ago)
- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (2 hours ago)

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
