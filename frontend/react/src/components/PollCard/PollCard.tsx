import './PollCard.css';
import type { Poll } from '../../models/Poll';

type Props = {
	poll: Poll;
};

export default function PollCard({ poll }: Props) {
	return (
		<div className='card'>
			<h3>{poll.title}</h3>
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
				</div>
			))}
		</div>
	);
}
