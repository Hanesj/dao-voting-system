export interface IUsePollHook {
	addOptionToPoll: (addressToPoll: string, title: string) => Promise<void>;
	addVote: (addressToPoll: string, optionTitle: string) => Promise<void>;
	openVoting: (addressToPoll: string) => Promise<void>;
	closeVoting: (addressToPoll: string) => Promise<void>;
}
