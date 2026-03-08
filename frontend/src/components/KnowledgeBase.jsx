import React, { useState, useEffect } from 'react';
import {
    FiSearch,
    FiArrowLeft,
    FiPlus,
    FiEdit3,
    FiTrash2,
    FiChevronRight,
    FiTag,
    FiClock,
    FiDatabase,
    FiBookOpen,
    FiBookmark,
    FiFileText,
    FiAlertCircle,
    FiCheckCircle,
    FiFilter,
    FiDownload,
    FiShare2,
    FiStar,
    FiEye,
    FiCalendar,
    FiUser,
    FiLayers
} from 'react-icons/fi';
import {
    TbDatabase,
    TbFileText,
    TbFileInfo,
    TbAlertTriangle,
    TbTools,
    TbRuler,
    TbCode
} from 'react-icons/tb';
import {
    MdOutlineError,
    MdOutlineBuild,
    MdOutlinePrecisionManufacturing,
    MdOutlineSafetyDivider,
    MdOutlineArticle
} from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const KnowledgeBase = ({ isDarkMode, onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('all');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('recent');
    const [showFilters, setShowFilters] = useState(false);
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const tags = [
        { id: 'all', label: 'All Articles', icon: FiDatabase, color: 'blue' },
        { id: 'error-codes', label: 'Error Codes', icon: MdOutlineError, color: 'red' },
        { id: 'maintenance', label: 'Maintenance', icon: TbTools, color: 'yellow' },
        { id: 'operations', label: 'Operations', icon: MdOutlinePrecisionManufacturing, color: 'green' },
        { id: 'safety', label: 'Safety', icon: TbAlertTriangle, color: 'orange' },
        { id: 'calibration', label: 'Calibration', icon: TbRuler, color: 'purple' },
    ];

    const articles = [
        {
            id: 1,
            title: 'Error E-102: Overheating Sensor',
            content: 'When error E-102 occurs, the overheating sensor has detected temperatures above the safe threshold. Immediate machine shutdown is recommended. The system will automatically initiate a cooldown cycle and log the incident for analysis.',
            tags: ['error-codes', 'safety'],
            createdAt: '2026-03-07',
            author: 'System Admin',
            views: 1245,
            bookmarks: 89,
            priority: 'high',
            readTime: '3 min'
        },
        {
            id: 2,
            title: 'Weekly Maintenance Checklist',
            content: 'A comprehensive checklist for weekly maintenance routines including lubrication, belt inspection, and electrical connections check. Follow these steps to ensure optimal machine performance and prevent unexpected downtime.',
            tags: ['maintenance'],
            createdAt: '2026-03-05',
            author: 'Maintenance Team',
            views: 2341,
            bookmarks: 156,
            priority: 'medium',
            readTime: '5 min'
        },
        {
            id: 3,
            title: 'Standard Operating Procedure - CNC Mill',
            content: 'Step-by-step operating procedure for CNC milling machines including startup, operation, and shutdown sequences. Includes safety protocols and quality control checkpoints.',
            tags: ['operations'],
            createdAt: '2026-03-04',
            author: 'Operations Lead',
            views: 3120,
            bookmarks: 203,
            priority: 'medium',
            readTime: '8 min'
        },
        {
            id: 4,
            title: 'Error E-205: Pressure Drop',
            content: 'Error E-205 indicates a sudden pressure drop in the hydraulic system. Check for leaks in hoses and fittings before restarting. Monitor pressure gauges and perform system diagnostics.',
            tags: ['error-codes'],
            createdAt: '2026-03-03',
            author: 'System Admin',
            views: 876,
            bookmarks: 45,
            priority: 'high',
            readTime: '4 min'
        },
        {
            id: 5,
            title: 'Machine Calibration Procedure',
            content: 'Detailed calibration procedure for precision machines. Includes tolerance settings and verification steps. Ensure all measurements are within specified ranges before production start.',
            tags: ['calibration', 'maintenance'],
            createdAt: '2026-03-02',
            author: 'QA Engineer',
            views: 1892,
            bookmarks: 134,
            priority: 'high',
            readTime: '6 min'
        },
        {
            id: 6,
            title: 'Emergency Shutdown Protocol',
            content: 'Emergency procedures for immediate machine shutdown in case of fire, electrical fault, or mechanical failure. All operators must be familiar with these critical steps.',
            tags: ['safety', 'operations'],
            createdAt: '2026-03-01',
            author: 'Safety Officer',
            views: 3421,
            bookmarks: 278,
            priority: 'critical',
            readTime: '3 min'
        },
        {
            id: 7,
            title: 'Laser Alignment Guide',
            content: 'How to properly align the laser cutting head for optimal precision and minimal material waste. Includes step-by-step alignment process and verification methods.',
            tags: ['calibration', 'operations'],
            createdAt: '2026-02-28',
            author: 'Technical Lead',
            views: 1456,
            bookmarks: 98,
            priority: 'medium',
            readTime: '5 min'
        },
        {
            id: 8,
            title: 'Monthly Lubrication Schedule',
            content: 'Detailed schedule for lubricating all moving parts of industrial machines on a monthly cycle. Includes lubricant specifications and application points.',
            tags: ['maintenance'],
            createdAt: '2026-02-25',
            author: 'Maintenance Team',
            views: 987,
            bookmarks: 67,
            priority: 'low',
            readTime: '4 min'
        },
    ];

    const getFilteredArticles = () => {
        let filtered = articles.filter((article) => {
            const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
            const matchesSearch =
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.author.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTag && matchesSearch;
        });

        // Sort articles
        switch (sortBy) {
            case 'recent':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'popular':
                filtered.sort((a, b) => b.views - a.views);
                break;
            case 'bookmarked':
                filtered.sort((a, b) => b.bookmarks - a.bookmarks);
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredArticles = getFilteredArticles();

    const getTagColor = (tag) => {
        const tagInfo = tags.find(t => t.id === tag) || { color: 'gray' };
        const color = tagInfo.color;
        
        const colors = {
            red: isDarkMode ? 'bg-red-900/40 text-red-400 border-red-800/40' : 'bg-red-50 text-red-600 border-red-200',
            yellow: isDarkMode ? 'bg-yellow-900/40 text-yellow-400 border-yellow-800/40' : 'bg-yellow-50 text-yellow-600 border-yellow-200',
            green: isDarkMode ? 'bg-green-900/40 text-green-400 border-green-800/40' : 'bg-green-50 text-green-600 border-green-200',
            orange: isDarkMode ? 'bg-orange-900/40 text-orange-400 border-orange-800/40' : 'bg-orange-50 text-orange-600 border-orange-200',
            purple: isDarkMode ? 'bg-purple-900/40 text-purple-400 border-purple-800/40' : 'bg-purple-50 text-purple-600 border-purple-200',
            blue: isDarkMode ? 'bg-blue-900/40 text-blue-400 border-blue-800/40' : 'bg-blue-50 text-blue-600 border-blue-200',
            default: isDarkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-200',
        };
        
        return colors[color] || colors.default;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical':
                return isDarkMode ? 'bg-red-900/60 text-red-400 border-red-800' : 'bg-red-100 text-red-700 border-red-300';
            case 'high':
                return isDarkMode ? 'bg-orange-900/60 text-orange-400 border-orange-800' : 'bg-orange-100 text-orange-700 border-orange-300';
            case 'medium':
                return isDarkMode ? 'bg-blue-900/60 text-blue-400 border-blue-800' : 'bg-blue-100 text-blue-700 border-blue-300';
            case 'low':
                return isDarkMode ? 'bg-green-900/60 text-green-400 border-green-800' : 'bg-green-100 text-green-700 border-green-300';
            default:
                return isDarkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const toggleBookmark = (articleId) => {
        setBookmarkedArticles(prev =>
            prev.includes(articleId)
                ? prev.filter(id => id !== articleId)
                : [...prev, articleId]
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
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
            {/* Animated Background */}
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
                        ? 'bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5'
                        : 'bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5'
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
                        ? 'bg-gradient-to-tr from-purple-500/5 via-pink-500/5 to-orange-500/5'
                        : 'bg-gradient-to-tr from-cyan-500/5 via-blue-500/5 to-indigo-500/5'
                        } blur-3xl`}
                />
            </div>

            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`relative px-4 sm:px-6 py-4 border-b backdrop-blur-sm ${isDarkMode
                    ? 'border-gray-800 bg-gray-900/50'
                    : 'border-gray-200 bg-white/50'
                    } z-10`}
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
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatDelay: 2
                                    }}
                                >
                                    <FiBookOpen className={`w-6 h-6 sm:w-7 sm:h-7 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                </motion.div>
                                Knowledge Base
                            </motion.h1>
                            <motion.p
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                                Browse articles, error codes, and machine documentation
                            </motion.p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* View Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                            className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 ${isDarkMode
                                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {viewMode === 'grid' ? <FiLayers className="w-4 h-4" /> : <FiFileText className="w-4 h-4" />}
                        </motion.button>

                        {/* Filter Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFilters(!showFilters)}
                            className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 ${showFilters
                                ? 'bg-blue-600 text-white'
                                : isDarkMode
                                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <FiFilter className="w-4 h-4" />
                        </motion.button>

                        {/* New Article Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium text-xs sm:text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                        >
                            <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">New Article</span>
                        </motion.button>
                    </div>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-7xl mx-auto mt-4"
                >
                    <div className="relative">
                        <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Search articles, error codes, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl border text-sm sm:text-base transition-all duration-200 ${isDarkMode
                                ? 'bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                } outline-none`}
                        />
                    </div>
                </motion.div>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className={`mt-4 p-4 rounded-xl border ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'}`}>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sort By</p>
                                        <div className="flex gap-2">
                                            {['recent', 'popular', 'bookmarked'].map((option) => (
                                                <motion.button
                                                    key={option}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setSortBy(option)}
                                                    className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${sortBy === option
                                                        ? 'bg-blue-600 text-white'
                                                        : isDarkMode
                                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {option}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    className="max-w-7xl mx-auto space-y-6"
                >
                    {/* Tags Filter */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                        {tags.map((tag) => {
                            const TagIcon = tag.icon;
                            return (
                                <motion.button
                                    key={tag.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedTag(tag.id)}
                                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${selectedTag === tag.id
                                        ? `bg-gradient-to-r from-${tag.color}-600 to-${tag.color}-500 text-white shadow-lg shadow-${tag.color}-500/30`
                                        : isDarkMode
                                            ? 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 border border-gray-700'
                                            : 'bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    <TagIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    {tag.label}
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Total Articles', value: articles.length, icon: MdOutlineArticle, color: 'blue' },
                            { label: 'Error Codes', value: articles.filter(a => a.tags.includes('error-codes')).length, icon: TbCode, color: 'red' },
                            { label: 'Categories', value: tags.length - 1, icon: FiTag, color: 'green' },
                            { label: 'Contributors', value: [...new Set(articles.map(a => a.author))].length, icon: FiUser, color: 'purple' },
                        ].map((stat, i) => {
                            const StatIcon = stat.icon;
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className={`p-3 sm:p-4 rounded-xl border backdrop-blur-sm relative overflow-hidden group ${isDarkMode
                                        ? 'bg-gray-900/50 border-gray-800'
                                        : 'bg-white/50 border-gray-200'
                                        }`}
                                >
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at 50% 50%, ${isDarkMode ? `rgba(59, 130, 246, 0.1)` : `rgba(59, 130, 246, 0.05)`} 0%, transparent 70%)`
                                        }}
                                    />
                                    <div className={`mb-2 ${isDarkMode ? `text-${stat.color}-400` : `text-${stat.color}-600`}`}>
                                        <StatIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <p className="text-lg sm:text-xl font-bold">{stat.value}</p>
                                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Article Count */}
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Showing <span className="font-semibold text-blue-500">{filteredArticles.length}</span> articles
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            Last updated today
                        </p>
                    </motion.div>

                    {/* Articles Grid/List */}
                    <motion.div
                        variants={containerVariants}
                        className={viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                            : 'space-y-3'
                        }
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.length === 0 ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="col-span-full text-center py-16 px-4"
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
                                        <FiSearch className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                                    </motion.div>
                                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        No articles found
                                    </h3>
                                    <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                        Try adjusting your search or filter criteria
                                    </p>
                                </motion.div>
                            ) : (
                                filteredArticles.map((article) => (
                                    <motion.div
                                        key={article.id}
                                        layout
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.01, y: viewMode === 'grid' ? -2 : -1 }}
                                        onClick={() => setSelectedArticle(article.id === selectedArticle ? null : article.id)}
                                        className={`relative overflow-hidden group cursor-pointer ${viewMode === 'grid'
                                            ? 'p-4 sm:p-5 rounded-xl border backdrop-blur-sm'
                                            : 'p-4 rounded-xl border backdrop-blur-sm'
                                            } ${selectedArticle === article.id
                                                ? isDarkMode
                                                    ? 'border-blue-500/50 bg-gradient-to-br from-gray-800 to-gray-900'
                                                    : 'border-blue-500/50 bg-gradient-to-br from-white to-blue-50/50'
                                                : isDarkMode
                                                    ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
                                                    : 'bg-white/50 border-gray-200 hover:border-gray-300 hover:shadow-lg hover:bg-white'
                                            }`}
                                    >
                                        {/* Animated background on hover */}
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: `radial-gradient(circle at ${article.id * 20}% ${article.id * 30}%, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 0%, transparent 70%)`
                                            }}
                                        />

                                        <div className="relative">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {article.priority === 'critical' && (
                                                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(article.priority)}`}>
                                                            Critical
                                                        </span>
                                                    )}
                                                    {article.tags.slice(0, viewMode === 'grid' ? 2 : 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${getTagColor(tag)}`}
                                                        >
                                                            {tags.find(t => t.id === tag)?.icon && (
                                                                <span>{React.createElement(tags.find(t => t.id === tag).icon, { className: 'w-3 h-3' })}</span>
                                                            )}
                                                            <span className="hidden sm:inline">{tags.find((t) => t.id === tag)?.label || tag}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleBookmark(article.id);
                                                    }}
                                                    className={`p-1.5 rounded-lg transition-colors ${bookmarkedArticles.includes(article.id)
                                                        ? 'text-yellow-500'
                                                        : isDarkMode
                                                            ? 'text-gray-600 hover:text-gray-400'
                                                            : 'text-gray-400 hover:text-gray-600'
                                                        }`}
                                                >
                                                    <FiStar className={`w-4 h-4 ${bookmarkedArticles.includes(article.id) ? 'fill-yellow-500' : ''}`} />
                                                </motion.button>
                                            </div>

                                            <h3 className={`font-semibold text-sm sm:text-base mb-2 ${viewMode === 'grid' ? 'line-clamp-2' : ''}`}>
                                                {article.title}
                                            </h3>
                                            
                                            <p className={`text-xs sm:text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-2'}`}>
                                                {article.content}
                                            </p>

                                            <div className="flex items-center gap-3 flex-wrap text-xs">
                                                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    <FiEye className="w-3 h-3" />
                                                    {article.views.toLocaleString()}
                                                </span>
                                                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    <FiStar className="w-3 h-3" />
                                                    {article.bookmarks}
                                                </span>
                                                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    <FiClock className="w-3 h-3" />
                                                    {article.readTime}
                                                </span>
                                                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    <FiUser className="w-3 h-3" />
                                                    <span className="truncate max-w-[80px]">{article.author}</span>
                                                </span>
                                            </div>

                                            {/* Expanded Content */}
                                            <AnimatePresence>
                                                {selectedArticle === article.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                                                                {article.content}
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                        <FiCalendar className="inline w-3 h-3 mr-1" />
                                                                        {article.createdAt}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                                                                    >
                                                                        <FiShare2 className="w-4 h-4" />
                                                                    </motion.button>
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                                                                    >
                                                                        <FiDownload className="w-4 h-4" />
                                                                    </motion.button>
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-500'}`}
                                                                    >
                                                                        <FiEdit3 className="w-4 h-4" />
                                                                    </motion.button>
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'}`}
                                                                    >
                                                                        <FiTrash2 className="w-4 h-4" />
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Chevron indicator for expandable */}
                                            {viewMode === 'list' && (
                                                <motion.div
                                                    animate={{ rotate: selectedArticle === article.id ? 90 : 0 }}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                                >
                                                    <FiChevronRight className={`w-5 h-5 ${selectedArticle === article.id
                                                        ? 'text-blue-500'
                                                        : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                                                        }`} />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default KnowledgeBase;