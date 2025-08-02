'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

interface HeaderProps {
  isWalletConnected?: boolean;
  walletAddress?: string;
  onConnectWallet?: () => void;
  onDisconnectWallet?: () => void;
  userRole?: 'creator' | 'viewer' | null;
}

export default function Header({ 
  isWalletConnected = false, 
  walletAddress,
  onConnectWallet,
  onDisconnectWallet,
  userRole
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useUser();

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleLogout = () => {
    logout();
    if (onDisconnectWallet) {
      onDisconnectWallet();
    }
  };

  return (
    <header className="relative z-50 bg-luxury-black border-b border-luxury-muted">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="luxury-heading text-3xl text-luxury-white" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            SolSinister
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          {userRole === 'viewer' ? (
            <>
              <Link href="/" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                BROWSE
              </Link>
              <a href="/categories" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                CATEGORIES
              </a>
              <a href="/trending" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                TRENDING
              </a>
              <a href="/favorites" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                FAVORITES
              </a>
            </>
          ) : userRole === 'creator' ? (
            <>
              <Link href="/" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                STUDIO
              </Link>
              <a href="/upload" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                UPLOAD
              </a>
              <a href="/analytics" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                ANALYTICS
              </a>
              <a href="/earnings" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                EARNINGS
              </a>
            </>
          ) : (
            <>
              <Link href="/" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                HOME
              </Link>
              <a href="/about" className="luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
                ABOUT
              </a>
            </>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-6">
          <button className="text-luxury-white hover:text-luxury-rose transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button className="text-luxury-white hover:text-luxury-rose transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {isWalletConnected ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block luxury-body text-xs text-gray-400">
                {walletAddress && formatWalletAddress(walletAddress)}
              </div>
              <button 
                onClick={handleLogout}
                className="btn-luxury-outlined text-xs px-4 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onConnectWallet}
              className="btn-luxury text-xs px-6 py-2"
            >
              Connect
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-luxury-white hover:text-luxury-rose transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-luxury-black border-b border-luxury-muted luxury-shadow">
          <div className="px-6 py-4 space-y-4">
            <a href="/" className="block luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
              NEW
            </a>
            <a href="/explore" className="block luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
              ALL CREATORS
            </a>
            <a href="/creators" className="block luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
              COLLECTIONS
            </a>
            <a href="/dashboard" className="block luxury-subheading text-luxury-white hover:text-luxury-rose transition-colors">
              PREMIUM
            </a>
          </div>
        </div>
      )}
    </header>
  );
}