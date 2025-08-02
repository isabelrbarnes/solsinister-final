'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  userRole: 'creator' | 'viewer' | null;
  isVerified: boolean;
  setUserRole: (role: 'creator' | 'viewer') => void;
  setVerified: (verified: boolean) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRoleState] = useState<'creator' | 'viewer' | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  // Load from localStorage on mount - but only if they've entered the site
  useEffect(() => {
    const hasEnteredSite = localStorage.getItem('solsinister_has_entered') === 'true';
    
    if (hasEnteredSite) {
      const savedRole = localStorage.getItem('solsinister_user_role') as 'creator' | 'viewer' | null;
      const savedVerified = localStorage.getItem('solsinister_verified') === 'true';
      
      if (savedRole && savedVerified) {
        setUserRoleState(savedRole);
        setIsVerified(savedVerified);
      }
    }
  }, []);

  const setUserRole = (role: 'creator' | 'viewer') => {
    setUserRoleState(role);
    setIsVerified(true);
    localStorage.setItem('solsinister_user_role', role);
    localStorage.setItem('solsinister_verified', 'true');
  };

  const setVerified = (verified: boolean) => {
    setIsVerified(verified);
    localStorage.setItem('solsinister_verified', verified.toString());
  };

  const logout = () => {
    setUserRoleState(null);
    setIsVerified(false);
    localStorage.removeItem('solsinister_user_role');
    localStorage.removeItem('solsinister_verified');
  };

  return (
    <UserContext.Provider value={{
      userRole,
      isVerified,
      setUserRole,
      setVerified,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}