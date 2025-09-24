{
  "version": "1.0",
  "exportDate": "2025-01-23T20:30:00.000Z",
  "investigation": {
    "caseId": "TEST-WRITEOFF-001",
    "caseTitle": "Test - Write-off Scenario",
    "investigator": "Test User",
    "startDate": "2025-01-23T00:00:00.000Z",
    "description": "Test investigation with partial trace and write-off",
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
            "receivingWallet": "0xf651624f106f326ff94455befbe20e71c55d7c0a"
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
            "amount": "45000",
            "currency": "USDC",
            "fromWallet": "0xf651624f106f326ff94455befbe20e71c55d7c0a",
            "toWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
            "toWalletType": "black",
            "notation": "V1-T1-H1",
            "sourceThreadId": "V1-T1",
            "timestamp": "2025-05-16T18:26:59",
            "timezone": "UTC",
            "notes": "Partial trace - 45k of 79k"
          },
          {
            "id": 2,
            "hopNumber": 1,
            "entryType": "writeoff",
            "amount": "34999.359956",
            "currency": "USDC",
            "category": "mixer",
            "justification": "Remaining funds entered Tornado Cash mixer - unrecoverable",
            "notation": "V1-T1-WO",
            "sourceThreadId": "V1-T1",
            "timestamp": "2025-05-16T18:30:00",
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
            "entryType": "trace",
            "txHash": "0xab4d2fd7f6ce68f9e792551981596c8f3fab0efd1426f6a15269c376c54ae2b2",
            "amount": "45000",
            "currency": "USDC",
            "fromWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
            "toWallet": "0x28c6c06298d514db089934071355e5743bf21d60",
            "toWalletType": "purple",
            "notation": "V1-T1-H2",
            "sourceThreadId": "V1-T1-H1",
            "timestamp": "2025-05-16T19:00:00",
            "timezone": "UTC",
            "notes": "Traced funds reached Binance",
            "isTerminalWallet": true,
            "exchangeName": "Binance"
          }
        ],
        "completed": true,
        "artAtStartByCurrency": {
          "USDC": 45000
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
        },
        "V1-T1-H1": {
          "notation": "V1-T1-H1",
          "totalAmount": 45000,
          "availableAmount": 0,
          "currency": "USDC",
          "sourceType": "hop_output"
        }
      }
    },
    "terminalWalletIndex": [
      {
        "hopNumber": 2,
        "entryId": 1,
        "timestamp": "2025-05-16T19:00:00",
        "txHash": "0xab4d2fd7f6ce68f9e792551981596c8f3fab0efd1426f6a15269c376c54ae2b2",
        "fromWallet": "0x8c7e0a841269a01c0ab389ce8fb3cf150a94e797",
        "toWallet": "0x28c6c06298d514db089934071355e5743bf21d60",
        "amount": 45000,
        "currency": "USDC",
        "exchangeName": "Binance",
        "detectionSource": "Known Address"
      }
    ]
  }
}