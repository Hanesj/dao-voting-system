import './PollCard.css';
import type { Poll } from '../../models/Poll';
import { useState, type MouseEvent } from 'react';
import { usePoll } from '../../hooks/usePoll';

import Options from '../Options';

type Props = {
	poll: Poll;
};

export default function PollCard({ poll }: Props) {
	const [title, setTitle] = useState<string>('');
	const { closeVoting, openVoting } = usePoll();
	//const { addPoll, polls, setPolls } = usePollsContext();
	// const handleSubmit = (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	if (!title) return;
	// 	//console.log(title, ' ', poll.address);
	// 	addOptionToPoll(poll.address, title);
	// 	setTitle('');
	// };
	// const handleVote = (e: MouseEvent<HTMLButtonElement>, index: number) => {
	// 	e.preventDefault();
	// 	//console.log(poll.options[index]);
	// 	addVote(poll.address, poll.options[index].option);
	// };
	return (
		<div className='card'>
			<h3>
				Poll: {poll.title}
				<span> State: {poll.state}</span>
			</h3>
			<h4>Created by: {poll.owner}</h4>
			<h5>Address: {poll.address}</h5>
			{poll.state !== 'Voting has ended.' &&
				(poll.state === 'Voting has not begun.' ? (
					<button onClick={() => openVoting(poll.address)}>
						Open voting
					</button>
				) : (
					<button onClick={() => closeVoting(poll.address)}>
						Close voting
					</button>
				))}

			<p>Options:</p>
			<Options poll={poll} />
		</div>
	);
}
