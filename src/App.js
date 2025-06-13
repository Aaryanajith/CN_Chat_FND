import React, { useState } from 'react';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState('');
  const [inputName, setInputName] = useState('');

  const handleJoin = () => {
    if (inputName.trim()) {
      setUsername(inputName.trim());
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      {!username ? (
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Enter your username</h1>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Your name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
          />
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          >
            Join Chat
          </button>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
