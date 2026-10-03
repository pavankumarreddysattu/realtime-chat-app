import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { X } from "lucide-react";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-slate-900/40">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser.profilePic || `https://api.dicebear.com/7.x/bottts/svg?seed=${selectedUser._id}`}
            alt={selectedUser.fullName}
            className="w-10 h-10 rounded-full object-cover bg-slate-800 border border-white/10"
          />
          <span className={`absolute bottom-0 right-0 ${isOnline ? "online-dot" : "offline-dot"}`} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-100 text-sm">{selectedUser.fullName}</h3>
          <p className="text-xs text-slate-400">
            {isOnline ? <span className="text-emerald-400 font-medium">Online</span> : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        title="Close chat"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
