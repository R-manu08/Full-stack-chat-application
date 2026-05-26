import { X, Video, Phone } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useCallStore } from "../store/useCallStore.jsx";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { startCall } = useCallStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium flex items-center gap-2">
              {selectedUser.fullName}
              {selectedUser._id === "000000000000000000000001" && (
                <span className="badge badge-primary badge-sm font-bold">AI</span>
              )}
            </h3>
            <p className="text-sm text-base-content/70">
              {selectedUser._id === "000000000000000000000001" ? "Ask me anything!" : (onlineUsers.includes(selectedUser._id) ? "Online" : "Offline")}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              console.log("Video button clicked for user:", selectedUser?._id);
              startCall(selectedUser._id);
            }}
            className="text-base-content/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-base-200"
            title="Start Video Call"
          >
            <Video className="size-5" />
          </button>
          <button 
            className="text-base-content/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-base-200"
            title="Start Voice Call"
          >
            <Phone className="size-5" />
          </button>
          
          <div className="h-6 w-px bg-base-300 mx-1" />

          <button 
            onClick={() => setSelectedUser(null)}
            className="p-2 rounded-full hover:bg-base-200 transition-colors"
          >
            <X className="size-5 text-base-content/70 hover:text-error" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;