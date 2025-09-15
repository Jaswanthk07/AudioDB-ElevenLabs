# AudioDB - Multi-Language Audio Management System
>**"Seamless Audio. Universal Languages. Infinite Possibilities."**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A modern full-stack application for managing and serving multi-language audio files. This RESTful API system provides robust audio file management capabilities with a clean, responsive frontend interface.

## 🌟 Overview

**AudioDB** is an audio management platform that empowers developers and content creators to organize, serve, and play audio files across multiple languages. The application combines a **modern React frontend** with a **powerful Node.js backend**, creating a marketing-ready, responsive, and highly interactive web application.

This project demonstrates advanced full-stack development skills with production-ready architecture, creating a comprehensive audio management solution suitable for enterprise-level applications.

## ✨ Key Features

### 🎵 Advanced Audio Management
- **Multi-language audio file support** with 4 languages (English, Arabic, Russian, Japanese)
- **RESTful API architecture** with comprehensive CRUD operations
- **Metadata-rich storage** including duration, file size, quality metrics, and sample rates
- **Intelligent audio organization** with language-based categorization and search

### 🎯 Interactive Frontend Components
- **Audio Player Interface**: HTML5 audio controls with custom progress bars and time tracking
- **Language Selector**: Dropdown with native language names, flags, and country codes
- **Download Manager**: Direct audio file downloads with proper file naming
- **Real-time Feedback**: Loading states, error handling, and success notifications
- **Responsive Design**: Mobile-first approach with adaptive layouts across all devices

### 🔧 Backend Infrastructure
- **Express.js Server**: Fast, scalable API with middleware for security and rate limiting
- **MongoDB Integration**: Flexible document storage with Mongoose ODM for data validation
- **CORS Configuration**: Cross-origin support for frontend-backend communication
- **Security Middleware**: Helmet protection, rate limiting, and input sanitization
- **Environment Management**: Configurable settings for development and production

### 📱 User Experience Excellence
- **Intuitive Navigation**: Tab-based interface with smooth transitions
- **Audio Visualization**: Progress bars, time displays, and playback controls
- **Error Recovery**: Graceful handling of network issues and invalid requests
- **Performance Optimization**: Efficient data loading and caching strategies

## 🎨 Design System

### Visual Identity
The design system emphasizes clarity, accessibility, and modern aesthetics:

- **Clean Interface**: Minimalist design with focus on functionality
- **Glassmorphism Effects**: Subtle transparency and blur effects for modern appeal
- **Responsive Typography**: Scalable text hierarchy optimized for all screen sizes
- **Interactive Elements**: Hover states, transitions, and visual feedback

### Color Palette
```css
:root {
  --primary: hsl(220, 100%, 50%);      /* Professional Blue */
  --secondary: hsl(150, 80%, 45%);     /* Success Green */
  --accent: hsl(280, 100%, 70%);       /* Highlight Purple */
  --background: hsl(0, 0%, 98%);       /* Clean White */
  --text: hsl(220, 15%, 20%);          /* Dark Gray */
}
```

### Typography
- **Primary Font**: Inter with system font fallbacks
- **Headings**: Bold, clear hierarchy (text-2xl to text-5xl)
- **Body Text**: Readable contrast ratios with proper line spacing
- **Code Elements**: Monospace font for technical content

### Responsive Breakpoints
- **Mobile**: 640px and below
- **Tablet**: 768px to 1023px
- **Desktop**: 1024px to 1279px
- **Large Desktop**: 1280px and above

## 🛠️ Technical Stack

### Frontend Technology
- **React 18.3.1** with **TypeScript** for type-safe component development
- **Vite 5.0** for lightning-fast development and optimized production builds
- **Tailwind CSS 3.4.11** for utility-first styling and consistent design tokens
- **React Query** for efficient server state management and caching

### Backend Architecture
- **Node.js 18+** runtime environment with ES modules support
- **Express.js 4.18.2** web framework with middleware ecosystem
- **MongoDB 7.0** document database with Atlas cloud deployment
- **Mongoose ODM** for schema validation and data modeling

### Development Tools
- **ESLint + Prettier** for code quality and consistent formatting
- **TypeScript Strict Mode** for comprehensive type checking
- **Git Hooks** for pre-commit quality assurance
- **Environment Variables** for secure configuration management

### API & Networking
- **RESTful API Design** following industry best practices
- **JSON Response Format** with consistent error handling
- **CORS Middleware** for secure cross-origin requests
- **Rate Limiting** for API protection and fair usage

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **MongoDB** (Local installation or MongoDB Atlas account)
- **Git** for version control
- **Modern web browser** with ES6+ support

### Quick Installation

```bash
# Clone the repository
git clone https://github.com/Jaswanthk07/AudioDB-ElevenLabs.git
cd AudioDB-ElevenLabs

# Backend setup
cd audiodb-backend
npm install
npm run dev

# Frontend setup (new terminal)
cd ../audiodb-frontend
npm install
npm run dev
```

