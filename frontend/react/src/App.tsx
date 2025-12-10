import { useEffect, useState } from 'react';
import './App.css';
import {
	createPublicClient,
	createWalletClient,
	custom,
	http,
	type WalletClient,
	type PublicClient,
} from 'viem';
import { factoryAbi, address, pollAbi } from './utilities/abi';
import { localhost } from 'viem/chains';
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

	// const addPoll = (title: string) => {
	// 	setPolls([...polls, { title, options: [] }]);
	// };

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
		const wallet = createWalletClient({
			chain: localhost,
			transport: custom(window.ethereum),
		});
		setPubClient(client);
		setWallet(wallet);
	}, []);

	useEffect(() => {
		const getPollAddress = async () => {
			if (pubClient) {
				const a = await pubClient.readContract({
					abi: factoryAbi,
					address,
					functionName: 'getPollAddress',
					args: [0],
				});
				if (a) {
					const pollsFromChain = await getFullPoll(a, pubClient);
					if (pollsFromChain) {
						setPolls([...polls, pollsFromChain]);
					}
				}
				console.log(`Address of pollcontract: ${a}`);
			}
		};

		getPollAddress();
	}, [pubClient]);
	// console.log(polls);
	return (
		<>
			<Navbar />
			<div className='container'>
				<h1>Voting DApp MVP</h1>

				<button
					className='button'
					onClick={() => alert('Connect Wallet flow!')}>
					Connect Wallet
				</button>

				{/* <CreatePollForm addPoll={addPoll} /> */}
				<CreatePollForm />

				<h2>Polls</h2>
				{polls &&
					polls.map((poll, i) => <PollCard key={i} poll={poll} />)}
			</div>
		</>
	);
}

export default App;
