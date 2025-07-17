# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 22:30)

**Commit:** 27b4b5120e7cabdecb076fe433830b5ed1da0fbb
**Author:** Your Name
**Message:** Fix manual entry modal and add debugging for thread availability

- Remove 'from wallet' field in manual entry modal (auto-filled from source thread)
- Add comprehensive debugging for available threads calculation
- Log thread availability details in console for troubleshooting
- Show source wallet information based on selected threads
- Update wizard to use source wallet from thread data

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 35 +++++++++++++++++++----------------
 index.html | 56 ++++++++++++++++++++++++++++++++++++++++++++++++--------
 2 files changed, 67 insertions(+), 24 deletions(-)
```

## Recent Commits History

- 27b4b51 Fix manual entry modal and add debugging for thread availability (0 seconds ago)
- d3c18fa Add mobile device detection and automatic redirection (5 hours ago)
- 3e9c8e6 Add mobile showcase version for browsing B.A.T.S. capabilities (5 hours ago)
- 1af5938 Implement UI/UX improvements and bug fixes (5 hours ago)
- 6a29b42 Improve victim workflow and fix hop entry timestamps (6 hours ago)
- 29e2b27 Major UI/UX improvements and token transfer fix (6 hours ago)
- c4f0890 Reorganize case setup workflow (7 hours ago)
- 260d643 Enhance welcome screen and onboarding workflow (7 hours ago)
- fdb325b Enhance hop entry wizard with manual entry and better control options (5 days ago)
- 2ccef07 Improve hop progression clarity and finalization UX (5 days ago)

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
