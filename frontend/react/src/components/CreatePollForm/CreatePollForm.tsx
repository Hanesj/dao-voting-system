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
			<h2>Create New Poll</h2>
			<label>
				Poll Title:
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Enter poll title'
				/>
			</label>
			<button type='submit'>Create Poll</button>
		</form>
	);
}
