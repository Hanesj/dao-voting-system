export const factoryAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pollAddress",
        type: "address",
        indexed: false,
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
        indexed: false,
      },
      {
        internalType: "address",
        name: "createdBy",
        type: "address",
        indexed: false,
      },
    ],
    type: "event",
    name: "pollCreated",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "createPoll",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "getNumOfPolls",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "getPollAddress",
    outputs: [
      {
        internalType: "contract Voting",
        name: "",
        type: "address",
      },
    ],
  },
];

// export const pollAbi = parseAbi([
// 	// --- KONSTRUKTOR ---
// 	'constructor(string pollTitle, address createdBy)',

// 	// --- WRITE FUNKTIONER (State-ändring) ---
// 	'function addOptionToPoll(string addOption) returns (string)',
// 	'function endVoting()', // Void funktion
// 	'function startVoting()', // Void funktion (som orsakade felet tidigare, nu fixad)
// 	'function voteOnOption(uint256 index)', // Void funktion

// 	// --- VIEW FUNKTIONER (Läsning) ---
// 	'function getNumOfOptions() view returns (uint256)',

// 	// Complex Tuple/Struct Returvärde
// 	// Voting.VoteOption har 3 fält: (string option, uint16 voteCount, address suggester)
// 	'function getOption(uint256 index) view returns ((string option, uint16 voteCount, address suggester))',

// 	'function getOwner() view returns (address)',
// 	'function getState() view returns (string)',
// 	'function getTitle() view returns (string)',

// 	// --- EVENTS ---
// 	'event newVote(string, uint256)',
// 	'event optionAdded(string, address)',
// 	'event votingEnded(string)',
// 	'event votingStarted(string)',
// ]);
export const pollAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "pollTitle",
        type: "string",
      },
      {
        internalType: "address",
        name: "createdBy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
        indexed: false,
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
        indexed: false,
      },
    ],
    type: "event",
    name: "newVote",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
        indexed: false,
      },
      {
        internalType: "address",
        name: "",
        type: "address",
        indexed: false,
      },
    ],
    type: "event",
    name: "optionAdded",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
        indexed: false,
      },
    ],
    type: "event",
    name: "votingEnded",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
        indexed: false,
      },
    ],
    type: "event",
    name: "votingStarted",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "addOption",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "addOptionToPoll",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "function",
    name: "endVoting",
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "getNumOfOptions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "getOption",
    outputs: [
      {
        internalType: "struct Voting.VoteOption",
        name: "",
        type: "tuple",
        components: [
          {
            internalType: "string",
            name: "option",
            type: "string",
          },
          {
            internalType: "uint16",
            name: "voteCount",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "suggester",
            type: "address",
          },
        ],
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "getState",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "getTitle",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "function",
    name: "startVoting",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "voteOnOption",
  },
];

export const address = "0xa330b99DC82bA69134C7082F4c254025B13FDCa7";
// "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35"; //'0x5FbDB2315678afecb367f032d93F642f64180aa3';
