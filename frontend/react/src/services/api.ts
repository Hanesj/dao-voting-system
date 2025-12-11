import type { PublicClient } from 'viem';
import { pollAbi } from '../utilities/abi';
import type { VoteOptions } from '../models/Poll';

export const getFullPoll = async (
	address: string | any,
	pubClient: PublicClient
) => {
	const addressConverted = address as `0x${string}`;
	const title = (await pubClient.readContract({
		abi: pollAbi,
		address: addressConverted,
		functionName: 'getTitle',
	})) as string;

	const owner = (await pubClient.readContract({
		abi: pollAbi,
		address: addressConverted,
		functionName: 'getOwner',
	})) as string;

	const state = (await pubClient.readContract({
		abi: pollAbi,
		address: addressConverted,
		functionName: 'getState',
	})) as string;

	const numOfOptions = await pubClient.readContract({
		abi: pollAbi,
		address: addressConverted,
		functionName: 'getNumOfOptions',
	});

	const options: VoteOptions[] = [];
	for (let i = 0; i < Number(numOfOptions); i++) {
		const option = (await pubClient.readContract({
			abi: pollAbi,
			address: addressConverted,
			functionName: 'getOption',
			args: [i],
		})) as VoteOptions;
		options.push(option);
	}

	const fullPoll = { title, state, options, owner };

	console.log(fullPoll);
	return fullPoll;
};
