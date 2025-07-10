# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 15:56)

**Commit:** 1ae3b49380afc177b368d9c3c0c566c11f472ace
**Author:** Your Name
**Message:** Add BATS Investigation Graph Structure illustration to training

- Created comprehensive SVG diagram showing the mathematical graph structure
- Illustrates flow from victims through RED, BLACK, YELLOW wallets to terminals
- Shows convergence at YELLOW hub wallet demonstrating criminal consolidation
- Includes mathematical validation box showing how totals are verified
- Added explanatory cards about graph properties (DAG, completeness, traceability)
- Demonstrates V-T-H notation on actual graph edges
- Visual legend for all wallet color classifications
- Shows why the graph structure makes evidence legally defensible

This visual clearly articulates both the reason for the process and how it fundamentally functions as a mathematical proof system.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     |  52 ++++++++--------
 training.html | 193 +++++++++++++++++++++++++++++++++++++++++++++++++++++++---
 2 files changed, 211 insertions(+), 34 deletions(-)
```

## Recent Commits History

- 1ae3b49 Add BATS Investigation Graph Structure illustration to training (0 seconds ago)
- 4295dde Fix SSL certificate mismatch and improve domain handling (4 minutes ago)
- 13e9872 Add HTTPS enforcement and security features (6 minutes ago)
- f8a59a5 Fix critical transaction selection modal data population issue (17 minutes ago)
- 6a44eb2 Update B.A.T.S. training to emphasize documentation over identical results (23 minutes ago)
- c775b9a Create dedicated B.A.T.S. Training page (38 minutes ago)
- 4918949 Fix JavaScript errors and duplicate variable declarations (55 minutes ago)
- 5732873 Add comprehensive BATS Info tab and documentation (2 hours ago)
- fcbd8cd Add submit button to investigation setup card (5 hours ago)
- 5e7cad5 Improve UI workflow and fix transfer selection functionality (5 hours ago)

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
