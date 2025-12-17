type Props = {
	messages: Record<string, string>[];
	chatRoom: string;
};

const ChatRoom = ({ messages, chatRoom }: Props) => {
	// const messagesEndRef = useRef<any>(null);
	// useEffect(() => {
	// 	messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	// }, [messages]);

	return (
		<div className='h-full p-4 overflow-y-scroll bg-white shadow-lg max-h-110 min-w-110'>
			<div
				className='
	sticky top-0 z-20 
	flex items-center justify-center 
	h-12  /* fixad höjd */
	bg-white/80 backdrop-blur 
	border-b border-gray-200
'>
				<div>
					<div
						className='
				inline-flex items-center gap-2 
				px-4 py-2 
				rounded-full 
				bg-indigo-50 text-indigo-700 
				text-sm font-medium 
				border border-indigo-100
			'>
						<span className='w-2 h-2 rounded-full bg-indigo-500 animate-pulse' />
						<span>{chatRoom}</span>
					</div>
				</div>
			</div>

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
