# Legal Query AI - Frontend

🚀 **Live Demo**: [https://legal-query-ai-nithish-16.web.app](https://legal-query-ai-nithish-16.web.app)

A modern, AI-powered legal assistant that provides dual-perspective analysis for legal queries. Built with React, powered by Google Gemini AI, and deployed on Firebase.

## ✨ **Key Features**

### 🎯 **Core Functionality**
- **Dual-Perspective Legal Analysis**: Get both plaintiff and defendant viewpoints on legal matters
- **Real-time Chat Interface**: Instant responses with typing indicators and status updates
- **Intelligent Query Processing**: Advanced AI understanding of legal context and terminology
- **Query History**: Automatic storage and retrieval of previous legal consultations
- **Confidence Scoring**: AI-generated confidence levels for analysis quality

### 🤖 **AI-Powered Features**
- **Google Gemini Integration**: Latest AI technology for comprehensive legal reasoning
- **Context-Aware Responses**: Understanding of legal terminology, procedures, and case types
- **Structured Analysis**: Organized responses with clear plaintiff/defendant perspectives
- **Error Handling**: Graceful fallbacks and informative error messages

### 💻 **User Experience**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, professional design optimized for legal professionals
- **Real-time Updates**: Live connection status and processing indicators
- **Analytics Integration**: User interaction tracking for continuous improvement

### 🔧 **Technical Features**
- **Serverless Architecture**: No backend infrastructure required
- **Firebase Integration**: Real-time database, hosting, and analytics
- **Progressive Web App**: Fast loading and offline capabilities
- **Security First**: Client-side API integration with proper error handling

## 🛠️ **Tech Stack**

### **Frontend Framework**
- **React 18+** - Modern React with Hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling framework
- **Lucide React** - Beautiful, customizable icons

### **Backend Services**
- **Firebase Firestore** - Real-time NoSQL database
- **Firebase Hosting** - Global CDN and static hosting
- **Firebase Analytics** - User behavior tracking
- **Google Gemini API** - Advanced AI language model

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **React Router DOM** - Client-side routing
- **React Hook Form** - Efficient form handling

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- Git for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/legal-query-ai.git
   cd legal-query-ai/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   # No environment variables needed for basic setup
   # Firebase config is included in the codebase
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### **Production Build**
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📁 **Project Structure**

```
Frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, media files
│   ├── components/        # Reusable React components
│   ├── config/            # Configuration files
│   │   ├── api.js        # API client configuration
│   │   ├── firebase.js   # Firebase initialization
│   │   └── firebaseAPI.js # Firebase API service
│   ├── data/             # Static data and mock data
│   ├── pages/            # Page components
│   │   ├── ChatBot.jsx   # Main chat interface
│   │   ├── Dashboard.jsx # Analytics dashboard
│   │   └── Lawyer.jsx    # Lawyer portal
│   ├── Routes/           # Routing configuration
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## 🔧 **Configuration**

### **Firebase Configuration**
The app uses Firebase for backend services. Configuration is included in `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

### **API Integration**
The app integrates with Google Gemini API through `src/config/firebaseAPI.js` for:
- Legal query processing
- Response generation
- Data persistence

## 📱 **Usage Guide**

### **Basic Usage**
1. **Open the application** in your web browser
2. **Type your legal question** in the chat interface
3. **Press Enter or click Send** to submit your query
4. **View dual-perspective analysis** showing plaintiff and defendant viewpoints
5. **Access query history** to review previous consultations

### **Advanced Features**
- **Case Type Selection**: Specify the type of legal case for more targeted analysis
- **Confidence Scores**: Review AI confidence levels for each response
- **Export Options**: Save responses for external use
- **Analytics Dashboard**: Track usage patterns and popular queries

## 🛡️ **Security & Privacy**

### **Data Handling**
- **Client-side Processing**: All data processing happens in your browser
- **Firebase Security**: Industry-standard encryption and security rules
- **No Personal Data Storage**: Queries are anonymized and encrypted
- **GDPR Compliant**: Follows data protection regulations

### **API Security**
- **Rate Limiting**: Built-in protection against API abuse
- **Error Handling**: Secure error messages without sensitive data exposure
- **Domain Restrictions**: API keys restricted to authorized domains

## 🚀 **Deployment**

### **Firebase Hosting**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### **Alternative Deployment Options**
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop build folder or connect Git
- **AWS S3**: Static website hosting with CloudFront CDN

## 📊 **Performance**

### **Optimization Features**
- **Code Splitting**: Automatic chunking for faster loading
- **Image Optimization**: Compressed assets and lazy loading
- **CDN Distribution**: Global content delivery network
- **Caching Strategy**: Aggressive caching for static assets

### **Performance Metrics**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting

## 📄 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

### **Getting Help**
- **Documentation**: Check this README and code comments
- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

### **Common Issues**
- **Node.js Version**: Ensure you're using Node.js v16 or higher
- **Firebase Errors**: Check your internet connection and Firebase configuration
- **Build Failures**: Clear node_modules and reinstall dependencies

## 📈 **Roadmap**

### **Planned Features**
- [ ] User authentication and personalized dashboards
- [ ] Document upload and analysis
- [ ] Multi-language support
- [ ] Voice input and output
- [ ] Advanced legal research tools
- [ ] Integration with legal databases

### **Technical Improvements**
- [ ] Progressive Web App (PWA) capabilities
- [ ] Offline functionality
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] Automated testing suite

---

**Built with ❤️ by the Legal Query AI Team**

🌐 **Live Application**: [https://legal-query-ai-nithish-16.web.app](https://legal-query-ai-nithish-16.web.app)
