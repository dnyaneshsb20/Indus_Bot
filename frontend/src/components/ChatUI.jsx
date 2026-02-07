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
    toggleTheme,
}) => {
    const isFirstLoad = messages.length === 0;

    return (
        <div
            className={`h-screen flex flex-col p-4 relative ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
        >

            {/* Header */}
            <h1
                className={`text-xl font-bold mb-4 transition-all duration-300 ${isFirstLoad
                    ? "text-center"
                    : !isSidebarOpen
                        ? "ml-14 text-left"
                        : "text-left"
                    }`}
            >
                IndusBot
            </h1>

            {/* Top-right controls */}
            <div className="absolute top-3 right-4 flex items-center gap-3">
                <select
                    className={`border px-3 py-2 rounded ${isDarkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-black border-gray-300"
                        }`}
                    value={selectedMachine}
                    onChange={(e) => setSelectedMachine(e.target.value)}
                >
                    <option value="">-- Select Machine --</option>
                    <option>Machine A</option>
                    <option>Machine B</option>
                    <option>Machine C</option>
                </select>

                {/* Theme toggle button */}
                <button
                    onClick={toggleTheme}
                    className="w-9 h-9 rounded-full border flex items-center justify-center"
                    title="Toggle theme"
                >
                    {isDarkMode ? "🌙" : "☀️"}
                </button>
            </div>

            {/* First load UI */}
            {isFirstLoad ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <p className="text-lg mb-4 text-gray-500 text-center">
                        Ask Anything Related to Machine Troubleshoot
                    </p>

                    <div className="flex gap-2 w-full max-w-xl">
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
                            placeholder={
                                selectedMachine
                                    ? "Type your question..."
                                    : "Select a machine to start..."
                            }
                            className={`flex-1 border px-3 py-2 rounded ${isDarkMode
                                ? "bg-gray-700 text-white border-gray-600 disabled:bg-gray-600"
                                : "bg-white text-black border-gray-300 disabled:bg-gray-100"
                                }`}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!selectedMachine || !question.trim()}
                            className={`border px-4 py-2 rounded ${isDarkMode
                                    ? "bg-blue-600 text-white disabled:bg-gray-600"
                                    : "bg-blue-500 text-white disabled:bg-gray-300"
                                }`}
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Messages */}
                    <div className="flex-1 border p-3 overflow-y-auto space-y-2">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded max-w-xl ${msg.sender === "user"
                                    ? "bg-blue-100 ml-auto text-right text-black"
                                    : "bg-gray-200 mr-auto text-black"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="bg-gray-200 p-2 rounded w-fit text-black">
                                Typing...
                            </div>
                        )}
                    </div>

                    {/* Bottom input */}
                    <div className="flex gap-2 mt-3">
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
                            placeholder={
                                selectedMachine
                                    ? "Type your question..."
                                    : "Select a machine to start..."
                            }
                            className="flex-1 border px-3 py-2 disabled:bg-gray-100 text-black"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!selectedMachine || !question.trim()}
                            className="border px-4 py-2 bg-blue-500 text-white disabled:bg-gray-300"
                        >
                            Send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatUI;
