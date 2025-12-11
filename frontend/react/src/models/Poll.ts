export interface Poll {
	title: string;
	owner?: string;
	address: string;
	state: string;
	options: VoteOptions[];
}

export interface VoteOptions {
	option: string;
	suggester: string;
	voteCount: number;
}
