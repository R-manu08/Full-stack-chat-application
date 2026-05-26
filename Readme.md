# Fullstack Chat Application

## Overview
This is a comprehensive, production-ready fullstack real-time chat application. Built using a modern React + Node.js MERN architecture, it allows users to communicate instantly. The project features secure authentication, real-time Socket.io messaging, intelligent AI replies powered by Gemini, theme customization, and an in-depth message status tracking system (Sent, Delivered, Seen).

---

## 🌟 Core Features

- **Real-Time Chatting:** Instant, bi-directional messaging between connected users.
- **AI-Powered Smart Replies:** Real-time generation of contextual reply suggestions using an external LLM API (Gemini). 
- **Secure Authentication:** JWT-based protection for all REST endpoints and user sessions.
- **Message Status Tracking:** Visual checkmarks mirroring typical chat apps (Sent ✓, Delivered ✓✓, Seen ✓✓).
- **WebRTC Video Calling:** High-performance, low-latency video calls between users using peer-to-peer technology.
- **Real-Time Typing Indicators:** Visual feedback telling you exactly when your friend is drafting a response.
- **Emoji Support:** Integrated emoji picker in the chat input for expressive communication.
- **Universal Mobile Invite:** QR code scan with adaptive IP detection and manual override for easy cross-device testing.
- **Profile Management:** Users can upload profile images (powered by Cloudinary).
- **Theme Customization:** Support for dynamic UI themes.

---

## 🛠️ Technology Stack Breakdown

### Frontend
Built to be responsive and user-friendly on both desktop and mobile networks.
- **React** (UI Framework)
- **Tailwind CSS & DaisyUI** (Styling & Component Library)
- **Axios** (API Requests)
- **Socket.io-client** (Real-time updates)

### Backend
A robust, secure, and horizontally scalable backend.
- **Node.js & Express.js** (REST API & Routing)
- **Socket.io** (WebSocket server)
- **MongoDB & Mongoose** (Database & ODM)

### AI Integration
- **Google Gemini API** (External LLM) to process incoming messages and instantly suggest exactly 3 short, natural, conversational reply options.

---

## 🚀 Project Milestones Complete
1. ✅ **Setup MERN stack architecture**
2. ✅ **Develop backend APIs and database**
3. ✅ **Implement Socket.io real-time chat**
4. ✅ **Integrate AI smart reply feature**
5. ✅ **Add WebRTC Video Calling & Emoji Support**
6. ✅ **Develop Real-Time Typing Indicators**
7. ✅ **Testing, debugging, and final documentation**

---

## 📦 Final Deliverables included in this Repository
- **Deployment-ready Chat Application**
- **Frontend Source Code** (`/frontend`)
- **Backend Source Code** (`/backend`)
- **Database Schema** (Inside `/backend/src/models`)
- **AI Integration Module** (`/backend/src/lib/gemini.js` & Smart Reply endpoints)
- **WebRTC Signaling & Video Modal** (`/frontend/src/store/useCallStore.jsx` & `/frontend/src/components/VideoModal.jsx`)
- **Project Documentation** (This README file)

---

## 💻 Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js (Latest LTS version)
- MongoDB (Local or Atlas instance)
- Cloudinary Account (For image uploads)
- Google Gemini API Key (For Smart Replies)

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the `backend` directory based on the `.env.example`. You will need `MONGODB_URI`, `JWT_SECRET`, `PORT`, Cloudinary credentials, and `GEMINI_API_KEY`.
4. Start the backend development server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend, which is configured to access your local network automatically:
```bash
npm run dev
```

---

## 📌 Usage
- **Sign Up/Log In**: Create a secure account to access the dashboard.
- **Explore Users**: Select users from the sidebar to chat.
- **AI Smart Replies**: If you receive a message from someone, observe the sparkle ✨ icon that pops up offering 3 smart LLM replies. Click one to send instantly.
- **Message States**: Watch the checkmarks change color and quantity as the recipient connects and opens the chat.
- **Network Mobile Test**: Use your local IP provided by the Vite frontend runner to open the app on your mobile device.

---

## 👥 Meet the Team & Contributors

The success of this project is driven by our talented core team:

| Profile | Name | Role | GitHub |
| :--- | :--- | :--- | :--- |
| ![Garv](https://github.com/Garvsidhwan01.png?size=40) | **Garv** | Backend & Security | [@Garvsidhwan01](https://github.com/Garvsidhwan01) |
| ![Arpit](https://github.com/arpsharma19.png?size=40) | **Arpit Dutt Sharma** | Frontend UI/UX | [@arpsharma19](https://github.com/arpsharma19) |
| ![Vaishali](https://github.com/vishurrrr.png?size=40) | **Vaishali** | API & Integration | [@vishurrrr](https://github.com/vishurrrr) |
| ![Ragini](https://github.com/R-manu08.png?size=40) | **Ragini** | Real-Time & AI | [@R-manu08](https://github.com/R-manu08) |

*For more detailed contribution history, see our [CONTRIBUTORS.md](./CONTRIBUTORS.md) file.*

---

## 🤝 Contributions
Feel free to fork this repository and submit a pull request if you'd like to help improve this project!

## 📄 License
This project is licensed under the MIT License.
