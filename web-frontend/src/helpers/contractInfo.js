export const tableFactoryContractAddress = '0xd74E091e2EA7AbC94E37B9F07c87E8a710a87545';

export const baseUrl = 'https://10.0.1.4:3000/table/'; 

export const tableFactoryContractAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "TablesByOwner",
		"outputs": [
			{
				"internalType": "contract offerTable",
				"name": "OT",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "CP",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allTables",
		"outputs": [
			{
				"components": [
					{
						"internalType": "contract offerTable",
						"name": "OT",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "CP",
						"type": "address"
					}
				],
				"internalType": "struct offerTableFactory.thisStruct[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_counterParty",
				"type": "address"
			}
		],
		"name": "createTable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyTables",
		"outputs": [
			{
				"components": [
					{
						"internalType": "contract offerTable",
						"name": "OT",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "CP",
						"type": "address"
					}
				],
				"internalType": "struct offerTableFactory.thisStruct[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const tableContractAbi = [
	{
		"inputs": [],
		"name": "executeSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalizeOfferParty1",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalizeOfferParty2",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "p1EjectAllFulfill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "p1EjectAllRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "p2EjectAllFulfill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "p2EjectAllRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "erc20AssetAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "erc20AssetAmount",
				"type": "uint256"
			}
		],
		"name": "party1AddErc20AssetAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "erc721AssetAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "party1AddErc721AssetAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "erc20AssetAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "erc20AssetAmount",
				"type": "uint256"
			}
		],
		"name": "party2AddErc20AssetAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "erc721AssetAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "party2AddErc721AssetAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_party1Address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_party2Address",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc20AssetAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "erc20AssetAmount",
				"type": "uint256"
			}
		],
		"name": "party1Erc20Add",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc721AssetAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "party1Erc721Add",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct offerTable.erc721Asset[]",
				"name": "_party1ArrayOfErc721",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct offerTable.erc20Asset[]",
				"name": "_party1ArrayOfErc20",
				"type": "tuple[]"
			}
		],
		"name": "party1Swap",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc20AssetAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "erc20AssetAmount",
				"type": "uint256"
			}
		],
		"name": "party2Erc20Add",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc721AssetAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "party2Erc721Add",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct offerTable.erc721Asset[]",
				"name": "_party2ArrayOfErc721",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct offerTable.erc20Asset[]",
				"name": "_party2ArrayOfErc20",
				"type": "tuple[]"
			}
		],
		"name": "party2Swap",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getParties",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getparty1Offer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"internalType": "struct offerTable.erc721Asset[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct offerTable.erc20Asset[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getparty2Offer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"internalType": "struct offerTable.erc721Asset[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct offerTable.erc20Asset[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]