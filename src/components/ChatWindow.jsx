import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { mockMessages, getBotResponse } from '../mock/chatbot';

function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Load mock messages for the selected conversation
  useEffect(() => {
    // Simulate an API call with a delay
    setTimeout(() => {
      setMessages(mockMessages[conversationId] || []);
    }, 500); // 500ms delay to simulate network latency
  }, [conversationId]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Simulate sending a message to the backend and receiving a response
    const userMessage = { sender: 'user', text: input };
    const botReply = getBotResponse(input);

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { sender: 'bot', text: botReply.text },
    ]);
    setInput('');
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col flex-1 bg-white relative">
      <div className="flex-1 overflow-y-auto p-4" style={{ marginBottom: '100px' }}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleInputKeyPress}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`bg-blue-500 text-white px-4 py-2 rounded-r ${
              !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
