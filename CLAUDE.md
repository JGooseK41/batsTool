# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-22 16:51)

**Commit:** 7bdc0f83a83edc5664e76e993fede10d27009576
**Author:** Your Name
**Message:** Fix critical swap wizard bugs: Add missing showThreadReviewModal function and ensure swap wizard displays properly

- Created showThreadReviewModal function to display thread review before proceeding to next hop
- Added proper debugging and error handling to swap wizard initialization
- Ensured swap wizard modal displays with correct styling
- Fixed console error preventing hop completion

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 50 +++++++++++++++++++++++++------------
 index.html | 83 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 116 insertions(+), 17 deletions(-)
```

## Recent Commits History

- 7bdc0f8 Fix critical swap wizard bugs: Add missing showThreadReviewModal function and ensure swap wizard displays properly (0 seconds ago)
- f89a74e Major improvements to swap handling and UI/UX enhancements (26 minutes ago)
- a48616a Streamline wizard workflow - entries now create directly without manual form step (57 minutes ago)
- 150f54c Improve post-wizard UI clarity and workflow guidance (2 hours ago)
- 9fc5142 Fix wizard freeze when looking up transactions with single token transfer (28 hours ago)
- 3992784 Fix missing closing braces in lookupWizardTransaction (28 hours ago)
- 304c674 Fix syntax errors in lookupWizardTransaction (28 hours ago)
- 3b84fc6 Complete remaining bug fixes and optimizations (28 hours ago)
- db59b81 Major bug fixes and security improvements (28 hours ago)
- 9196e89 Fix currency filtering in wizard to only show outputs matching tracked currency (29 hours ago)

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
