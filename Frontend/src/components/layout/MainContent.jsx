import { actionButtons } from '../ui/ActionButton';
import ActionButton from '../ui/ActionButton';
import ChatInput from '../ui/ChatInput';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Sparkles } from 'lucide-react';

export default function MainContent({ onSend, onFileUpload, disabled = false }) {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const handleActionClick = (button) => {
    if (button.description) {
      onSend?.(button.description);
    }
  };

  const displayName = user?.name ? user.name.split(' ')[0] : null;

  return (
    <main className="flex-1 flex flex-col justify-center items-center px-4 md:px-12 lg:px-20 w-full max-w-6xl mx-auto py-8">
      {/* Gemini-Inspired Greeting (No floating logo) */}
      <div className="w-full mb-10 fade-in text-left">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-3">
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
            Hello, {isAuthenticated ? displayName : 'there'}
          </span>
        </h1>
        <p className="text-xl md:text-3xl text-gray-400 font-normal">
          How can I help you today?
        </p>

        {/* Guest sign-in pill */}
        {!isAuthenticated && (
          <button
            onClick={() => openAuthModal('login')}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/15 hover:bg-purple-600/25 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Sign in to search your private Gmail and uploaded documents</span>
            <LogIn className="w-3.5 h-3.5 ml-1 opacity-70" />
          </button>
        )}
      </div>

      {/* Suggested Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 w-full">
        {actionButtons.map((button) => (
          <ActionButton key={button.id} button={button} onClick={handleActionClick} />
        ))}
      </div>

      {/* Bottom Chat Input */}
      <div className="w-full">
        <ChatInput onSend={onSend} onFileUpload={onFileUpload} disabled={disabled} />
      </div>
    </main>
  );
}
