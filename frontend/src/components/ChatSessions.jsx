import { useState, useEffect } from 'react';
import {
    FiSearch,
    FiPlus,
    FiMessageSquare,
    FiClock,
    FiTrash2,
    FiChevronRight,
    FiArrowLeft,
    FiArchive,
    FiCheckCircle,
    FiAlertCircle,
    FiCpu,
    FiCalendar,
    FiMessageCircle,
    FiFilter,
} from 'react-icons/fi';
import { TbDeviceAnalytics } from 'react-icons/tb';
import { MdOutlineSmartToy } from 'react-icons/md';
import { BsChatDots } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { getChats, getMessages } from '../services/api';

const ChatSessions = ({ isDarkMode, onBack, onNewChat, onLoadChat }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await getChats();
                const chats = res.data;

                const sessionsData = await Promise.all(
                    chats.map(async (chat) => {
                        let messageCount = 0;
                        let lastMessageText = '';
                        try {
                            const msgRes = await getMessages(chat.id);
                            messageCount = msgRes.data.length;
                            if (msgRes.data.length > 0) {
                                const lastMsg = msgRes.data[msgRes.data.length - 1];
                                lastMessageText = lastMsg.content?.text || '';
                            }
                        } catch (e) {
                            // If messages fetch fails, continue with 0
                        }

                        // Append 'Z' to explicitly parse the Supabase timestamp as UTC
                        const createdAtString = chat.created_at.endsWith('Z') ? chat.created_at : `${chat.created_at}Z`;
                        const createdAt = new Date(createdAtString);
                        const now = new Date();
                        const diffMs = now - createdAt;
                        const diffMins = Math.floor(diffMs / 60000);
                        const diffHours = Math.floor(diffMs / 3600000);
                        const diffDays = Math.floor(diffMs / 86400000);

                        let dateLabel = createdAt.toLocaleDateString();
                        let lastActive = '';
                        if (diffMins < 1) { dateLabel = 'Today'; lastActive = 'Just now'; }
                        else if (diffMins < 60) { dateLabel = 'Today'; lastActive = `${diffMins} minutes ago`; }
                        else if (diffHours < 24) { dateLabel = 'Today'; lastActive = `${diffHours} hours ago`; }
                        else if (diffDays === 1) { dateLabel = 'Yesterday'; lastActive = '1 day ago'; }
                        else if (diffDays < 7) { dateLabel = `${diffDays} days ago`; lastActive = `${diffDays} days ago`; }
                        else { lastActive = dateLabel; }

                        return {
                            id: chat.id,
                            title: chat.title || 'New Chat',
                            lastMessage: lastMessageText || 'No messages yet',
                            time: createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            date: dateLabel,
                            messages: messageCount,
                            status: 'active',
                            machine: chat.machine,
                            priority: 'medium',
                            participants: 1,
                            lastActive: lastActive
                        };
                    })
                );

                setSessions(sessionsData);
                setIsLoaded(true);
            } catch (err) {
                console.error('Failed to fetch chat sessions:', err);
                setIsLoaded(true);
            }
        };
        fetchSessions();
    }, []);

    const filters = [
        { key: 'all', label: 'All', icon: FiMessageSquare },
        { key: 'active', label: 'Active', icon: FiAlertCircle },
        { key: 'completed', label: 'Completed', icon: FiCheckCircle },
        { key: 'archived', label: 'Archived', icon: FiArchive },
    ];

    const filteredSessions = sessions.filter(session => {
        const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.machine.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || session.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'from-emerald-500 to-green-500';
            case 'completed': return 'from-blue-500 to-cyan-500';
            case 'archived': return 'from-gray-500 to-gray-400';
            default: return 'from-gray-500 to-gray-400';
        }
    };

    const getPriorityBadge = (priority) => {
        const colors = {
            high: isDarkMode ? 'bg-rose-900/40 text-rose-400 border-rose-800/40' : 'bg-rose-50 text-rose-700 border-rose-200',
            medium: isDarkMode ? 'bg-amber-900/40 text-amber-400 border-amber-800/40' : 'bg-amber-50 text-amber-700 border-amber-200',
            low: isDarkMode ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800/40' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
        return colors[priority] || colors.medium;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const handleDeleteSession = (e, chatId) => {
        e.stopPropagation();
        setSessions(prev => prev.filter(s => s.id !== chatId));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`h-full flex flex-col ${isDarkMode
                ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white'
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900'
                }`}
        >
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full ${isDarkMode
                        ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5'
                        : 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5'
                        } blur-3xl`}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className={`absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full ${isDarkMode
                        ? 'bg-gradient-to-tr from-purple-500/5 to-pink-500/5'
                        : 'bg-gradient-to-tr from-cyan-500/5 to-blue-500/5'
                        } blur-3xl`}
                />
            </div>

            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`relative px-4 sm:px-6 py-3 border-b backdrop-blur-sm ${isDarkMode
                    ? 'border-gray-800 bg-gray-900/50'
                    : 'border-gray-200 bg-white/50'
                    }`}
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onBack}
                            className={`p-2 rounded-xl transition-all duration-200 ${isDarkMode
                                ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </motion.button>
                        <div>
                            <motion.h1
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl sm:text-2xl font-bold flex items-center gap-2"
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }}
                                >
                                    <MdOutlineSmartToy className={`w-6 h-6 sm:w-7 sm:h-7 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                </motion.div>
                                Chat Sessions
                            </motion.h1>
                            <motion.p
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                                Manage and review your conversation history
                            </motion.p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNewChat}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium text-xs sm:text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                    >
                        <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">New Chat</span>
                        <span className="sm:hidden">New</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`relative px-4 sm:px-6 py-4 backdrop-blur-sm ${isDarkMode ? 'bg-gray-900/30' : 'bg-white/30'
                    }`}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Mobile Filter Toggle */}
                    <div className="sm:hidden flex gap-2 mb-3">
                        <div className="relative flex-1">
                            <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all duration-200 ${isDarkMode
                                    ? 'bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    } outline-none`}
                            />
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className={`p-3 rounded-xl ${activeFilter !== 'all'
                                ? 'bg-blue-600 text-white'
                                : isDarkMode
                                    ? 'bg-gray-800 text-gray-400'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <FiFilter className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {/* Filters - Desktop */}
                    <div className="hidden sm:flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search sessions by title, machine, or content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all duration-200 ${isDarkMode
                                    ? 'bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    } outline-none`}
                            />
                        </div>
                        <div className="flex gap-2">
                            {filters.map((filter) => {
                                const Icon = filter.icon;
                                return (
                                    <motion.button
                                        key={filter.key}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveFilter(filter.key)}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeFilter === filter.key
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                                            : isDarkMode
                                                ? 'bg-gray-800/80 text-gray-400 hover:bg-gray-700'
                                                : 'bg-white/80 text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {filter.label}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Filters Dropdown */}
                    <AnimatePresence>
                        {showMobileFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="sm:hidden overflow-hidden"
                            >
                                <div className={`mt-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex flex-col gap-1">
                                        {filters.map((filter) => {
                                            const Icon = filter.icon;
                                            return (
                                                <motion.button
                                                    key={filter.key}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setActiveFilter(filter.key);
                                                        setShowMobileFilters(false);
                                                    }}
                                                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${activeFilter === filter.key
                                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                                                        : isDarkMode
                                                            ? 'text-gray-400 hover:bg-gray-700'
                                                            : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    {filter.label}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    className="space-y-3 max-w-7xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSessions.length === 0 ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="text-center py-16 px-4"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <BsChatDots className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                                </motion.div>
                                <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    No sessions found
                                </h3>
                                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Try adjusting your search or filter criteria
                                </p>
                            </motion.div>
                        ) : (
                            filteredSessions.map((chat, index) => (
                                <motion.div
                                    key={chat.id}
                                    layout
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    whileHover={{ scale: 1.01, y: -2 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => onLoadChat && onLoadChat(chat.id, chat.machine)}
                                    className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer group relative overflow-hidden ${isDarkMode
                                        ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
                                        : 'bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-lg hover:bg-white'
                                    }`}
                                >
                                    {/* Animated Gradient Background on Hover */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at ${index * 20}% ${index * 30}%, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 0%, transparent 50%)`
                                        }}
                                    />

                                    <div className="flex items-start justify-between relative z-10">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                                <div className="flex items-center gap-2">
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                            opacity: [0.5, 1, 0.5]
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: chat.status === 'active' ? Infinity : 0,
                                                            repeatDelay: 1
                                                        }}
                                                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${getStatusColor(chat.status)}`}
                                                    />
                                                    <h3 className="font-semibold text-sm sm:text-base truncate max-w-[150px] sm:max-w-xs">
                                                        {chat.title}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${getPriorityBadge(chat.priority)}`}>
                                                        {chat.priority}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${isDarkMode
                                                        ? chat.status === 'active'
                                                            ? 'bg-green-900/40 text-green-400 border-green-800/40'
                                                            : chat.status === 'completed'
                                                                ? 'bg-blue-900/40 text-blue-400 border-blue-800/40'
                                                                : 'bg-gray-800 text-gray-400 border-gray-700'
                                                        : chat.status === 'active'
                                                            ? 'bg-green-50 text-green-700 border-green-200'
                                                            : chat.status === 'completed'
                                                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                                        }`}>
                                                        {chat.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className={`text-xs sm:text-sm mb-3 pl-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {chat.lastMessage}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-3 sm:gap-6 pl-4">
                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`flex items-center gap-1.5 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                                                >
                                                    <FiCalendar className="w-3 h-3" />
                                                    <span className="hidden sm:inline">{chat.date} at {chat.time}</span>
                                                    <span className="sm:hidden">{chat.date}</span>
                                                </motion.span>

                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`flex items-center gap-1.5 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                                                >
                                                    <FiMessageCircle className="w-3 h-3" />
                                                    {chat.messages}
                                                </motion.span>

                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`flex items-center gap-1.5 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                                                >
                                                    <FiCpu className="w-3 h-3" />
                                                    <span className="hidden sm:inline">{chat.machine}</span>
                                                    <span className="sm:hidden truncate max-w-[80px]">{chat.machine}</span>
                                                </motion.span>

                                                {chat.participants && (
                                                    <motion.span
                                                        whileHover={{ scale: 1.05 }}
                                                        className={`hidden sm:flex items-center gap-1.5 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                                                    >
                                                        <TbDeviceAnalytics className="w-3 h-3" />
                                                        {chat.participants} participants
                                                    </motion.span>
                                                )}
                                            </div>

                                            {/* Mobile-only additional info */}
                                            <div className="sm:hidden flex items-center gap-3 mt-2 pl-4">
                                                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    <FiClock className="w-3 h-3 inline mr-1" />
                                                    {chat.lastActive}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => handleDeleteSession(e, chat.id)}
                                                className={`p-1.5 sm:p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ${isDarkMode
                                                    ? 'hover:bg-red-500/10 text-gray-500 hover:text-red-400'
                                                    : 'hover:bg-red-50 text-gray-400 hover:text-red-500'
                                                    }`}
                                            >
                                                <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </motion.button>
                                            <motion.div
                                                className="group-hover:translate-x-1 transition-transform"
                                            >
                                                <FiChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isDarkMode ? 'text-gray-600 group-hover:text-blue-400' : 'text-gray-300 group-hover:text-blue-500'}`} />
                                            </motion.div>
                                        </div>
                                    </div>

                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>

                    {/* Summary Footer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className={`max-w-7xl mx-auto mt-6 pt-4 border-t text-center ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
                            }`}
                    >
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            Showing <span className="font-semibold text-blue-500">{filteredSessions.length}</span> of {sessions.length} sessions
                        </p>
                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            Last updated just now
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ChatSessions;