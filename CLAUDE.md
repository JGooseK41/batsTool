# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-22 17:19)

**Commit:** c4b118d1325c3aeef615145e627ea026b2d55485
**Author:** Your Name
**Message:** Fix ERC-20 token filtering regression in wizard

- Fixed control flow issue where single token transfers were incorrectly showing multi-output selection
- When tracking ERC-20 tokens, wizard now properly ignores ETH transfers and only follows the token
- Corrected bracket structure to allow single transfers to continue to display logic
- Cleaned up indentation after restructuring the control flow

This restores the previous working behavior where ERC-20 transactions don't confuse users by showing both ETH and token transfers when only tracking the token.

### Changed Files:
```
 CLAUDE.md  |  56 ++++++++++++--------------------
 index.html | 106 ++++++++++++++++++++++++++++++-------------------------------
 2 files changed, 73 insertions(+), 89 deletions(-)
```

## Recent Commits History

- c4b118d Fix ERC-20 token filtering regression in wizard (0 seconds ago)
- 7bdc0f8 Fix critical swap wizard bugs: Add missing showThreadReviewModal function and ensure swap wizard displays properly (28 minutes ago)
- f89a74e Major improvements to swap handling and UI/UX enhancements (54 minutes ago)
- a48616a Streamline wizard workflow - entries now create directly without manual form step (85 minutes ago)
- 150f54c Improve post-wizard UI clarity and workflow guidance (2 hours ago)
- 9fc5142 Fix wizard freeze when looking up transactions with single token transfer (28 hours ago)
- 3992784 Fix missing closing braces in lookupWizardTransaction (28 hours ago)
- 304c674 Fix syntax errors in lookupWizardTransaction (28 hours ago)
- 3b84fc6 Complete remaining bug fixes and optimizations (28 hours ago)
- db59b81 Major bug fixes and security improvements (28 hours ago)

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
