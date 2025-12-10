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
