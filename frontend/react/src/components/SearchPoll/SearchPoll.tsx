import { useState, type SetStateAction } from 'react';
import { usePollsContext } from '../../context/PollsContext';
import './SearchPoll.css';

type Props = {
	setPageNo: React.Dispatch<SetStateAction<number>>;
};

const SearchPoll = ({ setPageNo }: Props) => {
	const { polls, setPolls, masterPolls } = usePollsContext();
	const [title, setTitle] = useState<string>('');

	const handleSubmit = (title: string) => {
		//const search = titles.filter((t) => t.startsWith(title));
		setTitle(title);
		const searchPollsTitle = masterPolls.filter((p) => {
			return p.title.toLowerCase().includes(title.toLowerCase());
		});
		if (title === '') {
			setPolls(masterPolls);
		} else {
			setPageNo(0);
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
