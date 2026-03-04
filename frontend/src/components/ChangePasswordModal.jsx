import { useState } from 'react';
import {
    FiX,
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff,
    FiArrowRight,
    FiArrowLeft,
    FiCheckCircle,
    FiAlertCircle,
    FiKey,
    FiShield
} from 'react-icons/fi';

/**
 * ChangePasswordModal — Reusable popup for changing password.
 * Flow: Step 1 (Email verification) → Step 2 (New password) → Step 3 (Success)
 *
 * Props:
 *   - isOpen: boolean
 *   - onClose: () => void
 *   - isDarkMode: boolean
 *   - onPasswordChanged: () => void   (called after success, e.g. to force re-login)
 *   - validEmail: string              (the email to verify against)
 */
const ChangePasswordModal = ({ isOpen, onClose, isDarkMode, onPasswordChanged, validEmail }) => {
    // Get email from localStorage profile if not passed explicitly
    const getValidEmail = () => {
        if (validEmail) return validEmail;
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            const profile = JSON.parse(saved);
            return profile.email || 'dnyanesh@indusbot.ai';
        }
        return 'dnyanesh@indusbot.ai';
    };
    const [step, setStep] = useState(1); // 1: email, 2: new password, 3: success
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inputFocused, setInputFocused] = useState(null);

    // Reset all state when closing
    const handleClose = () => {
        setStep(1);
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setIsLoading(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        setInputFocused(null);
        onClose();
    };

    // Step 1: Verify email
    const handleEmailVerify = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email.trim().toLowerCase() === getValidEmail().toLowerCase()) {
            setStep(2);
            setError('');
        } else {
            setError('Email address not found. Please check and try again.');
        }
        setIsLoading(false);
    };

    // Step 2: Change password
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');

        if (!newPassword.trim()) {
            setError('Please enter a new password');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Save the new password to localStorage (for demo purposes)
        localStorage.setItem('userPassword', newPassword);

        setIsLoading(false);
        setStep(3);
    };

    // Step 3: Success — user clicks "Login Again"
    const handleLoginAgain = () => {
        handleClose();
        if (onPasswordChanged) {
            onPasswordChanged();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

            {/* Modal Card */}
            <div
                className={`relative w-full max-w-md rounded-2xl border shadow-2xl animate-scale-up overflow-hidden ${isDarkMode
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
                    }`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${isDarkMode
                            ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30'
                            : 'bg-gradient-to-br from-blue-100 to-cyan-100'
                            }`}>
                            <FiKey className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {step === 1 ? 'Verify Your Email' : step === 2 ? 'Create New Password' : 'Password Changed!'}
                            </h2>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {step === 1 ? 'Step 1 of 2 — Identity verification' : step === 2 ? 'Step 2 of 2 — Set new password' : 'You\'re all set'}
                            </p>
                        </div>
                    </div>
                    {step !== 3 && (
                        <button
                            onClick={handleClose}
                            className={`p-2 rounded-lg transition-colors ${isDarkMode
                                ? 'hover:bg-gray-800 text-gray-500 hover:text-gray-300'
                                : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Progress Bar */}
                <div className={`h-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 ease-out"
                        style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                    />
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Step 1: Email Verification */}
                    {step === 1 && (
                        <form onSubmit={handleEmailVerify} className="space-y-4">
                            <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-blue-50'}`}>
                                <div className="flex items-start gap-3">
                                    <FiShield className={`w-5 h-5 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Enter your registered email address to verify your identity before changing the password.
                                    </p>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Email Address
                                </label>
                                <div className={`relative rounded-xl border transition-all duration-300 ${inputFocused === 'email'
                                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                                    : isDarkMode
                                        ? 'border-gray-700 hover:border-gray-600'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        <FiMail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                        onFocus={() => setInputFocused('email')}
                                        onBlur={() => setInputFocused(null)}
                                        placeholder="Enter your registered email"
                                        autoFocus
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-transparent outline-none text-sm ${isDarkMode
                                            ? 'text-white placeholder-gray-500'
                                            : 'text-gray-900 placeholder-gray-400'
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${isDarkMode
                                    ? 'bg-red-900/20 text-red-400 border border-red-800/30'
                                    : 'bg-red-50 text-red-500 border border-red-200'
                                    }`}>
                                    <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isLoading
                                    ? 'opacity-80 cursor-not-allowed'
                                    : 'hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]'
                                    } bg-gradient-to-r from-blue-600 to-cyan-500 text-white`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Verify Email
                                        <FiArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Step 2: New Password */}
                    {step === 2 && (
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${isDarkMode
                                ? 'bg-green-900/20 text-green-400 border border-green-800/30'
                                : 'bg-green-50 text-green-600 border border-green-200'
                                }`}>
                                <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                                Email verified! Now set your new password.
                            </div>

                            {/* New Password Field */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    New Password
                                </label>
                                <div className={`relative rounded-xl border transition-all duration-300 ${inputFocused === 'newPassword'
                                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                                    : isDarkMode
                                        ? 'border-gray-700 hover:border-gray-600'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        <FiLock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                                        onFocus={() => setInputFocused('newPassword')}
                                        onBlur={() => setInputFocused(null)}
                                        placeholder="Enter new password (min 6 characters)"
                                        autoFocus
                                        className={`w-full pl-12 pr-12 py-3 rounded-xl bg-transparent outline-none text-sm ${isDarkMode
                                            ? 'text-white placeholder-gray-500'
                                            : 'text-gray-900 placeholder-gray-400'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode
                                            ? 'text-gray-500 hover:text-gray-300'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {showNewPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Confirm Password
                                </label>
                                <div className={`relative rounded-xl border transition-all duration-300 ${inputFocused === 'confirmPassword'
                                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                                    : isDarkMode
                                        ? 'border-gray-700 hover:border-gray-600'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        <FiLock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                                        onFocus={() => setInputFocused('confirmPassword')}
                                        onBlur={() => setInputFocused(null)}
                                        placeholder="Re-enter new password"
                                        className={`w-full pl-12 pr-12 py-3 rounded-xl bg-transparent outline-none text-sm ${isDarkMode
                                            ? 'text-white placeholder-gray-500'
                                            : 'text-gray-900 placeholder-gray-400'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode
                                            ? 'text-gray-500 hover:text-gray-300'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Strength Indicator */}
                            {newPassword.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1.5 flex-1 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${newPassword.length < 6
                                                    ? 'bg-red-500 w-1/3'
                                                    : newPassword.length < 10
                                                        ? 'bg-amber-500 w-2/3'
                                                        : 'bg-green-500 w-full'
                                                    }`}
                                                style={{
                                                    width: newPassword.length < 6 ? '33%' : newPassword.length < 10 ? '66%' : '100%'
                                                }}
                                            />
                                        </div>
                                        <span className={`text-xs font-medium ${newPassword.length < 6
                                            ? 'text-red-500'
                                            : newPassword.length < 10
                                                ? 'text-amber-500'
                                                : 'text-green-500'
                                            }`}>
                                            {newPassword.length < 6 ? 'Weak' : newPassword.length < 10 ? 'Medium' : 'Strong'}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${isDarkMode
                                    ? 'bg-red-900/20 text-red-400 border border-red-800/30'
                                    : 'bg-red-50 text-red-500 border border-red-200'
                                    }`}>
                                    <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setStep(1); setError(''); }}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isDarkMode
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <FiArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${isLoading
                                        ? 'opacity-80 cursor-not-allowed'
                                        : 'hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]'
                                        } bg-gradient-to-r from-blue-600 to-cyan-500 text-white`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            Change Password
                                            <FiCheckCircle className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="flex flex-col items-center text-center space-y-5 py-4">
                            {/* Success Icon */}
                            <div className={`relative p-5 rounded-full ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                                <FiCheckCircle className={`w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isDarkMode ? 'bg-green-500' : 'bg-green-400'}`} />
                            </div>

                            <div>
                                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Password Changed Successfully!
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Your password has been updated. Please log in again with your new password to continue.
                                </p>
                            </div>

                            <button
                                onClick={handleLoginAgain}
                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300
                                    hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]
                                    bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                            >
                                <FiLock className="w-4 h-4" />
                                Login Again
                                <FiArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
