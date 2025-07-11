# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 20:53)

**Commit:** cc30ae12daaa35ea5c904960d3d748eef1ee40ef
**Author:** Your Name
**Message:** Fix UI issues: center modals, make collapsed items thinner, ensure Next Step buttons visible

- Updated modal CSS to use flexbox centering with .show class
- Made collapsed hop entries and headers thinner (8px vs 15px padding)
- Fixed createCenteredModal function to handle all modal display variations
- Added !important to .tab-content.active display to ensure visibility
- Added custom showAlert function for centered alerts (foundation for future)
- Added data-hop-id attribute to hop containers for navigation
- Hide delete button in collapsed entry state for cleaner look
- Fixed PIFO terminology (Proceeds In First Out) throughout app

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  45 +++---
 index.html | 455 +++++++++++++++++++++++++++++++++++++++++++++++++++----------
 2 files changed, 407 insertions(+), 93 deletions(-)
```

## Recent Commits History

- cc30ae1 Fix UI issues: center modals, make collapsed items thinner, ensure Next Step buttons visible (0 seconds ago)
- c0280a6 Fix save/load functionality and improve state preservation (62 minutes ago)
- 65a79eb Fix hop ID type mismatch preventing wizard from showing (82 minutes ago)
- feef15b Debug hop entry wizard not showing after trace selection (88 minutes ago)
- a48f4a5 Fix missing function and victim completion workflow (2 hours ago)
- fd803ec Add purple segment to progress bars for VASP/exchange deposits (2 hours ago)
- b7b101f Add visual ART progress bars for fund tracking (2 hours ago)
- ff7f197 Add entry type selection wizard for better UX (2 hours ago)
- d4eb009 Improve hop entry workflow with wizard and better button explanations (2 hours ago)
- 49a0636 Fix initial white screen and missing blockchain lookup functions (2 hours ago)

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
