import './App.css';
import Navbar from './components/navbar/Navbar';
import CreatePollForm from './components/CreatePollForm/CreatePollForm';
import PollCard from './components/PollCard/PollCard';
import { useWallet } from './hooks/useWallet';
import { usePoll } from './hooks/usePoll';
import { usePollsContext } from './context/PollsContext';
function App() {
	const { connectWallet } = useWallet();
	const { polls, addPoll } = usePollsContext();
	const { addOptionToPoll, addVote, openVoting } = usePoll();

	return (
		<>
			<Navbar />
			<div className='container'>
				<h1>Voting DApp MVP</h1>

				<button className='button' onClick={connectWallet}>
					Connect Wallet
				</button>

				{/* <CreatePollForm addPoll={addPoll} /> */}
				<CreatePollForm addPoll={addPoll} />

				<h2>Polls</h2>
				{polls &&
					polls.map((poll, i) => (
						<PollCard
							key={i}
							poll={poll}
							addOptionToPoll={addOptionToPoll}
							addVote={addVote}
							startVote={openVoting}
						/>
					))}
			</div>
		</>
	);
}

export default App;
