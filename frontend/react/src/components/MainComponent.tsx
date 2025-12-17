import type { SetStateAction } from 'react';
import ChatClient from './ChatClient/ChatClient';
import CreatePollForm from './CreatePollForm/CreatePollForm';
import SearchPoll from './SearchPoll/SearchPoll';
import PollCard from './PollCard/PollCard';
import FilterPolls from './FilterPolls';

type Props = {
	pollsPerPage: any[];
	addPoll: (poll: any) => Promise<void>;
	setPageNo: React.Dispatch<SetStateAction<number>>;
};

const MainComponent = ({ pollsPerPage, addPoll, setPageNo }: Props) => {
	return (
		<div className='main-page'>
			<FilterPolls setPageNo={setPageNo} />
			<div className='container'>
				{/* <button className='button' onClick={connectWallet}>
						Connect Wallet
					</button> */}

				{/* <CreatePollForm addPoll={addPoll} /> */}
				<div className='searchBar'>
					<SearchPoll setPageNo={setPageNo} />
				</div>
				<br />
				<CreatePollForm addPoll={addPoll} />

				{pollsPerPage.length > 0 &&
					pollsPerPage.map((poll) => (
						<PollCard key={poll.address} poll={poll} />
					))}
			</div>
			<ChatClient />
		</div>
	);
};

export default MainComponent;
