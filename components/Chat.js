import { useState, useEffect, useRef } from 'react';
import MessageInput from './MessageInput';

export default function Chat({ messages, username, onSendMessage }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <span className="username-display">Welcome, {username}!</span>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.isSystem ? 'system-message' : ''} ${
                msg.username === username ? 'own-message' : 'other-message'
              }`}
            >
              {!msg.isSystem && (
                <div className="message-header">
                  <span className="message-username">{msg.username}</span>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              )}
              <div className="message-content">
                {msg.message}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}