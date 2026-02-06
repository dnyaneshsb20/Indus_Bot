import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMsg";

const Dashboard1 = () => {
  // Separate state for this new dashboard
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (msg) => {
    if (!msg) return;

    setMessages((prev) => [...prev, { message: msg, fromUser: true }]);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: msg }),
      });
      const data = await response.json();

      setMessages((prev) => [...prev, { message: data.answer, fromUser: false }]);
    } catch (err) {
      setMessages((prev) => [...prev, { message: "Error connecting to backend", fromUser: false }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          {/* Chat window */}
          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg.message} fromUser={msg.fromUser} />
            ))}
            {loading && <p className="text-gray-300">Loading...</p>}
          </div>

          {/* Chat input */}
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
