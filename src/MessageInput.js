import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const send = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="p-2 border-t flex">
      <input
        className="flex-1 border rounded-l px-2 py-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
        placeholder="Type a message..."
      />
      <button
        onClick={send}
        className="bg-blue-500 text-white px-4 rounded-r"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;