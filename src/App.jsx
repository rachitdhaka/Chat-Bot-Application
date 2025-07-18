import { useRef, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [chatHistory, SetChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const chatContainerRef = useRef();

  // Gemini API configuration
  const API_KEY = "AIzaSyB-ZvX-1AhUDHEmK_mZzmsaXR65XXduTLc";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;
  
  console.log('Gemini API configured with key:', API_KEY ? 'Present' : 'Missing');

  // Auto-scroll to bottom when chat history or loading state changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    
    // Add user message to chat history
    SetChatHistory(history => [...history, { role: "user", text: userMessage }]);
    inputRef.current.value = '';
    
    // Set loading state
    setIsLoading(true);
    
    try {
      console.log('Sending message to Gemini API:', userMessage);
      
      // Call Gemini API using REST endpoint
      const response = await axios.post(API_URL, {
        contents: [{
          parts: [{
            text: userMessage
          }]
        }]
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API Response:', response.data);
      
      // Extract the response text
      const botResponse = response.data.candidates[0].content.parts[0].text;
      console.log('Bot response:', botResponse);
      
      // Add bot response to chat history
      SetChatHistory(history => [...history, { role: "assistant", text: botResponse }]);
      
    } catch (error) {
      console.error('Detailed error:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = "Sorry, I encountered an error. Please try again later.";
      
      // Provide more specific error messages
      if (error.response?.status === 400) {
        errorMessage = "Invalid request. Please check your message and try again.";
      } else if (error.response?.status === 403) {
        errorMessage = "API key error or access denied. Please check your API key.";
      } else if (error.response?.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again in a moment.";
      } else if (error.response?.data?.error?.message) {
        errorMessage = `API Error: ${error.response.data.error.message}`;
      }
      
      // Add error message to chat history
      SetChatHistory(history => [...history, { 
        role: "assistant", 
        text: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
   <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-screen flex justify-center items-center p-4">
      {/* main section */}
      <div className="bg-white shadow-2xl h-full max-w-4xl w-full text-black py-6 px-4 rounded-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="text-center py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">AI Chat Assistant</h1>
            <p className="text-gray-600 text-sm">Powered by Google Gemini</p>
          </div>

          {/* chat content area */}
          <div 
            ref={chatContainerRef}
            className="flex flex-col gap-4 overflow-y-auto flex-1 py-4 scroll-smooth"
          >
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-xl font-semibold mb-2">Welcome to AI Chat!</h2>
                <p>Start a conversation by typing a message below.</p>
              </div>
            )}
            
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 max-w-[80%] rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  <div className={`text-xs font-semibold mb-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 border border-gray-200 p-4 max-w-[80%] rounded-2xl">
                  <div className="text-xs font-semibold mb-1 text-gray-500">AI Assistant</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-gray-500 text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* chat bot footer section */}
          <div className="border-t border-gray-200 pt-4">
            <form onSubmit={HandleSubmit} className="flex space-x-4">
              <input 
                ref={inputRef}
                type="text"
                disabled={isLoading}
                className="flex-1 h-12 bg-gray-50 py-3 px-4 placeholder:text-gray-400 text-black rounded-full outline-none focus:outline-none border border-gray-300 focus:border-blue-500 focus:bg-white transition-all duration-200 disabled:opacity-50" 
                placeholder={isLoading ? "AI is responding..." : "Type your message here..."}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send"
                )}
              </button>
            </form>
          </div>
      </div>
   </div>
  )
}

export default App
