function MessageBubble({ sender, text }) {
  return (
    <div
      className={`max-w-[70%] px-4 py-2 rounded-lg text-sm leading-relaxed ${
        sender === "user"
          ? "bg-blue-600 text-white ml-auto"
          : "bg-gray-200 text-gray-900 mr-auto"
      }`}
    >
      {text}
    </div>
  );
}

export default MessageBubble;
