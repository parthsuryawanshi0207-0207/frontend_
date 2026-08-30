import { useState } from 'react';
import {
  MessageSquare,
  Search,
  Lightbulb,
  Clock,
  Puzzle,
  Settings,
  User,
  LogOut,
  LogIn,
  CheckCircle,
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ onOpenHistory, onNewChat }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIcon, setActiveIcon] = useState('chat');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const navItems = [
    { id: 'chat', icon: MessageSquare, label: 'New Chat' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'ideas', icon: Lightbulb, label: 'Ideas' },
    { id: 'plugins', icon: Puzzle, label: 'Plugins' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleNavClick = (id) => {
    setActiveIcon(id);
    if (id === 'history') {
      onOpenHistory?.();
    } else if (id === 'chat') {
      onNewChat?.();
    }
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
    } else {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full glass border-r border-glass-border z-20 transition-all duration-250 ease-out will-change-transform hover:w-44 w-14 group flex flex-col"
        style={{ contain: 'layout style paint' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false);
          setIsProfileMenuOpen(false);
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-14 border-b border-glass-border transition-all duration-250 group-hover:h-20 flex-shrink-0">
          <div className="relative w-10 h-10 flex items-center justify-center transition-all duration-250 group-hover:w-16 group-hover:h-16">
            <img
              src={logoImg}
              alt="Ask AI Logo"
              className="relative w-9 h-9 object-contain transition-all duration-250 group-hover:w-14 group-hover:h-14 drop-shadow-md"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 py-3 flex flex-col gap-1 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeIcon === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  relative flex items-center gap-3 px-2.5 py-2 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
                aria-label={item.label}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-sm"></div>
                )}

                <Icon className="relative w-5 h-5 flex-shrink-0" />

                {/* Label */}
                <span className="relative whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-250 text-sm font-medium">
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-500 rounded-r-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile Card / Login Button */}
        <div className="mt-auto border-t border-glass-border p-2 relative flex-shrink-0">
          {/* Profile Menu Popover */}
          {isAuthenticated && isProfileMenuOpen && (
            <div className="absolute bottom-16 left-2 right-2 p-3 rounded-xl glass-strong border border-white/10 shadow-2xl bg-[#130f24] text-white z-30 animate-fadeIn text-xs">
              <div className="mb-2 pb-2 border-b border-white/10">
                <p className="font-semibold text-white truncate">{user?.name || 'User'}</p>
                <p className="text-gray-400 truncate text-[11px]">{user?.email}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-green-400 font-medium">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Account</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}

          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-2.5 px-1 py-1 rounded-lg hover:bg-white/5 transition-colors text-left"
            title={isAuthenticated ? user?.name : 'Sign In'}
          >
            {/* Avatar */}
            <div
              className={`relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isAuthenticated
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md shadow-purple-500/20'
                  : 'bg-white/10 text-gray-400'
                }`}
            >
              {isAuthenticated ? (
                <span className="text-xs font-bold text-white uppercase">
                  {(user?.name || user?.email || 'U')[0]}
                </span>
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>

            {/* User info (hidden when collapsed) */}
            <div className="flex-1 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-250 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {isAuthenticated ? user?.name || 'Account' : 'Sign In'}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {isAuthenticated ? user?.email : 'Click to log in'}
              </p>
            </div>

            {!isAuthenticated && (
              <LogIn className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex-shrink-0" />
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-14 glass border-t border-glass-border z-30 md:hidden flex items-center justify-around px-2">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeIcon === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${isActive ? 'text-purple-400' : 'text-gray-400'
                }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}

        {/* Mobile Profile Icon */}
        <button
          onClick={handleProfileClick}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-gray-400 hover:text-purple-400"
          aria-label="Profile"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">{isAuthenticated ? user?.name || 'Me' : 'Sign In'}</span>
        </button>
      </nav>
    </>
  );
}
