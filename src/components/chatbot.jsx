import React, { useState, useEffect } from 'react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import Cookies from 'js-cookie';
import axios from 'axios';

function ChatbotScreen() {
  const userId = Cookies.get('userId');
  const [conversations, setConversations] = useState([]);
  const [conversationstitles, setConversationstitles] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  useEffect(() => {
    if (userId) {
      // User ID exists, fetch conversations
      axios
        .get(`http://localhost:5002/chatbot/conversation_list/${userId}`)
        .then((response) => {
            // convert to the format export const mockConversations = [{ id: '1' },{ id: '2' },{ id: '3' }];
            var temp = []; 
            var temp2 = [];
            for (var i = 0; i < response.data.length; i++) {
                temp.push({id: response.data[i]});
                temp2.push("Conversation " + response.data[i]);
            }
            setConversations(temp);
            setConversationstitles(temp2);
        })
        .catch((error) => {
          console.error('Error fetching conversations:', error);
        });
    } else {
      // User ID does not exist, fetch announcements
      axios
        .get('http://localhost:5002/chatbot/announcements')
        .then((response) => {
          setConversations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching announcements:', error);
        });
    }
  }, [userId]);

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
