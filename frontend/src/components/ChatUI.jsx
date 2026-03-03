import { useState, useEffect, useRef } from 'react';
import {
    FiSend,
    FiChevronDown,
    FiMessageSquare,
    FiSettings,
    FiUser,
    FiAlertCircle,
    FiCheckCircle,
    FiClock,
    FiSearch,
    FiRefreshCw,
    FiDownload,
    FiCopy,
    FiVolume2,
} from 'react-icons/fi';
import { motion, AnimatePresence } from "framer-motion";
import {
    TbRobot,
    TbMessageChatbot,
    TbBrandOpenai,
    TbSparkles
} from 'react-icons/tb';
import { FiCpu, FiServer, FiAperture } from 'react-icons/fi';
import Sidebar from './Sidebar';
import ib from "../assets/ib2.png";
import ib3 from "../assets/ib3.png";

const ChatUI = ({
    messages,
    question,
    setQuestion,
    sendMessage,
    loading,
    isSidebarOpen,
    selectedMachine,
    setSelectedMachine,
    isDarkMode,
}) => {
    const isFirstLoad = messages.length === 0;
    const messagesEndRef = useRef(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [selectedQuickQuestion, setSelectedQuickQuestion] = useState(null);
    const [scanActive, setScanActive] = useState(true);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // Quick questions for first load
    const quickQuestions = [
        "How to reset Machine A?",
        "Error code E-102 solution",
        "Maintenance schedule for Machine B",
        "Common troubleshooting steps",
        "Machine calibration procedure"
    ];

    const handleQuickQuestion = (questionText) => {
        setQuestion(questionText);
        setSelectedQuickQuestion(questionText);
        setTimeout(() => {
            if (selectedMachine) {
                sendMessage();
            }
        }, 100);
    };

    const formatTimestamp = () => {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    return (
        <div className={`h-screen flex flex-col overflow-hidden transition-all duration-500 ${isDarkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-50 text-gray-900"
            }`}>
            {/* Top Navigation Bar */}
            <div className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b ${isDarkMode
                ? "bg-gray-900/80 backdrop-blur-sm border-gray-700"
                : "bg-white/90 backdrop-blur-sm border-gray-200"
                }`}>
                {/* Left side - Branding with Hamburger */}
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isDarkMode
                        ? "bg-gradient-to-br from-blue-800/30 to-cyan-800/30 border border-gray-800"
                        : "bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200"
                        }`}>
                        <img
                            src={ib}
                            alt="Logo"
                            className="w-7 h-7 object-contain scale-125"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            IndusBot
                        </h1>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Industrial Machine Assistant
                        </p>
                    </div>
                </div>

                {/* Right side - Controls */}
                <div className="flex items-center gap-4">
                    {/* Machine Status Indicator */}
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode
                        ? selectedMachine ? "bg-green-900/30 border border-green-800/30" : "bg-gray-800 border border-gray-700"
                        : selectedMachine ? "bg-green-50 border border-green-200" : "bg-gray-100 border border-gray-200"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${selectedMachine ? "bg-green-500 animate-pulse" : "bg-gray-400"
                            }`}></div>
                        <select
                            className={`text-sm rounded-lg px-2 py-1 focus:outline-none
    ${isDarkMode
                                    ? "bg-gray-800 text-gray-200 border border-gray-700"
                                    : "bg-white text-gray-700 border border-gray-300"
                                }`}
                            value={selectedMachine}
                            onChange={(e) => setSelectedMachine(e.target.value)}
                        >
                            <option
                                value=""
                                className={isDarkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"}
                            >
                                Select Machine
                            </option>

                            <option className={isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}>
                                Machine A - CNC Router
                            </option>
                            <option className={isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}>
                                Machine B - Laser Cutter
                            </option>
                            <option className={isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}>
                                Machine C - 3D Printer
                            </option>
                            <option className={isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}>
                                Machine D - CNC Mill
                            </option>
                            <option className={isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}>
                                Machine E - Lathe
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 h-screen flex flex-col">
                {isFirstLoad ? (
                    /* Welcome Screen */
                    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 relative">
                        {/* Background Layer */}
                        <div className="absolute inset-0">
                            {/* Grid Pattern */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.02)'} 1px, transparent 1px),
                                  linear-gradient(90deg, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.02)'} 1px, transparent 1px)`,
                                    backgroundSize: '60px 60px',
                                }}
                            />

                            {/* Scanning effect */}
                            {scanActive && (
                                <div
                                    className={`absolute inset-0 ${isDarkMode
                                        ? "bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
                                        : "bg-gradient-to-b from-transparent via-blue-400/2 to-transparent"
                                        } animate-scan-vertical`}
                                />
                            )}

                            {/* Floating elements */}
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`absolute animate-float ${isDarkMode ? "text-blue-500/10" : "text-blue-400/2"}`}
                                    style={{
                                        fontSize: `${Math.random() * 40 + 20}px`,
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${i * 0.5}s`,
                                        animationDuration: `${Math.random() * 20 + 10}s`,
                                    }}
                                >
                                    {[<FiCpu key={i} />, <FiServer key={i} />, <FiAperture key={i} />][i % 3]}
                                </div>
                            ))}
                        </div>

                        {/* Hero Section (Existing content untouched) */}
                        <div className="text-center max-w-2xl mx-auto relative z-10">
                            {/* Animated Icon */}
                            <div className={`relative mb-4 inline-block p-6 rounded-2xl ${isDarkMode
                                ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                                : "bg-white border border-gray-200 shadow-lg"
                                }`}>
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 animate-pulse`}></div>
                                <div className={`p-7 rounded-xl ${isDarkMode
                                    ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30"
                                    : "bg-gradient-to-br from-blue-50 to-cyan-50"
                                    }`}>
                                    <img
                                        src={ib}
                                        alt="Machine"
                                        className="w-44 h-44 mx-auto object-contain scale-125"
                                    />
                                </div>
                            </div>

                            {/* Welcome Text */}
                            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                                Welcome to <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">IndusBot AI</span>
                            </h1>
                            <p className={`text-lg mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Your intelligent assistant for industrial machine troubleshooting, maintenance guidance, and operational support.
                            </p>

                            {/* Connection Status */}
                            <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl mb-4 ${isDarkMode
                                ? selectedMachine ? "bg-green-900/20 border border-green-800/30" : "bg-gray-800 border border-gray-700"
                                : selectedMachine ? "bg-green-50 border border-green-200" : "bg-gray-100 border border-gray-200"
                                }`}>
                                <div className={`w-3 h-3 rounded-full ${selectedMachine ? "bg-green-500 animate-pulse" : "bg-amber-500"}`}></div>
                                <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {selectedMachine ? `Connected to ${selectedMachine}` : "Select a machine to begin"}
                                </span>
                            </div>

                            {/* Input Area */}
                            <div className="max-w-2xl mx-auto">
                                <div className={`flex gap-2 p-2 rounded-2xl transition-all duration-300 ${inputFocused
                                    ? (isDarkMode
                                        ? "ring-2 ring-blue-500/50 bg-gray-800"
                                        : "ring-2 ring-blue-400/50 bg-white shadow-lg")
                                    : (isDarkMode
                                        ? "bg-gray-800 border border-gray-700"
                                        : "bg-white border border-gray-200 shadow")
                                    }`}>
                                    <input
                                        type="text"
                                        value={question}
                                        disabled={!selectedMachine}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        onKeyDown={(e) =>
                                            e.key === "Enter" &&
                                            selectedMachine &&
                                            question.trim() &&
                                            sendMessage()
                                        }
                                        onFocus={() => setInputFocused(true)}
                                        onBlur={() => setInputFocused(false)}
                                        placeholder={selectedMachine
                                            ? "Describe your issue or ask a question..."
                                            : "Please select a machine first..."}
                                        className={`flex-1 bg-transparent px-5 py-4 focus:outline-none disabled:opacity-50 ${isDarkMode ? "placeholder-gray-500" : "placeholder-gray-400"}`}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!selectedMachine || !question.trim()}
                                        className={`flex items-center gap-2 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${!selectedMachine || !question.trim()
                                            ? (isDarkMode
                                                ? "bg-gray-700 text-gray-500"
                                                : "bg-gray-200 text-gray-400")
                                            : `bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:scale-105 active:scale-95`
                                            }`}
                                    >
                                        <FiSend className="w-5 h-5" />
                                        <span>Send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Chat Interface */
                    <div className="flex-1 min-h-0 flex flex-col">
                        {/* Chat Header */}
                        <div className={`px-6 py-2 border-b ${isDarkMode
                            ? "bg-gray-800/50 border-gray-700"
                            : "bg-white border-gray-200"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${isDarkMode
                                        ? "bg-blue-900/30 border border-blue-800/30"
                                        : "bg-blue-100 border border-blue-200"
                                        }`}>
                                        <TbMessageChatbot className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"
                                            }`} />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold">Active Chat Session</h2>
                                        <p className={`text-xs flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                            }`}>
                                            <FiClock className="w-3 h-3" />
                                            {formatTimestamp()} • {selectedMachine}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className={`p-2 rounded-lg transition-colors ${isDarkMode
                                        ? "hover:bg-gray-700 text-gray-400"
                                        : "hover:bg-gray-100 text-gray-500"
                                        }`}>
                                        <FiRefreshCw className="w-4 h-4" />
                                    </button>
                                    <button className={`p-2 rounded-lg transition-colors ${isDarkMode
                                        ? "hover:bg-gray-700 text-gray-400"
                                        : "hover:bg-gray-100 text-gray-500"
                                        }`}>
                                        <FiCopy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className={`flex-1 min-h-0 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent ${isDarkMode
                            ? "bg-gray-900/50"
                            : "bg-gray-50"
                            }`}>
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`animate-message-in flex gap-4 max-w-3xl mx-auto ${msg.sender === "user" ? "ml-auto" : "mr-auto"
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${msg.sender === "user"
                                        ? (isDarkMode
                                            ? "bg-blue-900/50 border border-blue-800/50"
                                            : "bg-blue-100 border border-blue-200")
                                        : (isDarkMode
                                            ? "bg-gray-800 border border-gray-700"
                                            : "bg-white border border-gray-200")
                                        }`}>
                                        {msg.sender === "user" ? (
                                            <FiUser className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"
                                                }`} />
                                        ) : (
                                            <img
                                                src={ib3}
                                                alt="Bot"
                                                className="w-7 h-7 object-contain scale-125"
                                            />
                                        )}
                                    </div>

                                    {/* Message Content */}
                                    <div className={`flex-1 rounded-2xl p-5 ${msg.sender === "user"
                                        ? (isDarkMode
                                            ? "bg-gradient-to-r from-blue-800/30 to-cyan-800/30 border border-blue-700/30"
                                            : "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200")
                                        : (isDarkMode
                                            ? "bg-gray-800/50 border border-gray-700"
                                            : "bg-white border border-gray-200 shadow-sm")
                                        }`}>
                                        {/* Message Header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-sm font-semibold ${msg.sender === "user"
                                                ? (isDarkMode ? "text-blue-400" : "text-blue-600")
                                                : (isDarkMode ? "text-gray-300" : "text-gray-700")
                                                }`}>
                                                {msg.sender === "user" ? "You" : "IndusBot"}
                                            </span>
                                            <span className={`text-xs flex items-center gap-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                                }`}>
                                                <FiClock className="w-3 h-3" />
                                                {formatTimestamp()}
                                            </span>
                                        </div>

                                        {/* Message Text */}
                                        <div className={`leading-relaxed ${isDarkMode ? "text-gray-200" : "text-gray-700"
                                            }`}>
                                            {msg.text}
                                        </div>

                                        {/* Message Actions */}
                                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-800/20">
                                            <button className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${isDarkMode
                                                ? "hover:bg-gray-700/50 text-gray-400"
                                                : "hover:bg-gray-100 text-gray-500"
                                                }`}>
                                                <FiCopy className="w-3 h-3" />
                                                Copy
                                            </button>
                                            <button className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${isDarkMode
                                                ? "hover:bg-gray-700/50 text-gray-400"
                                                : "hover:bg-gray-100 text-gray-500"
                                                }`}>
                                                <FiVolume2 className="w-3 h-3" />
                                                Speak
                                            </button>
                                            <button className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${isDarkMode
                                                ? "hover:bg-gray-700/50 text-gray-400"
                                                : "hover:bg-gray-100 text-gray-500"
                                                }`}>
                                                <FiDownload className="w-3 h-3" />
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {loading && (
                                <div className="animate-fade-in max-w-3xl mx-auto flex gap-4">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode
                                        ? "bg-gray-800 border border-gray-700"
                                        : "bg-white border border-gray-200"
                                        }`}>
                                        <img
                                            src={ib3}
                                            alt="Bot"
                                            className="w-6 h-6 object-contain animate-pulse"
                                        />
                                    </div>
                                    <div className={`flex-1 rounded-2xl p-5 ${isDarkMode
                                        ? "bg-gray-800/50 border border-gray-700"
                                        : "bg-white border border-gray-200 shadow-sm"
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                {[0, 1, 2].map((dot) => (
                                                    <div
                                                        key={dot}
                                                        className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-blue-400" : "bg-blue-500"
                                                            }`}
                                                        style={{
                                                            animation: `typing 1.4s infinite ${dot * 0.2}s`
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                }`}>
                                                Analyzing your query...
                                            </span>
                                        </div>
                                        <div className={`text-xs mt-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                            }`}>
                                            Searching knowledge base and machine schematics
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Auto-scroll anchor */}
                            <div ref={messagesEndRef} className="h-4" />
                        </div>

                        {/* Input Area - Fixed at Bottom */}
                        <div className={`sticky bottom-0 p-3 border-t ${isDarkMode
                            ? "bg-gray-900/95 backdrop-blur-sm border-gray-800"
                            : "bg-white/95 backdrop-blur-sm border-gray-200"
                            }`}>
                            <div className="max-w-3xl mx-auto">
                                {/* Status Bar */}
                                <div className={`flex items-center justify-between mb-3 px-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                    }`}>
                                    <div className="flex items-center gap-2 text-sm">
                                        {selectedMachine && (
                                            <>
                                                <div className={`w-2 h-2 rounded-full ${loading ? "bg-amber-500 animate-pulse" : "bg-green-500"
                                                    }`}></div>
                                                <span>Connected to <span className="font-semibold">{selectedMachine}</span></span>
                                            </>
                                        )}
                                    </div>
                                    <div className="text-xs">
                                        {messages.length} messages • Press Enter to send
                                    </div>
                                </div>

                                {/* Input Container */}
                                <div className={`flex gap-3 ${isDarkMode
                                    ? "bg-gray-800 border border-gray-700"
                                    : "bg-white border border-gray-200 shadow-lg"
                                    } rounded-2xl p-2 transition-all duration-300 ${inputFocused ? "ring-2 ring-blue-500/50" : ""
                                    }`}>
                                    <div className={`flex-1 flex items-center px-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                        }`}>
                                        <FiSearch className={`w-5 h-5 mr-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                                            }`} />
                                        <input
                                            type="text"
                                            value={question}
                                            disabled={!selectedMachine}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                selectedMachine &&
                                                question.trim() &&
                                                sendMessage()
                                            }
                                            onFocus={() => setInputFocused(true)}
                                            onBlur={() => setInputFocused(false)}
                                            placeholder={
                                                selectedMachine
                                                    ? "Type your question or describe the issue..."
                                                    : "Select a machine to enable chat..."
                                            }
                                            className="flex-1 bg-transparent py-4 focus:outline-none disabled:opacity-50"
                                        />
                                    </div>
                                    <button
                                        onClick={sendMessage}
                                        disabled={!selectedMachine || !question.trim()}
                                        className={`flex items-center gap-2 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${!selectedMachine || !question.trim()
                                            ? (isDarkMode
                                                ? "bg-gray-700 text-gray-500"
                                                : "bg-gray-200 text-gray-400")
                                            : `bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg`
                                            }`}
                                    >
                                        <FiSend className="w-5 h-5" />
                                        <span className="hidden sm:inline">Send</span>
                                    </button>
                                </div>

                                {/* Quick Actions */}
                                {/* <div className="flex items-center justify-center gap-4 mt-4">
                                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                                        isDarkMode 
                                            ? "hover:bg-gray-800 text-gray-400" 
                                            : "hover:bg-gray-100 text-gray-600"
                                    }`}>
                                        <FiSettings className="w-4 h-4" />
                                        Settings
                                    </button>
                                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                                        isDarkMode 
                                            ? "hover:bg-gray-800 text-gray-400" 
                                            : "hover:bg-gray-100 text-gray-600"
                                    }`}>
                                        <FiAlertCircle className="w-4 h-4" />
                                        Report Issue
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatUI;