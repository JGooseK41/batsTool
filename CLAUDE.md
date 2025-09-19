# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-19 07:02)

**Commit:** 10be1b41f8d16f09d70eb0c81fe36bb5c29a3149
**Author:** Your Name
**Message:** Add production-ready PK Converter and Address Finder tools

- Integrated Public Key Converter tool for cross-chain address generation
  - Converts public keys to addresses for Bitcoin, Ethereum, BSC, Polygon, Arbitrum, Optimism
  - Uses proper cryptographic functions (RIPEMD-160, Keccak-256)
  - Checks real-time blockchain activity via APIs
  - Accessible from welcome screen without login

- Added Address Finder tool for partial address searches
  - Find complete addresses from partial patterns (prefix, suffix, both, contains)
  - Real blockchain search using BlockCypher API for Bitcoin
  - Searches recent blocks and token holders for Ethereum/EVM chains
  - Shows activity status and balance information
  - Professional error handling and user guidance

- Production improvements:
  - Removed all demo/random data generation
  - Fixed cryptographic implementations using crypto-js library
  - Added EIP-55 checksum for Ethereum addresses
  - Enhanced error messages and empty state handling
  - Created test suite for verification (test-tools.html)

- API integrations:
  - BlockCypher for Bitcoin prefix search (200 req/hr free)
  - Blockchain.info for address validation
  - Etherscan APIs for EVM chains
  - All results from real blockchain data

Both tools are forensic-grade and ready for production use in investigations.

### Changed Files:
```
 CLAUDE.md         |   50 +--
 PK Converter.html |  706 +++++++++++++++++++++++++++++++++
 index.html        | 1140 ++++++++++++++++++++++++++++++++++++++++++++++++++++-
 test-tools.html   |  178 +++++++++
 4 files changed, 2037 insertions(+), 37 deletions(-)
```

## Recent Commits History

- 10be1b4 Add production-ready PK Converter and Address Finder tools (0 seconds ago)
- 5c52cc0 Add streamlined B.A.T.S. workflow with level selector (9 days ago)
- 2861c83 Add multi-output selection and change address tracking (10 days ago)
- 4d20525 Fix hop completion and thread status visualization issues (11 days ago)
- 7f4018d Improve transition from victims to Hop 1 with clearer guidance (11 days ago)
- 68b8964 Fix blockchain.info API field naming issue (11 days ago)
- 86b9ea0 Fix Bitcoin timestamp retrieval bug (11 days ago)
- ab704ec Fix Bitcoin timestamp handling and improve debugging (11 days ago)
- 1a139f1 Improve Bitcoin output selection for all multi-output transactions (11 days ago)
- 8c7bb6d Fix multi-thread handling and Bitcoin UTXO selection (11 days ago)

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
