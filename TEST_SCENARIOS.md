# B.A.T.S. Tool Test Scenarios

## Critical Test Cases

### 1. Basic Linear Trace Test
**Purpose**: Verify basic fund tracing works correctly

**Steps**:
1. Start new investigation
2. Add victim with 100,000 USDT
3. Create Hop 1
4. Trace full amount to another wallet
5. Click "Finalize Hop 1"
6. **Expected**: Modal appears asking to write-off or continue tracing
7. Choose "Continue"
8. Create Hop 2
9. Trace to terminal wallet (mark as purple/exchange)
10. **Expected**: Trace completion ceremony appears

---

### 2. Swap Validation Test
**Purpose**: Ensure swaps don't allow premature completion

**Steps**:
1. Start with 50,000 USDC
2. Create Hop 1
3. Add swap entry: USDC → USDT
4. Try to finalize hop WITHOUT allocating USDT
5. **Expected**: Validation should show "79,929.75 USDT remaining"
6. **Expected**: Cannot mark trace as complete
7. Add Hop 2 entry tracing USDT
8. **Expected**: Now can complete trace

---

### 3. Partial Allocation Test
**Purpose**: Test remainder thread creation

**Steps**:
1. Start with 100,000 USDT victim
2. Trace only 45,000 to first wallet
3. **Expected**: 55,000 USDT remainder thread created
4. Try to finalize hop
5. **Expected**: Shows 55,000 USDT unallocated
6. Allocate remainder
7. **Expected**: Can now finalize

---

### 4. Terminal Wallet Detection Test
**Purpose**: Verify exchange detection works

**Steps**:
1. Trace funds to known exchange address:
   - Binance: 0x28c6c06298d514db089934071355e5743bf21d60
   - Coinbase: 0x71660c4005ba85c37ccec55d0c4493e66fe775d3
2. **Expected**: Auto-detects as purple (exchange)
3. **Expected**: Creates terminal wallet index entry
4. **Expected**: Prompts for trace completion

---

### 5. Multi-Currency Test
**Purpose**: Test handling multiple currencies

**Steps**:
1. Add victim with:
   - 50,000 USDT
   - 30,000 USDC
   - 0.5 BTC
2. Create Hop 1
3. Trace each currency to different wallets
4. **Expected**: Progress bars show each currency separately
5. **Expected**: Must account for all currencies before finalizing

---

### 6. Write-off Test
**Purpose**: Verify write-offs work correctly

**Steps**:
1. Start trace with 100,000 USDT
2. Trace 80,000 to wallet
3. Click Finalize Hop
4. Choose "Write off 20,000 USDT"
5. **Expected**: Write-off entry created
6. **Expected**: Hop marked complete
7. **Expected**: ART reduced by 20,000

---

### 7. Cold Storage Test
**Purpose**: Test cold storage marking

**Steps**:
1. Trace funds to wallet
2. Mark wallet as "blue" (cold storage)
3. **Expected**: Treated as temporary terminal
4. **Expected**: Can complete trace or continue

---

### 8. Save/Load Test
**Purpose**: Ensure persistence works

**Steps**:
1. Create investigation with 3 hops
2. Save to file
3. Refresh browser
4. Load file
5. **Expected**: All threads reconstructed
6. **Expected**: Can continue from where left off
7. **Expected**: Summary dashboard shows progress

---

### 9. Validation Error Test
**Purpose**: Test error handling

**Steps**:
1. Try to finalize hop with:
   - No entries
   - Negative amounts
   - Invalid wallet addresses
2. **Expected**: Clear error messages
3. **Expected**: Cannot proceed until fixed

---

### 10. Auto-Save Test
**Purpose**: Verify auto-save after hop completion

**Steps**:
1. Complete a hop
2. Check browser's IndexedDB/LocalStorage
3. **Expected**: Investigation saved automatically
4. Refresh browser
5. **Expected**: Can resume from saved state

---

## Automated Test Runner

Run these tests automatically by:
1. Opening browser console
2. Paste the test runner code
3. Watch for ✅ PASS or ❌ FAIL results

```javascript
// Test Runner for B.A.T.S. Tool
async function runTests() {
    console.log("🧪 Starting B.A.T.S. Test Suite...");

    // Test 1: Check thread validation
    console.log("\n📋 Test 1: Thread Validation");
    investigation.availableThreads = {
        'USDT': {
            'test-thread': {
                totalAmount: 100000,
                availableAmount: 100000,
                currency: 'USDT'
            }
        }
    };

    const available = getMaxAssignableAmount('test-thread', 'USDT');
    console.log(available === 100000 ? "✅ PASS" : "❌ FAIL", `Available amount: ${available}`);

    // Test 2: Swap handling
    console.log("\n📋 Test 2: Swap Detection");
    const swapEntry = {
        entryType: 'swap',
        amount: '50000',
        currency: 'USDC',
        swapDetails: {
            fromCurrency: 'USDC',
            toCurrency: 'USDT',
            fromAmount: '50000',
            toAmount: '49950'
        }
    };

    // Test validation detects swap
    console.log("Testing swap validation...");

    // Test 3: Terminal wallet detection
    console.log("\n📋 Test 3: Terminal Wallet Detection");
    const isTerminal = isTerminalWalletType('purple');
    console.log(isTerminal ? "✅ PASS" : "❌ FAIL", "Purple wallet is terminal");

    // Test 4: Thread termination check
    console.log("\n📋 Test 4: Thread Termination Check");
    const status = checkAllThreadsTerminated();
    console.log("Unallocated threads:", status.unallocatedThreads.length);
    console.log(status.hasUnallocatedFunds ? "✅ PASS - Detected unallocated funds" : "❌ FAIL");

    console.log("\n✨ Test suite complete!");
}

// Run tests
runTests();
```

---

## Manual Testing Checklist

### Before Each Test:
- [ ] Clear browser cache
- [ ] Open console for errors
- [ ] Start fresh investigation

### During Testing:
- [ ] Check console for errors
- [ ] Verify UI updates correctly
- [ ] Confirm calculations are accurate
- [ ] Test undo/redo functionality

### After Testing:
- [ ] Export investigation
- [ ] Verify JSON structure
- [ ] Test import on new session
- [ ] Check all reports generate

---

## Known Edge Cases to Test

1. **Zero amounts** - Should be rejected
2. **Decimal precision** - 0.000001 amounts
3. **Large numbers** - 999,999,999,999
4. **Special characters** in wallet addresses
5. **Network timeouts** during API calls
6. **Multiple tabs** open simultaneously
7. **Browser back/forward** navigation
8. **Copy/paste** wallet addresses
9. **Keyboard shortcuts** (if any)
10. **Mobile browser** compatibility

---

## Regression Tests

After any code change, verify:
- [ ] Existing investigations load correctly
- [ ] Swap validation still works
- [ ] Terminal wallet detection functions
- [ ] Progress bars calculate correctly
- [ ] Export/import maintains data integrity
- [ ] Auto-save triggers after hop completion
- [ ] Validation messages are accurate

---

## Performance Tests

Monitor and log:
- Investigation with 100+ hops
- 50+ entries per hop
- Multiple currency swaps
- Large wallet address lists
- Export file size limits
- Browser memory usage

---

## Integration Tests

Test with real blockchain data:
- [ ] Ethereum mainnet transactions
- [ ] Bitcoin transactions
- [ ] ERC-20 token transfers
- [ ] Known exchange addresses
- [ ] Multi-signature wallets
- [ ] Smart contract interactions