# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-19 16:23)

**Commit:** 8e5b570c6426538c7a23b19b003eb1dee7251b90
**Author:** Your Name
**Message:** Fix landing page scrolling and improve tool purpose explanation

- Add overflow-y: auto and height: 100vh to welcome screen for proper scrolling
- Add overflow-x: hidden to body to prevent horizontal scroll
- Update Note text to clarify BATS tool purpose and recommended usage workflow
- Emphasize role as documentation guardrails rather than standalone tracer

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 8 ++++----
 index.html | 7 ++++---
 2 files changed, 8 insertions(+), 7 deletions(-)
```

## Recent Commits History

- 8e5b570 Fix landing page scrolling and improve tool purpose explanation (0 seconds ago)
- 57b7772 Transform landing page to professional dark theme design (4 minutes ago)
- 23813d6 Simplify landing page with clean card-based design (2 hours ago)
- e0c57df Fix utility tools accessibility and update branding colors (2 hours ago)
- e2b2f8f Fix utility tools accessibility from landing page (2 hours ago)
- 741a016 Fix syntax error in initializeApp function - remove extra closing parenthesis (2 hours ago)
- 96ebc4e Major UI restructuring: Clean landing page separate from app (7 hours ago)
- f92e381 Simplify CORS handling to work seamlessly without user configuration (7 hours ago)
- f807b20 Simplify landing page and fix Address Finder CORS/CSP issues (7 hours ago)
- 1305e25 Redesign landing page to emphasize B.A.T.S. as a documentation standard (9 hours ago)

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
