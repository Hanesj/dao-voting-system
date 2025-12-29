import { type ReactNode } from "react";
import { useWallet } from "../../hooks/useWallet";

type Props = {
  children: ReactNode | ReactNode[];
};

const WalletGate = ({ children }: Props) => {
  const { isConnected, connectWallet } = useWallet();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col gap-6 items-center text-center max-w-md">
          {/* Rubrik med gradient och premium-typografi */}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4">
            Connect your wallet
          </h2>

          {/* Text med luftig, modern stil */}
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
            You need to connect your MetaMask wallet to use this app.
          </p>

          {/* Knappen behålls oförändrad */}
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
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
