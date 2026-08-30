import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DJANGO_URL = import.meta.env.VITE_DJANGO_BASE_URL || 'http://localhost:8001';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('askai_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register' | 'otp'
  const [pendingEmail, setPendingEmail] = useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem('askai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('askai_user');
    }
  }, [user]);

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Register
  const register = async (name, email, password) => {
    const res = await fetch(`${DJANGO_URL}/accounts/api/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.detail || 'Registration failed');
    }
    setPendingEmail(email);
    setAuthModalTab('otp');
    return data;
  };

  // Verify OTP
  const verifyOtp = async (email, code) => {
    const targetEmail = email || pendingEmail;
    const res = await fetch(`${DJANGO_URL}/accounts/api/verify-otp/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: targetEmail, code }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.detail || 'Verification failed');
    }
    setUser(data.user);
    setIsAuthModalOpen(false);
    return data;
  };

  // Login
  const login = async (email, password) => {
    const res = await fetch(`${DJANGO_URL}/accounts/api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.requires_otp) {
      setPendingEmail(email);
      setAuthModalTab('otp');
      throw new Error(data.detail || 'Please verify your OTP code.');
    }
    if (!res.ok || !data.success) {
      throw new Error(data.detail || 'Invalid email or password');
    }
    setUser(data.user);
    setIsAuthModalOpen(false);
    return data;
  };

  // Logout
  const logout = async () => {
    try {
      await fetch(`${DJANGO_URL}/accounts/api/logout/`, { method: 'POST' });
    } catch {
      // ignore
    }
    setUser(null);
    localStorage.removeItem('askai_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        pendingEmail,
        setPendingEmail,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
