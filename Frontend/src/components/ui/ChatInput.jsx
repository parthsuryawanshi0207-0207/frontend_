import { useState } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled = false }) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend?.(message);
      setMessage('');
    }
  };

  const handleAttachment = () => {
    // Demo mode - will be connected to API later
    console.log('Attachment clicked - demo mode');
  };

  const handleVoiceInput = () => {
    // Demo mode - will be connected to Web Speech API later
    setIsListening(!isListening);
    console.log('Voice input clicked - demo mode', isListening ? 'stopped' : 'started');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        {/* Input container */}
        <div className="glass-strong rounded-xl p-3 flex items-center gap-2">
          {/* Attachment button */}
          <button
            type="button"
            onClick={handleAttachment}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4 text-gray-400" />
          </button>

          {/* Text input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message Ask AI..."
            disabled={disabled}
            className="flex-1 bg-transparent text-base text-white placeholder-gray-500 outline-none disabled:opacity-50"
          />

          {/* Mic button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isListening
                ? 'bg-red-500/20 text-red-400 pulse-glow'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
            }`}
            aria-label="Voice input"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Send button */}
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/30 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95 glow-purple"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>

      {/* Footer disclaimer */}
      <p className="text-center text-[10px] text-gray-500 mt-3">
        Ask AI can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}
