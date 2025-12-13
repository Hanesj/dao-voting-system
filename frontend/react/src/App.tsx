import './App.css';
// mport Navbar from './components/navbar/Navbar';
import CreatePollForm from './components/CreatePollForm/CreatePollForm';
import PollCard from './components/PollCard/PollCard';
import { useWallet } from './hooks/useWallet';
import { usePollsContext } from './context/PollsContext';
import SearchPoll from './components/SearchPoll/SearchPoll';
import { useState } from 'react';
function App() {
	const { connectWallet } = useWallet();
	const { polls, addPoll, masterPolls } = usePollsContext();
	const [pageNo, setPageNo] = useState<number>(0);
	const itemsPerPage = 1;
	//const { addOptionToPoll, addVote, openVoting } = usePoll();

	const pollsPerPage = polls.slice(
		pageNo * itemsPerPage,
		(pageNo + 1) * itemsPerPage
	);

	const handleClick = (dir: number) => {
		console.log(pollsPerPage);
		if (dir === -1 && pageNo > 0) setPageNo((prev) => prev - 1);
		if (dir === 1 && pollsPerPage.length > 0) setPageNo((prev) => prev + 1);
		console.log('Klick?');
	};

	return (
		<>
			{/* <Navbar /> */}
			{console.log(masterPolls)}

			<div className='container'>
				<h1>Voting DApp MVP</h1>

				{/* <button className='button' onClick={connectWallet}>
					Connect Wallet
				</button> */}

				{/* <CreatePollForm addPoll={addPoll} /> */}
				<div>
					<SearchPoll setPageNo={setPageNo} />
				</div>
				<CreatePollForm addPoll={addPoll} />

				<h2>Polls</h2>
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
				{pollsPerPage.length >= 1 &&
					masterPolls.length > pageNo + 1 && (
						<button onClick={() => handleClick(1)}>&gt;</button>
					)}
			</div>
		</>
	);
}

export default App;
