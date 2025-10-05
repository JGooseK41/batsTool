{
  "caseId": "Miami Assist",
  "investigator": "Jesse Gossman",
  "caseType": "crypto_theft",
  "caseSynopsis": "",
  "setupComplete": true,
  "victims": [
    {
      "id": 1,
      "isCompleted": true,
      "name": "",
      "transactions": [
        {
          "id": 1,
          "txHash": "0x3bcae169b34d6d4fd29b08f11a448d3ea311d7639e5fcedb80d480fd47149187",
          "amount": "450",
          "currency": "HYPE",
          "customCurrency": "",
          "receivingWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "datetime": "2025-08-14T07:42",
          "timezone": "UTC",
          "notes": "From: 0x000000087f00ae6e6b0da6d4125096cbe2138f25 | HyperEVM transaction",
          "chain": "hyperevm"
        },
        {
          "id": 2,
          "txHash": "0x6e6becc3362f3a4089ad001e6aa9a17f4f25548846b4832cdee2f6922b1eb5a5",
          "amount": "840",
          "currency": "HYPE",
          "customCurrency": "",
          "receivingWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "datetime": "2025-08-14T07:58",
          "timezone": "UTC",
          "notes": "From: 0x000000087f00ae6e6b0da6d4125096cbe2138f25 | HyperEVM transaction",
          "chain": "hyperevm"
        }
      ]
    }
  ],
  "hops": [
    {
      "hopNumber": 1,
      "entries": [
        {
          "id": 1,
          "hopNumber": 1,
          "entryType": "trace",
          "notation": "V1-T1-H1",
          "fromWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "fromWalletType": "red",
          "fromWalletId": "",
          "toWallet": "0x000000087f00ae6e6b0da6d4125096cbe2138f25",
          "toWalletType": "black",
          "toWalletId": "",
          "amount": "300",
          "currency": "HYPE",
          "customCurrency": "",
          "txHash": "0x1afe453cb7a0fcac5f530d186d5d01d78bd5c590d1a50c1e16bcd0d328420182",
          "timestamp": "2025-08-14T07:45",
          "timezone": "UTC",
          "notes": "Label: oftenwrongneverfalse.eth",
          "category": "",
          "justification": "",
          "isSwap": false,
          "swapDetails": null,
          "isBridge": false,
          "sourceChain": [],
          "displayNotation": "",
          "summaryNotation": "",
          "victimNumbers": "",
          "transactionNumbers": "",
          "availableSourceAmount": 0,
          "sourceThreadId": "V1-T1",
          "sourceThreadData": null,
          "assignmentPercentage": 0,
          "generatedNotation": "",
          "isConvergence": false,
          "convergenceData": null,
          "multipleSourceThreads": [],
          "individualSourceAssignments": {
            "V1-T1": 300
          },
          "isTerminalWallet": false,
          "sourceThreadIds": [
            "V1-T1_HYPE"
          ],
          "multipleSourceInternalIds": [
            "V1-T1_HYPE"
          ]
        },
        {
          "id": 2,
          "hopNumber": 1,
          "entryType": "writeoff",
          "txHash": "0xb570a8d30f9417be1a14b813d7f24bde2326ef8f4bb0a73a79e587c2c21ad16d",
          "amount": "1",
          "currency": "HYPE",
          "customCurrency": "",
          "category": "minimal_amount",
          "justification": "Amount too small to track: 1 HYPE",
          "notes": "",
          "sourceThreadId": "V1-T1",
          "multipleSourceThreads": null,
          "individualSourceAssignments": {
            "V1-T1": 1
          },
          "fromWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "toWallet": "0x00000702b034ca0aa4d2d59b0a9460e34c671594",
          "timestamp": "2025-08-14T08:17",
          "victimNumbers": "1",
          "transactionNumbers": "1",
          "notation": "V1-T1-H1-WO",
          "isFinalized": true,
          "sourceChain": [
            {
              "threadId": "V1-T1",
              "amount": 0,
              "currency": "HYPE"
            }
          ],
          "generatedNotation": "V1-T1-H1-WO"
        },
        {
          "id": 3,
          "hopNumber": 1,
          "entryType": "trace",
          "notation": "V1-T1-H1",
          "fromWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "fromWalletType": "red",
          "fromWalletId": "",
          "toWallet": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
          "toWalletType": "brown",
          "toWalletId": "",
          "amount": "100.09",
          "currency": "HYPE",
          "customCurrency": "",
          "txHash": "0xfe8f29235d268084bb3570405e2fdba5cd01f97b8953dfb04eb5827437e20954",
          "timestamp": "2025-08-14T17:53",
          "timezone": "UTC",
          "notes": "Smart Contract: deBridge Finance\nType: Conversion Wallet (Bridge/DEX)\nDetection source: arkham_intelligence\n[BRIDGE OUTPUT] Wallet reclassified from terminal to bridge:\n  Output Chain: solana\n  Output Tx: WsRms15NyuMzRdkPzrRgjZUqK7dugQ4uMnkKK4SnPeVzysAqG65iXh1i2H5pJy3A9kDMTKQwC1wnuQg24utWe6x\n  Output Wallet: 3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B\n  Output Amount: 4457.054566 USDC\n  Reclassified: 2025-10-05T09:50:24.768Z",
          "category": "",
          "justification": "",
          "isSwap": false,
          "swapDetails": null,
          "isBridge": true,
          "sourceChain": [],
          "displayNotation": "",
          "summaryNotation": "",
          "victimNumbers": "",
          "transactionNumbers": "",
          "availableSourceAmount": 0,
          "sourceThreadId": "V1-T1",
          "sourceThreadData": null,
          "assignmentPercentage": 0,
          "generatedNotation": "",
          "isConvergence": false,
          "convergenceData": null,
          "multipleSourceThreads": [],
          "individualSourceAssignments": {
            "V1-T1": 100.09
          },
          "exchangeAttribution": {
            "name": "deBridge Finance",
            "label": "bridge",
            "type": "Bridge/DEX",
            "service": null,
            "chain": "arbitrum_one",
            "source": "arkham_intelligence",
            "isExchange": true,
            "isDEX": true,
            "isSmartContract": true,
            "isPersonalLabel": false,
            "tags": [
              {
                "id": "bridge",
                "label": "Bridge",
                "rank": 5,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "high-transacting",
                "label": "High Transacting",
                "rank": 16,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "tokenized-eth2-staker",
                "label": "Tokenized ETH2 Staker",
                "rank": 51,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "proxy-standard",
                "label": "EIP-1967 Transparent Proxy",
                "rank": 55,
                "excludeEntities": true,
                "chain": "arbitrum_one",
                "disablePage": true,
                "tagParams": "EIP-1967 Transparent Proxy"
              }
            ],
            "suspectedDEX": false
          },
          "isSmartContract": true,
          "isConversionWallet": true,
          "sourceThreadIds": [
            "V1-T1_HYPE"
          ],
          "multipleSourceInternalIds": [
            "V1-T1_HYPE"
          ],
          "wasTerminalWallet": true,
          "isTerminalWallet": false,
          "bridgeDetails": {
            "sourceChain": "unknown",
            "destinationChain": "solana",
            "destinationTxHash": "WsRms15NyuMzRdkPzrRgjZUqK7dugQ4uMnkKK4SnPeVzysAqG65iXh1i2H5pJy3A9kDMTKQwC1wnuQg24utWe6x",
            "destinationWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
            "destinationAmount": 4457.054566,
            "destinationAsset": "USDC",
            "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
            "walletType": "brown",
            "wasPartialTrace": false,
            "proportionalMultiplier": 1
          },
          "bridgeOutputLogged": true
        },
        {
          "id": 4,
          "hopNumber": 1,
          "entryType": "trace",
          "notation": "(V1-T1,2) H1",
          "fromWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "fromWalletType": "red",
          "fromWalletId": "",
          "toWallet": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
          "toWalletType": "brown",
          "toWalletId": "",
          "amount": "200.1",
          "currency": "HYPE",
          "customCurrency": "",
          "txHash": "0xb3c6fbcbcda0ace210fb0771411bc9aa554cf91f13b7190b12bc9e4ae38c2c1a",
          "timestamp": "2025-08-14T17:54",
          "timezone": "UTC",
          "notes": "Smart Contract: deBridge Finance\nType: Conversion Wallet (Bridge/DEX)\nDetection source: arkham_intelligence\n[BRIDGE OUTPUT] Wallet reclassified from terminal to bridge:\n  Output Chain: solana\n  Output Tx: 3Xki2YjZxAqCMkAJDQM6zgwd2QHG7M3sR51tmFh4eLeFfj5HAte6PEs1mJbn9FM6Dq9G7TJqBvXQ5XWjfYoxRnzS\n  Output Wallet: 3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B\n  Output Amount: 8931.896390 USDC\n  Reclassified: 2025-10-05T09:50:39.696Z",
          "category": "",
          "justification": "",
          "isSwap": false,
          "swapDetails": null,
          "isBridge": true,
          "sourceChain": [],
          "displayNotation": "",
          "summaryNotation": "",
          "victimNumbers": "",
          "transactionNumbers": "",
          "availableSourceAmount": 0,
          "sourceThreadId": "",
          "sourceThreadData": null,
          "assignmentPercentage": 0,
          "generatedNotation": "",
          "isConvergence": true,
          "convergenceData": {
            "sourceCount": 2,
            "maxSourceHop": 0,
            "sequentialHopRuleApplied": true
          },
          "multipleSourceThreads": [
            "V1-T1",
            "V1-T2"
          ],
          "individualSourceAssignments": {
            "V1-T1": 48.91,
            "V1-T2": 151.19
          },
          "exchangeAttribution": {
            "name": "deBridge Finance",
            "label": "bridge",
            "type": "Bridge/DEX",
            "service": null,
            "chain": "arbitrum_one",
            "source": "arkham_intelligence",
            "isExchange": true,
            "isDEX": true,
            "isSmartContract": true,
            "isPersonalLabel": false,
            "tags": [
              {
                "id": "bridge",
                "label": "Bridge",
                "rank": 5,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "high-transacting",
                "label": "High Transacting",
                "rank": 16,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "tokenized-eth2-staker",
                "label": "Tokenized ETH2 Staker",
                "rank": 51,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "proxy-standard",
                "label": "EIP-1967 Transparent Proxy",
                "rank": 55,
                "excludeEntities": true,
                "chain": "arbitrum_one",
                "disablePage": true,
                "tagParams": "EIP-1967 Transparent Proxy"
              }
            ],
            "suspectedDEX": false
          },
          "isSmartContract": true,
          "isConversionWallet": true,
          "sourceThreadIds": [
            "V1-T1_HYPE",
            "V1-T2_HYPE"
          ],
          "multipleSourceInternalIds": [
            "V1-T1_HYPE",
            "V1-T2_HYPE"
          ],
          "wasTerminalWallet": true,
          "isTerminalWallet": false,
          "bridgeDetails": {
            "sourceChain": "unknown",
            "destinationChain": "solana",
            "destinationTxHash": "3Xki2YjZxAqCMkAJDQM6zgwd2QHG7M3sR51tmFh4eLeFfj5HAte6PEs1mJbn9FM6Dq9G7TJqBvXQ5XWjfYoxRnzS",
            "destinationWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
            "destinationAmount": 8931.896390000002,
            "destinationAsset": "USDC",
            "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
            "walletType": "brown",
            "wasPartialTrace": false,
            "proportionalMultiplier": 1
          },
          "bridgeOutputLogged": true
        },
        {
          "id": 5,
          "hopNumber": 1,
          "entryType": "trace",
          "notation": "V1-T2-H1",
          "fromWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "fromWalletType": "red",
          "fromWalletId": "",
          "toWallet": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
          "toWalletType": "brown",
          "toWalletId": "",
          "amount": "300.11",
          "currency": "HYPE",
          "customCurrency": "",
          "txHash": "0xd1f986f6178291f1f24641987e69b7cf9b56fc7bf8892970ec4c9a7ec6a751db",
          "timestamp": "2025-08-14T17:56",
          "timezone": "UTC",
          "notes": "Smart Contract: deBridge Finance\nType: Conversion Wallet (Bridge/DEX)\nDetection source: arkham_intelligence\n[BRIDGE OUTPUT] Wallet reclassified from terminal to bridge:\n  Output Chain: solana\n  Output Tx: 2izdCecuqx75DjCJHdJPMzV9Y1jxi24BPJCCikCNV7dsQ56X1rbThDXJ1Hb7CAr9ieXES2nE4UnCqRzs3hAYZuhY\n  Output Wallet: 3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B\n  Output Amount: 13401.193225 USDC\n  Reclassified: 2025-10-05T09:50:55.055Z",
          "category": "",
          "justification": "",
          "isSwap": false,
          "swapDetails": null,
          "isBridge": true,
          "sourceChain": [],
          "displayNotation": "",
          "summaryNotation": "",
          "victimNumbers": "",
          "transactionNumbers": "",
          "availableSourceAmount": 0,
          "sourceThreadId": "V1-T2",
          "sourceThreadData": null,
          "assignmentPercentage": 0,
          "generatedNotation": "",
          "isConvergence": false,
          "convergenceData": null,
          "multipleSourceThreads": [],
          "individualSourceAssignments": {
            "V1-T2": 300.11
          },
          "exchangeAttribution": {
            "name": "deBridge Finance",
            "label": "bridge",
            "type": "Bridge/DEX",
            "service": null,
            "chain": "arbitrum_one",
            "source": "arkham_intelligence",
            "isExchange": true,
            "isDEX": true,
            "isSmartContract": true,
            "isPersonalLabel": false,
            "tags": [
              {
                "id": "bridge",
                "label": "Bridge",
                "rank": 5,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "high-transacting",
                "label": "High Transacting",
                "rank": 16,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "tokenized-eth2-staker",
                "label": "Tokenized ETH2 Staker",
                "rank": 51,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "proxy-standard",
                "label": "EIP-1967 Transparent Proxy",
                "rank": 55,
                "excludeEntities": true,
                "chain": "arbitrum_one",
                "disablePage": true,
                "tagParams": "EIP-1967 Transparent Proxy"
              }
            ],
            "suspectedDEX": false
          },
          "isSmartContract": true,
          "isConversionWallet": true,
          "sourceThreadIds": [
            "V1-T2_HYPE"
          ],
          "multipleSourceInternalIds": [
            "V1-T2_HYPE"
          ],
          "wasTerminalWallet": true,
          "isTerminalWallet": false,
          "bridgeDetails": {
            "sourceChain": "unknown",
            "destinationChain": "solana",
            "destinationTxHash": "2izdCecuqx75DjCJHdJPMzV9Y1jxi24BPJCCikCNV7dsQ56X1rbThDXJ1Hb7CAr9ieXES2nE4UnCqRzs3hAYZuhY",
            "destinationWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
            "destinationAmount": 13401.193225000054,
            "destinationAsset": "USDC",
            "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
            "walletType": "brown",
            "wasPartialTrace": false,
            "proportionalMultiplier": 1
          },
          "bridgeOutputLogged": true
        },
        {
          "id": 6,
          "hopNumber": 1,
          "entryType": "trace",
          "notation": "V1-T2-H1",
          "fromWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "fromWalletType": "red",
          "fromWalletId": "",
          "toWallet": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
          "toWalletType": "brown",
          "toWalletId": "",
          "amount": "300.11",
          "currency": "HYPE",
          "customCurrency": "",
          "txHash": "0x05c2aa6f2346875c9c21a6b88aec09f37e948c982433fec5d6328a989c02046d",
          "timestamp": "2025-08-14T17:57",
          "timezone": "UTC",
          "notes": "Smart Contract: deBridge Finance\nType: Conversion Wallet (Bridge/DEX)\nDetection source: arkham_intelligence\n[BRIDGE OUTPUT] Wallet reclassified from terminal to bridge:\n  Output Chain: solana\n  Output Tx: 3rmN2t7KP4uRcyS3P7j96aQjDpy9WcenpkHu82KCNf61AVbL8KdtrVQGoXdcvnW1Pav4UUPCsLisx6PoPiJJNETU\n  Output Wallet: 3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B\n  Output Amount: 13400.466022 USDC\n  Reclassified: 2025-10-05T09:51:11.536Z",
          "category": "",
          "justification": "",
          "isSwap": false,
          "swapDetails": null,
          "isBridge": true,
          "sourceChain": [],
          "displayNotation": "",
          "summaryNotation": "",
          "victimNumbers": "",
          "transactionNumbers": "",
          "availableSourceAmount": 0,
          "sourceThreadId": "V1-T2",
          "sourceThreadData": null,
          "assignmentPercentage": 0,
          "generatedNotation": "",
          "isConvergence": false,
          "convergenceData": null,
          "multipleSourceThreads": [],
          "individualSourceAssignments": {
            "V1-T2": 300.11
          },
          "exchangeAttribution": {
            "name": "deBridge Finance",
            "label": "bridge",
            "type": "Bridge/DEX",
            "service": null,
            "chain": "arbitrum_one",
            "source": "arkham_intelligence",
            "isExchange": true,
            "isDEX": true,
            "isSmartContract": true,
            "isPersonalLabel": false,
            "tags": [
              {
                "id": "bridge",
                "label": "Bridge",
                "rank": 5,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "high-transacting",
                "label": "High Transacting",
                "rank": 16,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "tokenized-eth2-staker",
                "label": "Tokenized ETH2 Staker",
                "rank": 51,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "proxy-standard",
                "label": "EIP-1967 Transparent Proxy",
                "rank": 55,
                "excludeEntities": true,
                "chain": "arbitrum_one",
                "disablePage": true,
                "tagParams": "EIP-1967 Transparent Proxy"
              }
            ],
            "suspectedDEX": false
          },
          "isSmartContract": true,
          "isConversionWallet": true,
          "sourceThreadIds": [
            "V1-T2_HYPE"
          ],
          "multipleSourceInternalIds": [
            "V1-T2_HYPE"
          ],
          "wasTerminalWallet": true,
          "isTerminalWallet": false,
          "bridgeDetails": {
            "sourceChain": "unknown",
            "destinationChain": "solana",
            "destinationTxHash": "3rmN2t7KP4uRcyS3P7j96aQjDpy9WcenpkHu82KCNf61AVbL8KdtrVQGoXdcvnW1Pav4UUPCsLisx6PoPiJJNETU",
            "destinationWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
            "destinationAmount": 13400.466021999997,
            "destinationAsset": "USDC",
            "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
            "walletType": "brown",
            "wasPartialTrace": false,
            "proportionalMultiplier": 1
          },
          "bridgeOutputLogged": true
        },
        {
          "id": 7,
          "hopNumber": 1,
          "entryType": "trace",
          "notation": "V1-T2-H1",
          "fromWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
          "fromWalletType": "red",
          "fromWalletId": "",
          "toWallet": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
          "toWalletType": "brown",
          "toWalletId": "",
          "amount": "88.59",
          "currency": "HYPE",
          "customCurrency": "",
          "txHash": "0x50a592a72bccdd808726e62bdf7338b14a3a28402214d308a1dc7d96dfab8cbc",
          "timestamp": "2025-08-14T17:57",
          "timezone": "UTC",
          "notes": "Smart Contract: deBridge Finance\nType: Conversion Wallet (Bridge/DEX)\nDetection source: arkham_intelligence\nPartial trace: Following 88.59 of 306.1140460899179 HYPE (transaction total)\n[BRIDGE OUTPUT] Wallet reclassified from terminal to bridge:\n  Output Chain: solana\n  Output Tx: VxFZzprzmYppmw5sR2dr3eduHhjxyZsnmErPyaQWgxpqm2ZeKu2HfJKBoKzSjKz9HQ66bSsM9APNWabZre3pjdg\n  Output Wallet: 3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B\n  Full Bridge Output: 13680.480239 USDC\n  Our Proportional Share: 3959.157575 USDC\n  Calculation: 13680.480239 × 28.9402% = 3959.157575\n  ⚠️ PARTIAL TRACE PROPORTIONAL CALCULATION:\n    Your input: 88.59 HYPE of 306.1140460899179 HYPE total\n    Your ownership: 28.94%\n    Full bridge output: 13680.480239000004 USDC\n    Your proportional output: 3959.157575 USDC\n  Reclassified: 2025-10-05T09:51:27.015Z",
          "category": "",
          "justification": "",
          "isSwap": false,
          "swapDetails": null,
          "isBridge": true,
          "sourceChain": [],
          "displayNotation": "",
          "summaryNotation": "",
          "victimNumbers": "",
          "transactionNumbers": "",
          "availableSourceAmount": 0,
          "sourceThreadId": "V1-T2",
          "sourceThreadData": null,
          "assignmentPercentage": 0,
          "generatedNotation": "",
          "isConvergence": false,
          "convergenceData": null,
          "multipleSourceThreads": [],
          "individualSourceAssignments": {
            "V1-T2": 88.59
          },
          "exchangeAttribution": {
            "name": "deBridge Finance",
            "label": "bridge",
            "type": "Bridge/DEX",
            "service": null,
            "chain": "arbitrum_one",
            "source": "arkham_intelligence",
            "isExchange": true,
            "isDEX": true,
            "isSmartContract": true,
            "isPersonalLabel": false,
            "tags": [
              {
                "id": "bridge",
                "label": "Bridge",
                "rank": 5,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "high-transacting",
                "label": "High Transacting",
                "rank": 16,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "tokenized-eth2-staker",
                "label": "Tokenized ETH2 Staker",
                "rank": 51,
                "excludeEntities": false,
                "chain": "arbitrum_one",
                "disablePage": false
              },
              {
                "id": "proxy-standard",
                "label": "EIP-1967 Transparent Proxy",
                "rank": 55,
                "excludeEntities": true,
                "chain": "arbitrum_one",
                "disablePage": true,
                "tagParams": "EIP-1967 Transparent Proxy"
              }
            ],
            "suspectedDEX": false
          },
          "isSmartContract": true,
          "isConversionWallet": true,
          "sourceThreadIds": [
            "V1-T2_HYPE"
          ],
          "multipleSourceInternalIds": [
            "V1-T2_HYPE"
          ],
          "wasTerminalWallet": true,
          "isTerminalWallet": false,
          "bridgeDetails": {
            "sourceChain": "unknown",
            "destinationChain": "solana",
            "destinationTxHash": "VxFZzprzmYppmw5sR2dr3eduHhjxyZsnmErPyaQWgxpqm2ZeKu2HfJKBoKzSjKz9HQ66bSsM9APNWabZre3pjdg",
            "destinationWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
            "destinationAmount": 3959.1575749418935,
            "destinationAsset": "USDC",
            "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251",
            "walletType": "brown",
            "wasPartialTrace": true,
            "proportionalMultiplier": 0.28940194392118024
          },
          "bridgeOutputLogged": true
        },
        {
          "id": 8,
          "hopNumber": 2,
          "entryType": "trace",
          "notation": "(V1-T1,1,2,2,2,2) H2",
          "fromWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
          "fromWalletType": "red",
          "fromWalletId": "",
          "toWallet": "DsyQiQneNnfE3BprqsvACA8HhNhreRbbTfLrqewTkcmv",
          "toWalletType": "purple",
          "toWalletId": "",
          "amount": "44149.767777940004",
          "currency": "USDC",
          "customCurrency": "",
          "txHash": "3DbwFr57mYhKi6JK7JX2keJ25Jwg6XZhbkmbYUszsdU8rLBWxKjDGxxBFu9iQ9kq3Ups2pQCBriBvwHf3zSb33id",
          "timestamp": "2025-08-15T07:23",
          "timezone": "UTC",
          "notes": "Terminal wallet: KuCoin Deposit\nType: CEX\nDetection source: arkham_intelligence\nPartial trace: Following 44149.767777940004 of 53871.090442 USDC (transaction total)",
          "category": "",
          "justification": "",
          "isSwap": false,
          "swapDetails": null,
          "isBridge": false,
          "sourceChain": [],
          "displayNotation": "",
          "summaryNotation": "",
          "victimNumbers": "",
          "transactionNumbers": "",
          "availableSourceAmount": 0,
          "sourceThreadId": "",
          "sourceThreadData": null,
          "assignmentPercentage": 0,
          "generatedNotation": "",
          "isConvergence": true,
          "convergenceData": {
            "sourceCount": 5,
            "maxSourceHop": 1,
            "sequentialHopRuleApplied": true
          },
          "multipleSourceThreads": [
            "(V1-T1,2) H1",
            "V1-T1-H1",
            "V1-T2-H1",
            "V1-T2-H1",
            "V1-T2-H1"
          ],
          "individualSourceAssignments": {
            "bridge_4_USDC_1759657839696_qmik6t": 8931.89639,
            "bridge_3_USDC_1759657824768_xks0aq": 4457.054566,
            "bridge_5_USDC_1759657855055_txrfi1": 13401.193225,
            "bridge_6_USDC_1759657871536_x086rn": 13400.466022,
            "bridge_7_USDC_1759657887015_lnncyo": 3959.15757494
          },
          "exchangeAttribution": {
            "name": "KuCoin Deposit",
            "label": "KuCoin Deposit",
            "type": "CEX",
            "chain": "solana",
            "source": "arkham_intelligence",
            "isExchange": true,
            "isPersonalLabel": false,
            "detectionConfidence": 90,
            "detectionMatches": [
              {
                "type": "CEX",
                "name": "kucoin",
                "confidence": 90
              },
              {
                "type": "Keyword",
                "name": "deposit",
                "confidence": 70
              }
            ]
          },
          "isTerminalWallet": true,
          "sourceThreadIds": [
            "bridge_4_USDC_1759657839696_qmik6t",
            "bridge_3_USDC_1759657824768_xks0aq",
            "bridge_5_USDC_1759657855055_txrfi1",
            "bridge_6_USDC_1759657871536_x086rn",
            "bridge_7_USDC_1759657887015_lnncyo"
          ],
          "multipleSourceInternalIds": [
            "bridge_4_USDC_1759657839696_qmik6t",
            "bridge_3_USDC_1759657824768_xks0aq",
            "bridge_5_USDC_1759657855055_txrfi1",
            "bridge_6_USDC_1759657871536_x086rn",
            "bridge_7_USDC_1759657887015_lnncyo"
          ]
        }
      ],
      "artAtStartByCurrency": {
        "HYPE": 1290
      },
      "artAtStart": 1290,
      "completed": true,
      "completionNotified": false,
      "isCollapsed": true
    },
    {
      "hopNumber": 2,
      "entries": [
        {
          "id": 1,
          "hopNumber": 2,
          "entryType": "trace",
          "notation": "V1-T1-H2",
          "fromWallet": "0x000000087f00ae6e6b0da6d4125096cbe2138f25",
          "fromWalletType": "black",
          "fromWalletId": "",
          "toWallet": "0xe95f6eaeae1e4d650576af600b33d9f7e5f9f7fd",
          "toWalletType": "purple",
          "toWalletId": "",
          "amount": "300",
          "currency": "HYPE",
          "customCurrency": "",
          "txHash": "0x97bf706b11afe570c51cb3d185827058bcde2d6538fa99ff8ce82a9de4833e34",
          "timestamp": "2025-08-14T07:57",
          "timezone": "UTC",
          "notes": "Terminal wallet: GluexRouter\nType: Bridge/DEX\nDetection source: arkham_intelligence\nPartial trace: Following 300 of 345 HYPE (transaction total)",
          "category": "",
          "justification": "",
          "isSwap": false,
          "swapDetails": null,
          "isBridge": false,
          "sourceChain": [],
          "displayNotation": "",
          "summaryNotation": "",
          "victimNumbers": "",
          "transactionNumbers": "",
          "availableSourceAmount": 0,
          "sourceThreadId": "V1-T1-H1",
          "sourceThreadData": null,
          "assignmentPercentage": 0,
          "generatedNotation": "",
          "isConvergence": false,
          "convergenceData": null,
          "multipleSourceThreads": [],
          "individualSourceAssignments": {
            "V1-T1-H1": 300
          },
          "exchangeAttribution": {
            "name": "GluexRouter",
            "label": "GluexRouter",
            "type": "Bridge/DEX",
            "chain": "arbitrum_one",
            "source": "arkham_intelligence",
            "isExchange": true,
            "isPersonalLabel": false,
            "detectionConfidence": 85,
            "detectionMatches": [
              {
                "type": "DEX/Bridge",
                "name": "gluex",
                "confidence": 85
              },
              {
                "type": "DEX/Bridge",
                "name": "gluexrouter",
                "confidence": 85
              }
            ]
          },
          "isTerminalWallet": true,
          "sourceThreadIds": [
            "V1-T1-H1_HYPE"
          ],
          "multipleSourceInternalIds": [
            "V1-T1-H1_HYPE"
          ]
        }
      ],
      "artAtStartByCurrency": {
        "HYPE": 300
      },
      "artAtStart": 300,
      "completed": true,
      "completionNotified": true,
      "lastEntryCompleted": true,
      "isCollapsed": true
    }
  ],
  "conversions": [],
  "redWalletIndex": [
    {
      "id": 1,
      "vtNotation": "V1-T1",
      "walletId": "RED 1",
      "walletAddress": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
      "depositDate": "2025-08-14T07:42",
      "timezone": "UTC",
      "amount": 450,
      "currency": "HYPE",
      "notes": "From: 0x000000087f00ae6e6b0da6d4125096cbe2138f25 | HyperEVM transaction",
      "investigativeNotes": ""
    },
    {
      "id": 2,
      "vtNotation": "V1-T2",
      "walletId": "RED 1",
      "walletAddress": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
      "depositDate": "2025-08-14T07:58",
      "timezone": "UTC",
      "amount": 840,
      "currency": "HYPE",
      "notes": "From: 0x000000087f00ae6e6b0da6d4125096cbe2138f25 | HyperEVM transaction",
      "investigativeNotes": ""
    }
  ],
  "universalWalletIndex": [
    {
      "id": "RED 1",
      "permanentId": "RED 1",
      "address": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
      "permanentType": "red",
      "currentStatus": "red",
      "totalAmount": 1290,
      "currencies": {
        "HYPE": 1290
      },
      "exposureChain": [
        {
          "notation": "V1-T1",
          "amount": 450,
          "currency": "HYPE",
          "type": "victim_payment"
        },
        {
          "notation": "V1-T2",
          "amount": 840,
          "currency": "HYPE",
          "type": "victim_payment"
        }
      ],
      "firstSeen": "V1-T1",
      "statusHistory": [
        "red"
      ],
      "isDestination": false,
      "isSource": true,
      "notes": ""
    }
  ],
  "terminalWalletIndex": [
    {
      "id": 1759657916273,
      "timestamp": "2025-08-15T07:23",
      "hopNumber": 2,
      "txHash": "3DbwFr57mYhKi6JK7JX2keJ25Jwg6XZhbkmbYUszsdU8rLBWxKjDGxxBFu9iQ9kq3Ups2pQCBriBvwHf3zSb33id",
      "fromWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
      "toWallet": "DsyQiQneNnfE3BprqsvACA8HhNhreRbbTfLrqewTkcmv",
      "walletAddress": "DsyQiQneNnfE3BprqsvACA8HhNhreRbbTfLrqewTkcmv",
      "walletLabel": "KuCoin Deposit",
      "exchangeName": "KuCoin Deposit",
      "exchangeType": "CEX",
      "amount": 44149.767777940004,
      "currency": "USDC",
      "notation": "(V1-T1,1,2,2,2,2) H2",
      "detectionSource": "arkham_intelligence",
      "notes": "Terminal wallet: KuCoin Deposit\nType: CEX\nDetection source: arkham_intelligence\nPartial trace: Following 44149.767777940004 of 53871.090442 USDC (transaction total)",
      "walletType": "purple"
    },
    {
      "id": 1759657937048,
      "timestamp": "2025-08-14T07:57",
      "hopNumber": 2,
      "txHash": "0x97bf706b11afe570c51cb3d185827058bcde2d6538fa99ff8ce82a9de4833e34",
      "fromWallet": "0x000000087f00ae6e6b0da6d4125096cbe2138f25",
      "toWallet": "0xe95f6eaeae1e4d650576af600b33d9f7e5f9f7fd",
      "walletAddress": "0xe95f6eaeae1e4d650576af600b33d9f7e5f9f7fd",
      "walletLabel": "GluexRouter",
      "exchangeName": "GluexRouter",
      "exchangeType": "Bridge/DEX",
      "amount": 300,
      "currency": "HYPE",
      "notation": "V1-T1-H2",
      "detectionSource": "arkham_intelligence",
      "notes": "Terminal wallet: GluexRouter\nType: Bridge/DEX\nDetection source: arkham_intelligence\nPartial trace: Following 300 of 345 HYPE (transaction total)",
      "walletType": "purple"
    }
  ],
  "rootTotalConfirmed": true,
  "confirmedRootTotal": 1290,
  "confirmedRootTotalsByCurrency": {
    "HYPE": 1290
  },
  "currentART": {
    "HYPE": 1290
  },
  "created": "2025-10-05T09:45:17.246Z",
  "availableThreads": {
    "USDC": {
      "bridge_3_USDC_1759657824768_xks0aq": {
        "notation": "V1-T1-H1",
        "internalId": "bridge_3_USDC_1759657824768_xks0aq",
        "entryId": 3,
        "totalAmount": 4457.054566,
        "availableAmount": 0,
        "assignments": [],
        "sourceWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
        "sourceType": "bridge_output",
        "hopLevel": 1,
        "createdAt": "2025-10-05T09:50:24.768Z",
        "isActive": true,
        "parentThreads": [
          "V1-T1-H1"
        ],
        "childThreads": [],
        "currency": "USDC",
        "chainId": "solana",
        "chainName": "Solana",
        "bridgeConverted": true,
        "originalCurrency": "HYPE",
        "bridgeType": "defi",
        "sourceTxHash": "0xfe8f29235d268084bb3570405e2fdba5cd01f97b8953dfb04eb5827437e20954",
        "destinationTxHash": "WsRms15NyuMzRdkPzrRgjZUqK7dugQ4uMnkKK4SnPeVzysAqG65iXh1i2H5pJy3A9kDMTKQwC1wnuQg24utWe6x",
        "bridgeDetails": {
          "fromChain": "unknown",
          "toChain": "solana",
          "fromAmount": 100.09,
          "toAmount": 4457.054566,
          "fromCurrency": "HYPE",
          "toCurrency": "USDC",
          "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251"
        },
        "wasPartialTrace": false,
        "proportionalMultiplier": 1,
        "fullOutputAmount": 4457.054566,
        "fullyExhausted": true,
        "exhaustedByTerminal": "(V1-T1,1,2,2,2,2) H2"
      },
      "bridge_4_USDC_1759657839696_qmik6t": {
        "notation": "(V1-T1,2) H1",
        "internalId": "bridge_4_USDC_1759657839696_qmik6t",
        "entryId": 4,
        "totalAmount": 8931.89639,
        "availableAmount": 0,
        "assignments": [],
        "sourceWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
        "sourceType": "bridge_output",
        "hopLevel": 1,
        "createdAt": "2025-10-05T09:50:39.696Z",
        "isActive": true,
        "parentThreads": [
          "(V1-T1,2) H1"
        ],
        "childThreads": [],
        "currency": "USDC",
        "chainId": "solana",
        "chainName": "Solana",
        "bridgeConverted": true,
        "originalCurrency": "HYPE",
        "bridgeType": "defi",
        "sourceTxHash": "0xb3c6fbcbcda0ace210fb0771411bc9aa554cf91f13b7190b12bc9e4ae38c2c1a",
        "destinationTxHash": "3Xki2YjZxAqCMkAJDQM6zgwd2QHG7M3sR51tmFh4eLeFfj5HAte6PEs1mJbn9FM6Dq9G7TJqBvXQ5XWjfYoxRnzS",
        "bridgeDetails": {
          "fromChain": "unknown",
          "toChain": "solana",
          "fromAmount": 200.1,
          "toAmount": 8931.896390000002,
          "fromCurrency": "HYPE",
          "toCurrency": "USDC",
          "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251"
        },
        "wasPartialTrace": false,
        "proportionalMultiplier": 1,
        "fullOutputAmount": 8931.896390000002,
        "fullyExhausted": true,
        "exhaustedByTerminal": "(V1-T1,1,2,2,2,2) H2"
      },
      "bridge_5_USDC_1759657855055_txrfi1": {
        "notation": "V1-T2-H1",
        "internalId": "bridge_5_USDC_1759657855055_txrfi1",
        "entryId": 5,
        "totalAmount": 13401.193225,
        "availableAmount": 0,
        "assignments": [],
        "sourceWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
        "sourceType": "bridge_output",
        "hopLevel": 1,
        "createdAt": "2025-10-05T09:50:55.055Z",
        "isActive": true,
        "parentThreads": [
          "V1-T2-H1"
        ],
        "childThreads": [],
        "currency": "USDC",
        "chainId": "solana",
        "chainName": "Solana",
        "bridgeConverted": true,
        "originalCurrency": "HYPE",
        "bridgeType": "defi",
        "sourceTxHash": "0xd1f986f6178291f1f24641987e69b7cf9b56fc7bf8892970ec4c9a7ec6a751db",
        "destinationTxHash": "2izdCecuqx75DjCJHdJPMzV9Y1jxi24BPJCCikCNV7dsQ56X1rbThDXJ1Hb7CAr9ieXES2nE4UnCqRzs3hAYZuhY",
        "bridgeDetails": {
          "fromChain": "unknown",
          "toChain": "solana",
          "fromAmount": 300.11,
          "toAmount": 13401.193225000054,
          "fromCurrency": "HYPE",
          "toCurrency": "USDC",
          "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251"
        },
        "wasPartialTrace": false,
        "proportionalMultiplier": 1,
        "fullOutputAmount": 13401.193225000054,
        "fullyExhausted": true,
        "exhaustedByTerminal": "(V1-T1,1,2,2,2,2) H2"
      },
      "bridge_6_USDC_1759657871536_x086rn": {
        "notation": "V1-T2-H1",
        "internalId": "bridge_6_USDC_1759657871536_x086rn",
        "entryId": 6,
        "totalAmount": 13400.466022,
        "availableAmount": 0,
        "assignments": [],
        "sourceWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
        "sourceType": "bridge_output",
        "hopLevel": 1,
        "createdAt": "2025-10-05T09:51:11.536Z",
        "isActive": true,
        "parentThreads": [
          "V1-T2-H1"
        ],
        "childThreads": [],
        "currency": "USDC",
        "chainId": "solana",
        "chainName": "Solana",
        "bridgeConverted": true,
        "originalCurrency": "HYPE",
        "bridgeType": "defi",
        "sourceTxHash": "0x05c2aa6f2346875c9c21a6b88aec09f37e948c982433fec5d6328a989c02046d",
        "destinationTxHash": "3rmN2t7KP4uRcyS3P7j96aQjDpy9WcenpkHu82KCNf61AVbL8KdtrVQGoXdcvnW1Pav4UUPCsLisx6PoPiJJNETU",
        "bridgeDetails": {
          "fromChain": "unknown",
          "toChain": "solana",
          "fromAmount": 300.11,
          "toAmount": 13400.466021999997,
          "fromCurrency": "HYPE",
          "toCurrency": "USDC",
          "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251"
        },
        "wasPartialTrace": false,
        "proportionalMultiplier": 1,
        "fullOutputAmount": 13400.466021999997,
        "fullyExhausted": true,
        "exhaustedByTerminal": "(V1-T1,1,2,2,2,2) H2"
      },
      "bridge_7_USDC_1759657887015_lnncyo": {
        "notation": "V1-T2-H1",
        "internalId": "bridge_7_USDC_1759657887015_lnncyo",
        "entryId": 7,
        "totalAmount": 3959.15757494,
        "availableAmount": 0,
        "assignments": [],
        "sourceWallet": "3fFQpVPoFqcLpnXdZPWmAnT49wee5jLLVaLhVTXBLq5B",
        "sourceType": "bridge_output",
        "hopLevel": 1,
        "createdAt": "2025-10-05T09:51:27.015Z",
        "isActive": true,
        "parentThreads": [
          "V1-T2-H1"
        ],
        "childThreads": [],
        "currency": "USDC",
        "chainId": "solana",
        "chainName": "Solana",
        "bridgeConverted": true,
        "originalCurrency": "HYPE",
        "bridgeType": "defi",
        "sourceTxHash": "0x50a592a72bccdd808726e62bdf7338b14a3a28402214d308a1dc7d96dfab8cbc",
        "destinationTxHash": "VxFZzprzmYppmw5sR2dr3eduHhjxyZsnmErPyaQWgxpqm2ZeKu2HfJKBoKzSjKz9HQ66bSsM9APNWabZre3pjdg",
        "bridgeDetails": {
          "fromChain": "unknown",
          "toChain": "solana",
          "fromAmount": 88.59,
          "toAmount": 3959.1575749418935,
          "fromCurrency": "HYPE",
          "toCurrency": "USDC",
          "bridgeAddress": "0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251"
        },
        "wasPartialTrace": true,
        "proportionalMultiplier": 0.28940194392118024,
        "fullOutputAmount": 13680.480239000004,
        "fullyExhausted": true,
        "exhaustedByTerminal": "(V1-T1,1,2,2,2,2) H2"
      }
    },
    "HYPE": {
      "V1-T1_HYPE": {
        "notation": "V1-T1",
        "internalId": "V1-T1_HYPE",
        "totalAmount": 450,
        "availableAmount": 450,
        "assignments": [],
        "sourceWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
        "sourceType": "victim_transaction",
        "hopLevel": 0,
        "createdAt": "2025-08-14T07:42",
        "isActive": true,
        "parentThreads": [],
        "childThreads": [],
        "currency": "HYPE",
        "victimId": 1,
        "transactionId": 1,
        "chainId": "hyperevm",
        "chainName": "HyperEVM"
      },
      "V1-T2_HYPE": {
        "notation": "V1-T2",
        "internalId": "V1-T2_HYPE",
        "totalAmount": 840,
        "availableAmount": 840,
        "assignments": [],
        "sourceWallet": "0x59e9025c340cea78c4e5049ae881d44479fa08d7",
        "sourceType": "victim_transaction",
        "hopLevel": 0,
        "createdAt": "2025-08-14T07:58",
        "isActive": true,
        "parentThreads": [],
        "childThreads": [],
        "currency": "HYPE",
        "victimId": 1,
        "transactionId": 2,
        "chainId": "hyperevm",
        "chainName": "HyperEVM"
      },
      "V1-T1-H1_HYPE": {
        "notation": "V1-T1-H1",
        "internalId": "V1-T1-H1_HYPE",
        "totalAmount": 300,
        "availableAmount": 300,
        "assignments": [],
        "sourceWallet": "0x000000087f00ae6e6b0da6d4125096cbe2138f25",
        "sourceType": "hop_output",
        "hopLevel": 1,
        "createdAt": "2025-08-14T07:45",
        "isActive": true,
        "parentInternalIds": [
          "V1-T1_HYPE"
        ],
        "childThreads": [],
        "currency": "HYPE",
        "chainId": "hyperevm",
        "chainName": "HyperEVM"
      }
    }
  },
  "threadAssignments": {},
  "sourceChainData": {},
  "enhancedNotationEnabled": true,
  "validationHistory": [],
  "lastValidationTimestamp": null,
  "threadValidationErrors": [],
  "sourceChainReports": [],
  "integrationVersion": "4.0",
  "tracingMethod": "PIFO",
  "hopCompletions": {
    "hop1": "2025-10-05T09:51:58.864Z",
    "hop2": "2025-10-05T09:52:19.472Z"
  },
  "lastModified": "2025-10-05T09:52:19.472Z",
  "lastCompletedHop": 2
}