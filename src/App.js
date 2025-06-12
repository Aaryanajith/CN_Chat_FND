import React, { useState } from 'react';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (username.trim()) {
      setJoined(true);
    }
  };

  return (
    <div className="app">
      {!joined ? (
        <div className="join-box">
          <h2>Enter your username</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
