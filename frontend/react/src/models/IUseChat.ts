import type { SetStateAction } from "react";

export interface ChatMessage {
  userName: string;
  message: string;
}

export interface ChatRoom {
  chatRoomTitle: string;
}

export interface SignalRState {
  messages: ChatMessage[];
  chatRooms: ChatRoom[];
  chatRoom: string | null;
  userName: string | null;
  isConnected: boolean;
}

export interface SignalRActions {
  joinChatRoom: (room: string) => Promise<void>;
  leaveChatRoom: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  setUserName: React.Dispatch<SetStateAction<string>>;
  clearChatHistory: () => void;
}
