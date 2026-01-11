import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Chat from '../components/Chat';

let socket;

export default function Home() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketInitializer();
    
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    
    socket = io({
      path: '/api/socket',
      addTrailingSlash: false,
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('receive-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    socket.on('user-joined', (username) => {
      setMessages(prev => [...prev, {
        message: `${username} joined the chat`,
        username: 'System',
        timestamp: new Date().toLocaleTimeString(),
        isSystem: true
      }]);
    });

    socket.on('user-left', (username) => {
      setMessages(prev => [...prev, {
        message: `${username} left the chat`,
        username: 'System',
        timestamp: new Date().toLocaleTimeString(),
        isSystem: true
      }]);
    });
  };

  const joinChat = (e) => {
    e.preventDefault();
    if (username.trim() && isConnected) {
      socket.emit('join-room', username);
      setIsJoined(true);
    }
  };

  const sendMessage = (message) => {
    if (message.trim() && isConnected) {
      socket.emit('send-message', { message });
    }
  };

  if (!isJoined) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Real-Time Chat</h1>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Connecting...'}
          </div>
          <form onSubmit={joinChat}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
              maxLength={20}
            />
            <button 
              type="submit" 
              className="join-btn"
              disabled={!isConnected || !username.trim()}
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <Chat 
        messages={messages} 
        username={username} 
        onSendMessage={sendMessage}
        isConnected={isConnected}
      />
    </div>
  );
}