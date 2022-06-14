export const tableFactoryContractAddress = '0x2De69e4733066C1DbbAA2806F5C1a3a50AC63Cc9';

export const baseUrl = 'https://10.0.1.4:3000/table/'; 

export const tableFactoryContractAbi = [
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
		"name": "allTables",
		"outputs": [
			{
				"internalType": "contract offerTable[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyTables",
		"outputs": [
			{
				"internalType": "contract offerTable[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
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
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];