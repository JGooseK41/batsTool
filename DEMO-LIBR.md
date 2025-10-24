# LIBR Demo - New Features Showcase

## Purpose
Demonstrate the new LIBR (Lowest Intermediate Balance Rule) features including automated balance tracking and wallet analysis.

---

## Demo Scenario: Complex Balance Analysis

### Setup
- **Victim**: Bob lost 5 ETH
- **Method**: LIBR (Lowest Intermediate Balance Rule)
- **Scenario**: Funds deposited to wallet with existing balance
- **Expectation**: Balance tracking, transaction skipping, flexible hop finalization

---

## Step-by-Step Demo

### 1. Create New Investigation with LIBR

1. Open batsTool (`index.html`)
2. Click **"Start New Investigation"**
3. Fill in case details:
   - **Case Number**: DEMO-LIBR-001
   - **Investigator Name**: Demo User
   - **Case Name**: Bob Stolen ETH - LIBR Method
4. **CRITICAL**: Select **"LIBR - Lowest Intermediate Balance Rule"** radio button
   - Should see description: "Arrests asset flow, keeping funds in fewer wallets closer to RED wallet"
5. Click **"Save Case Details"**
6. Verify: Console log shows `investigation.tracingMethod = 'LIBR'`

---

### 2. Add Victim (Test NO Chronology Enforcement)

1. Click **"Next: Add Victims"**
2. Add victim:
   - **Victim Name**: Bob
3. Add transactions **intentionally out of chronological order**:

   **Transaction 1** (will be T1):
   - **TX Hash**: `0x111...` (dummy)
   - **Amount**: 3 ETH
   - **Receiving Wallet**: `0xCCC...111`
   - **Date/Time**: `2024-01-03 14:00 PM` (THIRD chronologically)

   **Transaction 2** (will be T2):
   - **TX Hash**: `0x222...` (dummy)
   - **Amount**: 2 ETH
   - **Receiving Wallet**: `0xCCC...222`
   - **Date/Time**: `2024-01-01 09:00 AM` (FIRST chronologically)

