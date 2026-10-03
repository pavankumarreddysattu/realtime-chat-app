import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageSquare, LogOut, User } from "lucide-react";

export const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="glass-container sticky top-0 z-40 px-6 py-3.5 mb-4 flex items-center justify-between border-b border-white/10 rounded-none border-t-0 border-x-0">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          RealTime Chat
        </h1>
      </div>

      {authUser && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-full border border-white/10 text-sm">
            <User className="w-4 h-4 text-indigo-400" />
            <span className="font-medium text-slate-200">{authUser.fullName}</span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-rose-500/20"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};
