import { createPublicClient, http, type PublicClient } from 'viem';
import { localhost } from 'viem/chains';

export const pubClient = createPublicClient({
	chain: localhost,
	transport: http('http://127.0.0.1:8545'),
});