**✅ EXPECTED RESULT (LIBR):**
- Transactions remain in entry order (NOT auto-sorted)
- NO chronology warning appears
- T1 stays as the 3 ETH transaction (even though it's later)
- T2 stays as the 2 ETH transaction (even though it's earlier)

**Console should show:**
```
LIBR method selected - chronological ordering is optional for victim transactions
```

---

### 3. Generate Root Total (Test NO Chronology Validation)

1. Click **"Next: Confirm Root Total"**
2. Click **"Generate Root Total"**

**✅ EXPECTED RESULT (LIBR):**
- Root total generates: **5 ETH** (3 + 2)
- **NO chronology errors** appear
- **NO auto-fix prompt** appears
- Transactions keep their original order
- Console shows: `LIBR method selected - chronological ordering is optional`

**❌ SHOULD NOT SEE:**
- "Transactions must be in chronological order for PIFO compliance"
- Auto-fix dialog
- Any chronology validation errors

---

### 4. Create Hop 1 with LIBR Analyzer

1. Click **"Next: Trace Hops"**
2. Click **"Add Hop Entry"** for Hop 1
3. In wizard Step 1:

**✅ EXPECTED RESULT (LIBR):**
- Thread selection appears
- **NEW**: Yellow box appears with:
  ```
  ⚖️ LIBR Method Active

  Use the Lowest Intermediate Balance Rule to analyze wallet balances
  and determine which transactions to follow.

  [📊 Analyze Wallet Balance (LIBR)]

  LIBR allows you to:
  • Skip earlier transactions if wallet balance never dropped
  • Select specific transaction where balance dropped below proceeds
  • Leave threads unallocated if funds remain above threshold
  ```

4. Select thread V1-T1 (3 ETH)
5. Click **"📊 Analyze Wallet Balance (LIBR)"** button

---

### 5. Test LIBR Balance Analyzer with Real Data

**Option A: Use Test Ethereum Address**

For this demo, let's use a real Ethereum address to see the analyzer in action:

Example address: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
(Random address - replace with any real Ethereum address)

**When modal opens:**

1. **Loading Screen** should appear:
   ```
   ⏳
   Fetching transaction history from ethereum blockchain...
   This may take a moment for wallets with many transactions
   ```

2. **Progress in console**:
   ```
   📊 [LIBR] Fetching complete transaction history for 0x742d35Cc... on ethereum
   Fetching page 1...
   ✅ [LIBR] Fetched 47 transactions for 0x742d35Cc...
   📊 [LIBR] Calculating running balance for 0x742d35Cc... (47 transactions)
   ✅ [LIBR] Calculated 47 balance snapshots
   📊 [LIBR] Finding transaction point: 3 at 2024-01-03T14:00:00Z
   ✅ [LIBR] Analysis complete: Balance dropped below proceeds at transaction 0xabc...
   ```

3. **Analysis Results** display:

   **Status Box** (Green or Orange):
   ```
   ✅ Balance Dropped Below Proceeds
   ──────────────────────────────────
   Lowest Balance:    2.145678 ETH
   Current Balance:   1.523456 ETH
   Transactions Analyzed: 47
   ```

   OR (if balance never dropped):
   ```
   ⚠️ Proceeds Remain in Wallet
   ──────────────────────────────────
   Lowest Balance:    8.234567 ETH
   Current Balance:   9.876543 ETH
   Transactions Analyzed: 47
   ```

4. **First Transaction Box** (if balance dropped):
   ```
   📍 First Transaction to Follow

   Per LIBR methodology, begin tracing at:

   TX Hash: 0x123abc...def789
   Date: 2024-01-05 14:35:22
   Balance After: 2.145678 ETH
   Amount: 1.500000 ETH
   ```

5. **Transaction Table**:
   ```
   Date              | Type    | Amount   | Balance  | LIBR Status
   ─────────────────────────────────────────────────────────────────
   01/03 10:30 AM   | 📥 In   | 3.000000 | 10.50000 | ⏭️ Skip
   01/04 14:20 PM   | 📤 Out  | 2.000000 | 8.500000 | ⏭️ Skip
   01/05 14:35 PM   | 📤 Out  | 1.500000 | 2.145678 | 🎯 START HERE
   01/06 09:15 AM   | 📤 Out  | 0.500000 | 1.645678 | ✅ Follow
   01/07 16:45 PM   | 📤 Out  | 0.120000 | 1.525678 | ✅ Follow
   ```

**✅ VERIFICATION POINTS:**
- [ ] Modal opens with loading indicator
- [ ] Etherscan API is called (check Network tab in browser DevTools)
- [ ] Balance calculations complete
- [ ] Results display in organized format
- [ ] Table shows all transactions with color coding
- [ ] "🎯 START HERE" marks the first transaction to follow
- [ ] Status changes from ⏭️ Skip to ✅ Follow when balance drops

---

### 6. Complete Wizard (Using LIBR Insights)

1. Close the LIBR analyzer modal
2. Continue with wizard:
   - **Step 2**: Allocate 3 ETH from V1-T1
   - **Step 3**: Enter transaction details
     - Use the transaction hash identified by LIBR analyzer
     - Or use dummy data for demo
3. Click **"Finish"**

**✅ EXPECTED RESULT (LIBR):**
- Entry created successfully
- V1-T2 thread (2 ETH) remains available

---

### 7. Test Flexible Hop Finalization (LIBR Key Feature)

1. Click **"Finalize Hop 1"** button
2. **WITH 2 ETH STILL UNALLOCATED**

**✅ EXPECTED RESULT (LIBR):**
- **NO hard block** (unlike PIFO)
- Custom LIBR confirmation dialog appears:
  ```
  ⚠️ LIBR Method: Remaining Funds in Hop 1

  The following funds remain untraced:

    • 2 ETH

  Per LIBR methodology, these funds remain in their current wallets
  until the wallet balance drops below the deposited criminal proceeds.

  Document in notes: "LIBR applied - balance analysis shows funds
  remain above traced amount"

  Proceed with finalization?
  ```

3. Click **"OK"** to proceed

**✅ EXPECTED RESULT (LIBR):**
- Hop 1 finalizes successfully (even with 2 ETH unallocated!)
- LIBR note added to hop:
  ```javascript
  hop.librNotes = [{
      timestamp: '2025-01-15T10:30:00Z',
      hopNumber: 1,
      remainingByCurrency: { 'ETH': 2 },
      note: 'LIBR applied: 2 ETH remains in wallet(s) - balance analysis indicates criminal proceeds not yet depleted per Lowest Intermediate Balance Rule.'
  }]
  ```
- Console shows:
  ```
  📝 LIBR documentation added to Hop 1: {...}
  ```

**❌ SHOULD NOT SEE:**
- Hard block preventing finalization
- Forced write-off options
- PIFO-style validation errors

---

### 8. Verify Data Caching

1. Create another hop entry
2. Click **"📊 Analyze Wallet Balance (LIBR)"** again for same wallet

**✅ EXPECTED RESULT (LIBR):**
- Analysis completes MUCH faster (cached data)
- Console shows:
  ```
  📊 [LIBR] Using cached transaction history from 2025-01-15T10:30:00Z
  ```
- No duplicate API calls in Network tab

---

### 9. Check LIBR Documentation

1. View Hop 1 details
2. Look for LIBR notes

**✅ EXPECTED RESULT (LIBR):**
- LIBR note visible in hop documentation
- Note explains why 2 ETH remained unallocated
- References "Lowest Intermediate Balance Rule"
- Timestamp and amounts recorded

---

## Summary: LIBR Verification Checklist

✅ **Method Selection:**
- [ ] LIBR radio button selected during setup
- [ ] Console confirms `investigation.tracingMethod = 'LIBR'`

✅ **Chronology Freedom:**
- [ ] Transactions NOT auto-sorted
- [ ] NO chronology validation errors
- [ ] Can add transactions in any order

✅ **LIBR Analyzer:**
- [ ] Button appears in hop wizard Step 1
- [ ] Modal opens when clicked
- [ ] Loading indicator shows during API fetch
- [ ] Real blockchain data fetched from Etherscan/Blockchain.info
- [ ] Balance history calculated correctly
- [ ] Transaction table displays with LIBR status
- [ ] "🎯 START HERE" marks correct transaction

✅ **Flexible Finalization:**
- [ ] Can finalize hop with remaining threads
- [ ] LIBR confirmation dialog appears
- [ ] LIBR note added to hop documentation
- [ ] No hard block (unlike PIFO)

✅ **Data Persistence:**
- [ ] Analysis results cached in investigation object
- [ ] Subsequent analyses use cached data
- [ ] Auto-saves to localStorage/file

---

## Expected Console Logs (LIBR)

```javascript
// Setup
investigation.tracingMethod = 'LIBR'

// Victim rendering
'LIBR method selected - chronological ordering is optional for victim transactions'

// LIBR Analyzer
'📊 [LIBR] Fetching complete transaction history for 0x...'
'Fetching page 1...'
'✅ [LIBR] Fetched 47 transactions'
'📊 [LIBR] Calculating running balance'
'✅ [LIBR] Calculated 47 balance snapshots'
'📊 [LIBR] Finding transaction point'
'✅ [LIBR] Analysis complete: Balance dropped below proceeds'

// Hop finalization
'ℹ️ LIBR method: Hop 1 has remaining funds - this is expected per LIBR methodology'
'📝 LIBR documentation added to Hop 1'

// Caching
'📊 [LIBR] Using cached transaction history from ...'
```

---

## Testing with Different Addresses

### **Test Case 1: Wallet with High Activity**
- Use address with 1000+ transactions
- Verify pagination works
- Check performance (should complete in < 10 seconds)

### **Test Case 2: Wallet Where Balance Never Drops**
- Criminal proceeds: 5 ETH
- Wallet always has 10+ ETH
- Verify analyzer shows: "⚠️ Proceeds Remain in Wallet"
- Verify NO "first transaction to follow"

### **Test Case 3: Bitcoin Address**
- Use Bitcoin address format
- Verify Blockchain.info API called
- Verify UTXO balance calculation works
- Check that Bitcoin-specific logic executes

---

## Advanced Features to Test

### **Multi-Currency Support**
1. Add victim transaction in different currency (BTC)
2. Verify LIBR analyzer detects currency
3. Verify balance calculated in correct units

### **Error Handling**
1. Enter invalid Ethereum address
2. Verify graceful error message
3. Try address with zero transactions
4. Verify appropriate "No transactions found" message

### **Rate Limiting**
1. Analyze wallet with many transactions (requires pagination)
2. Verify 200ms delay between API requests
3. Check Network tab for proper pacing

---

## Success Criteria

**LIBR is WORKING if:**
1. ✅ LIBR button appears in wizard (PIFO: does NOT appear)
2. ✅ Real blockchain data fetched from APIs
3. ✅ Balance history calculated correctly
4. ✅ Transaction table shows with LIBR status
5. ✅ Can finalize hop with remaining threads
6. ✅ LIBR documentation added to hops
7. ✅ NO chronology enforcement
8. ✅ Data cached for performance

---

## Comparison: PIFO vs LIBR Side-by-Side

| Feature | PIFO | LIBR |
|---------|------|------|
| **Chronology** | ✅ Enforced | ❌ Optional |
| **Wizard Button** | ❌ None | ✅ "Analyze Balance" |
| **Balance Tracking** | ❌ Manual | ✅ Automated |
| **Transaction Skipping** | ❌ Not allowed | ✅ Allowed |
| **Hop Finalization** | ✅ Hard block | ⚠️ Flexible |
| **API Integration** | ❌ None | ✅ Etherscan/Blockchain.info |
| **Documentation** | PIFO notes | LIBR notes |

---

## Demo Recording Checklist

If recording a video demo:
- [ ] Show case setup with LIBR selection
- [ ] Add transactions out of order (show no auto-sort)
- [ ] Click LIBR analyzer button
- [ ] Show loading screen
- [ ] Show full analysis results
- [ ] Highlight "START HERE" transaction
- [ ] Demonstrate flexible hop finalization
- [ ] Show LIBR documentation in hop notes
- [ ] Compare side-by-side with PIFO (if time permits)

---

## Troubleshooting

**If LIBR button doesn't appear:**
- Check console: Is `investigation.tracingMethod === 'LIBR'`?
- Verify you selected LIBR radio button during setup
- Check that threads are available (button only shows if threads exist)

**If API fetch fails:**
- Check browser console for CORS errors
- Verify internet connection
- Check Etherscan API rate limits
- Try different wallet address

**If balance calculations seem wrong:**
- Check transaction history in console
- Verify gas fees are being subtracted (Ethereum)
- Check UTXO calculations (Bitcoin)
- Compare with blockchain explorer data

---

## Result: LIBR Full Feature Demo Complete! 🎉

