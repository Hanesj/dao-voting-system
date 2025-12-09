import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
	createPublicClient,
	createWalletClient,
	custom,
	http,
	type WalletClient,
	type PublicClient,
	parseAbi,
} from 'viem';
import { factoryAbi, address, pollAbi } from './Utilities/abi';
import { localhost } from 'viem/chains';
function App() {
	const [count, setCount] = useState(0);
	const [pubClient, setPubClient] = useState<PublicClient | null>(null);
	const [wallet, setWallet] = useState<WalletClient | null>(null);

	useEffect(() => {
		const client = createPublicClient({
			chain: localhost,
			transport: http('http://127.0.0.1:8545'),
		});
		const wallet = createWalletClient({
			chain: localhost,
			transport: custom(window.ethereum),
		});
		setPubClient(client);
		setWallet(wallet);
	}, []);

	useEffect(() => {
		const test = async () => {
			if (pubClient) {
				let b;
				const a = await pubClient.readContract({
					abi: factoryAbi,
					address,
					functionName: 'getPollAddress',
					args: [0],
				});
				if (a) {
					b = a as `0x${string}`;

					const c = await pubClient.readContract({
						abi: pollAbi,
						address: b,
						functionName: 'getTitle',
					});
					console.log(`Polltitle `, c);
				}
				console.log(`Num of polls: ${a}`);
			}
		};

		test();
	}, [pubClient, wallet]);

	function listFunctions(abi: any[]) {
		return abi
			.filter((x) => x.type === 'function')
			.map((fn) => ({
				name: fn.name,
				inputs: fn.inputs?.map((i: any) => `${i.name}:${i.type}`),
				outputs: fn.outputs?.map((o: any) => o.type),
				stateMutability: fn.stateMutability,
			}));
	}
	const abi1 = listFunctions(factoryAbi);
	console.log(abi1);
	const abi2 = listFunctions(pollAbi);
	console.log(abi2);

	// console.log(pubClient);
	// console.log(wallet);
	// const contract = getContract({ address, abi, client });
	// console.log(contract);
	// const contract2 = client.getLogs();
	// console.log(contract2);
	return (
		<>
			<div>
				<a href='https://vite.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img
						src={reactLogo}
						className='logo react'
						alt='React logo'
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
