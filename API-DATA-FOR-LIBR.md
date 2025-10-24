# API Data Available for LIBR Implementation

## Executive Summary

**YES - We have API data that can assist with LIBR, but with limitations:**

✅ **Current Balance**: Available from all major APIs
✅ **Transaction History**: Complete chronological list available
⚠️ **Running Balance**: NOT directly provided - must be calculated
⚠️ **Historical Balance**: Can be reconstructed from transaction history
❌ **Lowest Intermediate Balance**: Must be calculated client-side

---

## API Capabilities by Blockchain

### 1. Ethereum & EVM Chains (Etherscan API)

**Available Data:**
- ✅ Current balance (`module=account&action=balance&tag=latest`)
- ✅ Complete transaction history (`module=account&action=txlist`)
- ✅ Token transfer history (`module=account&action=tokentx`)
- ✅ Internal transactions (contract calls)

**Transaction Fields Returned:**
```javascript
{
    timeStamp: "1640995200",      // Unix timestamp
    from: "0x...",                // Sender address
    to: "0x...",                  // Recipient address
    value: "1000000000000000000", // Amount in wei
    blockNumber: "13916165",      // Block height
    hash: "0x...",                // Transaction hash
    isError: "0"                  // Success/fail indicator
}
```

**What's MISSING for LIBR:**
- ❌ No `balance_after` field (running balance)
- ❌ No balance history snapshots
- ⚠️ Must calculate running balance by iterating through ALL transactions

**LIBR Implementation Strategy:**
```javascript
// Pseudo-code for LIBR balance tracking
async function calculateLIBRBalanceHistory(address, criminalProceedsDate) {
    // 1. Get ALL transactions (paginated)
    const allTxs = await getAllTransactions(address);

    // 2. Sort chronologically
    allTxs.sort((a, b) => a.timeStamp - b.timeStamp);

    // 3. Calculate running balance
    let balance = 0;
    let lowestBalance = Infinity;
    let balanceHistory = [];

    for (const tx of allTxs) {
        // Update balance based on inbound/outbound
        if (tx.to === address) {
            balance += parseFloat(tx.value) / 1e18;
        } else if (tx.from === address) {
            balance -= parseFloat(tx.value) / 1e18;
        }

        balanceHistory.push({
            timestamp: tx.timeStamp,
            balance: balance,
            txHash: tx.hash
        });

        // Track lowest balance after criminal proceeds deposited
        if (tx.timeStamp >= criminalProceedsDate) {
            lowestBalance = Math.min(lowestBalance, balance);
        }
    }

    return {
        balanceHistory,
        lowestBalance,
        currentBalance: balance
    };
}
```

**Current Implementation:** `index.html:4680-4683`

---

### 2. Bitcoin (Blockchain.info, Mempool.space, BlockCypher)

**Available Data:**
- ✅ Current balance (`final_balance` field)
- ✅ Transaction count (`n_tx` field)
- ✅ Transaction list (`txs` array)
- ✅ UTXO list (unspent outputs)

**API Response Structure (blockchain.info):**
```json
{
    "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "final_balance": 6858009854,
    "n_tx": 3682,
    "total_received": 6858009854,
    "total_sent": 0,
    "txs": [
        {
            "time": 1640995200,
            "tx_index": 7654321,
            "hash": "abc123...",
            "inputs": [...],
            "out": [...]
        }
    ]
}
```

**Bitcoin-Specific LIBR Challenge:**
- Bitcoin uses **UTXO model** (not account-based)
- Balance = sum of all unspent outputs
- More complex to track "wallet balance" over time
- UTXO mixing makes LIBR calculation difficult

