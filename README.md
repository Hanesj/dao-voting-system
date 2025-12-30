# DAO Voting System

This project is a **Decentralized Autonomous Organization (DAO) voting system** designed to demonstrate transparency and decentralized decision-making in Web3 projects. It allows project teams to create polls, vote securely using their wallets, and discuss propositions in real time.

---

## Features

- **Decentralized Voting**: All votes are recorded on the Ethereum Sepolia testnet blockchain.
- **Chat for Discussion**: Integrated SignalR chat to discuss propositions before voting.
- **Transparent Results**: Poll outcomes are verifiable and immutable.
- **Minimal Backend Storage**: Only chat logs are stored; all voting data is fetched from the blockchain.
- **Scalable Deployment**: Runs on a Proxmox server with two Debian 12 VMs and an LXC container.

---

---

## Tech Stack

- **Smart Contract:** Solidity
- **Frontend:** React
- **Backend:** .NET 8.0 (SignalR, nethereum)
- **Database:** PostgreSQL
- **Deployment:** Proxmox (2 VMs + 1 LXC container)

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Hanesj/dao-voting-system.git
```

Set up the backend and frontend on their respective VMs.

Deploy the PostgreSQL LXC container.

Connect MetaMask to the Sepolia testnet.

Run the frontend and backend servers.

Usage

Authenticate with your Ethereum wallet.

Create a poll and submit voting options.

Vote on active polls.

Discuss propositions in the chat before voting.

View poll results in real-time.
