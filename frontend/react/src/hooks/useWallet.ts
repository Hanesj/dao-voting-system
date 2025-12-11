import { useEffect, useState } from 'react';
import {
	createWalletClient,
	custom,
	defineChain,
	type WalletClient,
} from 'viem';

export const useWallet = () => {
	// Better this to choose account later
	const [wallet, setWallet] = useState<WalletClient | null>(null);
	const [isConnected, setIsConnected] = useState<boolean>(false);

	const connectWallet = async () => {
		const [account] = await window.ethereum!.request({
			method: 'eth_requestAccounts',
		});
		const anvil = defineChain({
			id: 31337,
			name: 'Anvil',
			nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
			rpcUrls: {
				default: { http: ['http://127.0.0.1:8545'] },
			},
		});
		const wallet = createWalletClient({
			account,
			chain: anvil,
			transport: custom(window.ethereum),
		});

		setWallet(wallet);
		console.log(wallet);
		console.log(account);
	};
	useEffect(() => {
		connectWallet();
		setIsConnected(true);
	}, []);

	return { wallet, connectWallet };
};