**LIBR Implementation Strategy for Bitcoin:**
```javascript
// Bitcoin UTXO-based balance tracking
async function calculateBitcoinLIBRBalance(address) {
    const data = await fetch(`https://blockchain.info/rawaddr/${address}`);

    // Current balance (easy)
    const currentBalance = data.final_balance / 100000000; // Convert satoshis to BTC

    // Historical balance (complex - need to replay all UTXOs)
    let balanceHistory = [];
    let balance = 0;

    // Sort transactions chronologically
    const sortedTxs = data.txs.sort((a, b) => a.time - b.time);

    for (const tx of sortedTxs) {
        // Check outputs going TO this address
        for (const output of tx.out) {
            if (output.addr === address) {
                balance += output.value / 100000000;
            }
        }

        // Check inputs coming FROM this address
        for (const input of tx.inputs) {
            if (input.prev_out && input.prev_out.addr === address) {
                balance -= input.prev_out.value / 100000000;
            }
        }

        balanceHistory.push({
            timestamp: tx.time,
            balance: balance,
            txHash: tx.hash
        });
    }

    return balanceHistory;
}
```

**Current Implementation:** `index.html:5893-5894, 32108-32113`

---

### 3. Arkham Intelligence API

**Available Data:**
- ✅ Entity attribution (exchange/known wallet identification)
- ✅ Address labeling
- ✅ Multi-chain address linking
- ❌ Does NOT provide balance or transaction data
- ❌ Attribution only, not financial data

**Use Case for LIBR:**
- Helps identify when funds reach terminal wallets (exchanges)
- Provides context for wallet ownership
- **Cannot** provide balance history

**Current Implementation:** `index.html:4451-4657`

---

### 4. Tron (TronGrid API)

**Available Data:**
- ✅ Account balance
- ✅ Transaction history
- ✅ TRC-20 token transfers
- ⚠️ Similar to Ethereum - no running balance field

**Current Implementation:** Referenced in CSP header (line 9)

---

### 5. Solana (Solana RPC + Solscan)

**Available Data:**
- ✅ Account balance (via RPC `getBalance`)
- ✅ Transaction history (via Solscan API)
- ⚠️ No running balance - must calculate

**Current Implementation:** Referenced in CSP header (line 9)

---

## Recommended LIBR Implementation Approach

### Phase 1: Single-Address Balance Reconstruction

**What we CAN do with existing APIs:**

1. **Fetch Complete Transaction History**
   - Etherscan: `action=txlist&offset=10000&page=1` (paginate for large wallets)
   - Blockchain.info: `rawaddr/${address}?limit=10000`
   - Mempool.space: `/api/address/${address}/txs`

2. **Calculate Running Balance Client-Side**
   ```javascript
   // For each transaction, track:
   {
       timestamp: Date,
       txHash: String,
       type: 'inbound' | 'outbound',
       amount: Number,
       balanceBefore: Number,
       balanceAfter: Number,
       isAboveCriminalProceeds: Boolean
   }
   ```

3. **Identify Lowest Intermediate Balance**
   ```javascript
   const lowestBalance = Math.min(...balanceHistory.map(b => b.balanceAfter));
   const balanceDroppedBelow = lowestBalance < criminalProceedsAmount;
   ```

4. **Mark Transactions for LIBR**
   ```javascript
   // Find first transaction where balance drops below proceeds
   const firstLIBRTx = balanceHistory.find(b =>
       b.type === 'outbound' &&
       b.balanceAfter < criminalProceedsAmount
   );
   ```

---

### Phase 2: Multi-Address Balance Tracking (For Complex Cases)

**Challenge:** Criminal proceeds may move across multiple wallets

**Solution:**
1. Track balance history for each wallet separately
2. Link wallet histories by transfer timestamps
3. Build a "balance timeline" across entire trace

**Example:**
```
Wallet A: 5 BTC criminal proceeds deposited
├─ T1: 10 BTC balance after deposit (5 criminal + 5 existing)
├─ T2: 3 BTC out → Balance: 7 BTC (still > 5 BTC) ❌ Don't follow
├─ T3: 3 BTC out → Balance: 4 BTC (now < 5 BTC) ✅ FOLLOW THIS
└─ Funds go to Wallet B

