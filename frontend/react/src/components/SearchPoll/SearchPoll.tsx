import { useState } from 'react';
import { usePollsContext } from '../../context/PollsContext';
import './SearchPoll.css';
import type { Poll } from '../../models/Poll';

type Props = {};

const SearchPoll = (props: Props) => {
	const { polls, setPolls, masterPolls } = usePollsContext();
	const [title, setTitle] = useState<string>('');

	const handleSubmit = (title: string) => {
		//const search = titles.filter((t) => t.startsWith(title));
		setTitle(title);
		const searchPollsTitle = polls.filter((p) => {
			return p.title.toLowerCase().includes(title.toLowerCase());
		});
		if (title === '') {
			setPolls(masterPolls);
		} else {
			setPolls(searchPollsTitle);
		}
	};

	return (
		<>
			<input
				value={title}
				onChange={(e) => handleSubmit(e.target.value)}
				placeholder='Start typing to search'
			/>

			{title && (
				<ul className='searchResults'>
					{polls.map((p, i) => (
						<li key={i} className='result'>
							<span>{p.title}</span>
							<span>{p.state}</span>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default SearchPoll;
