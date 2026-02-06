import React, { useState } from "react";
import { 
  MessageSquare, 
  Clock, 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle,
  Send,
  Zap,
  Sparkles,
  Shield,
  HardDrive,
  ChevronRight,
  Bell,
  Search
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Chat");
  const [message, setMessage] = useState("");

  const tabs = [
    { id: "chat", label: "Chat", icon: <MessageSquare size={20} />, badge: 3 },
    { id: "history", label: "History", icon: <Clock size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "team", label: "Team", icon: <Users size={20} /> },
    { id: "documents", label: "Documents", icon: <FileText size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    { id: "help", label: "Help & Support", icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Left Sidebar */}
      <aside className="w-72 bg-gray-900/80 backdrop-blur-lg border-r border-gray-800 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                AI Machine Help
              </h1>
              <p className="text-sm text-gray-400">Intelligent Solutions Platform</p>
            </div>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold">AI Assistant</h2>
              <p className="text-xs text-gray-400">Online & Ready</p>
            </div>
            <div className="ml-auto w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-sm text-gray-300">
            Your intelligent companion for all tasks. Ask me anything!
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.label)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeTab === tab.label 
                    ? 'bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border-l-4 border-blue-500' 
                    : 'hover:bg-gray-800/50'
                  }
                `}
              >
                <div className="relative">
                  <div className={`${activeTab === tab.label ? 'text-blue-400' : 'text-gray-400'}`}>
                    {tab.icon}
                  </div>
                  {tab.badge && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`font-medium ${activeTab === tab.label ? 'text-white' : 'text-gray-300'}`}>
                  {tab.label}
                </span>
                {activeTab === tab.label && (
                  <ChevronRight size={16} className="ml-auto text-blue-400" />
                )}
              </button>
            ))}
          </div>

          {/* Storage Section */}
          <div className="mt-8 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <HardDrive size={16} className="text-blue-400" />
                <span className="text-sm font-medium">Storage</span>
              </div>
              <span className="text-sm font-bold">78%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: '78%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">15.2 GB of 20 GB used</p>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-2xl">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="font-bold text-lg">DH</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">Dnyanesh H.</h3>
                <Shield size={14} className="text-blue-400" />
              </div>
              <p className="text-sm text-gray-400">Premium User</p>
            </div>
            <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="text-xl font-semibold">
            Welcome back, <span className="text-cyan-400">Dnyanesh</span> 👋
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search conversations..."
                className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-sm font-semibold">AI</span>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="h-full bg-gradient-to-b from-gray-900/50 to-gray-900/30 rounded-2xl border border-gray-800 backdrop-blur-sm flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-gray-400">Typically replies in seconds</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Welcome Message */}
              <div className="mb-6">
                <div className="inline-block max-w-xl bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl rounded-tl-none p-4 border border-gray-700">
                  <p className="text-gray-300">
                    Hello! I'm your AI Assistant. I can help you with questions, analysis, 
                    document processing, and much more. How can I assist you today?
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-2">2:30 PM</p>
              </div>

              {/* Sample User Message */}
              <div className="mb-6 flex justify-end">
                <div className="inline-block max-w-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/20 rounded-2xl rounded-tr-none p-4 border border-blue-800/30">
                  <p className="text-gray-100">
                    Can you help me analyze our sales data from last quarter?
                  </p>
                </div>
              </div>

              {/* Sample AI Response */}
              <div className="mb-6">
                <div className="inline-block max-w-xl bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl rounded-tl-none p-4 border border-gray-700">
                  <p className="text-gray-300">
                    Absolutely! I can analyze your sales data. Please upload the dataset or 
                    connect me to your analytics platform. I'll provide insights on trends, 
                    performance metrics, and recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-800">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full pl-6 pr-24 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button className="px-1 text-gray-500 hover:text-gray-300">
                    📎
                  </button>
                  <button className="px-1 text-gray-500 hover:text-gray-300">
                    🎤
                  </button>
                  <button
                    onClick={() => {
                      if (message.trim()) {
                        // Handle send message
                        setMessage("");
                      }
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center space-x-2 hover:opacity-90 transition-opacity"
                  >
                    <span className="font-medium">Send</span>
                    <Send size={16} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Press Enter to send • Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;