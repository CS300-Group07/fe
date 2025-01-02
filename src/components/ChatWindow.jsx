import React, { useState, useEffect } from 'react';
import Message from './Message';
import { mockMessages, getBotResponse } from '../mock/chatbot';

function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Load mock messages for the selected conversation
  useEffect(() => {
    // Simulate an API call with a delay
    setTimeout(() => {
      setMessages(mockMessages[conversationId] || []);
    }, 500); // 500ms delay to simulate network latency
  }, [conversationId]);

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

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="p-4 border-t">
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
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
