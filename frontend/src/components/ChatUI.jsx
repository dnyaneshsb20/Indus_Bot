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
    FiCheck,
    FiVolume2,
    FiMenu,
} from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
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
    toggleSidebar,
    selectedMachine,
    setSelectedMachine,
    isDarkMode,
    appearance = {},
}) => {
    const chatBubbleStyle = appearance.chatBubbleStyle || 'modern';

    // Chat bubble style configurations
    const getBubbleClasses = (sender) => {
        const isUser = sender === 'user';
        switch (chatBubbleStyle) {
            case 'classic':
                return {
                    container: `rounded-lg p-4 ${isUser
                        ? (isDarkMode
                            ? 'bg-blue-700 border border-blue-600'
                            : 'bg-blue-500 text-white border border-blue-400')
                        : (isDarkMode
                            ? 'bg-gray-800 border border-gray-700'
                            : 'bg-white border border-gray-300 shadow-sm')
                        }`,
                    header: isUser
                        ? (isDarkMode ? 'text-blue-200' : 'text-blue-100')
                        : (isDarkMode ? 'text-gray-300' : 'text-gray-700'),
                    text: isUser
                        ? (isDarkMode ? 'text-gray-100' : 'text-white')
                        : (isDarkMode ? 'text-gray-200' : 'text-gray-700'),
                    actions: isUser
                        ? (isDarkMode ? 'border-blue-600/30' : 'border-blue-300/50')
                        : (isDarkMode ? 'border-gray-700/30' : 'border-gray-200'),
                    actionBtn: isUser
                        ? (isDarkMode ? 'hover:bg-blue-600/50 text-blue-200' : 'hover:bg-blue-400/50 text-blue-100')
                        : (isDarkMode ? 'hover:bg-gray-700/50 text-gray-400' : 'hover:bg-gray-100 text-gray-500'),
                };
            case 'minimal':
                return {
                    container: `rounded-xl px-4 py-3 ${isUser
                        ? (isDarkMode
                            ? 'bg-transparent border-l-2 border-blue-500 pl-4'
                            : 'bg-transparent border-l-2 border-blue-500 pl-4')
                        : (isDarkMode
                            ? 'bg-transparent'
                            : 'bg-transparent')
                        }`,
                    header: isUser
                        ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                        : (isDarkMode ? 'text-gray-400' : 'text-gray-500'),
                    text: isDarkMode ? 'text-gray-200' : 'text-gray-700',
                    actions: isDarkMode ? 'border-gray-800/30' : 'border-gray-100',
                    actionBtn: isDarkMode ? 'hover:bg-gray-800/50 text-gray-500' : 'hover:bg-gray-100 text-gray-400',
                };
            case 'modern':
            default:
                return {
                    container: `rounded-2xl p-5 ${isUser
                        ? (isDarkMode
                            ? 'bg-gradient-to-r from-blue-800/30 to-cyan-800/30 border border-blue-700/30'
                            : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200')
                        : (isDarkMode
                            ? 'bg-gray-800/50 border border-gray-700'
                            : 'bg-white border border-gray-200 shadow-sm')
                        }`,
                    header: isUser
                        ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                        : (isDarkMode ? 'text-gray-300' : 'text-gray-700'),
                    text: isDarkMode ? 'text-gray-200' : 'text-gray-700',
                    actions: 'border-gray-800/20',
                    actionBtn: isDarkMode ? 'hover:bg-gray-700/50 text-gray-400' : 'hover:bg-gray-100 text-gray-500',
                };
        }
    };
    const isFirstLoad = messages.length === 0;
    const messagesEndRef = useRef(null);
    const [inputFocused, setInputFocused] = useState(false);
    const [selectedQuickQuestion, setSelectedQuickQuestion] = useState(null);
    const [scanActive, setScanActive] = useState(true);
    const [machineDropdownOpen, setMachineDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [chatId, setChatId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMachineDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const machines = [
        { id: 'CNC Router', name: 'CNC Router', status: 'online' },
        { id: 'Lathe Machine', name: 'Lathe Machine', status: 'online' },
        { id: 'Drilling Machine', name: 'Drilling Machine', status: 'maintenance' },
        { id: 'Milling Machine', name: 'Milling Machine', status: 'online' },
        { id: 'Grinding Machine', name: 'Grinding Machine', status: 'maintenance' },
        { id: 'Injection Molding Machine', name: 'Injection Molding Machine', status: 'offline' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'maintenance': return 'bg-amber-500';
            case 'offline': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'online': return 'Online';
            case 'maintenance': return 'Maintenance';
            case 'offline': return 'Offline';
            default: return 'Unknown';
        }
    };

    const selectedMachineData = machines.find(m => m.id === selectedMachine);

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

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };


    return (
        <div className={`h-screen flex flex-col overflow-hidden transition-all duration-500 ${isDarkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-50 text-gray-900"
            }`}>
            {/* Top Navigation Bar */}
            <div className={`sticky top-0 z-50 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b ${isDarkMode
                ? "bg-gray-900/80 backdrop-blur-sm border-gray-700"
                : "bg-white/90 backdrop-blur-sm border-gray-200"
                }`}>
                {/* Left side - Branding with Hamburger */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Mobile Hamburger */}
                    <button
                        onClick={toggleSidebar}
                        className={`lg:hidden p-2 rounded-xl transition-colors ${isDarkMode
                            ? 'hover:bg-gray-800 text-gray-400'
                            : 'hover:bg-gray-100 text-gray-600'
                            }`}
                    >
                        <FiMenu className="w-5 h-5" />
                    </button>
                    <div className={`p-1.5 sm:p-2 rounded-xl ${isDarkMode
                        ? "bg-gradient-to-br from-blue-800/30 to-cyan-800/30 border border-gray-800"
                        : "bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200"
                        }`}>
                        <img
                            src={ib}
                            alt="Logo"
                            className="w-6 h-6 sm:w-7 sm:h-7 object-contain scale-125"
                        />
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            IndusBot
                        </h1>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Industrial Machine Assistant
                        </p>
                    </div>
                </div>

                {/* Right side - Controls */}
                <div className="flex items-center gap-4">
                    {/* Custom Machine Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        {/* Dropdown Trigger Button */}
                        <button
                            onClick={() => setMachineDropdownOpen(!machineDropdownOpen)}
                            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 min-w-[160px] sm:min-w-[290px] ${machineDropdownOpen
                                ? isDarkMode
                                    ? 'bg-gray-800 border-2 border-blue-500/50 ring-2 ring-blue-500/20'
                                    : 'bg-white border-2 border-blue-500/50 ring-2 ring-blue-500/20 shadow-lg'
                                : isDarkMode
                                    ? selectedMachine
                                        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                                        : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                                    : selectedMachine
                                        ? 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
                                        : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
                                }`}
                        >
                            {/* Status Dot */}
                            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${selectedMachineData
                                ? `${getStatusColor(selectedMachineData.status)} ${selectedMachineData.status === 'online' ? 'animate-pulse' : ''}`
                                : 'bg-gray-400'
                                }`} />

                            {/* Selected Machine Text */}
                            <div className="flex-1 text-left">
                                <p className={`text-sm font-medium ${selectedMachineData
                                    ? isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    {selectedMachineData ? selectedMachineData.name : 'Select Machine'}
                                </p>
                            </div>

                            {/* Chevron */}
                            <motion.div
                                animate={{ rotate: machineDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FiChevronDown className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            </motion.div>
                        </button>

                        {/* Dropdown Panel */}
                        <AnimatePresence>
                            {machineDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                    className={`absolute right-0 top-full mt-2 w-72 rounded-xl overflow-hidden z-[100] ${isDarkMode
                                        ? 'bg-gray-800 border border-gray-700 shadow-2xl shadow-black/50'
                                        : 'bg-white border border-gray-200 shadow-2xl shadow-gray-300/50'
                                        }`}
                                >
                                    {/* Dropdown Header */}
                                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <p className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            Available Machines
                                        </p>
                                    </div>

                                    {/* Machine Options */}
                                    <div className="py-1.5 max-h-[280px] overflow-y-auto">
                                        {machines.map((machine, index) => (
                                            <motion.button
                                                key={machine.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.04 }}
                                                onClick={() => {
                                                    setSelectedMachine(machine.id);
                                                    setMachineDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 ${selectedMachine === machine.id
                                                    ? isDarkMode
                                                        ? 'bg-blue-900/30 border-l-2 border-blue-500'
                                                        : 'bg-blue-50 border-l-2 border-blue-500'
                                                    : isDarkMode
                                                        ? 'hover:bg-gray-700/50 border-l-2 border-transparent'
                                                        : 'hover:bg-gray-50 border-l-2 border-transparent'
                                                    }`}
                                            >
                                                {/* Machine Icon */}
                                                <div className={`p-2 rounded-lg flex-shrink-0 ${selectedMachine === machine.id
                                                    ? isDarkMode
                                                        ? 'bg-blue-900/40 text-blue-400'
                                                        : 'bg-blue-100 text-blue-600'
                                                    : isDarkMode
                                                        ? 'bg-gray-700 text-gray-400'
                                                        : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    <FiCpu className="w-4 h-4" />
                                                </div>

                                                {/* Machine Info */}
                                                <div className="flex-1 text-left">
                                                    <p className={`text-sm font-medium ${selectedMachine === machine.id
                                                        ? isDarkMode ? 'text-blue-400' : 'text-blue-700'
                                                        : isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                                        }`}>
                                                        {machine.name}
                                                    </p>
                                                </div>

                                                {/* Status Badge */}
                                                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${machine.status === 'online'
                                                    ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'
                                                    : machine.status === 'maintenance'
                                                        ? isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-600'
                                                        : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(machine.status)} ${machine.status === 'online' ? 'animate-pulse' : ''}`} />
                                                    <span className="font-medium">{getStatusLabel(machine.status)}</span>
                                                </div>

                                                {/* Selected Check */}
                                                {selectedMachine === machine.id && (
                                                    <FiCheckCircle className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Dropdown Footer */}
                                    {selectedMachine && (
                                        <div className={`px-4 py-2.5 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                            <button
                                                onClick={() => {
                                                    setSelectedMachine('');
                                                    setMachineDropdownOpen(false);
                                                }}
                                                className={`w-full text-xs text-center py-1.5 rounded-lg transition-colors ${isDarkMode
                                                    ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
                                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                Clear Selection
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
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
                            <div className={`relative mb-4 inline-block p-3 sm:p-6 rounded-2xl ${isDarkMode
                                ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                                : "bg-white border border-gray-200 shadow-lg"
                                }`}>
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 animate-pulse`}></div>
                                <div className={`p-4 sm:p-7 rounded-xl ${isDarkMode
                                    ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30"
                                    : "bg-gradient-to-br from-blue-50 to-cyan-50"
                                    }`}>
                                    <img
                                        src={ib}
                                        alt="Machine"
                                        className="w-24 h-24 sm:w-44 sm:h-44 mx-auto object-contain scale-125"
                                    />
                                </div>
                            </div>

                            {/* Welcome Text */}
                            <h1 className={`text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                                Welcome to <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">IndusBot AI</span>
                            </h1>
                            <p className={`text-sm sm:text-lg mb-3 sm:mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
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
                                <div className="glow-border-wrapper rounded-2xl p-[1px]">
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
                                        className={`flex-1 bg-transparent px-3 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:outline-none disabled:opacity-50 ${isDarkMode ? "placeholder-gray-500" : "placeholder-gray-400"}`}
                                    />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!selectedMachine || !question.trim()}
                                            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${!selectedMachine || !question.trim()
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
                        <div className={`flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 pt-8 sm:pt-12 pb-2 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent ${isDarkMode
                            ? "bg-gray-900/50"
                            : "bg-gray-50"
                            }`}>
                            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
                                {messages.map((msg, i) => {
                                    const bubble = getBubbleClasses(msg.sender);
                                    return (
                                        <div
                                            key={i}
                                            className="animate-message-in flex gap-3 sm:gap-4 w-full items-start"
                                        >
                                            {/* Left Column: Bot Avatar */}
                                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                                                {msg.sender !== "user" && (
                                                    <div className={`w-full h-full rounded-full flex items-center justify-center ${isDarkMode
                                                        ? "bg-gray-800 border border-gray-700"
                                                        : "bg-white border border-gray-200"
                                                        }`}>
                                                        <img
                                                            src={ib3}
                                                            alt="Bot"
                                                            className="w-5 h-5 sm:w-7 sm:h-7 object-contain scale-125"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Middle Column: Container (Flex-1) */}
                                            <div className="flex-1 flex flex-col min-w-0">
                                                {/* Actual Bubble (Shrink-to-fit) */}
                                                <div className={`max-w-full w-fit ${bubble.container} ${msg.sender === "user" ? "ml-auto" : "mr-auto"} text-left`}>
                                                    {/* Message Header */}
                                                    <div className="flex items-center justify-start gap-4 mb-3">
                                                        <span className={`text-sm font-semibold ${bubble.header}`}>
                                                            {msg.sender === "user" ? "You" : "IndusBot"}
                                                        </span>
                                                        <span className={`text-xs flex items-center gap-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                            <FiClock className="w-3 h-3" />
                                                            {formatTimestamp()}
                                                        </span>
                                                    </div>

                                                    {/* Message Text */}
                                                    <div className={`leading-relaxed ${bubble.text}`}>
                                                        {/* Message Content with Enhanced Typography */}
                                                        <div className="message-content">
                                                            <ReactMarkdown
                                                                components={{
                                                                    // Custom heading styles
                                                                    h1: ({ node, ...props }) => (
                                                                        <h1 className={`text-2xl font-bold mt-4 mb-2 first:mt-0 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`} {...props} />
                                                                    ),
                                                                    h2: ({ node, ...props }) => (
                                                                        <h2 className={`text-xl font-semibold mt-3 mb-2 first:mt-0 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} {...props} />
                                                                    ),
                                                                    h3: ({ node, ...props }) => (
                                                                        <h3 className={`text-lg font-semibold mt-3 mb-2 first:mt-0 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} {...props} />
                                                                    ),

                                                                    // Paragraph with better spacing
                                                                    p: ({ node, ...props }) => (
                                                                        <p className={`mb-3 last:mb-0 leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} {...props} />
                                                                    ),

                                                                    // Code blocks with syntax highlighting style
                                                                    code: ({ node, inline, className, children, ...props }) => {
                                                                        const match = /language-(\w+)/.exec(className || '');
                                                                        return !inline ? (
                                                                            <div className={`rounded-lg overflow-hidden my-3 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                                                                                <div className={`px-4 py-2 text-xs font-mono border-b ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-200 border-gray-300 text-gray-600'}`}>
                                                                                    {match ? match[1] : 'code'}
                                                                                </div>
                                                                                <pre className={`p-4 overflow-x-auto text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                                                                                    <code className={className} {...props}>
                                                                                        {children}
                                                                                    </code>
                                                                                </pre>
                                                                            </div>
                                                                        ) : (
                                                                            <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-blue-600'}`} {...props}>
                                                                                {children}
                                                                            </code>
                                                                        );
                                                                    },

                                                                    // Lists with proper indentation
                                                                    ul: ({ node, ...props }) => (
                                                                        <ul className={`list-disc pl-5 mb-3 space-y-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} {...props} />
                                                                    ),
                                                                    ol: ({ node, ...props }) => (
                                                                        <ol className={`list-decimal pl-5 mb-3 space-y-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} {...props} />
                                                                    ),
                                                                    li: ({ node, ...props }) => (
                                                                        <li className="mb-1" {...props} />
                                                                    ),

                                                                    // Blockquotes for important notes
                                                                    blockquote: ({ node, ...props }) => (
                                                                        <blockquote className={`border-l-4 pl-4 my-3 py-2 ${isDarkMode
                                                                            ? 'border-blue-500 bg-blue-900/20 text-gray-300'
                                                                            : 'border-blue-500 bg-blue-50 text-gray-700'}`} {...props} />
                                                                    ),

                                                                    // Links with better styling
                                                                    a: ({ node, ...props }) => (
                                                                        <a className={`underline decoration-2 underline-offset-2 transition-colors ${isDarkMode
                                                                            ? 'text-blue-400 hover:text-blue-300'
                                                                            : 'text-blue-600 hover:text-blue-700'}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            {...props} />
                                                                    ),

                                                                    // Tables for structured data
                                                                    table: ({ node, ...props }) => (
                                                                        <div className="overflow-x-auto my-3">
                                                                            <table className={`min-w-full border-collapse rounded-lg overflow-hidden ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} {...props} />
                                                                        </div>
                                                                    ),
                                                                    th: ({ node, ...props }) => (
                                                                        <th className={`px-3 py-2 text-left text-sm font-semibold border ${isDarkMode
                                                                            ? 'bg-gray-800 border-gray-700 text-gray-200'
                                                                            : 'bg-gray-50 border-gray-200 text-gray-800'}`} {...props} />
                                                                    ),
                                                                    td: ({ node, ...props }) => (
                                                                        <td className={`px-3 py-2 text-sm border ${isDarkMode
                                                                            ? 'border-gray-700 text-gray-300'
                                                                            : 'border-gray-200 text-gray-700'}`} {...props} />
                                                                    ),

                                                                    // Emphasis and strong text
                                                                    em: ({ node, ...props }) => (
                                                                        <em className={`italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} {...props} />
                                                                    ),
                                                                    strong: ({ node, ...props }) => (
                                                                        <strong className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`} {...props} />
                                                                    ),

                                                                    // Horizontal rule
                                                                    hr: ({ node, ...props }) => (
                                                                        <hr className={`my-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} {...props} />
                                                                    ),
                                                                }}
                                                            >
                                                                {msg.text}
                                                            </ReactMarkdown>
                                                        </div>

                                                        {/* Optional: Add a subtle gradient fade for long messages */}
                                                        {msg.text && msg.text.length > 1000 && (
                                                            <div className={`relative mt-2 pt-2 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                <span>End of message</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                        {/* Message Actions */}
                                                        <div className={`flex items-center gap-2 mt-1 pt-1 border-t ${bubble.actions}`}>
                                                            <button
                                                                onClick={() => handleCopy(msg.text, i)}
                                                                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${copiedId === i
                                                                    ? "bg-green-500/20 text-green-500 border border-green-500/30"
                                                                    : bubble.actionBtn
                                                                    }`}>
                                                                {copiedId === i ? (
                                                                    <>
                                                                        <FiCheck className="w-3 h-3" />
                                                                        Copied
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FiCopy className="w-3 h-3" />
                                                                        Copy
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            {/* Right Column: User Avatar */}
                                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                                                {msg.sender === "user" && (
                                                    <div className={`w-full h-full rounded-full flex items-center justify-center ${isDarkMode
                                                        ? "bg-blue-900/50 border border-blue-800/50"
                                                        : "bg-blue-100 border border-blue-200"
                                                        }`}>
                                                        <FiUser className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Typing Indicator */}
                                {loading && (
                                    <div className="animate-fade-in flex gap-4">
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
                                        <div className="flex-1 flex flex-col min-w-0">
                                            <div className={`w-fit rounded-2xl p-5 mr-auto ${isDarkMode
                                                ? "bg-gray-800/50 border border-gray-700"
                                                : "bg-white border border-gray-200 shadow-sm"
                                                }`}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex gap-1">
                                                        {[0, 1, 2].map((dot) => (
                                                            <div
                                                                key={dot}
                                                                className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-blue-400" : "bg-blue-500"}`}
                                                                style={{
                                                                    animation: `typing 1.4s infinite ${dot * 0.2}s`
                                                                }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        Analyzing your query...
                                                    </span>
                                                </div>
                                                <div className={`text-xs mt-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                    Searching knowledge base and machine schematics
                                                </div>
                                            </div>
                                        </div>
                                        {/* Right Spacer for Typing Indicator */}
                                        <div className="flex-shrink-0 w-10 h-10"></div>
                                    </div>
                                )}

                                {/* Auto-scroll anchor */}
                                <div ref={messagesEndRef} className="h-0" />
                            </div>
                        </div>

                        {/* Input Area - Fixed at Bottom */}
                        <div className={`sticky bottom-0 p-2 sm:p-3 border-t ${isDarkMode
                            ? "bg-gray-900/95 backdrop-blur-sm border-gray-800"
                            : "bg-white/95 backdrop-blur-sm border-gray-200"
                            }`}>
                            <div className="max-w-5xl mx-auto">
                                {/* Status Bar */}
                                <div className={`flex items-center justify-between mb-2 sm:mb-3 px-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                    }`}>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        {selectedMachine && (
                                            <>
                                                <div className={`w-2 h-2 rounded-full ${loading ? "bg-amber-500 animate-pulse" : "bg-green-500"
                                                    }`}></div>
                                                <span className="hidden sm:inline">Connected to <span className="font-semibold">{selectedMachine}</span></span>
                                                <span className="sm:hidden"><span className="font-semibold">{selectedMachine}</span></span>
                                            </>
                                        )}
                                    </div>
                                    {/* <div className="text-xs hidden sm:block">
                                        {messages.length} messages • Press Enter to send
                                    </div> */}
                                </div>

                                {/* Input Container */}
                                <div className="glow-border-wrapper rounded-2xl p-[1px]">
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
                                            className="flex-1 bg-transparent py-3 sm:py-4 text-sm sm:text-base focus:outline-none disabled:opacity-50"
                                        />
                                    </div>
                                    <button
                                        onClick={sendMessage}
                                        disabled={!selectedMachine || !question.trim()}
                                        className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${!selectedMachine || !question.trim()
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