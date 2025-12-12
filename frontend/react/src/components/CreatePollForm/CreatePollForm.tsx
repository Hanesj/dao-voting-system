import React, { useState } from 'react';
import './CreatePollForm.css';

interface Props {
	addPoll: (title: string) => void;
}
export default function CreatePollForm({ addPoll }: Props) {
	const [title, setTitle] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title) return;
		addPoll(title);
		setTitle('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Enter poll title'
			/>
			<button type='submit'>Add</button>
		</form>
	);
}
