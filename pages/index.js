import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Chat from '../components/Chat';

let socket;

export default function Home() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socketInitializer();
    
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const socketInitializer = () => {
    socket = io();

    socket.on('connect', () => {
      console.log('Connected to server');
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
    if (username.trim()) {
      socket.emit('join-room', username);
      setIsJoined(true);
    }
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      socket.emit('send-message', { message });
    }
  };

  if (!isJoined) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Real-Time Chat</h1>
          <form onSubmit={joinChat}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
              maxLength={20}
            />
            <button type="submit" className="join-btn">
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
      />
    </div>
  );
}