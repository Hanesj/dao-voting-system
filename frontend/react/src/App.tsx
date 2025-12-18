import './App.css';
// mport Navbar from './components/navbar/Navbar';
import { usePollsContext } from './context/PollsContext';
import { useState } from 'react';
import Pagination from './components/Pagination';
import MainComponent from './components/MainComponent';
function App() {
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
			<h1>Find and Create Polls</h1>
			<MainComponent
				addPoll={addPoll}
				pollsPerPage={pollsPerPage}
				setPageNo={setPageNo}
			/>

			<Pagination
				handleClick={handleClick}
				hasNextPage={hasNextPage}
				pageNo={pageNo}
			/>
		</>
	);
}

export default App;
