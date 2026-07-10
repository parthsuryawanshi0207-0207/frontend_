import { actionButtons } from '../ui/ActionButton';
import ActionButton from '../ui/ActionButton';
import ChatInput from '../ui/ChatInput';

export default function MainContent({ onSend }) {
  const handleActionClick = (button) => {
    console.log('Action button clicked:', button.id);
    // Demo mode - will be connected to API later
  };

  return (
    <main className="flex flex-col items-center px-4 md:px-8 lg:px-16 pb-8 mt-auto min-h-0">
      {/* Greeting Section */}
      <div className="text-center mb-8 fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Hello, Alex!
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          How can I help you today?
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12 w-full max-w-6xl">
        {actionButtons.map((button) => (
          <div key={button.id} className="flex justify-center">
            <ActionButton button={button} onClick={handleActionClick} />
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="w-full">
        <ChatInput onSend={onSend} />
      </div>
    </main>
  );
}
