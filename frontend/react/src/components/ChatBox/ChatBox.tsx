import React, {
	useState,
	type KeyboardEventHandler,
	type SetStateAction,
	type SyntheticEvent,
} from 'react';

type Props = {
	sendMessage: (msg: string) => Promise<void>;
	setMessages: React.Dispatch<SetStateAction<Record<string, string>[]>>;
};

const ChatBox = ({ sendMessage, setMessages }: Props) => {
	const [message, setMessage] = useState<string>('');

	const handleSend = async () => {
		if (message.trim()) {
			await sendMessage(message);
			setMessage('');
		}
	};

	const handleRemove = (e: SyntheticEvent) => {
		setMessages([]);
	};

	// const handleClick = (e: KeyboardEventHandler<HTMLTextAreaElement>) => {
	// 	if (e. === 'Enter' && !e.shiftKey) {
	// 		e.preventDefault();
	// 		handleSend();
	// 	}
	// };

	return (
		<div className='p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg'>
			<div className='flex items-end space-x-2'>
				<textarea
					className='w-full p-2 bg-white rounded-2xl resize-none'
					rows={1}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					// onKeyDown={handleClick}
					placeholder='Type a message...'
				/>
				<button onClick={handleSend}>Send</button>
			</div>
			<button className='mt-2 ml-11' onClick={handleRemove}>
				Remove history
			</button>
		</div>
	);
};

export default ChatBox;
