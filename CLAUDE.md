# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-08-22 04:52)

**Commit:** 25b820072ab58a68c464f2fc6112e334c9b7f563
**Author:** Your Name
**Message:** Add Arkham & Etherscan attribution API integration

- Embedded Arkham API key for automatic attribution checking
- Added Etherscan label/tag checking for Ethereum addresses
- Dual-source attribution from both Arkham and Etherscan
- Attribution popup shows entity name, type, service, and source
- Works automatically for all users without configuration
- Advanced users can override with their own API keys
- Attribution data added to transaction/entry notes
- Shows source badges (🔍 Arkham / 🔷 Etherscan)

Attribution now checks both services in parallel when addresses are entered,
providing comprehensive entity identification for blockchain investigations.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  43 ++++----
 index.html | 338 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 363 insertions(+), 18 deletions(-)
```

## Recent Commits History

- 25b8200 Add Arkham & Etherscan attribution API integration (0 seconds ago)
- e53c443 Fix split source thread assignment blocking issue (5 weeks ago)
- db2a50a Make active tab blue much darker for better contrast (5 weeks ago)
- 89e87dc Enhance tab visibility with distinct active state styling (5 weeks ago)
- 489d501 Fix syntax error - remove extra closing brace (5 weeks ago)
- e0e4fb0 Fix indentation of entryTypes declaration (5 weeks ago)
- 7e5e367 Fix duplicate currencies and timezones declarations (5 weeks ago)
- 564e247 Fix duplicate entryTypes declaration error (5 weeks ago)
- 7a3113c Fix JavaScript errors preventing page from loading (5 weeks ago)
- 428cb65 Update CLAUDE.md with latest commit info (5 weeks ago)

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