### Environment Configuration

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=MONGODB_URI=mongodb+srv://yourdbusername:yourdbpassword@yourcluster.mongodb.net/yourdbname?retryWrites=true&w=majority
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:5173;http://localhost:8080/
```

**Frontend (.env)**
```env
VITE_API_BASE_URL= http://localhost:8080/
VITE_APP_NAME=AudioDB
VITE_APP_VERSION=1.0.0
```

### Database Seeding

```bash
# Initialize database with sample audio files
cd audiodb-backend
node scripts/seedDatabase.js
```

## 📁 Project Architecture

```
AudioDB-ElevenLabs/
├── audiodb-frontend/               # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── TextToSpeech.tsx          # Main audio interface
│   │   │   ├── TabNavigation.tsx         # Navigation component
│   │   │   └── ui/                       # Shadcn/UI components
│   │   ├── pages/                     # Application pages
│   │   │   ├── Index.tsx                 # Landing page
│   │   │   └── NotFound.tsx              # 404 error page
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── lib/                       # Utility functions
│   │   ├── services/                  # API service layer
│   │   ├── App.tsx                    # Root component
│   │   └── main.tsx                   # Application entry point
│   ├── public/                        # Static assets
│   ├── package.json                   # Frontend dependencies
│   ├── vite.config.ts                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS config
│   └── tsconfig.json                  # TypeScript configuration
│
├── audiodb-backend/                # Node.js + Express Backend
│   ├── config/
│   │   └── database.js                # MongoDB connection setup
│   ├── models/
│   │   └── Audio.js                   # Audio data model with Mongoose
│   ├── routes/
│   │   └── audioRoutes.js             # RESTful API endpoints
│   ├── scripts/
│   │   └── seedDatabase.js            # Database initialization script
│   ├── middleware/                    # Custom middleware functions
│   ├── utils/                         # Helper utilities
│   ├── server.js                      # Express server configuration
│   ├── package.json                   # Backend dependencies
│   └── .env                           # Environment variables
│
├── docs/                           # Documentation files
├── README.md                       # Project documentation
└── LICENSE                         # MIT license file
```

## 🌐 API Documentation

### Core Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/` | Health check and API status | Server information |
| `GET` | `/api/audio-files` | Retrieve all audio files | Complete audio catalog |
| `GET` | `/api/audio-files/:language` | Get audio by language code | Single language data |
| `GET` | `/api/languages` | List available languages | Language metadata |
| `POST` | `/api/audio-files` | Upload new audio file | Creation confirmation |
| `PUT` | `/api/audio-files/:language` | Update existing audio | Update confirmation |
| `DELETE` | `/api/audio-files/:language` | Remove audio file | Deletion confirmation |
| `GET` | `/api/health` | Detailed system health | System status metrics |


## 🎵 Supported Languages & Features

### Language Support Matrix

| Language | Code | Flag | Native Name | Audio Status | File Format | Duration |
|----------|------|------|-------------|--------------|-------------|----------|
| English | EN | 🇺🇸 | English | ✅ Available | OGG | 0:30 |
| Arabic | AR | 🇸🇦 | العربية | ✅ Available | MP3 | 0:40 |
| Japanese | JA | 🇯🇵 | 日本語 | ✅ Available | MP3 | 0:35 |
| Russian | RU | 🇷🇺 | Русский | ✅ Available | MP3 | 0:30 |

### Audio Quality Standards
- **Sample Rate**: 44.1 kHz standard
- **Bitrate**: 320 kbps for high quality
- **Format Support**: MP3, WAV, OGG, M4A
- **File Size Optimization**: Compressed for web delivery

## 📈 Performance & Optimization

### Core Web Vitals Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Strategies
- **Code Splitting**: Route-based and component-based lazy loading
- **Asset Optimization**: Compressed images and optimized bundle sizes
- **API Caching**: Efficient server responses with proper cache headers
- **Database Indexing**: Optimized MongoDB queries for fast retrieval

### Browser Compatibility
- **Modern Browsers**: Full feature support (Chrome 90+, Firefox 88+, Safari 14+)
- **Legacy Browsers**: Graceful degradation with core functionality
- **Mobile Optimization**: Touch-friendly interface with responsive audio controls

## 🛡️ Security & Reliability

### Security Implementation
- **Input Validation**: Comprehensive data sanitization with Mongoose schemas
- **Rate Limiting**: API protection against abuse (1000 requests per 15 minutes)
- **CORS Configuration**: Secure cross-origin request handling
- **Environment Variables**: Sensitive data protection
- **Error Handling**: Secure error responses without information leakage

### Data Protection
- **MongoDB Security**: Encrypted connections and access control
- **API Security**: Request validation and response sanitization
- **File Handling**: Secure audio file serving with proper headers

## 🧪 Testing & Quality Assurance

### Code Quality Standards
- **TypeScript Strict Mode**: Comprehensive type checking
- **ESLint Configuration**: Consistent code style enforcement
- **Prettier Integration**: Automated code formatting
- **Git Hooks**: Pre-commit quality checks

### Testing Strategy
- **API Testing**: Manual endpoint validation with Postman/curl
- **Frontend Testing**: Component behavior verification
- **Cross-Browser Testing**: Compatibility across major browsers
- **Mobile Testing**: Responsive design validation on various devices

