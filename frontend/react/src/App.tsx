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
	parseAbi,
} from 'viem';
import { factoryAbi, address, pollAbi } from './utilities/abi';
import { anvil, localhost } from 'viem/chains';
import Navbar from './components/navbar/Navbar';
import CreatePollForm from './components/CreatePollForm/CreatePollForm';
import PollCard from './components/PollCard/PollCard';
import type { Poll } from './models/Poll';
import { getFullPoll } from './services/api';
import { useWallet } from './hooks/useWallet';
import { pubClient } from './services/clients';
import { usePolls } from './hooks/usePolls';
import { usePoll } from './hooks/usePoll';
function App() {
	// const [pubClient, setPubClient] = useState<PublicClient | null>(null);
	// const [wallet, setWallet] = useState<WalletClient | null>(null);
	const { connectWallet } = useWallet();
	const { polls, addPoll } = usePolls();
	const { addOptionToPoll, addVote, openVoting } = usePoll();
	// const [polls, setPolls] = useState<Poll[]>([
	// 	{
	// 		title: 'Example Poll 1',
	// 		owner: '0xTTT',
	// 		state: 'Not started',
	// 		options: [{ option: 'Do this', suggester: '0xCCC', voteCount: 0 }],
	// 		address: '0x0',
	// 	},
	// ]);

	// const vote = (pollIndex: number, optionIndex: number) => {
	// alert(
	// `Voted on ${polls[pollIndex].options[optionIndex]} in poll ${polls[pollIndex].title}`
	// );
	// };

	// useEffect(() => {
	// 	const client = createPublicClient({
	// 		chain: localhost,
	// 		transport: http('http://127.0.0.1:8545'),
	// 	});

	// 	connectWallet();

	// 	//console.log(address);
	// 	setPubClient(client);
	// 	// setWallet(wallet);
	// }, []);

	// useEffect(() => {
	// 	const pollsOnChain: Poll[] = [];
	// 	const getPolls = async () => {
	// 		if (pubClient) {
	// 			const numPolls = await pubClient.readContract({
	// 				abi: factoryAbi,
	// 				address,
	// 				functionName: 'getNumOfPolls',
	// 			});

	// 			for (let i = 0; i < Number(numPolls); i++) {
	// 				const a = await pubClient.readContract({
	// 					abi: factoryAbi,
	// 					address,
	// 					functionName: 'getPollAddress',
	// 					args: [i],
	// 				});
	// 				if (a) {
	// 					const pollFromChain = await getFullPoll(a, pubClient);
	// 					if (pollFromChain) {
	// 						pollsOnChain.push(pollFromChain);
	// 					}
	// 				}
	// 			}
	// 			//console.log(`Address of pollcontract: ${a}`);
	// 		}
	// 		if (pollsOnChain.length > 0) {
	// 			setPolls(pollsOnChain);
	// 		}
	// 	};

	// 	getPolls();
	// 	// console.log(pollsOnChain);
	// }, [pubClient]);
	// console.log(polls);

	// const connectWallet = async () => {
	// 	const [account] = await window.ethereum!.request({
	// 		method: 'eth_requestAccounts',
	// 	});
	// 	const anvil = defineChain({
	// 		id: 31337,
	// 		name: 'Anvil',
	// 		nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
	// 		rpcUrls: {
	// 			default: { http: ['http://127.0.0.1:8545'] },
	// 		},
	// 	});
	// 	const wallet = createWalletClient({
	// 		account,
	// 		chain: anvil,
	// 		transport: custom(window.ethereum),
	// 	});

	// 	setWallet(wallet);
	// 	console.log(wallet);
	// 	console.log(account);
	// };
	// const addPoll = async (title: string) => {
	// 	if (wallet && pubClient) {
	// 		try {
	// 			const { request } = await pubClient.simulateContract({
	// 				abi: factoryAbi,
	// 				address,
	// 				functionName: 'createPoll',
	// 				args: [title],
	// 				account: wallet.account,
	// 			});

	// 			const txHash = await wallet.writeContract(request);
	// 			const receipt = await pubClient.waitForTransactionReceipt({
	// 				hash: txHash,
	// 			});

	// 			console.log('Receipt: ', receipt);

	// 			const logs = parseEventLogs({
	// 				abi: factoryAbi,

	// 				logs: receipt.logs,
	// 			});
	// 			const pollCreated: any = logs.find(
	// 				(p: any) => p.eventName === 'pollCreated'
	// 			);
	// 			console.log(pollCreated.args);
	// 			if (pollCreated) {
	// 				setPolls([
	// 					...polls,
	// 					{
	// 						title,
	// 						state: '',
	// 						options: [],
	// 						owner: pollCreated.args.createdBy as string,
	// 						address: pollCreated.args.pollAddress,
	// 					},
	// 				]);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// };

	// const addOptionToPoll = async (addressToPoll: string, title: string) => {
	// 	if (wallet && pubClient) {
	// 		try {
	// 			const { request } = await pubClient.simulateContract({
	// 				abi: pollAbi,
	// 				address: addressToPoll as `0x${string}`,
	// 				functionName: 'addOptionToPoll',
	// 				args: [title],
	// 				account: wallet.account,
	// 			});
	// 			const txHash = await wallet.writeContract(request);
	// 			console.log(txHash);
	// 			const receipt = await pubClient.waitForTransactionReceipt({
	// 				hash: txHash,
	// 			});
	// 			const logs = parseEventLogs({
	// 				abi: pollAbi,
	// 				logs: receipt.logs,
	// 			});
	// 			const optionCreated: any = logs.find(
	// 				(p: any) => p.eventName === 'optionAdded'
	// 			);
	// 			console.log(optionCreated.args);
	// 			if (optionCreated) {
	// 				const optionAdded = await getFullPoll(
	// 					addressToPoll,
	// 					pubClient
	// 				);
	// 				const newPolls: Poll[] = polls.filter(
	// 					(p) => p.title !== optionAdded.title
	// 				);
	// 				setPolls([...newPolls, optionAdded]);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// };

	// const addVote = async (addressToPoll: string, optionTitle: string) => {
	// 	const parsedVoteAbi = parseAbi([
	// 		'function voteOnOption(uint256 index)',
	// 		'event newVote(string, uint256)',
	// 	]);
	// 	if (wallet && pubClient) {
	// 		try {
	// 			const indexOfOption = polls
	// 				.find((p) => p.address === addressToPoll)
	// 				?.options.findIndex((o) => o.option === optionTitle);
	// 			// console.log(indexOfOption);
	// 			// console.log(optionTitle);
	// 			if (indexOfOption === -1 || indexOfOption === undefined) return;
	// 			const { request } = await pubClient.simulateContract({
	// 				abi: parsedVoteAbi,
	// 				address: addressToPoll as `0x${string}`,
	// 				functionName: 'voteOnOption',
	// 				args: [BigInt(indexOfOption)],
	// 				account: wallet.account,
	// 			});
	// 			const txHash = await wallet.writeContract(request);
	// 			const receipt = await pubClient.waitForTransactionReceipt({
	// 				hash: txHash,
	// 			});

	// 			const logs = parseEventLogs({
	// 				abi: pollAbi,
	// 				logs: receipt.logs,
	// 			});
	// 			const voteSucces: any = logs.find(
	// 				(v: any) => v.eventName === 'newVote'
	// 			);
	// 			//console.log(voteSucces.args);
	// 			const updatedPolls = polls.map((p) => {
	// 				if (p.address !== addressToPoll) {
	// 					return p;
	// 				}
	// 				const updatedOptions = p.options.map((o) => {
	// 					if (o.option !== optionTitle) {
	// 						return o;
	// 					}

	// 					return { ...o, voteCount: o.voteCount + 1 };
	// 				});

	// 				return { ...p, options: updatedOptions };
	// 			});
	// 			setPolls(updatedPolls);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// };

	// const openVoting = async (addressToPoll: string) => {
	// 	const parsedPollAbi = parseAbi([
	// 		'function startVoting()',
	// 		'event votingStarted(string)',
	// 	]);
	// 	if (wallet && pubClient) {
	// 		try {
	// 			const { request } = await pubClient.simulateContract({
	// 				abi: parsedPollAbi,
	// 				address: addressToPoll as `0x${string}`,
	// 				functionName: 'startVoting',
	// 				account: wallet.account,
	// 			});
	// 			const txHash = await wallet.writeContract(request);
	// 			const receipt = await pubClient.waitForTransactionReceipt({
	// 				hash: txHash,
	// 			});
	// 			const logs = parseEventLogs({
	// 				abi: pollAbi,
	// 				logs: receipt.logs,
	// 			});
	// 			const voteStarted: any = logs.find(
	// 				(v: any) => v.eventName === 'votingStarted'
	// 			);
	// 			console.log(voteStarted.args);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// };

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
					polls.map((poll, i) => (
						<PollCard
							key={i}
							poll={poll}
							addOptionToPoll={addOptionToPoll}
							addVote={addVote}
							startVote={openVoting}
						/>
					))}
			</div>
		</>
	);
}

export default App;
