# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 13:29)

**Commit:** 573287360c6374a523447ca4b620028cfaaa9ff3
**Author:** Your Name
**Message:** Add comprehensive BATS Info tab and documentation

- Added BATS Info tab to the application with educational content
- Created comprehensive documentation from BATS Desk Reference:
  - BATS-FAQ.md: Frequently asked questions
  - BATS-Methodology-Guide.md: Detailed methodology breakdown
  - BATS-Benefits-Overview.md: Benefits documentation
  - BATS-Quick-Start-Guide.md: Quick start guide for new users
- Emphasized that standardized documentation creates reproducible results
- Improved UI with collapsible setup card and visual workflow
- Fixed transfer selection modal and file save messaging
- Added color-coded cards with step labels for better UX

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md                      |  40 ++---
 docs/BATS Desk Reference.docx  | Bin 0 -> 47060 bytes
 docs/BATS-Benefits-Overview.md | 167 +++++++++++++++++++
 docs/BATS-FAQ.md               | 108 +++++++++++++
 docs/BATS-Methodology-Guide.md | 190 ++++++++++++++++++++++
 docs/BATS-Quick-Start-Guide.md | 173 ++++++++++++++++++++
 index.html                     | 354 +++++++++++++++++++++++++++++++++++++++--
 7 files changed, 996 insertions(+), 36 deletions(-)
```

## Recent Commits History

- 5732873 Add comprehensive BATS Info tab and documentation (0 seconds ago)
- fcbd8cd Add submit button to investigation setup card (2 hours ago)
- 5e7cad5 Improve UI workflow and fix transfer selection functionality (2 hours ago)
- d724e0c Redesign case details layout for improved UX (3 hours ago)
- efa7956 Fix null reference error in updateValidationStatus (3 hours ago)
- bdbe95c Fix initialization error by moving event listener inside DOMContentLoaded (3 hours ago)
- 175069e Improve UI and fix transfer selection functionality (3 hours ago)
- e376652 Fix transfer selection and add asset filter (3 hours ago)
- 45fb983 Add Flow Diagram visualization - Phase 1 (4 hours ago)
- 31ec874 Fix white screen issue when starting investigation (4 hours ago)

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
