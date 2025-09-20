// Firebase Client-Side API Service
// This replaces the backend by calling Google AI APIs directly from the frontend

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR_wvhQ_OPbusJm-enqeF7QqfmFetxc4k",
  authDomain: "legal-query-ai-nithish-16.firebaseapp.com",
  projectId: "legal-query-ai-nithish-16",
  storageBucket: "legal-query-ai-nithish-16.firebasestorage.app",
  messagingSenderId: "457769141123",
  appId: "1:457769141123:web:1068e67f6eede36eeae756",
  measurementId: "G-MMRJE8PEE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Google AI API Configuration
const GEMINI_API_KEY = 'AIzaSyDGIaCKblo6ggOf2e3IJclQmFYiGFTK89Q';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Firebase Collections
const COLLECTIONS = {
  QUERIES: 'legal_queries',
  RESPONSES: 'legal_responses',
  DOCUMENTS: 'uploaded_documents'
};

/**
 * Generate legal analysis using Gemini API directly
 */
export async function generateLegalAnalysis(query, caseType = 'general') {
  try {
    // Create comprehensive prompt for legal analysis
    const analysisPrompt = `
As a legal AI assistant, provide a comprehensive analysis of this legal query:

Query: ${query}
Case Type: ${caseType}

Please provide a detailed response with:
1. PLAINTIFF PERSPECTIVE: How the plaintiff/complainant would approach this case
2. DEFENDANT PERSPECTIVE: How the defendant/respondent would defend against this case  
3. SUMMARY: A neutral overview of the key legal issues and considerations

Format your response clearly with these three sections. Be thorough but concise.
`;

    // Call Gemini API directly
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: analysisPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    // Parse the response into sections
    const sections = parseGeminiResponse(generatedText);

    // Store in Firestore
    const queryDoc = {
      query,
      caseType,
      response: sections,
      timestamp: new Date(),
      apiUsed: 'gemini-pro'
    };

    await addDoc(collection(db, COLLECTIONS.QUERIES), queryDoc);

    return {
      query,
      case_type: caseType,
      plaintiff_perspective: sections.plaintiffPerspective,
      defendant_perspective: sections.defendantPerspective,
      summary: sections.summary,
      confidence: 0.85,
      key_precedents: [],
      legal_principles: [],
      timestamp: new Date().toISOString(),
      source: 'gemini-api-direct'
    };

  } catch (error) {
    console.error('Error generating legal analysis:', error);
    
    // Return fallback response
    return {
      query,
      case_type: caseType,
      plaintiff_perspective: "Unable to generate plaintiff perspective at this time due to API limitations.",
      defendant_perspective: "Unable to generate defendant perspective at this time due to API limitations.",
      summary: `Error analyzing query: ${error.message}. Please try again or rephrase your question.`,
      confidence: 0.0,
      key_precedents: [],
      legal_principles: [],
      timestamp: new Date().toISOString(),
      source: 'error-fallback'
    };
  }
}

/**
 * Parse Gemini response into structured sections
 */
function parseGeminiResponse(text) {
  const sections = {
    plaintiffPerspective: '',
    defendantPerspective: '',
    summary: ''
  };

  try {
    // Look for section headers and extract content
    const plaintiffMatch = text.match(/(?:PLAINTIFF PERSPECTIVE|1\.\s*PLAINTIFF)[:\s]*(.*?)(?=(?:DEFENDANT PERSPECTIVE|2\.\s*DEFENDANT|SUMMARY|3\.\s*SUMMARY)|$)/is);
    const defendantMatch = text.match(/(?:DEFENDANT PERSPECTIVE|2\.\s*DEFENDANT)[:\s]*(.*?)(?=(?:SUMMARY|3\.\s*SUMMARY)|$)/is);
    const summaryMatch = text.match(/(?:SUMMARY|3\.\s*SUMMARY)[:\s]*(.*?)$/is);

    sections.plaintiffPerspective = plaintiffMatch ? plaintiffMatch[1].trim() : text.substring(0, Math.floor(text.length / 3));
    sections.defendantPerspective = defendantMatch ? defendantMatch[1].trim() : text.substring(Math.floor(text.length / 3), Math.floor(2 * text.length / 3));
    sections.summary = summaryMatch ? summaryMatch[1].trim() : text.substring(Math.floor(2 * text.length / 3));

    // Fallback if sections are empty
    if (!sections.plaintiffPerspective) sections.plaintiffPerspective = "From the plaintiff's perspective: " + text.substring(0, 200) + "...";
    if (!sections.defendantPerspective) sections.defendantPerspective = "From the defendant's perspective: " + text.substring(200, 400) + "...";
    if (!sections.summary) sections.summary = "Summary: " + text.substring(400, 600) + "...";

  } catch (error) {
    console.error('Error parsing response:', error);
    // Fallback parsing
    sections.plaintiffPerspective = text.substring(0, Math.floor(text.length / 3));
    sections.defendantPerspective = text.substring(Math.floor(text.length / 3), Math.floor(2 * text.length / 3));
    sections.summary = text.substring(Math.floor(2 * text.length / 3));
  }

  return sections;
}

/**
 * Get recent queries from Firestore
 */
export async function getRecentQueries(limitCount = 5) {
  try {
    const q = query(
      collection(db, COLLECTIONS.QUERIES),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const queries = [];
    
    querySnapshot.forEach((doc) => {
      queries.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      });
    });
    
    return queries;
  } catch (error) {
    console.error('Error fetching recent queries:', error);
    return [];
  }
}

/**
 * Health check for the client-side service
 */
export async function checkServiceHealth() {
  try {
    // Test Firestore connection
    const testQuery = await getDocs(query(collection(db, COLLECTIONS.QUERIES), limit(1)));
    
    // Test Gemini API
    const testResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hello" }] }]
      })
    });

    return {
      status: 'healthy',
      firestore: 'connected',
      geminiApi: testResponse.ok ? 'connected' : 'error',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Export the service functions
export const firebaseAPIService = {
  generateLegalAnalysis,
  getRecentQueries,
  checkServiceHealth
};