import React, { useEffect, useRef } from 'react';

type Props = {
	messages: Record<string, string>[];
};

const ChatRoom = ({ messages }: Props) => {
	// const messagesEndRef = useRef<any>(null);
	// useEffect(() => {
	// 	messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	// }, [messages]);

	return (
		<div className='h-full p-4 overflow-y-scroll bg-white rounded-lg shadow-lg max-h-110'>
			{messages.length < 1 && <div>No chats!</div>}
			{messages.map((msg, index) => (
				<div
					key={index}
					className={`mb-2 p-2 rounded ${
						msg.isSystem ? 'bg-gray-200' : 'bg-blue-200'
					}`}>
					{!msg.message.includes('has joined.') ? (
						msg.userName !== 'admin' ? (
							<>
								<strong>{msg.userName}: </strong>
								{msg.message}
							</>
						) : (
							msg.message
						)
					) : (
						<>
							<strong>{msg.userName} </strong>
							{msg.message.replace('.', '')} the chat.
						</>
					)}
					{/* <div ref={messagesEndRef} /> */}
				</div>
			))}
		</div>
	);
};

export default ChatRoom;
