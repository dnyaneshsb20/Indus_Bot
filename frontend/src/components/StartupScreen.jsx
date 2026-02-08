import { useState, useEffect, useRef } from 'react';
import {
    FiCpu,
    FiSettings,
    FiCheckCircle,
    FiZap,
    FiShield,
    FiDatabase,
    FiActivity,
    FiTool,
    FiAlertTriangle,
    FiCode,
    FiMonitor,
    FiHardDrive,
    FiGitBranch,
    FiWifi,
    FiCloud,
    FiServer,
    FiAperture
} from 'react-icons/fi';
import ib from "../assets/ib2.png";

const StartupScreen = ({ isDarkMode }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing AI Core...');
    const [modulesLoaded, setModulesLoaded] = useState([]);
    const [scanActive, setScanActive] = useState(false);

    // Machine maintenance modules (using only Fi icons)
    const maintenanceModules = [
        { id: 1, name: 'Diagnostic Engine', icon: FiCpu, color: 'blue' },
        { id: 2, name: 'Predictive Analytics', icon: FiActivity, color: 'cyan' },
        { id: 3, name: 'Error Code Database', icon: FiDatabase, color: 'purple' },
        { id: 4, name: 'Troubleshooting Guide', icon: FiTool, color: 'orange' },
        { id: 5, name: 'Safety Protocols', icon: FiShield, color: 'green' },
        { id: 6, name: 'Machine Learning Core', icon: FiHardDrive, color: 'pink' },
        { id: 7, name: 'Real-time Monitoring', icon: FiMonitor, color: 'red' },
        { id: 8, name: 'Maintenance Scheduler', icon: FiSettings, color: 'yellow' },
    ];

    // Simulate startup sequence
    useEffect(() => {
        const startupSequence = [
            { delay: 300, progress: 10, status: 'Loading Diagnostic Engine...' },
            { delay: 600, progress: 25, status: 'Initializing Machine Learning Core...' },
            { delay: 900, progress: 40, status: 'Loading Error Code Database...' },
            { delay: 1200, progress: 55, status: 'Connecting to Maintenance Protocols...' },
            { delay: 1500, progress: 70, status: 'Calibrating Predictive Analytics...' },
            { delay: 1800, progress: 85, status: 'Finalizing Safety Systems...' },
            { delay: 2100, progress: 95, status: 'Almost ready...' },
            { delay: 2400, progress: 100, status: 'System Online' },
        ];

        let currentIndex = 0;
        let modulesInterval;

        // Start scanning animation
        setTimeout(() => setScanActive(true), 500);

        // Load modules sequentially
        modulesInterval = setInterval(() => {
            if (currentIndex < maintenanceModules.length) {
                const moduleToAdd = maintenanceModules[currentIndex];
                if (moduleToAdd) {
                    setModulesLoaded(prev => [...prev, moduleToAdd]);
                }
                currentIndex++;
            } else {
                clearInterval(modulesInterval);
            }
        }, 300);

        // Update progress and status
        startupSequence.forEach((step) => {
            setTimeout(() => {
                setProgress(step.progress);
                setStatus(step.status);
            }, step.delay);
        });

        return () => {
            clearInterval(modulesInterval);
        };
    }, []);

    return (
        <div
            className={`h-screen w-screen overflow-hidden relative transition-colors duration-500
        ${isDarkMode
                    ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
                    : "bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50"
                }
      `}
        >
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
                           linear-gradient(90deg, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }} />

                {/* Scanning effect */}
                {scanActive && (
                    <div className={`absolute inset-0 ${isDarkMode
                            ? "bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
                            : "bg-gradient-to-b from-transparent via-blue-400/5 to-transparent"
                        } animate-scan-vertical`} />
                )}

                {/* Floating elements */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute animate-float ${isDarkMode
                                ? "text-blue-500/10"
                                : "text-blue-400/5"
                            }`}
                        style={{
                            fontSize: `${Math.random() * 40 + 20}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${Math.random() * 20 + 10}s`
                        }}
                    >
                        {[<FiCpu key={i} />, <FiServer key={i} />, <FiAperture key={i} />][i % 3]}
                    </div>
                ))}
            </div>

            {/* Main Container */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                {/* Logo and Title */}
                <div className="text-center mb-5 mt-5">
                    <div className="relative inline-block mb-1">
                        {/* Pulsing glow */}
                        <div className={`absolute inset-0 rounded-full blur-xl ${isDarkMode
                                ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/30"
                                : "bg-gradient-to-r from-blue-400/20 to-cyan-400/20"
                            } animate-pulse`} />

                        {/* Rotating container */}
                        <div className="relative">
                            <img
                                src={ib}
                                alt="IndusBot AI"
                                className="w-28 h-28 relative z-10"
                            />
                            {/* Rotating ring */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-40 h-40 border-2 border-dashed rounded-full animate-spin-slow
                ${isDarkMode ? "border-blue-500/20" : "border-blue-400/10"}`} />
                        </div>
                    </div>

                    <h1 className={`text-4xl font-bold tracking-tight mb-2 animate-fade-up ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 
                           bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                            IndusBot AI
                        </span>
                    </h1>
                    <p className={`text-lg font-medium animate-fade-up ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`} style={{ animationDelay: '0.1s' }}>
                        Industrial Machine Intelligence Platform
                    </p>
                </div>

                {/* Status Panel */}
                <div className={` max-w-7xl rounded-2xl border backdrop-blur-xl overflow-hidden  ${isDarkMode
                        ? "bg-gray-900/80 border-gray-800/50"
                        : "bg-white/90 border-gray-200/50"
                    }`}>
                    {/* Header */}
                    <div className={`px-8 py-6 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"
                        }`}>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${isDarkMode
                                    ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30"
                                    : "bg-gradient-to-br from-blue-100 to-cyan-100"
                                }`}>
                                <FiServer className={`w-8 h-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"
                                    }`} />
                            </div>
                            <div className="flex-1">
                                <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"
                                    }`}>
                                    System Initialization
                                </h2>
                                <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    {status}
                                </p>
                            </div>
                            <div className={`text-3xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"
                                }`}>
                                {progress}%
                            </div>
                        </div>
                    </div>

                    {/* Progress and Modules */}
                    <div className="p-8">
                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className={`h-3 rounded-full overflow-hidden relative ${isDarkMode ? "bg-gray-800" : "bg-gray-200"
                                }`}>
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 
                            animate-gradient bg-[length:200%_auto] transition-all duration-300`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Modules Grid */}
                        <div>
                            <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                }`}>
                                LOADING INDUSTRIAL MODULES
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
                                {maintenanceModules.map((module) => {
                                    const isLoaded = modulesLoaded.some(m => m.id === module.id);
                                    return (
                                        <div
                                            key={module.id}
                                            className={`p-2.5 rounded-xl border transition-all duration-300 ${isLoaded
                                                    ? isDarkMode
                                                        ? "bg-gray-800/50 border-blue-500/30"
                                                        : "bg-blue-50/50 border-blue-400/30"
                                                    : isDarkMode
                                                        ? "bg-gray-800/30 border-gray-700/50 opacity-50"
                                                        : "bg-gray-100/30 border-gray-200/50 opacity-50"
                                                }`}
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div className={`p-3 rounded-xl mb-3 ${isLoaded
                                                        ? isDarkMode
                                                            ? `bg-${module.color}-900/30`
                                                            : `bg-${module.color}-100`
                                                        : isDarkMode
                                                            ? "bg-gray-800"
                                                            : "bg-gray-200"
                                                    }`}>
                                                    <module.icon className={`w-8 h-8 ${isLoaded
                                                            ? isDarkMode
                                                                ? `text-${module.color}-400`
                                                                : `text-${module.color}-600`
                                                            : isDarkMode
                                                                ? "text-gray-500"
                                                                : "text-gray-400"
                                                        }`} />
                                                </div>
                                                <p className={`font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                    }`}>
                                                    {module.name}
                                                </p>
                                                <div className={`text-xs px-3 py-1 rounded-full ${isLoaded
                                                        ? isDarkMode
                                                            ? "bg-green-900/30 text-green-400"
                                                            : "bg-green-100 text-green-700"
                                                        : isDarkMode
                                                            ? "bg-gray-800 text-gray-500"
                                                            : "bg-gray-200 text-gray-500"
                                                    }`}>
                                                    {isLoaded ? 'Loaded' : 'Loading...'}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                {/* <div className={`mt-8 text-center animate-fade-up ${isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`} style={{ animationDelay: '0.6s' }}>
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-2">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${scanActive
                                    ? (isDarkMode ? "bg-green-500 animate-pulse" : "bg-green-600 animate-pulse")
                                    : (isDarkMode ? "bg-gray-600" : "bg-gray-300")
                                }`} />
                            <span className="text-sm">System Status: {progress < 100 ? 'Initializing' : 'Ready'}</span>
                        </div>
                    </div>
                    <p className="text-sm">
                        IndusBot AI • Version 3.2.1 • © 2026 Industrial Intelligence Systems
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default StartupScreen;