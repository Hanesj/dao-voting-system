import { useCallback, useEffect, useState } from "react";
import {
  createWalletClient,
  custom,
  defineChain,
  type WalletClient,
} from "viem";

export const useWallet = () => {
  // Better this to choose account later
  const [wallet, setWallet] = useState<WalletClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("mm_account")) connectWallet();
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum.isMetaMask) return alert("Endast metamask");
    const [account] = await window.ethereum!.request({
      method: "eth_requestAccounts",
    });
    // const anvil = defineChain({
    // 	id: 31337,
    // 	name: 'Anvil',
    // 	nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    // 	rpcUrls: {
    // 		default: { http: ['http://127.0.0.1:8545'] },
    // 	},
    // });
    const sepolia = defineChain({
      id: 11155111,
      name: "Sepolia",
      nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        default: {
          http: ["https://eth-sepolia.g.alchemy.com/v2/WwmyBWYYAuWLTHY0KykCb"],
        }, // Din Alchemy URL
      },
    });

    const wallet = createWalletClient({
      account: account,
      chain: sepolia,
      transport: custom(window.ethereum),
    });

    setWallet(wallet);
    setIsConnected(true);
    localStorage.setItem("mm_account", account);
    console.log(account);

    // console.log(wallet);
    // console.log(account);
  }, [isConnected]);
  // useEffect(() => {
  //   connectWallet();
  //   setIsConnected(true);
  // }, []);
  const disconnectWallet = () => {
    setWallet(null);
    setIsConnected(false);
    localStorage.removeItem("mm_account");
    window.location.reload();
  };

  return { wallet, connectWallet, isConnected, disconnectWallet };
};
