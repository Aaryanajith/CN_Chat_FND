import React, { useEffect, useRef, useState } from 'react';

const SOCKET_URL = 'ws://localhost:8000/ws'; // Will update to match your backend

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`${SOCKET_URL}?username=${username}`);

    socketRef.current.onmessage = event => {
      setMessages(prev => [...prev, event.data]);
    };

    socketRef.current.onerror = () => {
      console.error("WebSocket error");
    };

    return () => socketRef.current.close();
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      socketRef.current.send(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
