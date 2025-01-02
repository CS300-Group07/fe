import React from 'react';

function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onNewConversation,
}) {
  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Conversations</h2>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          onClick={onNewConversation}
        >
          New
        </button>
      </div>
      {conversations.length === 0 && <p>Loading conversations...</p>}
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
