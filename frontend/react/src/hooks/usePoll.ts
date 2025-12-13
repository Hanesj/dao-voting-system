import { parseAbi, parseEventLogs } from 'viem';
import { pubClient } from '../services/clients';
import { pollAbi } from '../utilities/abi';
import { useWallet } from './useWallet';
import { getFullPoll } from '../services/api';
import type { Poll } from '../models/Poll';
import { usePollsContext } from '../context/PollsContext';
import { getTxLogs } from '../utilities/utils';
import type { IUsePollHook } from '../models/IUsePoll';
export const usePoll = (): IUsePollHook => {
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
				// console.log(txHash);
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
					const newPolls: Poll[] = polls.map((p) => {
						if (p.address !== addressToPoll) {
							return { ...p };
						}
						return {
							...p,
							options: optionAdded.options,
						};
					});

					setPolls(newPolls);
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
				const logs = await getTxLogs(txHash, pubClient);
				const voteStarted: any = logs.find(
					(v: any) => v.eventName === 'votingStarted'
				);
				console.log(voteStarted.args);
				const updatedPolls = polls.map((p) => {
					if (p.address !== addressToPoll) {
						return p;
					}
					return { ...p, state: 'Voting is ongoing.' };
				});
				setPolls(updatedPolls);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const closeVoting = async (addressToPoll: string) => {
		const parsedEndVoteAbi = parseAbi([
			'function endVoting()',
			'event votingEnded(string)',
		]);
		if (wallet && pubClient) {
			try {
				const { request } = await pubClient.simulateContract({
					abi: parsedEndVoteAbi,
					address: addressToPoll as `0x${string}`,
					functionName: 'endVoting',
					account: wallet.account,
				});
				const txHash = await wallet.writeContract(request);
				const logs = await getTxLogs(txHash, pubClient);
				console.log(logs);
				const updatedPolls = polls.map((p) => {
					if (p.address !== addressToPoll) {
						return p;
					}
					return { ...p, state: 'Voting has ended.' };
				});
				setPolls(updatedPolls);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return { addOptionToPoll, addVote, openVoting, closeVoting };
};
