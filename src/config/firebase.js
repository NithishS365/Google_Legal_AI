import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Development Firebase configuration
// This uses default values to prevent initialization errors during development
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "legal-query-ai-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "legal-query-ai-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "legal-query-ai-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456789",
  measurementId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || "G-XXXXXXXXXX"
};

// Initialize Firebase
let app = null;
let analytics = null;
let auth = null;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services only if app is successfully initialized
  if (app) {
    auth = getAuth(app);
    
    // Skip analytics and firestore in development to avoid configuration errors
    // Uncomment these when you have a real Firebase project:
    // analytics = getAnalytics(app);
    // db = getFirestore(app);
    
    console.log('Firebase initialized in development mode');
  }
} catch (error) {
  console.warn('Firebase initialization skipped (development mode):', error.message);
  // Continue without Firebase for local development
}

export { analytics, auth, db };
export default app;