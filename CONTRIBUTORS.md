# 👥 Contributors

Thank you to all the amazing team members who made this Full-Stack Chat Application possible!

---

## 🌟 **Core Team Members**

### 👨‍💼 **Garv** - Backend Database & Security Architect
**Role:** Database Design & Security Implementation

**Contributions:**
- ✅ MongoDB Schema Design (Users & Messages)
- ✅ Database Security Implementation
  - Password hashing with Bcryptjs
  - MongoDB injection prevention
  - XSS protection
  - HTTP Parameter Pollution prevention
  - Security headers (Helmet.js)
- ✅ MongoDB Memory Server fallback system
- ✅ Connection retry logic & error handling
- ✅ Database indexing for performance

**Technologies:** MongoDB, Mongoose, Bcryptjs, Helmet, express-mongo-sanitize

---

### 🎨 **Arpit** - Frontend UI/UX Developer
**Role:** User Interface & User Experience Design

**Contributions:**
- ✅ **Authentication Pages**
  - Login page with validation
  - Sign up page with error handling
  - Password visibility toggle
  - Loading states with spinners
  
- ✅ **Chat Interface Components**
  - ChatContainer with real-time message display
  - MessageInput with image upload
  - ChatHeader with user information
  - Sidebar with contact list
  - Online/offline status indicators
  
- ✅ **UI Elements**
  - NoChatSelected component
  - Message skeletons for loading
  - Sidebar skeletons
  - Navbar navigation
  
- ✅ **Design System**
  - Dark/Light theme toggle
  - Responsive Tailwind CSS styling
  - DaisyUI component integration
  - Lucide React icons
  - Beautiful gradients and animations

**Technologies:** React, Tailwind CSS, DaisyUI, Lucide React, React Router

---

### 🔧 **Vaishali** - Backend API Development & Integration
**Role:** REST API Development & Third-Party Integration

**Contributions:**
- ✅ **Authentication API Routes**
  - POST `/api/auth/signup` - User registration
  - POST `/api/auth/login` - User authentication
  - POST `/api/auth/logout` - Session termination
  - PUT `/api/auth/update-profile` - Profile updates
  - GET `/api/auth/check` - Auth verification
  
- ✅ **Message API Routes**
  - GET `/api/messages/users` - Fetch all users
  - GET `/api/messages/:id` - Get conversation history
  - POST `/api/messages/send/:id` - Send messages
  - GET `/api/messages/smart-replies` - AI suggestions
  
- ✅ **Controller Logic**
  - User authentication flow
  - Message CRUD operations
  - User search functionality
  - Error handling & validation
  - Response formatting
  
- ✅ **Middleware**
  - JWT token verification
  - Request authentication
  - CORS configuration
  - Rate limiting
  
- ✅ **Integration**
  - Cloudinary image upload handling
  - Base64 image conversion
  - Secure URL generation

**Technologies:** Express.js, Mongoose, JWT, Cloudinary, Axios

---

### 🚀 **Ragini** - Real-Time Communication & AI Integration
**Role:** WebSocket Implementation & AI Features

**Contributions:**
- ✅ **Socket.io Real-Time Messaging**
  - WebSocket connection setup
  - User connection/disconnection handling
  - Socket ID to user ID mapping
  - Online users tracking
  - Real-time event broadcasting (`newMessage`, `getOnlineUsers`)
  - CORS configuration for Socket.io
  
- ✅ **AI Bot Integration (Talksy AI)**
  - Context-aware response engine
  - 20+ joke generation
  - Emergency detection & routing (100/102/101)
  - Greeting recognition
  - Human-like conversation style
  - Follow-up questions & engagement
  - Natural response timing
  
- ✅ **Frontend Enhancements**
  - Image carousel with auto-rotation
  - Navigation buttons & dot indicators
  - Fixed CORS issues for port 5176/5173
  - Increased payload limit (50MB for images)
  - AuthImagePattern carousel component
  
- ✅ **Application Startup**
  - Environment variable validation
  - Server initialization
  - Database connection management
  - Error logging & monitoring
  
- ✅ **Testing & Deployment**
  - Application testing & debugging
  - Git integration & commits
  - Documentation updates
  - Production readiness

**Technologies:** Socket.io, HuggingFace API, Express.js, React, Environment Management

---

### 👥 **All Members** - Project Setup & Planning
**Contributions:**
- ✅ Project structure & planning
- ✅ Git repository initialization
- ✅ Package.json configuration
- ✅ Environment setup (.env files)
- ✅ Dependency management
- ✅ Local development setup
- ✅ Testing & debugging
- ✅ Deployment configuration

---

## 📊 **Contribution Summary**

| Contributor | Role | Files | Lines of Code |
|-------------|------|-------|---------------|
| **Garv** | Database & Security | 3 | ~400 |
| **Arpit** | Frontend UI/UX | 15 | ~1500 |
| **Vaishali** | Backend API | 8 | ~700 |
| **Ragini** | Real-Time & AI | 5 | ~800 |
| **All** | Project Setup | 5 | ~600 |
| **TOTAL** | - | **36+** | **~4000** |

---

## 🎯 **Key Features Implemented**

| Feature | Lead | Status |
|---------|------|--------|
| User Authentication | Vaishali | ✅ Complete |
| Real-Time Messaging | Ragini | ✅ Complete |
| AI Chat Bot | Ragini | ✅ Complete |
| Database Design | Garv | ✅ Complete |
| Security | Garv | ✅ Complete |
| UI/UX Design | Arpit | ✅ Complete |
| Image Upload | Vaishali | ✅ Complete |
| Theme System | Arpit | ✅ Complete |
| Error Handling | All | ✅ Complete |
| Deployment | Ragini | ✅ Complete |

---

## 🛠️ **Technology Stack**

### **Frontend**
- React 18, Vite, Tailwind CSS, DaisyUI, Socket.io-client, Zustand, Axios, Lucide React

### **Backend**
- Node.js, Express.js, MongoDB, Mongoose, Socket.io, JWT, Bcryptjs, Cloudinary

### **Infrastructure**
- MongoDB Memory Server, HuggingFace API, Helmet, CORS, Rate Limiting

---

## 📝 **How to Contribute**

We welcome contributions to improve this project! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 📄 **License**

This project is open source and available under the MIT License.

---

## 🙏 **Acknowledgments**

- Special thanks to all team members for their dedication and effort
- Thanks to the open-source community for amazing libraries
- Google Generative AI & HuggingFace for AI capabilities
- Cloudinary for image storage
- All contributors who helped debug and improve the application

---

## 📞 **Contact**

For questions or suggestions about contributors, please reach out to the team!

**Project Repository:** [Full-Stack Chat Application](https://github.com/R-manu08/Full-stack-chat-application)

---

**Last Updated:** April 1, 2026
**Total Contributors:** 4
**Project Status:** ✅ Production Ready
