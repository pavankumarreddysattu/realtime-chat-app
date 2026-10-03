import React from "react";
import { MessageSquare } from "lucide-react";

export const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-900/20">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 animate-bounce">
        <MessageSquare className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-100 mb-1">Welcome to RealTime Chat!</h2>
      <p className="text-sm text-slate-400 max-w-sm">
        Select a contact from the sidebar to start messaging in real-time.
      </p>
    </div>
  );
};
