import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import { Sidebar } from "../components/Sidebar.jsx";
import { ChatHeader } from "../components/ChatHeader.jsx";
import { MessageList } from "../components/MessageList.jsx";
import { MessageInput } from "../components/MessageInput.jsx";
import { NoChatSelected } from "../components/NoChatSelected.jsx";

export const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[calc(100vh-6rem)] max-w-7xl mx-auto px-4 flex gap-4">
      <Sidebar />

      <main className="flex-1 glass-container flex flex-col overflow-hidden">
        {selectedUser ? (
          <>
            <ChatHeader />
            <MessageList />
            <MessageInput />
          </>
        ) : (
          <NoChatSelected />
        )}
      </main>
    </div>
  );
};
