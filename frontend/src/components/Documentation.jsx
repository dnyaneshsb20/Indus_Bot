import { useState, useEffect } from 'react';
import {
    FiFileText,
    FiSearch,
    FiBook,
    FiChevronRight,
    FiArrowLeft,
    FiDownload,
    FiExternalLink,
    FiFolder,
    FiFile,
    FiBookOpen,
    FiClock,
    FiHardDrive,
    FiStar,
    FiTrendingUp,
    FiFilter,
    FiGrid,
    FiList,
    FiEye,
    FiShare2,
    FiInfo,
    FiTag,
    FiCalendar
} from 'react-icons/fi';
import {
    TbFileDescription
} from 'react-icons/tb';
import { 
    MdOutlineDescription, 
    MdOutlineMenuBook,
    MdOutlineCode,
    MdOutlineVideoLibrary,
    MdOutlinePictureAsPdf,
    MdOutlineArticle
} from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Documentation = ({ isDarkMode, onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('recent');
    const [favorites, setFavorites] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const categories = [
        { id: 'all', label: 'All Documents', icon: FiFolder, color: 'blue' },
        { id: 'guides', label: 'User Guides', icon: FiBook, color: 'green' },
        { id: 'manuals', label: 'Machine Manuals', icon: FiFileText, color: 'orange' },
        { id: 'api', label: 'API Reference', icon: MdOutlineCode, color: 'purple' },
        { id: 'tutorials', label: 'Tutorials', icon: MdOutlineVideoLibrary, color: 'pink' },
    ];

    const documents = [
        {
            id: 1,
            title: 'Getting Started Guide',
            description: 'Learn how to set up and start using IndusBot for your industrial machines. This comprehensive guide covers initial setup, configuration, and basic operations.',
            category: 'guides',
            lastUpdated: '2026-03-01',
            size: '2.4 MB',
            format: 'PDF',
            pages: 24,
            downloads: 1245,
            views: 3421,
            author: 'Technical Writing Team',
            version: 'v2.1.0',
            tags: ['setup', 'beginner', 'configuration']
        },
        {
            id: 2,
            title: 'Machine Configuration Manual',
            description: 'Complete reference for configuring machine parameters and settings. Includes detailed specifications, parameter ranges, and optimization tips.',
            category: 'manuals',
            lastUpdated: '2026-02-28',
            size: '5.1 MB',
            format: 'PDF',
            pages: 156,
            downloads: 892,
            views: 2156,
            author: 'Engineering Team',
            version: 'v3.0.2',
            tags: ['configuration', 'advanced', 'specifications']
        },
        {
            id: 3,
            title: 'API Integration Guide',
            description: 'How to integrate IndusBot with your existing systems via REST API. Includes authentication, endpoints, rate limits, and code examples.',
            category: 'api',
            lastUpdated: '2026-02-25',
            size: '1.8 MB',
            format: 'HTML',
            pages: 0,
            downloads: 2341,
            views: 5678,
            author: 'API Team',
            version: 'v2.5.0',
            tags: ['api', 'integration', 'development']
        },
        {
            id: 4,
            title: 'Troubleshooting Common Errors',
            description: 'Step-by-step solutions for the most frequently encountered errors. Diagnostic procedures and resolution steps for quick problem-solving.',
            category: 'guides',
            lastUpdated: '2026-03-05',
            size: '3.2 MB',
            format: 'PDF',
            pages: 42,
            downloads: 1876,
            views: 4321,
            author: 'Support Team',
            version: 'v1.8.0',
            tags: ['troubleshooting', 'errors', 'diagnostics']
        },
        {
            id: 5,
            title: 'Safety Protocols & Compliance',
            description: 'Industry safety standards and compliance documentation for machine operation. Covers OSHA standards, safety checklists, and emergency procedures.',
            category: 'manuals',
            lastUpdated: '2026-02-20',
            size: '4.7 MB',
            format: 'PDF',
            pages: 89,
            downloads: 654,
            views: 1543,
            author: 'Safety Team',
            version: 'v1.2.0',
            tags: ['safety', 'compliance', 'regulations']
        },
        {
            id: 6,
            title: 'Chat Bot Training Tutorial',
            description: 'Learn how to train and customize the AI chatbot for your specific machines. Includes training data preparation, model tuning, and testing.',
            category: 'tutorials',
            lastUpdated: '2026-03-03',
            size: '1.5 MB',
            format: 'Video',
            pages: 0,
            downloads: 3421,
            views: 7890,
            author: 'AI Team',
            version: 'v1.0.0',
            tags: ['chatbot', 'ai', 'training']
        },
        {
            id: 7,
            title: 'Webhook & Events API',
            description: 'Reference documentation for webhook endpoints and event subscriptions. Learn how to set up real-time notifications and event handling.',
            category: 'api',
            lastUpdated: '2026-02-15',
            size: '900 KB',
            format: 'HTML',
            pages: 0,
            downloads: 1123,
            views: 2987,
            author: 'API Team',
            version: 'v1.5.0',
            tags: ['webhooks', 'events', 'realtime']
        },
        {
            id: 8,
            title: 'Maintenance Scheduling Tutorial',
            description: 'How to set up automated maintenance schedules and alerts. Covers preventive maintenance planning, calendar integration, and notification setup.',
            category: 'tutorials',
            lastUpdated: '2026-03-06',
            size: '2.1 MB',
            format: 'Video',
            pages: 0,
            downloads: 2156,
            views: 4567,
            author: 'Maintenance Team',
            version: 'v2.0.0',
            tags: ['maintenance', 'scheduling', 'automation']
        },
        {
            id: 9,
            title: 'Advanced Calibration Techniques',
            description: 'Deep dive into precision calibration methods for industrial machinery. Includes laser alignment, vibration analysis, and thermal compensation.',
            category: 'guides',
            lastUpdated: '2026-02-18',
            size: '6.2 MB',
            format: 'PDF',
            pages: 78,
            downloads: 543,
            views: 1234,
            author: 'Engineering Team',
            version: 'v1.3.0',
            tags: ['calibration', 'advanced', 'precision']
        },
        {
            id: 10,
            title: 'REST API Reference',
            description: 'Complete API endpoint documentation with request/response examples, authentication methods, and error codes.',
            category: 'api',
            lastUpdated: '2026-03-07',
            size: '2.8 MB',
            format: 'HTML',
            pages: 0,
            downloads: 3124,
            views: 6543,
            author: 'API Team',
            version: 'v3.0.0',
            tags: ['api', 'rest', 'reference']
        },
    ];

    const getFilteredDocs = () => {
        let filtered = documents.filter((doc) => {
            const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
            const matchesSearch =
                doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });

        // Sort documents
        switch (sortBy) {
            case 'recent':
                filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
                break;
            case 'popular':
                filtered.sort((a, b) => b.downloads - a.downloads);
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredDocs = getFilteredDocs();

    const getCategoryIcon = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.icon : FiFileText;
    };

    const getCategoryColor = (categoryId) => {
        const colors = {
            guides: isDarkMode ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-50',
            manuals: isDarkMode ? 'text-orange-400 bg-orange-900/20' : 'text-orange-600 bg-orange-50',
            api: isDarkMode ? 'text-purple-400 bg-purple-900/20' : 'text-purple-600 bg-purple-50',
            tutorials: isDarkMode ? 'text-pink-400 bg-pink-900/20' : 'text-pink-600 bg-pink-50',
            default: isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-100'
        };
        return colors[categoryId] || colors.default;
    };

    const toggleFavorite = (docId) => {
        setFavorites(prev =>
            prev.includes(docId)
                ? prev.filter(id => id !== docId)
                : [...prev, docId]
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
                                    <MdOutlineMenuBook className={`w-6 h-6 sm:w-7 sm:h-7 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                </motion.div>
                                Documentation
                            </motion.h1>
                            <motion.p
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                                Browse guides, manuals, and API references
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
                            {viewMode === 'grid' ? <FiGrid className="w-4 h-4" /> : <FiList className="w-4 h-4" />}
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
                            placeholder="Search documentation by title, description, or tags..."
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
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { value: 'recent', label: 'Most Recent', icon: FiClock },
                                                { value: 'popular', label: 'Most Popular', icon: FiTrendingUp },
                                                { value: 'name', label: 'Name', icon: FiFileText }
                                            ].map((option) => {
                                                const OptionIcon = option.icon;
                                                return (
                                                    <motion.button
                                                        key={option.value}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => setSortBy(option.value)}
                                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${sortBy === option.value
                                                            ? 'bg-blue-600 text-white'
                                                            : isDarkMode
                                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        <OptionIcon className="w-3 h-3" />
                                                        {option.label}
                                                    </motion.button>
                                                );
                                            })}
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
                    {/* Categories */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                        {categories.map((cat) => {
                            const CatIcon = cat.icon;
                            return (
                                <motion.button
                                    key={cat.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${selectedCategory === cat.id
                                        ? `bg-gradient-to-r from-${cat.color}-600 to-${cat.color}-500 text-white shadow-lg shadow-${cat.color}-500/30`
                                        : isDarkMode
                                            ? 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 border border-gray-700'
                                            : 'bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    <CatIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    {cat.label}
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Total Documents', value: documents.length, icon: MdOutlineArticle, color: 'blue' },
                            { label: 'Categories', value: categories.length - 1, icon: FiFolder, color: 'green' },
                            { label: 'Total Downloads', value: documents.reduce((acc, doc) => acc + doc.downloads, 0).toLocaleString(), icon: FiDownload, color: 'purple' },
                            { label: 'Last Updated', value: 'Today', icon: FiClock, color: 'orange' },
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

                    {/* Document Count */}
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Showing <span className="font-semibold text-blue-500">{filteredDocs.length}</span> documents
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            Sorted by {sortBy}
                        </p>
                    </motion.div>

                    {/* Documents Grid/List */}
                    <motion.div
                        variants={containerVariants}
                        className={viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                            : 'space-y-3'
                        }
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredDocs.length === 0 ? (
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
                                        No documents found
                                    </h3>
                                    <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                        Try adjusting your search or category filter
                                    </p>
                                </motion.div>
                            ) : (
                                filteredDocs.map((doc) => {
                                    const CategoryIcon = getCategoryIcon(doc.category);
                                    const categoryColors = getCategoryColor(doc.category);
                                    
                                    return (
                                        <motion.div
                                            key={doc.id}
                                            layout
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                            whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.01, y: viewMode === 'grid' ? -2 : -1 }}
                                            onClick={() => setSelectedDoc(doc.id === selectedDoc ? null : doc.id)}
                                            className={`relative overflow-hidden group cursor-pointer ${viewMode === 'grid'
                                                ? 'p-4 sm:p-5 rounded-xl border backdrop-blur-sm'
                                                : 'p-4 rounded-xl border backdrop-blur-sm'
                                                } ${selectedDoc === doc.id
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
                                                    background: `radial-gradient(circle at ${doc.id * 20}% ${doc.id * 30}%, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 0%, transparent 70%)`
                                                }}
                                            />

                                            <div className="relative">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className={`p-2 rounded-lg ${categoryColors}`}>
                                                        <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleFavorite(doc.id);
                                                            }}
                                                            className={`p-1.5 rounded-lg transition-colors ${favorites.includes(doc.id)
                                                                ? 'text-yellow-500'
                                                                : isDarkMode
                                                                    ? 'text-gray-600 hover:text-gray-400'
                                                                    : 'text-gray-400 hover:text-gray-600'
                                                                }`}
                                                        >
                                                            <FiStar className={`w-4 h-4 ${favorites.includes(doc.id) ? 'fill-yellow-500' : ''}`} />
                                                        </motion.button>
                                                        <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                                                            {doc.format}
                                                        </span>
                                                    </div>
                                                </div>

                                                <h3 className={`font-semibold text-sm sm:text-base mb-2 ${viewMode === 'grid' ? 'line-clamp-2' : ''}`}>
                                                    {doc.title}
                                                </h3>
                                                
                                                <p className={`text-xs sm:text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-2'}`}>
                                                    {doc.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {doc.tags.slice(0, viewMode === 'grid' ? 2 : 3).map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode
                                                                ? 'bg-gray-800 text-gray-400'
                                                                : 'bg-gray-100 text-gray-600'
                                                                }`}
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {doc.tags.length > (viewMode === 'grid' ? 2 : 3) && (
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                                                            +{doc.tags.length - (viewMode === 'grid' ? 2 : 3)}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-3 flex-wrap text-xs">
                                                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        <FiCalendar className="w-3 h-3" />
                                                        {doc.lastUpdated}
                                                    </span>
                                                    <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        <FiHardDrive className="w-3 h-3" />
                                                        {doc.size}
                                                    </span>
                                                    {doc.pages > 0 && (
                                                        <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            <FiFileText className="w-3 h-3" />
                                                            {doc.pages} pages
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Expanded Content */}
                                                <AnimatePresence>
                                                    {selectedDoc === doc.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Version</p>
                                                                        <p className="text-sm font-semibold mt-1">{doc.version}</p>
                                                                    </div>
                                                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Author</p>
                                                                        <p className="text-sm font-semibold mt-1 truncate">{doc.author}</p>
                                                                    </div>
                                                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Downloads</p>
                                                                        <p className="text-sm font-semibold mt-1">{doc.downloads.toLocaleString()}</p>
                                                                    </div>
                                                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Views</p>
                                                                        <p className="text-sm font-semibold mt-1">{doc.views.toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="flex items-center justify-end gap-2">
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
                                                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                                                                    >
                                                                        <FiExternalLink className="w-4 h-4" />
                                                                    </motion.button>
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                                                                    >
                                                                        <FiShare2 className="w-4 h-4" />
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Chevron indicator for list view */}
                                                {viewMode === 'list' && (
                                                    <motion.div
                                                        animate={{ rotate: selectedDoc === doc.id ? 90 : 0 }}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                                    >
                                                        <FiChevronRight className={`w-5 h-5 ${selectedDoc === doc.id
                                                            ? 'text-blue-500'
                                                            : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                                                            }`} />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Documentation;