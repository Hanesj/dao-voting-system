import { useEffect, useRef, useState, type SyntheticEvent } from 'react';

import * as SignalR from '@microsoft/signalr';
import ChatRoom from '../ChatRoom/ChatRoom';
import ChatBox from '../ChatBox/ChatBox';
import LoadingState from '../LoadingState';

type Props = {};

const ChatClient = (props: Props) => {
	const [connection, setConnection] = useState<SignalR.HubConnection | null>(
		null
	);
	const [messages, setMessages] = useState<Record<string, string>[]>([]);
	const [userName, setUserName] = useState<string>('');
	const [chatRoom, setChatRoom] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [chatRooms, setChatRooms] = useState<Record<string, string>[]>([]);
	const [newChatRoom, setNewChatRoom] = useState<string>('');

	const userNameRef = useRef<HTMLInputElement>(null);
	const chatRoomRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const connectSignalR = async () => {
			const newConnection = new SignalR.HubConnectionBuilder()
				.withUrl('http://localhost:5037/chathub')
				.withAutomaticReconnect()
				.build();

			newConnection.on(
				'ReceiveRooms',
				(numOfRooms: number, roomNames: Record<string, string>[]) => {
					console.log(
						`Num of rooms: ${numOfRooms}, roomnames:\n${roomNames.map(
							(r) => r.chatRoomTitle
						)}`
					);
					setChatRooms(roomNames);
				}
			);
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
			await newConnection.invoke('AllChatRooms');
			setConnection(newConnection);
		};

		connectSignalR();
	}, []);

	const joinChatRoom = async (userName: string, chatRoom: string) => {
		if (userName === '' && userNameRef.current) {
			userNameRef.current.focus();
			return;
		}

		setLoading(true);
		if (connection) {
			await connection.invoke('JoinChatRoom', userName, chatRoom);
			setChatRoom(chatRoom);
			setLoading(false);
		}
	};

	const createChatRoom = async (userName: string, chatRoom: string) => {
		if (userName === '' && userNameRef.current) {
			userNameRef.current.focus();
			return;
		}
		if (newChatRoom === '' && chatRoomRef.current) {
			chatRoomRef.current.focus();
			return;
		}
		setLoading(true);
		if (connection) {
			await connection.invoke('JoinChatRoom', userName, chatRoom);
			setChatRoom(chatRoom);
			setNewChatRoom('');
			setLoading(false);
		}
	};

	const sendMessage = async (message: string) => {
		if (connection) {
			await connection.invoke('SendMessage', userName, message, chatRoom);
		}
	};

	const exitRoom = async () => {
		setChatRoom('');
		if (connection) {
			await connection.invoke('AllChatRooms');
		}
	};

	return (
		<div className='flex flex-col mt-42 mr-10 max-h-110 rounded-lg '>
			<main className='max-w-110 max-w-4xl mx-auto flex flex-col flex-1 bg-white rounded-lg '>
				{loading ? (
					<LoadingState />
				) : connection && chatRoom != '' ? (
					<>
						<ChatRoom messages={messages} chatRoom={chatRoom} />
						<ChatBox
							sendMessage={sendMessage}
							setMessages={setMessages}
							exitRoom={exitRoom}
						/>
					</>
				) : (
					<div className='flex items-center justify-center bg-gray-100 p-4'>
						<div className='max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-200'>
							<h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
								Chat Portal
							</h2>

							<div className='bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200'>
								<h4 className='text-lg font-semibold text-gray-700 mb-3'>
									Tillgängliga Rum:
								</h4>

								<ul className='flex flex-wrap gap-3'>
									{chatRooms.map((cr) => (
										<li
											key={cr.chatRoomTitle} // OBS: Lägg till en unik 'key' om den saknas!
											className='
                            w-20 text-center p-3 
                            bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out 
                            text-white font-medium rounded-lg shadow-md cursor-pointer 
                            text-sm
                        '
											onClick={(
												e: React.MouseEvent<HTMLLIElement>
											) =>
												joinChatRoom(
													userName,
													e.currentTarget
														.textContent || ''
												)
											}>
											{cr.chatRoomTitle}
										</li>
									))}
								</ul>
							</div>

							<div className='space-y-4'>
								<input
									type='text'
									ref={userNameRef}
									placeholder='Ange ditt användarnamn'
									value={userName}
									onChange={(e) =>
										setUserName(e.target.value)
									}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700'
								/>

								<input
									type='text'
									ref={chatRoomRef}
									placeholder='Ange namn på nytt chattrum'
									value={newChatRoom}
									onChange={(e) =>
										setNewChatRoom(e.target.value)
									}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700'
								/>

								<button
									className='
                    w-full py-3 px-4 mt-2 
                    bg-green-500 hover:bg-green-600 
                    text-white font-semibold rounded-lg shadow-md 
                    transition duration-150 ease-in-out
                '
									onClick={() =>
										createChatRoom(userName, newChatRoom)
									}>
									Skapa Nytt Chattrum
								</button>
							</div>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default ChatClient;
