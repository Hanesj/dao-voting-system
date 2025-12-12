import { useState } from 'react';
import { usePollsContext } from '../../context/PollsContext';
import './SearchPoll.css';

type Props = {};

const SearchPoll = (props: Props) => {
	const { polls } = usePollsContext();
	const [title, setTitle] = useState<string>('');

	const handleSubmit = (title: string) => {
		//const search = titles.filter((t) => t.startsWith(title));
		setTitle(title);
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
					{polls.map((p, i) => {
						if (
							p.title
								.toLowerCase()
								.startsWith(title.toLowerCase())
						) {
							return (
								<li key={i} className='result'>
									<span>{p.title}</span>
									<span>{p.state}</span>
								</li>
							);
						}
					})}
				</ul>
			)}
		</>
	);
};

export default SearchPoll;
