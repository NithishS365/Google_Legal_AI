import React, { useState } from 'react';

export const IBMBot = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [qaPairs, setQaPairs] = useState([]);
  const [askingQuestion, setAskingQuestion] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  // Updated API base URL to use port 8001
  const API_BASE_URL = 'http://localhost:8001';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setQaPairs([]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to upload file'}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || !result) {
      alert('Please enter a question and make sure a document is uploaded.');
      return;
    }

    setAskingQuestion(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          content: result.content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setQaPairs([...qaPairs, { question: data.question, answer: data.answer }]);
        setQuestion('');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to get answer'}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setAskingQuestion(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #f0fff4, #d1fae5, #a7f3d0)",
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-green-800 text-center mb-8 tracking-wide drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        ClauseWise AI - Document Analysis
      </h1>

      {/* Status Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-green-800 border border-green-200 shadow-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Backend: Port 8001 - IBM Granite 3.0-1B</span>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 mb-8 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <span>📄</span> Upload Document for Analysis
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 focus:border-green-600 focus:outline-none transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 shadow-lg transform hover:scale-105 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  🚀 Upload & Analyze
                </span>
              )}
            </button>
          </div>
          <div className="bg-green-50 px-4 py-3 rounded-lg border border-green-200">
            <p className="text-sm text-green-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="font-bold">Supported formats:</span> PDF, DOCX, TXT • 
              <span className="font-bold"> Max size:</span> 10MB • 
              <span className="font-bold"> Secure:</span> No data stored permanently
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 mb-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl px-6 py-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span>📊</span> Document Analysis Results
            </h3>
          </div>
          <div className="p-6 space-y-6">
            
            {/* Document Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">📁</span>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>File Name</p>
                    <p className="text-green-800 font-bold truncate" style={{ fontFamily: 'Montserrat, sans-serif' }}>{result.filename}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">📝</span>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Word Count</p>
                    <p className="text-green-800 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>{result.word_count.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">🔤</span>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Characters</p>
                    <p className="text-green-800 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>{result.char_count.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-green-800 flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <span>🧠</span> AI-Generated Summary
              </h4>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-sm">
                <p className="text-gray-700 leading-relaxed font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>{result.summary}</p>
              </div>
            </div>

            {/* Full Content Toggle */}
            <div className="space-y-3">
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-bold shadow-sm hover:shadow-lg transform hover:scale-105"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <span>{showFullContent ? '🔼' : '🔽'}</span>
                {showFullContent ? 'Hide Full Content' : 'Show Full Content'}
              </button>
              
              {showFullContent && (
                <div className="bg-green-50 rounded-xl border border-green-200 overflow-hidden shadow-sm">
                  <div className="bg-green-100 px-4 py-3 border-b border-green-200">
                    <p className="text-sm text-green-700 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Full Document Content</p>
                  </div>
                  <div className="p-4 max-h-80 overflow-y-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {result.content}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Q&A Section */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 mb-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-xl px-6 py-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span>❓</span> Interactive Q&A
            </h3>
          </div>
          <div className="p-6 space-y-6">
            
            {/* Question Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask any question about your document..."
                className="flex-1 px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all placeholder-gray-400"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              <button
                onClick={handleAskQuestion}
                disabled={askingQuestion || !question.trim()}
                className={`px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 shadow-lg transform hover:scale-105 ${
                  askingQuestion || !question.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {askingQuestion ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Thinking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    💬 Ask Question
                  </span>
                )}
              </button>
            </div>
            
            {/* Q&A Conversation */}
            {qaPairs.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-green-800 flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <span>💬</span> Conversation History
                </h4>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {qaPairs.map((pair, index) => (
                    <div key={index} className="space-y-3">
                      {/* User Question */}
                      <div className="flex justify-end">
                        <div className="max-w-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow">
                          <div className="flex items-start gap-3">
                            <span className="text-xl">🙋</span>
                            <div>
                              <p className="font-bold text-green-100 text-xs uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>You</p>
                              <p className="mt-2 font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>{pair.question}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* AI Answer */}
                      <div className="flex justify-start">
                        <div className="max-w-3xl bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-200 hover:shadow-xl transition-shadow">
                          <div className="flex items-start gap-3">
                            <span className="text-xl">🤖</span>
                            <div>
                              <p className="font-bold text-emerald-100 text-xs uppercase tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>ClauseWise AI</p>
                              <p className="mt-2 leading-relaxed font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>{pair.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">💭</span>
                </div>
                <h4 className="text-xl font-bold text-green-700 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Ready to Answer Your Questions</h4>
                <p className="text-green-600 max-w-md mx-auto font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Start by asking anything about your uploaded document. I'll analyze the content and provide detailed answers.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-6 px-8 py-4 bg-white rounded-full shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 text-green-600">
            <span className="text-xl">🚀</span>
            <span className="font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>IBM Granite AI</span>
          </div>
          <div className="w-px h-5 bg-green-300"></div>
          <div className="flex items-center gap-2 text-green-600">
            <span className="text-xl">🔒</span>
            <span className="font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Privacy-First</span>
          </div>
          <div className="w-px h-5 bg-green-300"></div>
          <div className="flex items-center gap-2 text-green-600">
            <span className="text-xl">⚡</span>
            <span className="font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Port 8001</span>
          </div>
        </div>
        <p className="text-green-700 text-sm mt-4 font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          No data is stored permanently. Your documents are processed in real-time and discarded after analysis.
        </p>
      </div>
    </div>
  );
};

