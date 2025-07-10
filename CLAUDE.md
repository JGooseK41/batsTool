# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 15:39)

**Commit:** f8a59a55f237ade4071660791f81822db516a796
**Author:** Your Name
**Message:** Fix critical transaction selection modal data population issue

- Fixed callback being cleared before execution in selectTransfer function
- Added validation to ensure transfer data is valid before applying
- Added error checking for all form field updates
- Improved error messages and logging for debugging
- Removed immediate re-render that was clearing form values
- Added detailed console logging for troubleshooting

This resolves the issue where selected transfer data was not populating into victim transaction fields.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 37 ++++++++++++++---------------
 index.html | 78 ++++++++++++++++++++++++++++++++++++++++++++++----------------
 2 files changed, 77 insertions(+), 38 deletions(-)
```

## Recent Commits History

- f8a59a5 Fix critical transaction selection modal data population issue (0 seconds ago)
- 6a44eb2 Update B.A.T.S. training to emphasize documentation over identical results (5 minutes ago)
- c775b9a Create dedicated B.A.T.S. Training page (21 minutes ago)
- 4918949 Fix JavaScript errors and duplicate variable declarations (38 minutes ago)
- 5732873 Add comprehensive BATS Info tab and documentation (2 hours ago)
- fcbd8cd Add submit button to investigation setup card (4 hours ago)
- 5e7cad5 Improve UI workflow and fix transfer selection functionality (4 hours ago)
- d724e0c Redesign case details layout for improved UX (5 hours ago)
- efa7956 Fix null reference error in updateValidationStatus (5 hours ago)
- bdbe95c Fix initialization error by moving event listener inside DOMContentLoaded (5 hours ago)

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
