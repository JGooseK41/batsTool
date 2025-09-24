{
  "version": "1.0",
  "exportDate": "2025-01-23T20:30:00.000Z",
  "investigation": {
    "caseId": "TEST-TERMINAL-001",
    "caseTitle": "Test - Terminal Wallet Scenario",
    "investigator": "Test User",
    "startDate": "2025-01-23T00:00:00.000Z",
    "description": "Test investigation with terminal wallet (exchange) detection",
    "rootTotalConfirmed": true,
    "victims": [
      {
        "id": 1,
        "name": "Test Victim 1",
        "contactInfo": "test@example.com",
        "totalLoss": "79999.359956",
        "transactions": [
          {
            "id": 1,
            "txHash": "0xe70f626e33803174667b6f7eec6b018c0b43b729b94ade0bdbac84d45d92b00b",
            "amount": "79999.359956",
            "currency": "USDC",
            "datetime": "2025-05-16T15:57:00",
            "timezone": "UTC",
            "receivingWallet": "0xf651624f106f326ff94455befbe20e71c55d7c0a",
            "notes": "Initial victim transaction"
          }
        ],
        "isComplete": true
      }
    ],
    "hops": [
      {
        "id": "hop_1",
        "hopNumber": 1,
        "entries": [
          {
            "id": 1,
            "hopNumber": 1,
            "entryType": "trace",
            "txHash": "0x31afbc1cbbdefd7699dc0a08b3f39978d518000e39ce9821ce402d317830d9d9",
            "amount": "79999.359956",
            "currency": "USDC",
            "fromWallet": "0xf651624f106f326ff94455befbe20e71c55d7c0a",
            "toWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
            "toWalletType": "black",
            "notation": "V1-T1-H1",
            "sourceThreadId": "V1-T1",
            "timestamp": "2025-05-16T18:26:59",
            "timezone": "UTC"
          }
        ],
        "completed": true,
        "artAtStartByCurrency": {
          "USDC": 79999.359956
        }
      },
      {
        "id": "hop_2",
        "hopNumber": 2,
        "entries": [
          {
            "id": 1,
            "hopNumber": 2,
            "entryType": "swap",
            "txHash": "0x480a7e784bf3577f9b3081330dda0b70d9bd0df07c99ce662780ab966364540f",
            "amount": "79999.359956",
            "currency": "USDC",
            "outputAmount": "79929.747399",
            "outputCurrency": "USDT",
            "fromWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
            "toWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
            "notation": "V1-T1-H1",
            "sourceThreadId": "V1-T1-H1",
            "swapDetails": {
              "fromCurrency": "USDC",
              "toCurrency": "USDT",
              "fromAmount": "79999.359956",
              "toAmount": "79929.747399",
              "dexName": "Uniswap V3",
              "dexAddress": "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"
            },
            "timestamp": "2025-05-16T18:27:59",
            "timezone": "UTC"
          },
          {
            "id": 2,
            "hopNumber": 2,
            "entryType": "trace",
            "txHash": "0xab4d2fd7f6ce68f9e792551981596c8f3fab0efd1426f6a15269c376c54ae2b2",
            "amount": "39964.873700",
            "currency": "USDT",
            "fromWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
            "toWallet": "0x28c6c06298d514db089934071355e5743bf21d60",
            "toWalletType": "purple",
            "notation": "V1-T1-H2",
            "sourceThreadId": "V1-T1-H1",
            "timestamp": "2025-05-16T19:00:00",
            "timezone": "UTC",
            "notes": "Partial funds to Binance Hot Wallet",
            "isTerminalWallet": true,
            "exchangeName": "Binance"
          },
          {
            "id": 3,
            "hopNumber": 2,
            "entryType": "trace",
            "txHash": "0xa0960dad18fad8ee2b1ecef85a37a3101dc69c88cf6c066d0a7bf2b2f17f58d6",
            "amount": "39964.873699",
            "currency": "USDT",
            "fromWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
            "toWallet": "0x71660c4005ba85c37ccec55d0c4493e66fe775d3",
            "toWalletType": "purple",
            "notation": "V1-T1-H2",
            "sourceThreadId": "V1-T1-H1",
            "timestamp": "2025-05-16T19:05:00",
            "timezone": "UTC",
            "notes": "Remaining funds to Coinbase",
            "isTerminalWallet": true,
            "exchangeName": "Coinbase"
          }
        ],
        "completed": true,
        "artAtStartByCurrency": {
          "USDT": 79929.747399
        }
      }
    ],
    "availableThreads": {
      "USDC": {
        "V1-T1": {
          "notation": "V1-T1",
          "totalAmount": 79999.359956,
          "availableAmount": 0,
          "currency": "USDC",
          "sourceType": "victim_transaction"
        }
      },
      "USDT": {
        "V1-T1-H1_USDT": {
          "notation": "V1-T1-H1",
          "totalAmount": 79929.747399,
          "availableAmount": 0,
          "currency": "USDT",
          "sourceType": "swap_output"
        }
      }
    },
    "terminalWalletIndex": [
      {
        "hopNumber": 2,
        "entryId": 2,
        "timestamp": "2025-05-16T19:00:00",
        "txHash": "0xab4d2fd7f6ce68f9e792551981596c8f3fab0efd1426f6a15269c376c54ae2b2",
        "fromWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
        "toWallet": "0x28c6c06298d514db089934071355e5743bf21d60",
        "amount": 39964.873700,
        "currency": "USDT",
        "exchangeName": "Binance",
        "detectionSource": "Known Address"
      },
      {
        "hopNumber": 2,
        "entryId": 3,
        "timestamp": "2025-05-16T19:05:00",
        "txHash": "0xa0960dad18fad8ee2b1ecef85a37a3101dc69c88cf6c066d0a7bf2b2f17f58d6",
        "fromWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
        "toWallet": "0x71660c4005ba85c37ccec55d0c4493e66fe775d3",
        "amount": 39964.873699,
        "currency": "USDT",
        "exchangeName": "Coinbase",
        "detectionSource": "Known Address"
      }
    ]
  }
}