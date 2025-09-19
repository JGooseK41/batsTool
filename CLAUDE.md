# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-19 07:14)

**Commit:** 1305e259b84034bfb7f69bded170f4ab93303921
**Author:** Your Name
**Message:** Redesign landing page to emphasize B.A.T.S. as a documentation standard

- Complete redesign of welcome screen as professional landing page
- Clear messaging that B.A.T.S. is a documentation standard, not a tracing tool
- Added prominent training requirement notice
- Emphasized B.A.T.S. works alongside commercial tools (Chainalysis, TRM, Qlue, etc.)
- Added 'What B.A.T.S. Does' vs 'What B.A.T.S. Doesn't Do' sections
- Created clear primary CTA: 'Start B.A.T.S. Documentation' button
- Added quick links to training portal, quick start guide, and API settings
- Reorganized Utility Tools section below main documentation flow
- Added proper prerequisite checklist before starting
- Improved messaging about V-T-H notation and ART system
- Added showQuickStartGuide() function for inline help
- Updated startBATSDocumentation() to guide users to case details first

The landing page now properly sets expectations that B.A.T.S. is for trained investigators to document their work, not a standalone analysis tool.

### Changed Files:
```
 CLAUDE.md  |  69 +++++++++++-------
 index.html | 241 ++++++++++++++++++++++++++++++++++++++++++-------------------
 2 files changed, 209 insertions(+), 101 deletions(-)
```

## Recent Commits History

- 1305e25 Redesign landing page to emphasize B.A.T.S. as a documentation standard (1 second ago)
- 10be1b4 Add production-ready PK Converter and Address Finder tools (11 minutes ago)
- 5c52cc0 Add streamlined B.A.T.S. workflow with level selector (9 days ago)
- 2861c83 Add multi-output selection and change address tracking (10 days ago)
- 4d20525 Fix hop completion and thread status visualization issues (11 days ago)
- 7f4018d Improve transition from victims to Hop 1 with clearer guidance (11 days ago)
- 68b8964 Fix blockchain.info API field naming issue (11 days ago)
- 86b9ea0 Fix Bitcoin timestamp retrieval bug (11 days ago)
- ab704ec Fix Bitcoin timestamp handling and improve debugging (11 days ago)
- 1a139f1 Improve Bitcoin output selection for all multi-output transactions (11 days ago)

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
