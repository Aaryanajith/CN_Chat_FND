import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded-md max-w-xs ${
            msg.from === 'You' ? 'bg-blue-200 self-end ml-auto' : 'bg-gray-300'
          }`}
        >
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;