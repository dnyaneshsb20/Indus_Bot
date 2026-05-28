import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import {
    FiCpu,
    FiServer,
    FiAperture,
    FiLock,
    FiUser,
    FiEye,
    FiEyeOff,
    FiAlertCircle,
    FiArrowRight,
    FiShield
} from 'react-icons/fi';
import ib from "../assets/ib2.png";
import ChangePasswordModal from './ChangePasswordModal';

const LoginScreen = ({ isDarkMode, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputFocused, setInputFocused] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password');
            setShowErrorPopup(true);
            return;
        }

        setIsLoading(true);

        try {
            // Query the Supabase users table
            const { data, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            if (fetchError || !data) {
                setError('Invalid username or password');
                setShowErrorPopup(true);
                setIsLoading(false);
                return;
            }

            // Compare password
            if (data.password === password) {
                // Pass user data to onLogin in case the App needs the role (e.g. data.role)
                onLogin(data);
            } else {
                setError('Invalid username or password');
                setShowErrorPopup(true);
                setIsLoading(false);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('An error occurred during login. Please try again.');
            setShowErrorPopup(true);
            setIsLoading(false);
        }
    };

    const dismissErrorPopup = () => {
        setShowErrorPopup(false);
        setError('');
    };

    return (
        <div
            className={`h-screen w-screen overflow-hidden relative transition-colors duration-500
                ${isDarkMode
                    ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
                    : "bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50"
                }
            `}
        >
            {/* Animated Background - Same as StartupScreen */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
                           linear-gradient(90deg, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }} />

                {/* Scanning effect */}
                <div className={`absolute inset-0 ${isDarkMode
                    ? "bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
                    : "bg-gradient-to-b from-transparent via-blue-400/5 to-transparent"
                    } animate-scan-vertical`} />

                {/* Floating elements */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute animate-float ${isDarkMode
                            ? "text-blue-500/10"
                            : "text-blue-400/5"
                            }`}
                        style={{
                            fontSize: `${20 + (i * 8)}px`,
                            left: `${10 + (i * 15)}%`,
                            top: `${5 + (i * 12)}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${15 + (i * 3)}s`
                        }}
                    >
                        {[<FiCpu key={i} />, <FiServer key={i} />, <FiAperture key={i} />][i % 3]}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                {/* Logo and Branding */}
                <div className="text-center mb-2 animate-fade-up">
                    <div className="relative inline-block mb-2">
                        {/* Pulsing glow */}
                        <div className={`absolute inset-0 rounded-full blur-xl ${isDarkMode
                            ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/30"
                            : "bg-gradient-to-r from-blue-400/20 to-cyan-400/20"
                            } animate-pulse`} />

                        {/* Logo with rotating ring */}
                        <div className="relative">
                            <img
                                src={ib}
                                alt="IndusBot AI"
                                className="w-24 h-24 relative z-10"
                            />
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                w-32 h-32 border-2 border-dashed rounded-full animate-spin-slow
                                ${isDarkMode ? "border-blue-500/20" : "border-blue-400/10"}`} />
                        </div>
                    </div>

                    <h1 className={`text-3xl font-bold tracking-tight mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 
                           bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                            IndusBot AI
                        </span>
                    </h1>
                    <p className={`text-lg font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Industrial Machine Intelligence Platform
                    </p>
                </div>

                {/* Login Card */}
                <div className={`w-full max-w-md rounded-2xl border backdrop-blur-xl overflow-hidden animate-scale-up ${isDarkMode
                    ? "bg-gray-900/80 border-gray-800/50"
                    : "bg-white/90 border-gray-200/50 shadow-xl"
                    }`}
                    style={{ animationDelay: '0.2s' }}
                >
                    {/* Card Header */}
                    <div className={`px-6 py-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                        <div className="flex flex-col items-center gap-1">
                            <div className={`p-3 rounded-xl ${isDarkMode
                                ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30"
                                : "bg-gradient-to-br from-blue-100 to-cyan-100"
                                }`}>
                                <FiShield className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                            </div>
                            <div className="text-center">
                                <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Secure Login
                                </h2>
                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Authenticate to access the command center
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="p-6 space-y-4">


                        {/* Username Field */}
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                Username
                            </label>
                            <div className={`relative rounded-xl border transition-all duration-300 ${inputFocused === 'username'
                                ? isDarkMode
                                    ? "border-blue-500 ring-2 ring-blue-500/20"
                                    : "border-blue-500 ring-2 ring-blue-500/20"
                                : isDarkMode
                                    ? "border-gray-700 hover:border-gray-600"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}>
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                                    <FiUser className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setInputFocused('username')}
                                    onBlur={() => setInputFocused(null)}
                                    placeholder="Enter your username"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-transparent outline-none text-sm ${isDarkMode
                                        ? "text-white placeholder-gray-500"
                                        : "text-gray-900 placeholder-gray-400"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                Password
                            </label>
                            <div className={`relative rounded-xl border transition-all duration-300 ${inputFocused === 'password'
                                ? isDarkMode
                                    ? "border-blue-500 ring-2 ring-blue-500/20"
                                    : "border-blue-500 ring-2 ring-blue-500/20"
                                : isDarkMode
                                    ? "border-gray-700 hover:border-gray-600"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}>
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                                    <FiLock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setInputFocused('password')}
                                    onBlur={() => setInputFocused(null)}
                                    placeholder="Enter your password"
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl bg-transparent outline-none text-sm ${isDarkMode
                                        ? "text-white placeholder-gray-500"
                                        : "text-gray-900 placeholder-gray-400"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode
                                        ? "text-gray-500 hover:text-gray-300"
                                        : "text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isLoading
                                ? "opacity-80 cursor-not-allowed"
                                : "hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
                                } bg-gradient-to-r from-blue-600 to-cyan-500 text-white`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <FiLock className="w-4 h-4" />
                                    Sign In
                                    <FiArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        {/* Forgot Password Link */}
                        <div className="text-center pt-1">
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className={`text-sm font-medium transition-colors ${isDarkMode
                                    ? 'text-blue-400 hover:text-blue-300'
                                    : 'text-blue-600 hover:text-blue-500'
                                    }`}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Demo Credentials Hint */}
                        <div className={`text-center pt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                            <p className="text-xs">
                                Demo credentials: <span className={`font-mono font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>admin</span> / <span className={`font-mono font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>admin123</span>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Error Popup Modal */}
                {showErrorPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        onClick={dismissErrorPopup}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

                        {/* Popup Card */}
                        <div
                            className={`relative w-full max-w-sm rounded-2xl border p-6 shadow-2xl animate-scale-up ${isDarkMode
                                ? "bg-gray-900 border-gray-700"
                                : "bg-white border-gray-200"
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                {/* Error Icon */}
                                <div className={`p-4 rounded-full ${isDarkMode
                                    ? "bg-red-900/30"
                                    : "bg-red-100"
                                    }`}>
                                    <FiAlertCircle className={`w-8 h-8 ${isDarkMode ? "text-red-400" : "text-red-500"}`} />
                                </div>

                                {/* Error Title */}
                                <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Authentication Failed
                                </h3>

                                {/* Error Message */}
                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    {error}
                                </p>

                                {/* Try Again Button */}
                                <button
                                    type="button"
                                    onClick={dismissErrorPopup}
                                    className={`w-full mt-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                                        hover:scale-[1.02] active:scale-[0.98]
                                        bg-gradient-to-r from-blue-600 to-cyan-500 text-white
                                        hover:shadow-lg hover:shadow-blue-500/25`}
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Change Password Modal */}
                <ChangePasswordModal
                    isOpen={showForgotPassword}
                    onClose={() => setShowForgotPassword(false)}
                    isDarkMode={isDarkMode}
                    onPasswordChanged={() => setShowForgotPassword(false)}
                />

            </div>
        </div>
    );
};

export default LoginScreen;
