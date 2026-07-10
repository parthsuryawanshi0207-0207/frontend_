import { useState } from 'react';
import {
  MessageSquare,
  Search,
  Lightbulb,
  Clock,
  Puzzle,
  Settings,
  User,
  ChevronDown,
} from 'lucide-react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIcon, setActiveIcon] = useState('chat');

  const navItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'ideas', icon: Lightbulb, label: 'Ideas' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'plugins', icon: Puzzle, label: 'Plugins' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
 className="fixed left-0 top-0 h-full glass border-r border-glass-border z-20 transition-all duration-250 ease-out will-change-transform hover:w-40 w-14 group"
        style={{ contain: 'layout style paint' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-14 border-b border-glass-border transition-all duration-250 group-hover:h-24">
          <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-250 group-hover:w-24 group-hover:h-24">
            <img src="/logo.png" alt="Ask AI Logo" className="relative w-10 h-10 object-contain transition-all duration-250 group-hover:w-20 group-hover:h-20" />
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 py-3 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeIcon === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveIcon(item.id)}
                className={`
                  relative flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-purple-600/20' : 'hover:bg-white/5'}
                  ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}
                `}
                aria-label={item.label}
              >
                {/* Active glow effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-sm"></div>
                )}

                <Icon className="relative w-5 h-5 flex-shrink-0" />

                {/* Label (hidden when collapsed, shown when expanded) */}
                <span className="relative whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-250 text-sm">
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-500 rounded-r-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto border-t border-glass-border p-2">
          <button className="w-full flex items-center gap-2 px-1 py-1 rounded-lg hover:bg-white/5 transition-colors">
            {/* Avatar */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>

            {/* User info (hidden when collapsed) */}
            <div className="flex-1 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-250 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Alex</p>
            </div>

            {/* Dropdown arrow */}
            <ChevronDown className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex-shrink-0" />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-14 glass border-t border-glass-border z-30 md:hidden">
        <div className="flex items-center justify-around h-full px-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeIcon === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveIcon(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
                  isActive ? 'text-purple-400' : 'text-gray-400'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
