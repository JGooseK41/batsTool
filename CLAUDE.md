# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 21:53)

**Commit:** 38e3ce6f4dd80670661afb9d9832920d2717cdaa
**Author:** Your Name
**Message:** Upgrade to Etherscan API v2 and add multi-chain support

- Migrate from Etherscan API v1 to v2 for better rate limits
- Add support for multiple EVM chains: Base, Arbitrum, Optimism, Polygon, BNB Chain
- Create shared EVM response parser for all EVM-compatible chains
- All chains use single Etherscan API key through v2 endpoint
- Note: Chain detection from address not possible for EVM chains (all use 0x)

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  41 ++++----
 index.html | 321 ++++++++++++++++++++++++++++++++++++++-----------------------
 2 files changed, 218 insertions(+), 144 deletions(-)
```

## Recent Commits History

- 38e3ce6 Upgrade to Etherscan API v2 and add multi-chain support (0 seconds ago)
- 51c3e12 Add warnings when actual transaction timestamp cannot be retrieved (12 minutes ago)
- 884ac3a Restore block timestamp fetching with better error handling (15 minutes ago)
- 8286bde Remove block timestamp fetching to fix token transfer detection (18 minutes ago)
- 756e97e Remove delays and debug logging since rate limits aren't the issue (21 minutes ago)
- 732ce97 Fix API key not being used from localStorage (25 minutes ago)
- b88ff50 Fix Etherscan rate limit errors and add delays between API calls (28 minutes ago)
- ed440c5 Add detailed logging for token transfer detection (31 minutes ago)
- af55c18 Fix token transfer modal not showing and handle 0 ETH transactions (34 minutes ago)
- b69c7b9 Fix token transfer selection modal and display issues (38 minutes ago)

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
