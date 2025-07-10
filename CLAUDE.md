# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 16:46)

**Commit:** 2383e3f2974053f64f840643eeb0c5a54a944d52
**Author:** Your Name
**Message:** UI improvements for victim transactions

- Made Add Transaction button more prominent (blue instead of gray)
- Added victim completion/minimize feature with transaction summary
- Changed Save Investigation button text to include 'Calculate ART'
- Fixed default filename to use case number only
- Added total losses display in minimized victim view
- Implemented collapsible victim cards after completion

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  41 ++++++++++---------
 index.html | 134 +++++++++++++++++++++++++++++++++++++++++++++++++++++--------
 2 files changed, 139 insertions(+), 36 deletions(-)
```

## Recent Commits History

- 2383e3f UI improvements for victim transactions (0 seconds ago)
- a0fecda Add SSL success documentation and update troubleshooting guides (25 minutes ago)
- 7dd59b9 Add Netlify DNS setup guide (33 minutes ago)
- c214168 Add SSL certificate troubleshooting guide (36 minutes ago)
- 4145bde Fix error preventing progression after root total generation (45 minutes ago)
- 1ae3b49 Add BATS Investigation Graph Structure illustration to training (49 minutes ago)
- 4295dde Fix SSL certificate mismatch and improve domain handling (53 minutes ago)
- 13e9872 Add HTTPS enforcement and security features (56 minutes ago)
- f8a59a5 Fix critical transaction selection modal data population issue (67 minutes ago)
- 6a44eb2 Update B.A.T.S. training to emphasize documentation over identical results (72 minutes ago)

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
