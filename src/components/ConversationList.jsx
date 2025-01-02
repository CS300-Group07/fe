import React from 'react';

function ConversationList({ conversations, selectedConversationId, onSelectConversation }) {
  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Conversations</h2>
      {conversations.length === 0 && <p>No conversations available.</p>}
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`p-2 mb-2 cursor-pointer rounded ${
              selectedConversationId === conversation.id
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            Conversation {conversation.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;
