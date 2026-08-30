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
  Plus,
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
      {/* 1. Desktop Sidebar - STRICTLY hidden on mobile screens (hidden md:flex) */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-full bg-[#1e1f20] border-r border-[#282a2c] z-30 transition-all duration-250 ease-out will-change-transform hover:w-44 w-14 flex-col group"
        style={{ contain: 'layout style paint' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false);
          setIsProfileMenuOpen(false);
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-14 border-b border-[#282a2c] transition-all duration-250 group-hover:h-16 flex-shrink-0">
          <div className="relative w-8 h-8 flex items-center justify-center transition-all duration-250 group-hover:w-10 group-hover:h-10">
            <img
              src={logoImg}
              alt="Ask AI Logo"
              className="relative w-7 h-7 object-contain drop-shadow-sm"
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
                  relative flex items-center gap-3 px-2.5 py-2 rounded-xl transition-colors duration-150
                  ${isActive ? 'bg-[#282a2c] text-[#e3e3e3]' : 'text-[#9aa0a6] hover:text-[#e3e3e3] hover:bg-[#282a2c]/60'}
                `}
                aria-label={item.label}
              >
                <Icon className="relative w-4 h-4 flex-shrink-0" />
                <span className="relative whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-250 text-xs font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Profile Card / Login Button */}
        <div className="mt-auto border-t border-[#282a2c] p-2 relative flex-shrink-0">
          {isAuthenticated && isProfileMenuOpen && (
            <div className="absolute bottom-16 left-2 right-2 p-3 rounded-xl border border-[#333538] shadow-2xl bg-[#1e1f20] text-[#e3e3e3] z-40 animate-fadeIn text-xs">
              <div className="mb-2 pb-2 border-b border-[#333538]">
                <p className="font-semibold text-[#e3e3e3] truncate">{user?.name || 'User'}</p>
                <p className="text-[#9aa0a6] truncate text-[11px]">{user?.email}</p>
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
            className="w-full flex items-center gap-2.5 px-1 py-1 rounded-xl hover:bg-[#282a2c] transition-colors text-left"
            title={isAuthenticated ? user?.name : 'Sign In'}
          >
            <div
              className={`relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isAuthenticated
                  ? 'bg-[#282a2c] text-[#e3e3e3] border border-[#333538]'
                  : 'bg-[#282a2c] text-[#9aa0a6]'
              }`}
            >
              {isAuthenticated ? (
                <span className="text-xs font-medium text-[#e3e3e3] uppercase">
                  {(user?.name || user?.email || 'U')[0]}
                </span>
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-250 overflow-hidden">
              <p className="text-xs font-medium text-[#e3e3e3] truncate">
                {isAuthenticated ? user?.name || 'Account' : 'Sign In'}
              </p>
              <p className="text-[10px] text-[#9aa0a6] truncate">
                {isAuthenticated ? user?.email : 'Click to log in'}
              </p>
            </div>

            {!isAuthenticated && (
              <LogIn className="w-3.5 h-3.5 text-[#9aa0a6] opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex-shrink-0" />
            )}
          </button>
        </div>
      </aside>

      {/* 2. Mobile Top Navigation Bar - ONLY visible on phones (md:hidden) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-13 bg-[#131314]/95 backdrop-blur-md border-b border-[#282a2c] z-30 flex items-center justify-between px-3">
        {/* Brand & New Chat */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNewChat?.()}
            className="flex items-center gap-2 p-1 rounded-lg active:scale-95 transition-transform"
          >
            <img src={logoImg} alt="Ask AI" className="w-7 h-7 object-contain" />
            <span className="text-sm font-semibold text-[#e3e3e3] tracking-wide">Ask AI</span>
          </button>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* New Chat Button */}
          <button
            onClick={() => onNewChat?.()}
            className="p-1.5 rounded-lg text-[#9aa0a6] hover:text-[#e3e3e3] bg-[#1e1f20] border border-[#333538] flex items-center gap-1 active:scale-95 transition-all text-xs"
            title="Start New Chat"
          >
            <Plus className="w-4 h-4 text-[#a8c7fa]" />
            <span className="text-[11px] font-medium hidden xs:inline">New</span>
          </button>

          {/* History Drawer Trigger */}
          <button
            onClick={() => onOpenHistory?.()}
            className="p-1.5 rounded-lg text-[#9aa0a6] hover:text-[#e3e3e3] bg-[#1e1f20] border border-[#333538] active:scale-95 transition-all"
            title="Chat History"
          >
            <Clock className="w-4 h-4" />
          </button>

          {/* User Profile / Login */}
          <button
            onClick={handleProfileClick}
            className="w-7 h-7 rounded-full bg-[#282a2c] border border-[#333538] flex items-center justify-center text-[#e3e3e3] active:scale-95 transition-all"
            title={isAuthenticated ? user?.name : 'Sign In'}
          >
            {isAuthenticated ? (
              <span className="text-[11px] font-semibold uppercase">
                {(user?.name || user?.email || 'U')[0]}
              </span>
            ) : (
              <User className="w-3.5 h-3.5 text-[#9aa0a6]" />
            )}
          </button>
        </div>
      </header>
    </>
  );
}
