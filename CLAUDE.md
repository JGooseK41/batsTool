# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 17:06)

**Commit:** 3e9c8e6343dcdb7704bc03ed58268aa0e18095b1
**Author:** Your Name
**Message:** Add mobile showcase version for browsing B.A.T.S. capabilities

- Create mobile-optimized showcase page (mobile.html)
- Design responsive layout with tab navigation
- Add overview, features, workflow, and demo sections
- Include visual workflow steps and feature descriptions
- Optimize for browsing and understanding, not usage
- Add CTAs linking to main tool and training resources

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 mobile.html | 554 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 554 insertions(+)
```

## Recent Commits History

- 3e9c8e6 Add mobile showcase version for browsing B.A.T.S. capabilities (0 seconds ago)
- 1af5938 Implement UI/UX improvements and bug fixes (3 minutes ago)
- 6a29b42 Improve victim workflow and fix hop entry timestamps (31 minutes ago)
- 29e2b27 Major UI/UX improvements and token transfer fix (48 minutes ago)
- c4f0890 Reorganize case setup workflow (2 hours ago)
- 260d643 Enhance welcome screen and onboarding workflow (2 hours ago)
- fdb325b Enhance hop entry wizard with manual entry and better control options (5 days ago)
- 2ccef07 Improve hop progression clarity and finalization UX (5 days ago)
- 9e8eb55 Fix persistent JavaScript errors in hop creation and wallet index (5 days ago)
- 2c6ef9f Fix critical JavaScript errors in hop creation (5 days ago)

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
