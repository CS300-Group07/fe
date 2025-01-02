import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';

function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Load messages for the selected conversation from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/chatbot/${conversationId}/content`
        );
        /** this is the format of response.data
         * [
         *   { content: '...', role: 'system' },
         *   { content: '...', role: 'user' },
         *   { content: '...', role: 'system' },
         * ]
         *
         * Convert it into:
         * {
         *   '1': [
         *     { sender: 'user', text: '...' },
         *     { sender: 'bot', text: '...' },
         *   ],
         * }
         */

        const temp = {};
        for (let i = 1; i < response.data.length; i++) {
          if (response.data[i].role === 'user') {
            if (temp[conversationId] === undefined) {
              temp[conversationId] = [];
            }
            temp[conversationId].push({
              sender: 'user',
              text: response.data[i].content,
            });
          } else {
            if (temp[conversationId] === undefined) {
              temp[conversationId] = [];
            }
            temp[conversationId].push({
              sender: 'bot',
              text: response.data[i].content,
            });
          }
        }
        // If empty, add a bot message that says "Hello! How can I assist you today?"
        if (
          temp[conversationId] === undefined ||
          temp[conversationId].length === 0
        ) {
          temp[conversationId] = [];
          temp[conversationId].push({
            sender: 'bot',
            text: 'Hello! How can I assist you today?',
          });
        }
        setMessages(temp[conversationId] || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };

    // Add the user's message to the messages array to update the UI immediately
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Encode the message to be URL-safe
      const encodedMessage = encodeURIComponent(input.trim());

      // Send the message to the backend using the specified endpoint
      const response = await axios.post(
        `http://localhost:5002/chatbot/${conversationId}/send_message/${encodedMessage}`
      );

      const botReply = response.data; // Assuming the response contains the bot's reply
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botReply.response },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

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
      <div
        className="flex-1 overflow-y-auto p-2" // Reduced padding from p-4 to p-2
        style={{ marginBottom: '60px' }} // Reduced bottom margin
      >
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 p-2 border-t bg-white" // Reduced padding from p-4 to p-2
        style={{ height: '60px' }} // Reduced height
      >
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-1 border rounded-l text-sm" // Reduced padding and font size
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleInputKeyPress}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`bg-blue-500 text-white px-3 py-1 rounded-r text-sm ${
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
