import './App.css';
// mport Navbar from './components/navbar/Navbar';
import CreatePollForm from './components/CreatePollForm/CreatePollForm';
import PollCard from './components/PollCard/PollCard';
import { useWallet } from './hooks/useWallet';
import { usePollsContext } from './context/PollsContext';
import SearchPoll from './components/SearchPoll/SearchPoll';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
function App() {
	const { connectWallet } = useWallet();
	const { polls, addPoll, masterPolls } = usePollsContext();
	const [pageNo, setPageNo] = useState<number>(0);
	const itemsPerPage = 2;
	//const { addOptionToPoll, addVote, openVoting } = usePoll();

	const totalNumberOfPages = Math.ceil(masterPolls.length / itemsPerPage);
	const hasNextPage = pageNo < totalNumberOfPages - 1;

	const startIndex = pageNo * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const pollsPerPage = polls.slice(startIndex, endIndex);

	const handleClick = (dir: number) => {
		console.log(pollsPerPage);
		if (dir === -1) setPageNo((prev) => prev - 1);
		if (dir === 1 && hasNextPage) setPageNo((prev) => prev + 1);
		console.log('Klick?');
	};

	return (
		<>
			{/* <Navbar /> */}
			<h1 className='control-section-title'>Find and Create Polls</h1>
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

			<div className='pagination'>
				{pageNo > 0 && (
					<button onClick={() => handleClick(-1)}>&lt;</button>
				)}
				<p>{pageNo + 1}</p>
				{hasNextPage && (
					<button onClick={() => handleClick(1)}>&gt;</button>
				)}
			</div>
		</>
	);
}

export default App;
