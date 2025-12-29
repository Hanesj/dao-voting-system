import React, {
  useState,
  type SetStateAction,
  type SyntheticEvent,
} from "react";

type Props = {
  sendMessage: (msg: string) => Promise<void>;
  setMessages: React.Dispatch<SetStateAction<Record<string, string>[]>>;
  exitRoom: () => void;
};

const ChatBox = ({ sendMessage, setMessages, exitRoom }: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage(message);
      setMessage("");
    }
  };

  const handleRemove = (e: SyntheticEvent) => {
    setMessages([]);
  };

  const handleExitRoom = () => {
    exitRoom();
  };

  // const handleClick = (e: KeyboardEventHandler<HTMLTextAreaElement>) => {
  // 	if (e. === 'Enter' && !e.shiftKey) {
  // 		e.preventDefault();
  // 		handleSend();
  // 	}
  // };

  return (
    <div
      className="
	p-3 
	bg-white/90 backdrop-blur 
	shadow-[0_-4px_20px_rgba(0,0,0,0.05)] 
	sticky bottom-0 z-10
rounded-2xl"
    >
      <div className="flex items-end gap-3">
        {/* Textarea */}
        <textarea
          className="
				flex-grow p-3 
				bg-gray-100/80 
				rounded-2xl resize-none 
				border border-transparent 
				focus:border-indigo-400 
				focus:ring-2 focus:ring-indigo-400/30 
				text-sm sm:text-base 
				placeholder-gray-400
				transition-all duration-200
			"
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Skriv ett meddelande..."
          style={{ maxHeight: "100px" }}
        />

        {/* Skicka-knapp */}
        <button
          onClick={handleSend}
          title="Skicka"
          className="
				p-3 
				bg-gradient-to-br from-indigo-500 to-indigo-600 
				hover:from-indigo-600 hover:to-indigo-700 
				text-white 
				rounded-full 
				shadow-lg shadow-indigo-500/30 
				active:scale-95 
				transition-all duration-150 
				flex-shrink-0
			"
        >
          {/* Paper plane-ikon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.94 2.94a.75.75 0 01.82-.16l13.5 6a.75.75 0 010 1.38l-13.5 6a.75.75 0 01-1.05-.82l1.4-5.1 5.4-.24a.75.75 0 000-1.5l-5.4-.24-1.4-5.1a.75.75 0 01.23-.78z" />
          </svg>
        </button>
      </div>

      {/* Kontrollknappar */}
      <div className="flex justify-around mt-3 mb-3">
        <button
          onClick={handleExitRoom}
          className="
				text-sm font-medium 
				text-red-600 
				bg-red-50 
				hover:bg-red-100 
				rounded-full 
				transition-colors duration-150
			"
        >
          Avsluta rum
        </button>

        <button
          onClick={handleRemove}
          className="
				px-4 py-2 text-sm font-medium 
				text-gray-600 
				bg-gray-100 
				hover:bg-gray-200 
				rounded-full 
				transition-colors duration-150
			"
        >
          Rensa historik
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
