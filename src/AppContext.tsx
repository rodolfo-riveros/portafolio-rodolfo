import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationDict } from './translations';

export type Language = 'en' | 'es';
export type Theme = 'dark' | 'light';

export interface FirebaseMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  userId: string;
  receiptId: string;
}

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: TranslationDict;
  user: AppUser | null;
  authLoading: boolean;
  login: (name: string, email: string) => Promise<AppUser>;
  logout: () => Promise<void>;
  myTransmissions: FirebaseMessage[];
  addTransmission: (msg: FirebaseMessage) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Read initial states from localStorage or defaults
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('architect_language');
    return (saved === 'es' || saved === 'en') ? saved : 'es';
  });

  const [theme, setThemeState] = useState<Theme>('dark');

  const [user, setUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem('architect_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    // Auto-login with a default guest developer session to make the app instantly usable
    const defaultUser: AppUser = {
      uid: 'local-developer',
      email: 'dev@sysio.dev',
      displayName: 'Guest Developer'
    };
    localStorage.setItem('architect_user', JSON.stringify(defaultUser));
    return defaultUser;
  });

  const [authLoading, setAuthLoading] = useState(false); // set to false instantly since local
  const [myTransmissions, setMyTransmissions] = useState<FirebaseMessage[]>([]);

  // Persist language change
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('architect_language', lang);
  };

  // Toggle theme state (no-op, locked to dark)
  const toggleTheme = () => {
    // Theme is locked to dark as requested by the user
  };

  // Sync user transmissions from local storage
  useEffect(() => {
    if (!user) {
      setMyTransmissions([]);
      return;
    }

    const loadTransmissions = () => {
      const saved = localStorage.getItem('architect_transmissions');
      if (saved) {
        try {
          const allMsgs: FirebaseMessage[] = JSON.parse(saved);
          // Filter by current user ID
          const userMsgs = allMsgs.filter(m => m.userId === user.uid);
          // Sort by timestamp descending
          userMsgs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setMyTransmissions(userMsgs);
        } catch (e) {
          console.error('Error loading transmissions:', e);
        }
      } else {
        setMyTransmissions([]);
      }
    };

    loadTransmissions();

    // Listen for storage events (if open in multiple tabs)
    window.addEventListener('storage', loadTransmissions);
    return () => window.removeEventListener('storage', loadTransmissions);
  }, [user]);

  // Dynamically update the html tag classes for tailwind styling and WebGL tracking
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  const t = translations[language];

  const login = async (name: string, email: string) => {
    setAuthLoading(true);
    const newUser: AppUser = {
      uid: `user-${Date.now()}`,
      displayName: name || 'Guest Developer',
      email: email || 'dev@sysio.dev'
    };
    localStorage.setItem('architect_user', JSON.stringify(newUser));
    setUser(newUser);
    setAuthLoading(false);
    return newUser;
  };

  const logout = async () => {
    localStorage.removeItem('architect_user');
    setUser(null);
  };

  const addTransmission = (msg: FirebaseMessage) => {
    try {
      const saved = localStorage.getItem('architect_transmissions');
      let allMsgs: FirebaseMessage[] = [];
      if (saved) {
        allMsgs = JSON.parse(saved);
      }
      allMsgs.push(msg);
      localStorage.setItem('architect_transmissions', JSON.stringify(allMsgs));
      
      // Update local state
      if (user && msg.userId === user.uid) {
        setMyTransmissions(prev => [msg, ...prev]);
      }
    } catch (e) {
      console.error('Error saving transmission:', e);
    }
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      theme,
      toggleTheme,
      t,
      user,
      authLoading,
      login,
      logout,
      myTransmissions,
      addTransmission
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
