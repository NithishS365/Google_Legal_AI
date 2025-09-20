// Firebase configuration for Legal Query AI
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Development Firebase configuration
// For development, we'll use a minimal config to avoid initialization errors
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "legal-query-ai-demo.firebaseapp.com",
  projectId: "legal-query-ai-demo",
  storageBucket: "legal-query-ai-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services only if app is successfully initialized
  if (app) {
    auth = getAuth(app);
    
    // For development, we'll skip Firestore and Storage to avoid errors
    // Uncomment these when you have a real Firebase project:
    // db = getFirestore(app);
    // storage = getStorage(app);
    
    // Skip analytics in development to avoid configuration errors
    // analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
  }
} catch (error) {
  console.warn('Firebase initialization error (development mode):', error.message);
  // Continue without Firebase for local development
}

export { auth, db, storage, analytics };
export default app;