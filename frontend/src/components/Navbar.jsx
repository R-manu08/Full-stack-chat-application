import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Share2, X } from "lucide-react";
import QRCode from "react-qr-code";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showQRModal, setShowQRModal] = useState(false);
  const [networkUrl, setNetworkUrl] = useState("");

  const handleShareClick = async () => {
    setShowQRModal(true);
    setNetworkUrl(""); // Reset while loading
    try {
      const res = await axiosInstance.get("/auth/network-ip");
      setNetworkUrl(`http://${res.data.ip}:5173/signup`);
    } catch (err) {
      console.error("Error fetching IP", err);
      setNetworkUrl(`http://localhost:5173/signup`);
    }
  };

  return (
    <>
      <header
        className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Convo</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <button
                  onClick={handleShareClick}
                  className="btn btn-sm gap-2 transition-colors bg-primary/10 text-primary hover:bg-primary/20 border-none"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Invite Friend</span>
                </button>

                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>

      {/* QR Code Modal Overlay */}
      {showQRModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-base-100 rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-xl">Invite to Convo!</h3>
                <p className="text-sm text-base-content/70 mt-1">Scan to chat on your phone</p>
              </div>
              <button 
                onClick={() => setShowQRModal(false)}
                className="btn btn-circle btn-ghost btn-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl aspect-square w-full shadow-inner">
              {networkUrl ? (
                <QRCode value={networkUrl} size={200} fgColor="#000000" bgColor="#ffffff" />
              ) : (
                <div className="loading loading-spinner loading-lg text-primary"></div>
              )}
            </div>

            {networkUrl && (
              <div className="mt-6">
                <p className="text-center text-xs font-mono bg-base-200 p-2 rounded-lg truncate text-base-content/70">
                  {networkUrl}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;