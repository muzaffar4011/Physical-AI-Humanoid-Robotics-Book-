import { useState } from 'react';
import axios from 'axios';
import './chat.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user", text: input };
    const currentInput = input;
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      console.log("Sending message:", currentInput);
      
      // Backend API URL - automatically detects environment
      // For production, set REACT_APP_API_URL environment variable during build
      // Or update this to your Render backend URL after deployment
      const API_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? "http://localhost:8000" 
        : "https://chat-4xqu.onrender.com"; // Replace with your Render URL
      
      const res = await axios.post(`${API_URL}/ask`, {
        query: currentInput
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Response received:", res);
      console.log("Response data:", res.data);
      
      const botReply = res.data.answer || res.data.reply || res.data.response || res.data.message || "No response from server";
      const botMessage = { sender: "bot", text: botReply };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error details:", err);
      console.error("Error response:", err.response);
      
      const errorMsg = err.response?.data?.error || err.message || "Unable to reach server";
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: `Error: ${errorMsg}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {!open && (
        <button className="chat-button" onClick={() => setOpen(true)}>
          <span>💬</span>
          <span>Ask AI</span>
        </button>
      )}
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-header-icon">🤖</div>
              <div className="chat-header-text">
                <h3>AI Assistant</h3>
                <p>Ask me anything about robotics!</p>
              </div>
            </div>
            <button className="chat-close-button" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="chat-body">
            {messages.length === 0 && (
              <div className="welcome-message">
                <div className="welcome-message-icon">👋</div>
                <h4>Welcome!</h4>
                <p>I'm your AI assistant for the Physical AI Humanoid Robotics textbook. Ask me anything about ROS2, VLA systems, simulation, or humanoid design!</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bubble bot">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
