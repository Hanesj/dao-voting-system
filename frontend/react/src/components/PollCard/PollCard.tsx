import './PollCard.css';
import type { Poll } from '../../models/Poll';
import { useState, type MouseEvent } from 'react';

type Props = {
	poll: Poll;
	addOptionToPoll: (address: string, title: string) => void;
	addVote: (address: string, optionTitle: string) => void;
	startVote: (address: string) => void;
};

export default function PollCard({
	poll,
	addOptionToPoll,
	addVote,
	startVote,
}: Props) {
	const [title, setTitle] = useState<string>('');
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title) return;
		//console.log(title, ' ', poll.address);
		addOptionToPoll(poll.address, title);
		setTitle('');
	};
	const handleVote = (e: MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();
		//console.log(poll.options[index]);
		addVote(poll.address, poll.options[index].option);
	};
	return (
		<div className='card'>
			<h3>{poll.title}</h3>
			<h4>Created by: {poll.owner}</h4>
			<h5>Address: {poll.address}</h5>
			<button onClick={() => startVote(poll.address)}>Open voting</button>
			<form onSubmit={handleSubmit}>
				<label htmlFor='pollTitle'>Add option: </label>
				<input
					id='pollTitle'
					name='pollTitle'
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Option title'
				/>
				<button type='submit'>+</button>
			</form>
			<p>Options:</p>
			{poll.options.length === 0 && <p>No options yet.</p>}
			{poll.options.map((opt, i) => (
				<div key={i} className='option'>
					<div>
						<label>Title: </label>
						<span>{opt.option}</span>
					</div>
					<div>
						<label>Suggester: </label>
						<span>{opt.suggester}</span>
					</div>
					<div>
						<label>Vote count: </label>
						<span>{opt.voteCount}</span>
					</div>
					<button onClick={(e) => handleVote(e, i)}>Vote</button>
				</div>
			))}
		</div>
	);
}
