//ChatInput.jsx
import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex p-4 bg-gray-900 gap-2">
      <input
        type="text"
        placeholder="Type your question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
