import { parseAbi, parseEventLogs } from 'viem';
import { pubClient } from '../services/clients';
import { pollAbi } from '../utilities/abi';
import { useWallet } from './useWallet';
import { getFullPoll } from '../services/api';
import type { Poll } from '../models/Poll';
import { usePollsContext } from '../context/PollsContext';
export const usePoll = () => {
	const { polls, setPolls } = usePollsContext();
	const { wallet } = useWallet();
	const addOptionToPoll = async (addressToPoll: string, title: string) => {
		if (wallet && pubClient) {
			try {
				const { request } = await pubClient.simulateContract({
					abi: pollAbi,
					address: addressToPoll as `0x${string}`,
					functionName: 'addOptionToPoll',
					args: [title],
					account: wallet.account,
				});
				const txHash = await wallet.writeContract(request);
				console.log(txHash);
				const receipt = await pubClient.waitForTransactionReceipt({
					hash: txHash,
				});
				const logs = parseEventLogs({
					abi: pollAbi,
					logs: receipt.logs,
				});
				const optionCreated: any = logs.find(
					(p: any) => p.eventName === 'optionAdded'
				);
				console.log(optionCreated.args);
				if (optionCreated) {
					const optionAdded = await getFullPoll(
						addressToPoll,
						pubClient
					);
					const newPolls: Poll[] = polls.filter(
						(p) => p.title !== optionAdded.title
					);
					setPolls([...newPolls, optionAdded]);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	const addVote = async (addressToPoll: string, optionTitle: string) => {
		const parsedVoteAbi = parseAbi([
			'function voteOnOption(uint256 index)',
			'event newVote(string, uint256)',
		]);
		if (wallet && pubClient) {
			try {
				const indexOfOption = polls
					.find((p) => p.address === addressToPoll)
					?.options.findIndex((o) => o.option === optionTitle);
				// console.log(indexOfOption);
				// console.log(optionTitle);
				if (indexOfOption === -1 || indexOfOption === undefined) return;
				const { request } = await pubClient.simulateContract({
					abi: parsedVoteAbi,
					address: addressToPoll as `0x${string}`,
					functionName: 'voteOnOption',
					args: [BigInt(indexOfOption)],
					account: wallet.account,
				});
				const txHash = await wallet.writeContract(request);
				const receipt = await pubClient.waitForTransactionReceipt({
					hash: txHash,
				});

				const logs = parseEventLogs({
					abi: pollAbi,
					logs: receipt.logs,
				});
				const voteSucces: any = logs.find(
					(v: any) => v.eventName === 'newVote'
				);
				//console.log(voteSucces.args);
				const updatedPolls = polls.map((p) => {
					if (p.address !== addressToPoll) {
						return p;
					}
					const updatedOptions = p.options.map((o) => {
						if (o.option !== optionTitle) {
							return o;
						}

						return { ...o, voteCount: o.voteCount + 1 };
					});

					return { ...p, options: updatedOptions };
				});
				setPolls(updatedPolls);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const openVoting = async (addressToPoll: string) => {
		const parsedPollAbi = parseAbi([
			'function startVoting()',
			'event votingStarted(string)',
		]);
		if (wallet && pubClient) {
			try {
				const { request } = await pubClient.simulateContract({
					abi: parsedPollAbi,
					address: addressToPoll as `0x${string}`,
					functionName: 'startVoting',
					account: wallet.account,
				});
				const txHash = await wallet.writeContract(request);
				const receipt = await pubClient.waitForTransactionReceipt({
					hash: txHash,
				});
				const logs = parseEventLogs({
					abi: pollAbi,
					logs: receipt.logs,
				});
				const voteStarted: any = logs.find(
					(v: any) => v.eventName === 'votingStarted'
				);
				console.log(voteStarted.args);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return { addOptionToPoll, addVote, openVoting };
};
