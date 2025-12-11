export const factoryAbi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'pollAddress',
				type: 'address',
				indexed: false,
			},
			{
				internalType: 'string',
				name: 'title',
				type: 'string',
				indexed: false,
			},
			{
				internalType: 'address',
				name: 'createdBy',
				type: 'address',
				indexed: false,
			},
		],
		type: 'event',
		name: 'pollCreated',
		anonymous: false,
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: 'title',
				type: 'string',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'createPoll',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
	},
	{
		inputs: [],
		stateMutability: 'view',
		type: 'function',
		name: 'getNumOfPolls',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		name: 'getPollAddress',
		outputs: [
			{
				internalType: 'contract Voting',
				name: '',
				type: 'address',
			},
		],
	},
];
export const pollAbi = [
	{
		inputs: [
			{
				internalType: 'string',
				name: 'pollTitle',
				type: 'string',
			},
			{
				internalType: 'address',
				name: 'createdBy',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
				indexed: false,
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
				indexed: false,
			},
		],
		type: 'event',
		name: 'newVote',
		anonymous: false,
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
				indexed: false,
			},
			{
				internalType: 'string',
				name: '',
				type: 'string',
				indexed: false,
			},
		],
		type: 'event',
		name: 'optionAdded',
		anonymous: false,
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
				indexed: false,
			},
		],
		type: 'event',
		name: 'votingEnded',
		anonymous: false,
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
				indexed: false,
			},
		],
		type: 'event',
		name: 'votingStarted',
		anonymous: false,
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: 'addOption',
				type: 'string',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'addOptionToPoll',
	},
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'endVoting',
	},
	{
		inputs: [],
		stateMutability: 'view',
		type: 'function',
		name: 'getNumOfOptions',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		name: 'getOption',
		outputs: [
			{
				internalType: 'struct Voting.VoteOption',
				name: '',
				type: 'tuple',
				components: [
					{
						internalType: 'string',
						name: 'option',
						type: 'string',
					},
					{
						internalType: 'uint16',
						name: 'voteCount',
						type: 'uint16',
					},
					{
						internalType: 'address',
						name: 'suggester',
						type: 'address',
					},
				],
			},
		],
	},
	{
		inputs: [],
		stateMutability: 'view',
		type: 'function',
		name: 'getOwner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
	},
	{
		inputs: [],
		stateMutability: 'view',
		type: 'function',
		name: 'getState',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
	},
	{
		inputs: [],
		stateMutability: 'view',
		type: 'function',
		name: 'getTitle',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
	},
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'startVoting',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'voteOnOption',
	},
];

export const address = '0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35'; //'0x5FbDB2315678afecb367f032d93F642f64180aa3';
