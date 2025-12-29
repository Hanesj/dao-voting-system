import { useRef, useState } from "react";

import ChatRoomComponent from "../ChatRoom/ChatRoomComponent";
import ChatBox from "../ChatBox/ChatBox";
import LoadingState from "../LoadingState/LoadingState";
import { useSignalRContext } from "../../context/SignalRContext";

type Props = {};

const ChatClient = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newChatRoom, setNewChatRoom] = useState<string>("");

  const { state, actions } = useSignalRContext();
  const userNameRef = useRef<HTMLInputElement>(null);
  const chatRoomRef = useRef<HTMLInputElement>(null);

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    if (userName === "" && userNameRef.current) {
      userNameRef.current.focus();
      return;
    }

    setLoading(true);
    await actions.joinChatRoom(chatRoom);

    setLoading(false);
  };

  const createChatRoom = async (userName: string) => {
    if (userName === "" && userNameRef.current) {
      userNameRef.current.focus();
      return;
    }
    if (newChatRoom === "" && chatRoomRef.current) {
      chatRoomRef.current.focus();
      return;
    }
    setLoading(true);
    await actions.joinChatRoom(newChatRoom);
    setNewChatRoom("");
    setLoading(false);
  };

  const sendMessage = async (message: string) => {
    await actions.sendMessage(message);
  };

  const exitRoom = async () => {
    await actions.leaveChatRoom();
  };

  return (
    <div className="flex flex-col max-h-100 rounded-lg">
      <main className="max-w-110 max-w-4xl mx-auto flex flex-col flex-1 bg-white rounded-lg">
        {loading ? (
          <LoadingState />
        ) : state.isConnected && state.chatRoom != "" ? (
          <>
            <ChatRoomComponent
              messages={state.messages}
              chatRoom={state.chatRoom}
            />
            <ChatBox
              sendMessage={sendMessage}
              setMessages={actions.clearChatHistory}
              exitRoom={exitRoom}
            />
          </>
        ) : (
          <div className="flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-8 ">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Chat
              </h2>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Chatrooms:
                </h4>

                <ul className="flex flex-wrap gap-1">
                  {state.chatRooms.map((cr) => (
                    <li
                      key={cr.chatRoomTitle} // OBS: Lägg till en unik 'key' om den saknas!
                      className="
                            w-20 text-center p-3 
                            bg-blue-400 hover:bg-blue-600 transition duration-150 ease-in-out 
                            text-white font-medium rounded-lg shadow-md cursor-pointer 
                            text-sm
                        "
                      onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                        joinChatRoom(
                          state.userName || "",
                          e.currentTarget.textContent || ""
                        )
                      }
                    >
                      {cr.chatRoomTitle}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  ref={userNameRef}
                  placeholder="Ange ditt användarnamn"
                  value={state.userName || ""}
                  onChange={(e) => actions.setUserName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />

                <input
                  type="text"
                  ref={chatRoomRef}
                  placeholder="Ange namn på nytt chattrum"
                  value={newChatRoom}
                  onChange={(e) => setNewChatRoom(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />

                <button
                  className="
                    w-full py-3 px-4 mt-2 
                    bg-green-500 hover:bg-green-600 
                    text-white font-semibold rounded-lg shadow-md 
                    transition duration-150 ease-in-out
                "
                  onClick={() => createChatRoom(state.userName || "")}
                >
                  Create new room
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
