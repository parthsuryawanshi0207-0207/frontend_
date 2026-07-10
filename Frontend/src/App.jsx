import { useState } from 'react';
import DitherBackground from './components/background/DitherBackground';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import ChatInput from './components/ui/ChatInput';
import { API_CONFIG } from './services/api';
import { getDemoResponse } from './services/demoService';

function App() {
  const [messages, setMessages] = useState([]);

  // Handle sending messages
  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      let response;
      if (API_CONFIG.DEMO_MODE) {
        // Use demo service
        response = await getDemoResponse(messageText);
      } else {
        // Use real API (when backend is ready)
        const { sendMessage } = await import('./services/api');
        response = await sendMessage(messageText);
      }

      if (response.success) {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.message,
          timestamp: response.data.timestamp || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <DitherBackground opacity={0.35} />

      {/* Main App Container */}
      <div className="relative z-10 w-full h-full flex">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-14 flex flex-col h-full">
          {messages.length === 0 ? (
            // Show greeting and action buttons when no messages
            <MainContent onSend={handleSendMessage} />
          ) : (
            // Show chat interface when there are messages
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-3 md:p-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-3 ${
                      msg.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[85%] glass rounded-xl px-3 py-2 ${
                        msg.role === 'user'
                          ? 'bg-purple-600/20'
                          : 'bg-white/5'
                      }`}
                    >
                      <p className="text-base text-white whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-glass-border">
                <ChatInput onSend={handleSendMessage} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Mobile (handled internally by Sidebar component) */}
        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
