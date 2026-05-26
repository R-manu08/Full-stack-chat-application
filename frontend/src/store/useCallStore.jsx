import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useCallStore = create((set, get) => ({
    localStream: null,
    remoteStream: null,
    isCalling: false,
    isInCall: false,
    incomingCall: null, // { from: userId, signalData: offer }
    peerConnection: null,

    startCall: async (receiverId) => {
        console.log("Starting call to:", receiverId);
        try {
            const socket = useAuthStore.getState().socket;
            if (!socket) {
                toast.error("Socket not connected");
                return;
            }

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            });

            console.log("Requesting camera access...");
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            console.log("Camera access granted!");
            stream.getTracks().forEach(track => pc.addTrack(track, stream));

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("ice-candidate", { to: receiverId, candidate: event.candidate });
                }
            };

            pc.ontrack = (event) => {
                console.log("Remote track received");
                set({ remoteStream: event.streams[0] });
            };

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            socket.emit("call-user", { to: receiverId, offer });
            console.log("Call offer sent!");

            set({ localStream: stream, peerConnection: pc, isCalling: true, isInCall: false });
        } catch (error) {
            console.error("Call failed:", error);
            toast.error("Could not start call: " + error.message);
        }
    },

    handleIncomingCall: (from, offer) => {
        set({ incomingCall: { from, signalData: offer } });
        toast((t) => (
            <div className="flex items-center gap-4">
              <span>Incoming call...</span>
              <button 
                className="btn btn-xs btn-success"
                onClick={() => {
                  get().acceptCall();
                  toast.dismiss(t.id);
                }}
              >
                Accept
              </button>
              <button 
                className="btn btn-xs btn-error"
                onClick={() => {
                  get().declineCall();
                  toast.dismiss(t.id);
                }}
              >
                Decline
              </button>
            </div>
          ), { duration: Infinity });
    },

    acceptCall: async () => {
        console.log("Accepting call...");
        try {
            const { incomingCall } = get();
            if (!incomingCall) {
                console.error("No incoming call to accept");
                return;
            }

            const socket = useAuthStore.getState().socket;

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            });

            console.log("Requesting camera access (receiver)...");
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            stream.getTracks().forEach(track => pc.addTrack(track, stream));

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("ice-candidate", { to: incomingCall.from, candidate: event.candidate });
                }
            };

            pc.ontrack = (event) => {
                console.log("Remote track received (at receiver)");
                set({ remoteStream: event.streams[0] });
            };

            console.log("Setting remote description...");
            await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signalData));
            
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            socket.emit("answer-call", { to: incomingCall.from, answer });
            console.log("Answer sent!");

            set({ localStream: stream, peerConnection: pc, isInCall: true, incomingCall: null });
        } catch (error) {
            console.error("Failed to accept call:", error);
            toast.error("Failed to accept call: " + error.message);
        }
    },

    declineCall: () => {
        const { incomingCall } = get();
        const socket = useAuthStore.getState().socket;
        socket.emit("decline-call", { to: incomingCall.from });
        set({ incomingCall: null });
    },

    handleAnswer: async (answer) => {
        console.log("Remote answer received, setting remote description...");
        try {
            const { peerConnection } = get();
            if (!peerConnection) {
                console.error("Peer connection not found during answer");
                return;
            }
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            console.log("Remote description set successfully!");
            set({ isInCall: true, isCalling: false });
        } catch (error) {
            console.error("Failed to handle remote answer:", error);
            toast.error("Handshake failed: " + error.message);
        }
    },

    handleIceCandidate: async (candidate) => {
        const { peerConnection } = get();
        if (peerConnection) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
    },

    endCall: () => {
        const { peerConnection, localStream } = get();
        if (peerConnection) peerConnection.close();
        if (localStream) localStream.getTracks().forEach(track => track.stop());
        set({
            peerConnection: null,
            localStream: null,
            remoteStream: null,
            isCalling: false,
            isInCall: false,
            incomingCall: null
        });
    }
}));
