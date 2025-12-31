# DAO Voting System (Localhost Version)

This project is a **Decentralized Autonomous Organization (DAO) voting system** designed to demonstrate transparency and decentralized decision-making in Web3 projects. It allows project teams to create polls, vote securely using their wallets, and discuss propositions in real time. This version runs entirely on **localhost**.

---

## Features

- **Decentralized Voting**: All votes are recorded on the Ethereum Sepolia testnet blockchain.
- **Real-Time Chat**: Integrated SignalR chat for discussing propositions before voting.
- **Transparent Results**: Poll outcomes are verifiable and immutable.
- **Minimal Backend Storage**: Only chat logs are stored; voting data is fetched directly from the blockchain.
- **Full Localhost Setup**: Backend, frontend, and database all run locally without separate VMs or containers.

---

## Prerequisites

- **.NET 8.0** – for backend
- **PostgreSQL** – local database for chat logs
- **Node.js & npm** – required for frontend
- **MetaMask** – browser wallet to interact with Ethereum Sepolia testnet

---

## Setup

### Clone Repository

```bash
git clone https://github.com/Hanesj/dao-voting-system.git
cd dao-voting-system

```

### Backend Setup

1. **Navigate to the backend folder:**

```bash
cd backend/vote.api
```

2. Restore and build the project:

```bash
dotnet restore
dotnet build
```

3. Configure the local database:

Start PostgreSQL and create a database (e.g., dao_chat)

Update appsettings.json with database credentials:

```bash
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=dao_chat;Username=<username>;Password=<password>"
  }
}
```

Or export as environment variable:

```bash
export ConnectionStrings__DefaultConnection='Host=localhost;Port=5432;Database=dao_chat;Username=<username>;Password=<password>'
```

4.

```bash
dotnet run
```

### Frontend Setup

1. **Navigate to the frontend folder:**

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend server:

```bash
npm start
```
