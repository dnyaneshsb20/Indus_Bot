import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (msg) => {
    setMessages((prev) => [...prev, { message: msg, fromUser: true }]);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: msg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { message: data.answer, fromUser: false }]);
    } catch (err) {
      setMessages((prev) => [...prev, { message: "Error connecting to backend", fromUser: false }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg.message} fromUser={msg.fromUser} />
            ))}
          </div>
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
