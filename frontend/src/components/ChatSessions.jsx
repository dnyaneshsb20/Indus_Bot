import { useState } from 'react';
import {
    FiSearch,
    FiPlus,
    FiMessageSquare,
    FiClock,
    FiTrash2,
    FiChevronRight,
    FiFilter,
    FiArrowLeft
} from 'react-icons/fi';
import { TbRobot } from 'react-icons/tb';

const ChatSessions = ({ isDarkMode, onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const sessions = [
        {
            id: 1,
            title: 'Error E-102 Troubleshooting',
            lastMessage: 'The error was resolved by recalibrating the sensor module...',
            time: '10:30 AM',
            date: 'Today',
            messages: 12,
            status: 'active',
            machine: 'CNC Mill #3'
        },
        {
            id: 2,
            title: 'Machine Calibration Guide',
            lastMessage: 'Follow these steps to calibrate the X-axis alignment...',
            time: '2:15 PM',
            date: 'Yesterday',
            messages: 8,
            status: 'completed',
            machine: 'Lathe #1'
        },
        {
            id: 3,
            title: 'Safety Protocol Review',
            lastMessage: 'All safety checks have been verified and documented...',
            time: '9:00 AM',
            date: 'Yesterday',
            messages: 15,
            status: 'completed',
            machine: 'Press #2'
        },
        {
            id: 4,
            title: 'Preventive Maintenance Schedule',
            lastMessage: 'Next maintenance window is scheduled for March 10...',
            time: '4:45 PM',
            date: 'Mar 1',
            messages: 6,
            status: 'archived',
            machine: 'CNC Mill #1'
        },
        {
            id: 5,
            title: 'Oil Pressure Warning Analysis',
            lastMessage: 'The oil pressure readings indicate normal operation...',
            time: '11:20 AM',
            date: 'Mar 1',
            messages: 9,
            status: 'completed',
            machine: 'Hydraulic Press #1'
        },
        {
            id: 6,
            title: 'New Operator Training Queries',
            lastMessage: 'Refer to section 4.2 of the operator manual for...',
            time: '3:30 PM',
            date: 'Feb 28',
            messages: 22,
            status: 'archived',
            machine: 'Assembly Line #2'
        },
    ];

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'active', label: 'Active' },
        { key: 'completed', label: 'Completed' },
        { key: 'archived', label: 'Archived' },
    ];

    const filteredSessions = sessions.filter(session => {
        const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.machine.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || session.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'completed': return 'bg-blue-500';
            case 'archived': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            active: isDarkMode
                ? 'bg-green-900/40 text-green-400 border-green-800/40'
                : 'bg-green-50 text-green-700 border-green-200',
            completed: isDarkMode
                ? 'bg-blue-900/40 text-blue-400 border-blue-800/40'
                : 'bg-blue-50 text-blue-700 border-blue-200',
            archived: isDarkMode
                ? 'bg-gray-800 text-gray-400 border-gray-700'
                : 'bg-gray-100 text-gray-600 border-gray-200',
        };
        return colors[status] || colors.archived;
    };

    return (
        <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <div className={`px-6 py-3 border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-lg transition-colors ${isDarkMode
                                ? 'hover:bg-gray-800 text-gray-400'
                                : 'hover:bg-gray-100 text-gray-600'
                                }`}
                            title="Back to Dashboard"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                {/* <TbRobot className="w-7 h-7 text-blue-500" /> */}
                                Chat Sessions
                            </h1>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Manage and review your conversation history
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105">
                        <FiPlus className="w-4 h-4" />
                        New Chat
                    </button>
                </div>
            </div>

            {/* Search and Filters - Below the header line */}
            <div className={`px-6 py-4 ${isDarkMode ? 'bg-gray-900/30' : 'bg-white'}`}>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Search sessions by title or machine..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                                } outline-none`}
                        />
                    </div>
                    <div className="flex gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeFilter === filter.key
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                    : isDarkMode
                                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3 max-w-screen-2xl mx-auto">
                    {filteredSessions.length === 0 ? (
                        <div className="text-center py-16">
                            <FiMessageSquare className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                No sessions found
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    ) : (
                        filteredSessions.map((session) => (
                            <div
                                key={session.id}
                                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer group hover:scale-[1.01] ${isDarkMode
                                    ? 'bg-gray-900 border-gray-800 hover:border-gray-700 hover:bg-gray-800/80'
                                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`}></div>
                                            <h3 className="font-semibold text-sm truncate">{session.title}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(session.status)}`}>
                                                {session.status}
                                            </span>
                                        </div>
                                        <p className={`text-sm mb-3 pl-5 truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {session.lastMessage}
                                        </p>
                                        <div className={`flex items-center gap-4 pl-5 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            <span className="flex items-center gap-1">
                                                <FiClock className="w-3 h-3" />
                                                {session.date} at {session.time}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FiMessageSquare className="w-3 h-3" />
                                                {session.messages} messages
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-md text-xs ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {session.machine}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${isDarkMode
                                            ? 'hover:bg-gray-700 text-gray-500'
                                            : 'hover:bg-gray-100 text-gray-400'
                                            }`}>
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                        <FiChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'
                                            }`} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary Footer */}
                <div className={`max-w-4xl mx-auto mt-6 pt-4 border-t text-center ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Showing {filteredSessions.length} of {sessions.length} sessions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatSessions;
