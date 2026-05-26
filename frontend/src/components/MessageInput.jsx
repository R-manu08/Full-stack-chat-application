import React, { useRef, useState, useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [smartReplies, setSmartReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const { sendMessage, messages, selectedUser, setTyping } = useChatStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Fetch smart replies when the last received message changes
  useEffect(() => {
    if (!messages || messages.length === 0 || !selectedUser) return;

    const lastMsg = messages[messages.length - 1];
    // Only generate smart replies for messages received from others
    const authUser = JSON.parse(localStorage.getItem("chat-user") || "{}");
    if (lastMsg.senderId === authUser._id) {
      setSmartReplies([]);
      return;
    }

    if (!lastMsg.text) {
      setSmartReplies([]);
      return;
    }

    const fetchSmartReplies = async () => {
      setLoadingReplies(true);
      try {
        const res = await axiosInstance.get(
          `/messages/smart-replies?message=${encodeURIComponent(lastMsg.text)}`
        );
        setSmartReplies(res.data.suggestions || []);
      } catch {
        setSmartReplies([]);
      } finally {
        setLoadingReplies(false);
      }
    };

    fetchSmartReplies();
  }, [messages, selectedUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload =() => {
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
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      setSmartReplies([]);
      if(fileInputRef.current) fileInputRef.current.value = ""; 
      
      // Stop typing indicator on send
      setTyping(false);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    
    // Typing indicator logic
    setTyping(true);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
    }, 3000);
  };

  const handleSmartReplyClick = async (reply) => {
    try {
      await sendMessage({ text: reply, image: null });
      setSmartReplies([]);
      setText("");
    } catch (error) {
      console.error("Failed to send smart reply", error);
    }
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="p-4 w-full">
      {/* Smart Reply Chips */}
      {(smartReplies.length > 0 || loadingReplies) && (
        <div className="mb-3 flex flex-wrap gap-2 items-center">
          <Sparkles size={14} className="text-primary opacity-70" />
          {loadingReplies ? (
            <span className="text-xs text-zinc-400 animate-pulse">Generating smart replies...</span>
          ) : (
            smartReplies.map((reply, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSmartReplyClick(reply)}
                className="btn btn-xs btn-outline btn-primary rounded-full text-xs px-3 py-1 hover:scale-105 transition-transform"
              >
                {reply}
              </button>
            ))
          )}
        </div>
      )}

      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative">
        <div className="flex-1 flex gap-2 items-center">
          <div className="relative">
            <button
              type="button"
              className="btn btn-sm btn-ghost btn-circle text-zinc-400"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={20} />
            </button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker 
                  onEmojiClick={onEmojiClick} 
                  theme="dark"
                  skinTonesDisabled
                  searchDisabled
                  height={350}
                  width={300}
                />
              </div>
            )}
          </div>

          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
