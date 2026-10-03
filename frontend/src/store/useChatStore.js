import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  error: null,

  getUsers: async () => {
    set({ isUsersLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to load users" });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to load messages" });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    set({ isSendingMessage: true, error: null });
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to send message" });
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Listen for incoming messages in real-time
    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (isMessageFromSelectedUser) {
        set({ messages: [...get().messages, newMessage] });

        // Emit delivery acknowledgement back to server
        socket.emit("messageDelivered", {
          messageId: newMessage._id,
          senderId: newMessage.senderId,
        });
      }
    });

    // Listen for message delivery acknowledgements
    socket.on("messageDelivered", ({ messageId }) => {
      set({
        messages: get().messages.map((msg) =>
          msg._id === messageId ? { ...msg, delivered: true } : msg
        ),
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.off("messageDelivered");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
