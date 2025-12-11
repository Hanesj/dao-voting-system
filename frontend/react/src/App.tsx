import { useEffect, useState } from 'react';
import './App.css';
import {
	createPublicClient,
	createWalletClient,
	custom,
	http,
	type WalletClient,
	type PublicClient,
	defineChain,
	parseEventLogs,
} from 'viem';
import { factoryAbi, address, pollAbi } from './utilities/abi';
import { anvil, localhost } from 'viem/chains';
import Navbar from './components/navbar/Navbar';
import CreatePollForm from './components/CreatePollForm/CreatePollForm';
import PollCard from './components/PollCard/PollCard';
import type { Poll } from './models/Poll';
import { getFullPoll } from './services/api';
function App() {
	const [pubClient, setPubClient] = useState<PublicClient | null>(null);
	const [wallet, setWallet] = useState<WalletClient | null>(null);
	const [polls, setPolls] = useState<Poll[]>([
		{
			title: 'Example Poll 1',
			owner: '0xTTT',
			state: 'Not started',
			options: [{ option: 'Do this', suggester: '0xCCC', voteCount: 0 }],
		},
	]);

	// const vote = (pollIndex: number, optionIndex: number) => {
	// alert(
	// `Voted on ${polls[pollIndex].options[optionIndex]} in poll ${polls[pollIndex].title}`
	// );
	// };

	useEffect(() => {
		const client = createPublicClient({
			chain: localhost,
			transport: http('http://127.0.0.1:8545'),
		});

		// const wallet = createWalletClient({
		// 	chain: localhost,
		// 	transport: custom(window.ethereum),
		// });

		//console.log(address);
		setPubClient(client);
		// setWallet(wallet);
	}, []);

	useEffect(() => {
		const pollsOnChain: Poll[] = [];
		const getPollAddress = async () => {
			if (pubClient) {
				const numPolls = await pubClient.readContract({
					abi: factoryAbi,
					address,
					functionName: 'getNumOfPolls',
				});

				for (let i = 0; i < Number(numPolls); i++) {
					const a = await pubClient.readContract({
						abi: factoryAbi,
						address,
						functionName: 'getPollAddress',
						args: [i],
					});
					if (a) {
						const pollFromChain = await getFullPoll(a, pubClient);
						if (pollFromChain) {
							pollsOnChain.push(pollFromChain);
						}
					}
				}
				//console.log(`Address of pollcontract: ${a}`);
			}
			setPolls([...polls, ...pollsOnChain]);
		};

		getPollAddress();
		// console.log(pollsOnChain);
	}, [pubClient]);
	// console.log(polls);

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
		// const account = privateKeyToAccount(address);
		// console.log(wallet);
		// console.log(address);
		setWallet(wallet);
		console.log(wallet);
		console.log(account);
	};
	const addPoll = async (title: string) => {
		if (wallet && pubClient) {
			try {
				const { request } = await pubClient.simulateContract({
					abi: factoryAbi,
					address,
					functionName: 'createPoll',
					args: [title],
					account: wallet.account,
				});

				const txHash = await wallet.writeContract(request);
				const receipt = await pubClient.waitForTransactionReceipt({
					hash: txHash,
				});

				console.log('Receipt: ', receipt);

				const logs = parseEventLogs({
					abi: factoryAbi,

					logs: receipt.logs,
				});
				const pollCreated: any = logs.find(
					(p: any) => p.eventName! === 'pollCreated'
				);
				console.log(pollCreated.args.createdBy);
				console.log('Logs: ', logs);
				if (pollCreated) {
					setPolls([
						...polls,
						{
							title,
							state: '',
							options: [],
							owner: pollCreated.args.createdBy as string,
						},
					]);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<>
			<Navbar />
			<div className='container'>
				<h1>Voting DApp MVP</h1>

				<button className='button' onClick={connectWallet}>
					Connect Wallet
				</button>

				{/* <CreatePollForm addPoll={addPoll} /> */}
				<CreatePollForm addPoll={addPoll} />

				<h2>Polls</h2>
				{polls &&
					polls.map((poll, i) => <PollCard key={i} poll={poll} />)}
			</div>
		</>
	);
}

export default App;
