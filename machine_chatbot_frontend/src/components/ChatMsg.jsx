import React, { useState } from "react";

const ChatMessage = ({ message, fromUser }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const isUser = fromUser;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} my-4 px-4`}>
      
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-lg">🤖</span>
          </div>
        </div>
      )}

      {/* Message Container */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        
        {/* Message Bubble */}
        <div className={`
          relative rounded-2xl px-4 py-3 shadow-lg
          ${isUser 
            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-md' 
            : 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 border border-gray-700 rounded-bl-md'
          }
        `}>
          
          {/* AI Badge */}
          {!isUser && (
            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
          )}
          
          {/* Message Content */}
          <div className="whitespace-pre-wrap leading-relaxed pr-6">
            {message}
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            {!isUser && (
              <>
                <button
                  onClick={() => {
                    setLiked(!liked);
                    setDisliked(false);
                  }}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <span className={`text-sm ${liked ? 'text-green-400' : 'text-gray-400'}`}>
                    👍
                  </span>
                </button>
                <button
                  onClick={() => {
                    setDisliked(!disliked);
                    setLiked(false);
                  }}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <span className={`text-sm ${disliked ? 'text-red-400' : 'text-gray-400'}`}>
                    👎
                  </span>
                </button>
              </>
            )}
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-white/10 rounded"
            >
              <span className={`text-sm ${copied ? 'text-green-400' : 'text-gray-400'}`}>
                {copied ? '✓' : '📋'}
              </span>
            </button>
          </div>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-gray-500 mt-1 px-2">
          {isUser ? 'You' : 'AI Assistant'} • Just now
        </span>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
            <span className="text-lg">👤</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;