Wallet B: 3 BTC arrives from Wallet A
├─ Starting balance: 0.5 BTC
├─ After deposit: 3.5 BTC (but only 3 BTC is traced)
└─ Apply LIBR to Wallet B's 3 BTC portion
```

---

## API Rate Limits & Performance

### Etherscan
- **Free Tier**: 5 calls/second, 100k calls/day
- **Pro Tier**: 15+ calls/second
- **For LIBR**: Need to fetch ALL transactions (could be thousands)
- **Strategy**: Cache transaction history, calculate balance locally

### Blockchain.info
- **Free**: No API key required
- **Rate Limit**: ~1 request/10 seconds
- **Limitation**: Slow for real-time LIBR analysis

### Mempool.space
- **Free**: Open API
- **Fast**: Good for Bitcoin LIBR tracking
- **Limitation**: Bitcoin only

### Arkham Intelligence
- **API Key Required**: User must provide
- **Not Useful for LIBR Balance**: Attribution only

---

## Code Implementation Locations

### Existing Functions to Leverage

| Function | Location | Purpose | LIBR Use |
|----------|----------|---------|----------|
| `getWalletAttribution` | index.html:4371 | Get Etherscan labels | Identify wallet type |
| `lookupEthereumTransaction` | index.html:34673 | Get single tx | Validate LIBR selection |
| `lookupBitcoinTransaction` | index.html:34791 | Get single tx | Validate LIBR selection |
| Etherscan txlist API | index.html:4683 | Get transaction history | **PRIMARY LIBR DATA SOURCE** |
| Blockchain.info rawaddr | index.html:5894 | Get Bitcoin address data | **PRIMARY BITCOIN LIBR SOURCE** |

---

## Recommended New Functions for LIBR

### 1. Fetch Complete Transaction History
```javascript
// Location: Add to index.html around line 34900
async function fetchCompleteTransactionHistory(address, blockchain) {
    const allTxs = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const txs = await fetchTransactionPage(address, blockchain, page);
        allTxs.push(...txs);
        hasMore = txs.length === 10000; // Etherscan pagination limit
        page++;
    }

    return allTxs.sort((a, b) => a.timeStamp - b.timeStamp);
}
```

### 2. Calculate Running Balance
```javascript
// Location: Add to index.html around line 34950
function calculateRunningBalance(address, transactions, startingBalance = 0) {
    let balance = startingBalance;
    const balanceHistory = [];

    for (const tx of transactions) {
        const isInbound = tx.to?.toLowerCase() === address.toLowerCase();
        const isOutbound = tx.from?.toLowerCase() === address.toLowerCase();

        const amount = parseFloat(tx.value) / 1e18; // Convert wei to ETH

        if (isInbound) {
            balance += amount;
        } else if (isOutbound) {
            balance -= amount;
        }

        balanceHistory.push({
            timestamp: parseInt(tx.timeStamp) * 1000, // Convert to ms
            txHash: tx.hash,
            type: isInbound ? 'inbound' : 'outbound',
            amount: amount,
            balance: balance
        });
    }

    return balanceHistory;
}
```

### 3. Find LIBR Transaction Point
```javascript
// Location: Add to index.html around line 35000
function findLIBRTransactionPoint(balanceHistory, criminalProceedsAmount, criminalProceedsTimestamp) {
    // Find when balance first drops below criminal proceeds
    const relevantHistory = balanceHistory.filter(h => h.timestamp >= criminalProceedsTimestamp);

    let lowestBalance = Infinity;
    let firstDropTx = null;

    for (const entry of relevantHistory) {
        if (entry.balance < criminalProceedsAmount && !firstDropTx) {
            firstDropTx = entry;
        }
        lowestBalance = Math.min(lowestBalance, entry.balance);
    }

    return {
        firstTransactionToFollow: firstDropTx,
        lowestIntermediateBalance: lowestBalance,
        balanceDroppedBelowProceeds: lowestBalance < criminalProceedsAmount,
        proceedsRemainInWallet: lowestBalance >= criminalProceedsAmount
    };
}
```

---

## Data Storage for LIBR

### Add to Investigation Object
```javascript
// Location: index.html around line 4050 (investigation initialization)
const investigation = {
    // ... existing fields ...

    // NEW: LIBR balance tracking
    librWalletAnalysis: {
        // Structure:
        // 'wallet_hash': {
        //     address: 'full_address',
        //     blockchain: 'ethereum',
        //     currency: 'ETH',
        //     criminalProceedsAmount: 5.0,
        //     criminalProceedsDate: '2024-01-01T00:00:00Z',
        //     transactionHistory: [...], // Cached from API
        //     balanceHistory: [
        //         {
        //             timestamp: 1704067200000,
        //             txHash: '0x...',
        //             type: 'inbound',
        //             amount: 5.0,
        //             balance: 10.5
        //         }
        //     ],
        //     lowestBalance: 3.2,
        //     firstDropBelowProceedsTx: '0x...',
        //     balanceNeverDropped: false,
        //     lastUpdated: '2025-01-15T10:30:00Z'
        // }
    }
};
```

---

## Summary: What We Can Build

### ✅ **FEASIBLE with Current APIs:**

1. **Complete Balance History Reconstruction**
   - Fetch all transactions from Etherscan/Blockchain.info
   - Calculate running balance client-side
   - Store in browser localStorage or investigation file

2. **Lowest Intermediate Balance Calculation**
   - Iterate through balance history
   - Find minimum balance after criminal proceeds deposit
   - Identify transaction where balance drops below proceeds

3. **LIBR Transaction Selection**
   - Mark specific transactions to follow
   - Skip earlier transactions if balance never dropped
   - Document LIBR methodology in entry notes

4. **Visual Balance Timeline**
   - Chart showing balance over time
   - Highlight criminal proceeds threshold
   - Mark first transaction below threshold

### ⚠️ **LIMITATIONS:**

1. **API Rate Limits**
   - Large wallets with thousands of transactions may take time
   - Need to implement caching and pagination

2. **UTXO Complexity (Bitcoin)**
   - LIBR is less straightforward with UTXO model
   - May need simplified approach for Bitcoin

3. **Gas Fees**
   - Ethereum gas fees in ETH affect balance
   - Need to account for fees when calculating balance

4. **Token Transfers**
   - ERC-20 token balances require separate API calls
   - More complex balance tracking

---

## Next Steps

1. ✅ **Implement balance history fetcher** (fetches all txs)
2. ✅ **Implement running balance calculator** (client-side math)
3. ✅ **Create LIBR balance tracker UI** (from LIBR-IMPLEMENTATION-PLAN.md)
4. ✅ **Add caching layer** (store transaction history in investigation object)
5. ⬜ **Handle edge cases** (failed transactions, internal transfers, gas)

---

## Conclusion

**Answer: YES, we have API data that can support LIBR implementation.**

The APIs provide:
- ✅ Complete transaction history (chronological)
- ✅ Current balance
- ✅ Transaction timestamps and amounts

We need to build:
- Client-side balance history calculator
- LIBR-specific UI for balance tracking
- Caching layer to avoid repeated API calls

**The data is available - we just need to process it correctly for LIBR methodology.**

