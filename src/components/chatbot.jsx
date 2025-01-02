import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import { mockConversations } from '../mock/chatbot';

function ChatbotScreen() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  // Use mock data for conversation list
  useEffect(() => {
    // Simulate an API call with a delay
    setTimeout(() => {
      setConversations(mockConversations);
    }, 500); // 500ms delay to simulate network latency
  }, []);

  return (
    <div className="flex h-screen">
      <ConversationList
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={setSelectedConversationId}
      />
      {selectedConversationId ? (
        <ChatWindow conversationId={selectedConversationId} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
}

export default ChatbotScreen;
