import { useState } from 'react';

export default function MessageInput({ onSendMessage, isConnected }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <div className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isConnected ? "Type your message..." : "Connecting..."}
          className="message-input"
          rows="1"
          maxLength={500}
          disabled={!isConnected}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim() || !isConnected}
        >
          Send
        </button>
      </div>
    </form>
  );
}