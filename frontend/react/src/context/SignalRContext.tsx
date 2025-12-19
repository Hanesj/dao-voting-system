import { createContext, useContext, useEffect, useState } from "react";
import * as SignalR from "@microsoft/signalr";
import type {
  ChatMessage,
  ChatRoom,
  SignalRActions,
  SignalRState,
} from "../models/IUseChat";

export interface SignalRContextValue {
  state: SignalRState;
  actions: SignalRActions;
}

const SignalRContext = createContext<SignalRContextValue | undefined>(
  undefined
);

export const SignalRProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<string>("");
  //   const [loading, setLoading] = useState<boolean>(false);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [newChatRoom, setNewChatRoom] = useState<string>("");

  useEffect(() => {
    const connectSignalR = async () => {
      const newConnection = new SignalR.HubConnectionBuilder()
        .withUrl("http://localhost:5037/chathub")
        .withAutomaticReconnect()
        .build();

      newConnection.on(
        "ReceiveRooms",
        (numOfRooms: number, roomNames: ChatRoom[]) => {
          console.log(
            `Num of rooms: ${numOfRooms}, roomnames:\n${roomNames.map(
              (r) => r.chatRoomTitle
            )}`
          );
          setChatRooms(roomNames);
        }
      );
      newConnection.on("ReceiveMessage", (userName, message) => {
        console.log(`Message: ${message} from userName: ${userName}`);
        setMessages((prevMessages) => [...prevMessages, { userName, message }]);
      });
      newConnection.on("ReceiveHistory", (prevChats) => {
        console.log(`${JSON.stringify(prevChats)}`);
        setMessages([
          { userName: "admin", message: "Welcome to the chatroom." },
          ...prevChats,
        ]);
      });
      newConnection.on("NewPollReceived", (poll) => {
        console.log(JSON.stringify(poll));
      });

      await newConnection.start();
      await newConnection.invoke("AllChatRooms");
      setConnection(newConnection);
      setIsConnected(true);
    };
    connectSignalR();
  }, []);

  const joinChatRoom = async (chatRoom: string) => {
    if (connection) {
      await connection.invoke("JoinChatRoom", userName, chatRoom);
      setChatRoom(chatRoom);
    }
  };

  const sendMessage = async (newMessage: string) => {
    if (connection) {
      await connection.invoke("SendMessage", userName, newMessage, chatRoom);
    }
  };

  const clearChatHistory = () => {
    setMessages([]);
  };

  const leaveChatRoom = async () => {
    setChatRoom("");
    if (connection) {
      await connection.invoke("AllChatRooms");
    }
  };

  const state = {
    connection,
    messages,
    chatRooms,
    userName,
    chatRoom,
    isConnected,
  };

  const actions = {
    joinChatRoom,
    sendMessage,
    leaveChatRoom,
    setUserName,
    clearChatHistory,
  };

  const values = {
    state,
    actions,
  };

  return (
    <SignalRContext.Provider value={values}>{children}</SignalRContext.Provider>
  );
};
export const useSignalRContext = () => {
  const context = useContext(SignalRContext);
  if (context === undefined) {
    throw new Error("useSignalRContext needs to be used inside provider.");
  }
  return context;
};
