import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Import Axios
import Message from './Message';

function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Load messages when the conversationId changes
  useEffect(() => {
    axios
      .get(`http://localhost:5002/chatbot/${conversationId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) =>
        console.error('Error fetching messages:', error)
      );
  }, [conversationId]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Send the message to the backend
    axios
      .post(
        `http://localhost:5002/chatbot/${conversationId}/send_message/${encodeURIComponent(
          input
        )}`
      )
      .then((response) => {
        const botResponse = response.data.response;

        // Update the message list with the user's message and bot's response
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', text: input },
          { sender: 'bot', text: botResponse },
        ]);
        setInput('');
      })
      .catch((error) => console.error('Error sending message:', error));
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
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
            disabled={!input.trim()}
            className={`bg-blue-500 text-white px-4 py-2 rounded-r ${
              !input.trim()
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-600'
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
