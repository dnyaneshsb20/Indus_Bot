import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMsg";
import MainLayout from "../layouts/MainLayout";

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
    } catch {
      setMessages((prev) => [
        ...prev,
        { message: "Backend not reachable", fromUser: false },
      ]);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-full">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto p-6">
            {messages.map((msg, i) => (
              <ChatMessage key={i} {...msg} />
            ))}
          </div>

          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
