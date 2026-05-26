import { useCallStore } from "../store/useCallStore.jsx";
import { X, MicOff, Mic, VideoOff, Video, PhoneOff } from "lucide-react";
import { useEffect, useRef } from "react";

const VideoModal = () => {
    const { localStream, remoteStream, isInCall, isCalling, endCall } = useCallStore();
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    if (!localStream && !isInCall && !isCalling) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-4xl aspect-video bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                {/* Remote Video (Full Screen) */}
                <div className="flex-1 relative bg-black flex items-center justify-center">
                    {remoteStream ? (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-4 animate-pulse">
                            <div className="size-24 rounded-full bg-zinc-800 flex items-center justify-center">
                                <Video className="size-10 text-zinc-600" />
                            </div>
                            <p className="text-zinc-500 font-medium">Waiting for participant...</p>
                        </div>
                    )}

                    {/* Local Video (Floating) */}
                    <div className="absolute bottom-6 right-6 w-1/4 aspect-video bg-zinc-800 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl overflow-hidden z-10">
                        {localStream ? (
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <VideoOff className="size-6 text-zinc-600" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="h-24 bg-zinc-900/50 flex items-center justify-center gap-6">
                    <button className="btn btn-circle btn-ghost bg-zinc-800 hover:bg-zinc-700 text-white">
                        <Mic className="size-6" />
                    </button>
                    <button className="btn btn-circle btn-ghost bg-zinc-800 hover:bg-zinc-700 text-white">
                        <Video className="size-6" />
                    </button>
                    <button 
                        onClick={endCall}
                        className="btn btn-circle btn-error hover:scale-110 transition-transform shadow-lg shadow-error/20"
                    >
                        <PhoneOff className="size-6 text-white" />
                    </button>
                </div>

                {/* Close Button (Top Right) */}
                <button 
                    onClick={endCall}
                    className="absolute top-6 right-6 btn btn-circle btn-sm btn-ghost bg-black/20 hover:bg-black/40 text-white border-none"
                >
                    <X className="size-5" />
                </button>
            </div>
        </div>
    );
};

export default VideoModal;
