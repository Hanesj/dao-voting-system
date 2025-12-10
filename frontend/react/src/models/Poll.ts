export interface Poll {
	title: string;
	owner?: string;
	state: string;
	options: VoteOptions[];
}

export interface VoteOptions {
	option: string;
	suggester: string;
	voteCount: number;
}
