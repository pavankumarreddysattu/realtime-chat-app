import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { Users, Search } from "lucide-react";

export const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [search, setSearch] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true));

  if (isUsersLoading) {
    return (
      <aside className="w-full md:w-80 h-[calc(100vh-6rem)] glass-container flex flex-col items-center justify-center p-4">
        <div className="spinner mb-2"></div>
        <p className="text-sm text-slate-400">Loading contacts...</p>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-80 h-[calc(100vh-6rem)] glass-container flex flex-col overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Contacts</span>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">
            {users.length}
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field text-sm pl-9 py-2"
          />
        </div>

        {/* Show Online Only Toggle */}
        <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
          <input
            type="checkbox"
            id="onlineFilter"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="rounded border-slate-700 text-indigo-500 focus:ring-indigo-500 bg-slate-900 cursor-pointer"
          />
          <label htmlFor="onlineFilter" className="cursor-pointer select-none">
            Show online only ({onlineUsers.length > 0 ? onlineUsers.length - 1 : 0} online)
          </label>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No contacts found
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;

            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-150 text-left ${
                  isSelected
                    ? "bg-indigo-600/30 border border-indigo-500/40 text-white"
                    : "hover:bg-slate-800/50 text-slate-300 border border-transparent"
                }`}
              >
                {/* Avatar with Online indicator dot */}
                <div className="relative flex-shrink-0">
                  <img
                    src={user.profilePic || `https://api.dicebear.com/7.x/bottts/svg?seed=${user._id}`}
                    alt={user.fullName}
                    className="w-11 h-11 rounded-full object-cover bg-slate-800 border border-white/10"
                  />
                  <span
                    className={`absolute bottom-0 right-0 ${
                      isOnline ? "online-dot" : "offline-dot"
                    }`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm truncate">{user.fullName}</h3>
                  <p className="text-xs text-slate-400 truncate">
                    {isOnline ? (
                      <span className="text-emerald-400 font-medium">Online</span>
                    ) : (
                      "Offline"
                    )}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
