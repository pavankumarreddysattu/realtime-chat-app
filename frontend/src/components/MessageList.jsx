import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { Check, CheckCheck } from "lucide-react";

export const MessageList = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Auto-scroll to bottom whenever messages array updates
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="spinner mb-2"></div>
        <p className="text-sm text-slate-400">Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          No messages yet. Send a message to start the conversation!
        </div>
      ) : (
        messages.map((message) => {
          const isMyMessage = message.senderId === authUser._id;
          const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={message._id}
              className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-3.5 shadow-sm text-sm space-y-1.5 ${
                  isMyMessage
                    ? "bg-indigo-600 text-white rounded-br-xs"
                    : "bg-slate-800/90 text-slate-100 border border-white/10 rounded-bl-xs"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-full rounded-lg max-h-60 object-cover"
                  />
                )}
                {message.text && <p className="leading-relaxed break-words">{message.text}</p>}

                <div
                  className={`flex items-center justify-end gap-1.5 text-[10px] ${
                    isMyMessage ? "text-indigo-200" : "text-slate-400"
                  }`}
                >
                  <span>{formattedTime}</span>

                  {/* Delivery status checkmarks for sent messages */}
                  {isMyMessage && (
                    <span title={message.delivered ? "Delivered" : "Sent"}>
                      {message.delivered ? (
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Check className="w-3.5 h-3.5 opacity-70" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messageEndRef} />
    </div>
  );
};
