# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-10 13:54)

**Commit:** 5c52cc0bde975e35bea9ecf19a4411e028751b10
**Author:** Your Name
**Message:** Add streamlined B.A.T.S. workflow with level selector

- Created new streamlined interface (bats-streamlined.html)
- Added B.A.T.S. level selector modal with 4 investigation levels
- Implemented progressive disclosure based on investigation depth
- Added visual progress tracking for investigation status
- Simplified UI to highlight core B.A.T.S. methodology
- Each level shows appropriate tools and time investment
- Maintains golden thread principle throughout workflow

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md             |  65 ++++---
 bats-streamlined.html | 527 ++++++++++++++++++++++++++++++++++++++++++++++++++
 test-case-resume.html |  66 +++++++
 3 files changed, 632 insertions(+), 26 deletions(-)
```

## Recent Commits History

- 5c52cc0 Add streamlined B.A.T.S. workflow with level selector (1 second ago)
- 2861c83 Add multi-output selection and change address tracking (19 hours ago)
- 4d20525 Fix hop completion and thread status visualization issues (2 days ago)
- 7f4018d Improve transition from victims to Hop 1 with clearer guidance (2 days ago)
- 68b8964 Fix blockchain.info API field naming issue (2 days ago)
- 86b9ea0 Fix Bitcoin timestamp retrieval bug (2 days ago)
- ab704ec Fix Bitcoin timestamp handling and improve debugging (2 days ago)
- 1a139f1 Improve Bitcoin output selection for all multi-output transactions (2 days ago)
- 8c7bb6d Fix multi-thread handling and Bitcoin UTXO selection (2 days ago)
- 91d5bed Fix terminology and improve hop progression flow (3 weeks ago)

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
