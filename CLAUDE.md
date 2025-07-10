# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 15:50)

**Commit:** 13e9872403a8a12163ca6ce5fca03f8ca9c0593e
**Author:** Your Name
**Message:** Add HTTPS enforcement and security features

- Added automatic HTTP to HTTPS redirect in JavaScript
- Added visual security indicators:
  - Yellow warning banner for file:// protocol with limited functionality notice
  - Green secure connection indicator for HTTPS (auto-hides after 5 seconds)
- Added comprehensive deployment section to training materials
- Created .htaccess file for Apache servers with:
  - HTTPS enforcement rules
  - Security headers (HSTS, CSP, X-Frame-Options, etc.)
  - Access restrictions for sensitive files
  - Performance optimizations (compression, caching)
- Warning message links to deployment instructions in training materials

This ensures users are aware of security requirements and provides clear guidance for proper deployment.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 .htaccess     | 59 ++++++++++++++++++++++++++++++++++++
 CLAUDE.md     | 35 +++++++++++-----------
 index.html    | 79 ++++++++++++++++++++++++++++++++++++++++++++++++
 training.html | 96 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 4 files changed, 251 insertions(+), 18 deletions(-)
```

## Recent Commits History

- 13e9872 Add HTTPS enforcement and security features (0 seconds ago)
- f8a59a5 Fix critical transaction selection modal data population issue (11 minutes ago)
- 6a44eb2 Update B.A.T.S. training to emphasize documentation over identical results (16 minutes ago)
- c775b9a Create dedicated B.A.T.S. Training page (31 minutes ago)
- 4918949 Fix JavaScript errors and duplicate variable declarations (49 minutes ago)
- 5732873 Add comprehensive BATS Info tab and documentation (2 hours ago)
- fcbd8cd Add submit button to investigation setup card (4 hours ago)
- 5e7cad5 Improve UI workflow and fix transfer selection functionality (5 hours ago)
- d724e0c Redesign case details layout for improved UX (5 hours ago)
- efa7956 Fix null reference error in updateValidationStatus (5 hours ago)

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
