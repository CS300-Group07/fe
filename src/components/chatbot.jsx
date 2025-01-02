import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

function ChatbotScreen() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  // Fetch conversation list on component mount
  useEffect(() => {
    axios
      .get('http://localhost:5002/chatbot/conversation_list/cookies')
      .then((response) => {
        setConversations(response.data);
      })
      .catch((error) =>
        console.error('Error fetching conversations:', error)
      );
  }, []);

  const addNewConversation = () => {
    // Make a GET request to create a new conversation
    axios
      .post('http://localhost:5002/chatbot/create/cookies')
      .then((response) => {
        const newConversationId = response.data.conversation_id;
        const newConversation = { id: newConversationId };
        // Update conversations list
        setConversations((prevConversations) => [
          ...prevConversations,
          newConversation,
        ]);
        // Set the new conversation as selected
        setSelectedConversationId(newConversationId);
      })
      .catch((error) =>
        console.error('Error creating new conversation:', error)
      );
  };

  return (
    <div className="flex h-screen">
      <ConversationList
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={setSelectedConversationId}
        onNewConversation={addNewConversation}
      />
      {selectedConversationId ? (
        <ChatWindow conversationId={selectedConversationId} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">
            Select a conversation to start chatting
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatbotScreen;
