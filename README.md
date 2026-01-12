# (Theres another branch for localhost version)

# DAO Voting System (Proxmox Version)

This project is a **Decentralized Autonomous Organization (DAO) voting system** designed to demonstrate transparency and decentralized decision-making in Web3 projects. It allows project teams to create polls, vote securely using their wallets, and discuss propositions in real time. This version is deployed on a **Proxmox server** with separate VMs and an LXC container for scalability.

---

## Features

- **Decentralized Voting**: All votes are recorded on the Ethereum Sepolia testnet blockchain.
- **Real-Time Chat**: Integrated SignalR chat for discussing propositions before voting.
- **Transparent Results**: Poll outcomes are verifiable and immutable.
- **Minimal Backend Storage**: Only chat logs are stored; voting data is fetched directly from the blockchain.
- **Scalable Deployment**: Backend, frontend, and database run on separate VMs/LXC container on Proxmox.

---

## Prerequisites

- **.NET 8.0** – for backend
- **dotnet-ef** - for db handling
- **PostgreSQL** – LXC container database
- **Node.js & npm** – for frontend
- **MetaMask** – browser wallet for Ethereum Sepolia testnet
- **Proxmox Server** – running 2 Debian 12 VMs and 1 LXC container

---

## Setup

### Clone Repository

```bash
git clone https://github.com/Hanesj/dao-voting-system.git
```

```bash
cd dao-voting-system
```

## Backend VM (Debian 12) Setup

Navigate to the backend folder:

```bash
cd backend/vote.api
```

Restore and build the project:

```bash
dotnet restore
dotnet build
```

Configure the backend to connect to the database in the LXC container:

```bash
{
"ConnectionStrings": {
"DefaultConnection": "Host=10.0.0.30;Port=5432;Database=dao_chat;Username=<username>;Password=<password>"
    }
}
Or export as environment variable:
export ConnectionStrings__DefaultConnection='Host=10.0.0.30;Port=5432;Database=dao_chat;Username=<username>;Password=<password>'
```
Then:
```bash
dotnet ef migrations add Init
dotnet ef database update
```

Run the backend server:

```bash
dotnet run
```

## Frontend VM (Debian 12) Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

## Client-Browser

Open the browser and connect MetaMask to the Sepolia testnet.
