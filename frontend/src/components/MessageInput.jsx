import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { Send, Image, X } from "lucide-react";

export const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSendingMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    await sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    removeImage();
  };

  return (
    <div className="p-3 border-t border-white/10 bg-slate-900/40">
      {/* Image Preview Container */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-white/20"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2.5 rounded-xl transition-colors ${
            imagePreview ? "text-indigo-400 bg-indigo-500/20" : "text-slate-400 hover:bg-white/10"
          }`}
          title="Attach Image"
        >
          <Image className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-field text-sm flex-1 py-2.5"
        />

        <button
          type="submit"
          disabled={(!text.trim() && !imagePreview) || isSendingMessage}
          className="btn-primary p-2.5 rounded-xl"
          title="Send message"
        >
          {isSendingMessage ? <div className="spinner w-4 h-4" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};
