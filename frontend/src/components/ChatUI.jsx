const ChatUI = ({
    messages,
    question,
    setQuestion,
    sendMessage,
    loading,
    isSidebarOpen,
    selectedMachine,
    setSelectedMachine,
}) => {
    const isFirstLoad = messages.length === 0;

    return (
        <div className="h-screen flex flex-col p-4 relative">

            {/* Header */}
            <h1
                className={`text-xl font-bold mb-4 transition-all duration-300 ${
                    isFirstLoad
                        ? "text-center"
                        : !isSidebarOpen
                            ? "ml-14 text-left"
                            : "text-left"
                }`}
            >
                IndusBot
            </h1>

            {/* Top-right dropdown */}
            <div className="absolute top-3 right-4">
                <select
                    className="border px-3 py-2 rounded"
                    value={selectedMachine}
                    onChange={(e) => setSelectedMachine(e.target.value)}
                >
                    <option value="">-- Select Machine --</option>
                    <option value="Machine A">Machine A</option>
                    <option value="Machine B">Machine B</option>
                    <option value="Machine C">Machine C</option>
                </select>
            </div>

            {/* FIRST LOAD UI */}
            {isFirstLoad ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <p className="text-lg mb-4 text-gray-600 text-center">
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
                            className="flex-1 border px-3 py-2 disabled:bg-gray-100"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!selectedMachine || !question.trim()}
                            className="border px-4 py-2 bg-blue-500 text-white 
                                       disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                                className={`p-2 rounded max-w-xl ${
                                    msg.sender === "user"
                                        ? "bg-blue-100 ml-auto text-right"
                                        : "bg-gray-200 mr-auto"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="bg-gray-200 p-2 rounded w-fit">
                                Typing...
                            </div>
                        )}
                    </div>

                    {/* Bottom Input */}
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
                            className="flex-1 border px-3 py-2 disabled:bg-gray-100"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!selectedMachine || !question.trim()}
                            className="border px-4 py-2 bg-blue-500 text-white 
                                       disabled:bg-gray-300 disabled:cursor-not-allowed"
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
