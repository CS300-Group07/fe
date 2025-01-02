// ConversationList.js
import React from 'react';

function ConversationList({
  conversations,
  conversationTitles,
  selectedConversationId,
  onSelectConversation,
  onCreateNewConversation, // Receive the handler
}) {
  return (
    <div className="w-1/3 bg-gray-100 p-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <button
          onClick={onCreateNewConversation}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Create New
        </button>
      </div>
      <ul>
        {conversations.map((conversation, index) => (
          <li
            key={conversation.id}
            className={`p-2 cursor-pointer ${
              selectedConversationId === conversation.id
                ? 'bg-blue-200'
                : 'hover:bg-gray-200'
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            {conversationTitles[index] || `Conversation ${conversation.id}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;
