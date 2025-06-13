import React, { useEffect, useRef, useState } from 'react';

const SOCKET_URL = 'wss://web-production-cd15.up.railway.app/ws';

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);
  const bottomRef = useRef();

  useEffect(() => {
    socketRef.current = new WebSocket(`${SOCKET_URL}?username=${username}`);

    socketRef.current.onmessage = (event) => {
      const msg = event.data;

      if (msg.startsWith('[ERROR]')) {
        alert(msg);
        window.location.reload();
        return;
      }

      if (msg.startsWith('[SERVER]')) {
        setMessages((prev) => [...prev, { type: 'system', text: msg.replace('[SERVER] ', '') }]);
      } else if (msg.startsWith('[PRIVATE]')) {
        setMessages((prev) => [...prev, { type: 'private', text: msg }]);
      } else {
        const [sender, ...textParts] = msg.split(': ');
        const text = textParts.join(': ');
        setMessages((prev) => [...prev, { type: sender === username ? 'self' : 'user', sender, text }]);
      }
    };

    return () => socketRef.current?.close();
  }, [username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socketRef.current.send(message);
      setMessage('');
    }
  };

  return (
    <div className="max-w-xl w-full h-[90vh] bg-white shadow-xl rounded-lg flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-lg font-semibold">
        Welcome, {username}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm ${
              msg.type === 'system'
                ? 'text-center text-gray-500 italic'
                : msg.type === 'private'
                ? 'text-purple-700 font-semibold'
                : msg.type === 'self'
                ? 'text-right'
                : 'text-left'
            }`}
          >
            {msg.type === 'self' && (
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-2 rounded-xl max-w-[70%]">{msg.text}</div>
            )}
            {msg.type === 'user' && (
              <div className="inline-block bg-gray-200 text-gray-800 px-3 py-2 rounded-xl max-w-[70%]">
                <strong className="block text-xs text-gray-600">{msg.sender}</strong>
                {msg.text}
              </div>
            )}
            {msg.type === 'system' && <div>{msg.text}</div>}
            {msg.type === 'private' && <div>{msg.text}</div>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t px-4 py-2 flex gap-2 bg-white">
        <input
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
