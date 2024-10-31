import React, { useState } from "react";

const API_KEY = "AIzaSyB78a57xD0eADE3jcZ0ZS38NNKSHQDjjiQ"; // Replace with your API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const MAX_RETRIES = 3; // Set a maximum number of retries

  const handleSendMessage = async (retryCount = 0) => {
    if (input.trim()) {
      // Add user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input.trim(), sender: "user" },
      ]);
      // Clear input
      setInput("");

      // Show loading indicator for AI response
      const loadingMessage = { text: "AI is typing...", sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: input }],
              },
            ],
          }),
        });

        // Handle rate limiting
        if (response.status === 429) {
          if (retryCount < MAX_RETRIES) {
            setTimeout(() => handleSendMessage(retryCount + 1), 5000); // Retry after 5 seconds
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: "Sorry, I couldn't respond due to rate limiting. Please try again later.", sender: "ai" },
            ]);
          }
          return;
        }

        // Check for other response errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Check if the expected structure is present
        if (data.candidates?.length > 0) {
          const aiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");
          // Update messages with AI response
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.sender === "ai" && msg.text === "AI is typing..." ? { text: aiResponse, sender: "ai" } : msg
            )
          );
        } else {
          throw new Error("Unexpected API response format.");
        }
      } catch {
        // Handle error response appropriately (e.g., show error message)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, I couldn't respond. Please try again.", sender: "ai" },
        ]);
      }
    }
  };

  return (
    <div className="chatbot-container border rounded-lg p-4 bg-white shadow-md" style={{ maxWidth: "450px" }}>
      <h2 className="text-xl font-semibold mb-2">AI Chatbot</h2>
      <div className="messages mb-4" style={{ maxHeight: "350px", overflowY: "scroll", position: "relative" }}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`} style={{ textAlign: message.sender === "user" ? "right" : "left" }}>
            <span className={message.sender === "user" ? "text-black bg-slate-300 px-4 py-2 mb-2 rounded-md inline-block" : "text-green-500 my-2 px-4 py-2 rounded-md inline-block bg-gray-100"}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="input-container flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded-r-lg p-2"
        >
          Send
        </button>
      </div>
      <style jsx>{`
        .messages::-webkit-scrollbar {
          display: none; /* Hides scrollbar in WebKit browsers */
        }
        .messages {
          scrollbar-width: none; /* Hides scrollbar in Firefox */
        }
      `}</style>
    </div>
  );
};

export default Chatbot;