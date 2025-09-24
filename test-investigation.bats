{
  "version": "1.0",
  "exportDate": "2025-01-23T20:30:00.000Z",
  "investigation": {
    "caseId": "TEST-CASE-001",
    "caseTitle": "Test Investigation - Swap Validation",
    "investigator": "Test User",
    "startDate": "2025-01-23T00:00:00.000Z",
    "description": "Test investigation for validating swap functionality and hop progression",
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
            "customCurrency": "",
            "datetime": "2025-05-16T15:57:00",
            "timezone": "UTC",
            "receivingWallet": "0xf651624f106f326ff94455befbe20e71c55d7c0a",
            "notes": "Initial victim transaction - USDC stolen"
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
            "customCurrency": "",
            "fromWallet": "0xf651624f106f326ff94455befbe20e71c55d7c0a",
            "toWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
            "toWalletType": "black",
            "notation": "V1-T1-H1",
            "victimNumbers": "1",
            "transactionNumbers": "1",
            "sourceThreadId": "V1-T1",
            "timestamp": "2025-05-16T18:26:59",
            "timezone": "UTC",
            "notes": "Funds moved to intermediary wallet"
          }
        ],
        "completed": true,
        "isCollapsed": true,
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
              "dexAddress": "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
              "txHash": "0x480a7e784bf3577f9b3081330dda0b70d9bd0df07c99ce662780ab966364540f"
            },
            "timestamp": "2025-05-16T18:27:59",
            "timezone": "UTC",
            "notes": "Swapped USDC to USDT via Uniswap"
          }
        ],
        "completed": false,
        "isCollapsed": false,
        "artAtStartByCurrency": {
          "USDC": 79999.359956
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
          "sourceType": "victim_transaction",
          "sourceWallet": "0xf651624f106f326ff94455befbe20e71c55d7c0a",
          "hopLevel": 0,
          "isActive": false,
          "assignments": [
            {
              "hopNumber": 1,
              "entryId": 1,
              "amount": 79999.359956,
              "isActive": true
            }
          ]
        },
        "V1-T1-H1": {
          "notation": "V1-T1-H1",
          "totalAmount": 79999.359956,
          "availableAmount": 0,
          "currency": "USDC",
          "sourceType": "hop_output",
          "sourceWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
          "hopLevel": 1,
          "isActive": false,
          "assignments": [
            {
              "hopNumber": 2,
              "entryId": 1,
              "amount": 79999.359956,
              "isActive": true
            }
          ]
        }
      },
      "USDT": {
        "V1-T1-H1_USDT": {
          "notation": "V1-T1-H1",
          "totalAmount": 79929.747399,
          "availableAmount": 79929.747399,
          "currency": "USDT",
          "sourceType": "swap_output",
          "sourceWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
          "hopLevel": 2,
          "isActive": true,
          "assignments": [],
          "internalId": "V1-T1-H1_USDT_swap"
        }
      }
    },
    "universalWalletIndex": [
      {
        "address": "0xf651624f106f326ff94455befbe20e71c55d7c0a",
        "firstSeen": "hop_0",
        "permanentType": "black",
        "permanentId": "BLACK 1",
        "isRedWallet": false
      },
      {
        "address": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
        "firstSeen": "hop_1",
        "permanentType": "black",
        "permanentId": "BLACK 2",
        "isRedWallet": false
      }
    ],
    "redWalletIndex": [],
    "terminalWalletIndex": [],
    "settings": {
      "defaultCurrency": "USD",
      "dateFormat": "YYYY-MM-DD",
      "timeFormat": "24h",
      "theme": "dark"
    }
  }
}