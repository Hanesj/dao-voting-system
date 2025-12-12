import { parseEventLogs, type PublicClient } from 'viem';
import { pollAbi } from './abi';

export const listFunctions = (abi: any[]) => {
	return abi
		.filter((x) => x.type === 'function')
		.map((fn) => ({
			name: fn.name,
			inputs: fn.inputs?.map((i: any) => `${i.name}:${i.type}`),
			outputs: fn.outputs?.map((o: any) => o.type),
			stateMutability: fn.stateMutability,
		}));
};

export const getTxLogs = async (
	hash: `0x${string}`,
	pubClient: PublicClient
) => {
	const receipt = await pubClient.waitForTransactionReceipt({
		hash,
	});
	const logs = parseEventLogs({
		abi: pollAbi,
		logs: receipt.logs,
	});
	return logs;
};