### Performance Monitoring
- **Lighthouse Audits**: Regular performance and accessibility scoring
- **Bundle Analysis**: JavaScript bundle size optimization
- **Database Monitoring**: Query performance and connection health

## 🚀 Deployment Guide

### Production Deployment

#### Backend Deployment (Render)

```bash
# Render deployment configuration
Build Command: npm install
Start Command: npm start

# Environment Variables
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
CORS_ORIGINS=https://your-frontend-domain.vercel.app
PORT=10000
```

#### Frontend Deployment (Vercel)

```bash
# Vercel deployment
vercel

# Environment Variables
VITE_API_BASE_URL= https://audiodb-backend.onrender.com/
VITE_APP_NAME=AudioDB
```

### Local Development Setup

```bash
# Complete local setup
git clone https://github.com/Jaswanthk07/AudioDB-ElevenLabs.git
cd AudioDB-ElevenLabs

# Terminal 1: Backend
cd audiodb-backend
npm install
node scripts/seedDatabase.js
npm run dev

# Terminal 2: Frontend
cd audiodb-frontend
npm install
npm run dev
```

## 🔧 Development Scripts

### Backend Commands
```bash
npm run dev          # Development server with nodemon
npm start            # Production server
npm run seed         # Initialize database with sample data
npm run test         # Run API tests
```

### Frontend Commands
```bash
npm run dev          # Vite development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint code quality check
npm run type-check   # TypeScript compilation check
```

## 🤝 Contributing

### Development Workflow

```bash
# Fork repository and clone
git clone https://github.com/Jaswanthk07/AudioDB-ElevenLabs.git
cd AudioDB-ElevenLabs

# Create feature branch
git checkout -b feature/audio-streaming-api
git checkout -b feature/improved-mobile-ui
git checkout -b bugfix/language-dropdown-issue
git checkout -b enhancement/performance-optimization

# Development process
npm install                    # Install dependencies
npm run dev                   # Start development servers
# Make your changes...
npm run lint                  # Check code quality
npm run type-check           # Verify TypeScript

# Commit and push
git add .
git commit -m "feat: add audio streaming capabilities"
git push origin feature/audio-streaming-api
```

### Code Standards
- **TypeScript First**: All new components must use TypeScript
- **Responsive Design**: Mobile-first approach for all UI components
- **API Consistency**: Follow RESTful conventions for all endpoints
- **Documentation**: Update README for significant feature additions
- **Testing**: Verify functionality across different browsers and devices

### Contribution Areas
- **Audio Format Support**: Add support for additional audio formats
- **Language Expansion**: Implement new language support
- **UI/UX Improvements**: Enhance user interface and experience
- **Performance Optimization**: Improve loading times and responsiveness
- **Mobile Enhancement**: Optimize mobile user experience
- **Accessibility**: Improve screen reader and keyboard navigation support

## 📊 Project Statistics

### Codebase Metrics
- **Total Lines of Code**: ~3,500+
- **React Components**: 12+
- **API Endpoints**: 8
- **Database Models**: 1 comprehensive schema
- **Languages Supported**: 5
- **TypeScript Coverage**: 100%
- **Mobile Responsive**: ✅ Complete

### Technology Distribution
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Tools**: Vite, ESLint, Prettier
- **Deployment**: Vercel (Frontend), Render (Backend)

## 🔗 Links & Resources

### Project Links
- **Live Demo**: [https://audiodb-elevenlabs.vercel.app](https://audiodb-elevenlabs.vercel.app)
- **Backend API**: [https://audiodb-backend.render.com](https://audiodb-backend.onrender.com)
- **GitHub Repository**: [https://github.com/Jaswanthk07/AudioDB-ElevenLabs](https://github.com/Jaswanthk07/AudioDB-ElevenLabs)
- **Issue Tracker**: [Report bugs or request features](https://github.com/Jaswanthk07/AudioDB-ElevenLabs/issues)

### Documentation Resources
- **API Documentation**: Detailed endpoint specifications and examples
- **Component Library**: React component API and usage patterns
- **Database Schema**: MongoDB collection structure and relationships
- **Deployment Guide**: Step-by-step production deployment instructions

### Technology Documentation
- [React Documentation](https://react.dev/) - Modern React patterns and best practices
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system and advanced features
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Node.js Documentation](https://nodejs.org/docs/) - Server-side JavaScript runtime
- [Express.js Guide](https://expressjs.com/) - Web application framework
- [MongoDB Manual](https://docs.mongodb.com/) - Document database operations

## 🙏 Acknowledgments

This project was built with thought and support from the open-source community,

- **React Team** for providing an excellent frontend framework
- **MongoDB Team** for robust database solutions
- **Tailwind Labs** for revolutionary CSS framework
- **Vercel & Render** for seamless deployment platforms
- **The broader web development community** for continuous innovation

---

<div align="center">
  <p><strong>Built with ❤️ by <a href="https://github.com/Jaswanthk07">Jaswanth</a></strong></p>
  <p>Demonstrating modern full-stack development with production-ready architecture</p>
  
  <sub>⭐ Star this repository if you found it helpful! ⭐</sub>
</div>
