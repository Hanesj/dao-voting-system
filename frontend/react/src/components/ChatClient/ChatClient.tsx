import { useEffect, useState } from 'react';

import * as SignalR from '@microsoft/signalr';
import ChatRoom from '../ChatRoom/ChatRoom';
import ChatBox from '../ChatBox/ChatBox';

type Props = {};

const ChatClient = (props: Props) => {
	const [connection, setConnection] = useState<SignalR.HubConnection | null>(
		null
	);
	const [messages, setMessages] = useState<Record<string, string>[]>([]);
	const [userName, setUserName] = useState<string>('');
	const [chatRoom, setChatRoom] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const joinChatRoom = async (userName: string, chatRoom: string) => {
		setLoading(true);
		const newConnection = new SignalR.HubConnectionBuilder()
			.withUrl('http://localhost:5037/chathub')
			.withAutomaticReconnect()
			.build();

		newConnection.on('ReceiveMessage', (userName, message) => {
			console.log(`Message: ${message} from userName: ${userName}`);
			setMessages((prevMessages) => [
				...prevMessages,
				{ userName, message },
			]);
		});
		newConnection.on('ReceiveHistory', (prevChats) => {
			console.log(`${JSON.stringify(prevChats)}`);
			setMessages([
				{ userName: 'admin', message: 'Welcome to the chatroom.' },
				...prevChats,
			]);
		});

		await newConnection.start();
		await newConnection.invoke('JoinChatRoom', userName, chatRoom);

		setConnection(newConnection);
		setLoading(false);
	};

	const sendMessage = async (message: string) => {
		if (connection) {
			await connection.invoke('SendMessage', userName, message, chatRoom);
		}
	};
	console.log(messages);

	return (
		<div
			className='flex flex-col  mt-42 max-h-110 rounded-lg'
			style={{ marginRight: '1rem' }}>
			<main className='container  mx-auto rounded-lg bg-white'>
				{loading ? (
					<div className='flex items-center justify-center'>
						<p className='text-white'>Connecting to chat room...</p>
					</div>
				) : connection ? (
					<>
						<ChatRoom messages={messages} />
						<ChatBox
							sendMessage={sendMessage}
							setMessages={setMessages}
						/>
					</>
				) : (
					<div className='flex items-center justify-center bg-gray-900 rounded-lg'>
						<div className='w-full max-w-lg p-8 mx-4 bg-white rounded-lg shadow-lg md:mx-auto'>
							<input
								type='text'
								placeholder='Enter your name'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
							<input
								type='text'
								placeholder='Enter chat room name'
								value={chatRoom}
								onChange={(e) => setChatRoom(e.target.value)}
							/>
							<button
								onClick={() =>
									joinChatRoom(userName, chatRoom)
								}>
								Join Chat Room
							</button>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default ChatClient;
