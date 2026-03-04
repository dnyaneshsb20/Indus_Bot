import { useState, useEffect } from 'react';
import { FiClock, FiAlertTriangle, FiLogOut } from 'react-icons/fi';

/**
 * SessionTimeoutModal — Warning popup shown before auto-logout due to inactivity.
 * Shows a countdown timer. User can click "Stay Logged In" to reset, or "Logout Now".
 *
 * Props:
 *   - isOpen: boolean
 *   - isDarkMode: boolean
 *   - secondsLeft: number        (countdown seconds remaining)
 *   - onStayLoggedIn: () => void (reset the inactivity timer)
 *   - onLogout: () => void       (logout immediately)
 */
const SessionTimeoutModal = ({ isOpen, isDarkMode, secondsLeft, onStayLoggedIn, onLogout }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className={`relative w-full max-w-sm rounded-2xl border shadow-2xl overflow-hidden animate-scale-up ${isDarkMode
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Animated top bar — countdown progress */}
                <div className={`h-1.5 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${(secondsLeft / 30) * 100}%` }}
                    />
                </div>

                <div className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        {/* Warning Icon */}
                        <div className={`relative p-4 rounded-full ${isDarkMode ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                            <FiAlertTriangle className={`w-10 h-10 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`} />
                            {secondsLeft <= 10 && (
                                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isDarkMode ? 'bg-red-500' : 'bg-red-400'}`} />
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Session Timeout Warning
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                You've been inactive for a while. Your session will expire soon.
                            </p>
                        </div>

                        {/* Countdown */}
                        <div className={`flex items-center gap-3 px-5 py-3 rounded-xl ${isDarkMode
                            ? 'bg-gray-800 border border-gray-700'
                            : 'bg-gray-50 border border-gray-200'
                            }`}>
                            <FiClock className={`w-6 h-6 ${secondsLeft <= 10
                                ? 'text-red-500'
                                : isDarkMode ? 'text-amber-400' : 'text-amber-500'
                                }`}
                            />
                            <div>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Auto-logout in</p>
                                <p className={`text-2xl font-bold tabular-nums ${secondsLeft <= 10
                                    ? 'text-red-500'
                                    : isDarkMode ? 'text-amber-400' : 'text-amber-600'
                                    }`}>
                                    {secondsLeft}s
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={onLogout}
                                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isDarkMode
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <FiLogOut className="w-4 h-4" />
                                Logout
                            </button>
                            <button
                                onClick={onStayLoggedIn}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                                    hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]
                                    bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                            >
                                Stay Logged In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionTimeoutModal;
