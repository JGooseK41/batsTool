# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 09:54)

**Commit:** 55d4bdb02951c0d0c918059e91ecd8c9bb3548f5
**Author:** Your Name
**Message:** Implement LIBR method support and Sequential Hop Rule

- Add updateTracingMethod function to switch between PIFO (default) and LIBR methods
- Implement Sequential Hop Rule for convergence handling
- When multiple trace paths converge, apply highest hop number + 1
- Add convergenceData tracking with sequentialHopRuleApplied flag
- Show notifications when Sequential Hop Rule is applied
- Add placeholder applyLIBRMethod function for future implementation
- Update smart allocation and wizard to apply Sequential Hop Rule
- Maintain PIFO as default method with LIBR as rare exception

Per B.A.T.S. framework: 'When multiple trace paths converge at the same wallet and move out together, apply the highest hop count among all converging paths, plus one for the outbound transaction.'

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 B.A.T.S Desk Reference.pdf                 | 40524 +++++++++++++++++++++++++++
 B.A.T.S Desk Reference.pdf:Zone.Identifier |     4 +
 BATS Method.txt                            |   635 +
 CLAUDE.md                                  |    56 +-
 index.html                                 |   495 +-
 5 files changed, 41627 insertions(+), 87 deletions(-)
```

## Recent Commits History

- 55d4bdb Implement LIBR method support and Sequential Hop Rule (0 seconds ago)
- 0f263be Implement UTC timezone compliance for all reports (3 hours ago)
- accef56 Add comprehensive validation and safety improvements (3 hours ago)
- 64c99a1 Fix critical bugs in hop completion and validation (10 hours ago)
- a3f9e29 Fix conversion tracking and UI issues (11 hours ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (11 hours ago)
- 558ebe9 Fix JavaScript errors - add missing walletTypes global and fix orphaned code (11 hours ago)
- ebad042 Fix JavaScript errors in hop finalization (11 hours ago)
- 1ca5ecd Fix hop finalization loop - add thread review before moving to next hop (11 hours ago)
- 27b4b51 Fix manual entry modal and add debugging for thread availability (11 hours ago)

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
