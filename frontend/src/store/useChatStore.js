import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            const authUser = useAuthStore.getState().authUser;
            const filteredUsers = res.data.filter(user => user._id !== authUser?._id);
            set({ users: filteredUsers });

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    // deleteMessage: async (messageId) => {
    //     const { SelectedUser, messages } = get();
    //     try {
    //         const res = await axiosInstance.delete(`/messages/delete/${messageId}`)
    //         set({messages: message.filter(message => message._id !== messageId)})
    //         toast.success("Message deleted succesfully");
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     }

    // },

    markMessagesAsSeen: async (userId) => {
        try {
            await axiosInstance.put(`/messages/mark-seen/${userId}`);
            // Optimistically update UI
            set((state) => ({
                messages: state.messages.map(msg => 
                    (msg.senderId === userId && msg.status !== 'seen') ? { ...msg, status: 'seen' } : msg
                )
            }));
        } catch (error) {
            console.error("Failed to mark messages as seen", error);
        }
    },

    subscribeToMessages: () => {
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentMesageFromSelectedUser = newMessage.senderId === selectedUser._id
            if (!isMessageSentMesageFromSelectedUser) return;
            set({ messages: [...get().messages, newMessage] });
        });

        socket.on("messagesSeen", ({ receiverId }) => {
            if (selectedUser._id === receiverId) {
                set((state) => ({
                    messages: state.messages.map(msg => 
                        (msg.receiverId === receiverId) ? { ...msg, status: 'seen' } : msg
                    )
                }));
            }
        });

        socket.on("messagesDelivered", ({ receiverId }) => {
            if (selectedUser._id === receiverId) {
                set((state) => ({
                    messages: state.messages.map(msg => 
                        (msg.receiverId === receiverId && msg.status === 'sent') ? { ...msg, status: 'delivered' } : msg
                    )
                }));
            }
        });
    },

    unsubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
        socket.off("messagesSeen");
        socket.off("messagesDelivered");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
