import React, { useEffect, useState, type ReactNode } from "react";
import { useWallet } from "../../hooks/useWallet";

type Props = {
  children: ReactNode | ReactNode[];
};

const WalletGate = ({ children }: Props) => {
  const { isConnected, connectWallet } = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (localStorage.getItem("mm_account")) {
        setWalletConnected(true);
      }
    };
    checkConnection();
  }, []);

  const handleConnect = () => {
    connectWallet();
    setWalletConnected(true);
  };
  if (!walletConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-xl shadow-md text-center flex flex-col gap-7">
          <h2
            className="text-2xl font-bold bg-gray-400"
            style={{ padding: "15px" }}
          >
            Connect your wallet.
          </h2>
          <p
            className="text-gray-600 mb-6 bg-gray-200"
            style={{ padding: "20px" }}
          >
            You need to connect your metamask wallet to use this app.
          </p>
          <button
            onClick={handleConnect}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Anslut MetaMask
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WalletGate;
