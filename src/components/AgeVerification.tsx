'use client';

import { useState, useEffect } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import CustomWalletModal from './CustomWalletModal';

interface AgeVerificationProps {
  onVerified: (role: 'creator' | 'viewer') => void;
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'creator' | 'viewer' | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const { setVisible } = useWalletModal();
  const { connected, connecting } = useWallet();

  // Watch for wallet connection to complete the flow
  useEffect(() => {
    if (connected && selectedRole && ageConfirmed && isConnecting) {
      // Wallet is connected, proceed to platform
      setShowCustomModal(false);
      setIsConnecting(false);
      onVerified(selectedRole);
    }
  }, [connected, selectedRole, ageConfirmed, isConnecting, onVerified]);

  const handleProceed = async () => {
    if (!ageConfirmed || !selectedRole) return;
    
    setIsConnecting(true);
    setShowCustomModal(true);
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl luxury-heading text-luxury-white mb-4" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            SolSinister
          </h1>
          <p className="luxury-subheading text-luxury-rose">
            Premium Adult Content Platform
          </p>
        </div>

        {/* Age Verification */}
        <div className="bg-luxury-accent border border-luxury-muted rounded-2xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-luxury-red/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-luxury-rose" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11C15.4 11 16 11.4 16 12V16C16 16.6 15.6 17 15 17H9C8.4 17 8 16.6 8 16V12C8 11.4 8.4 11 9 11V10C9 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.2 9 10.2 10V11H13.8V10C13.8 9 12.8 8.2 12 8.2Z"/>
              </svg>
            </div>
            <h2 className="text-xl luxury-heading text-luxury-white mb-2">
              Age Verification Required
            </h2>
            <p className="luxury-body text-gray-300 text-sm">
              This platform contains adult content and is intended for users 18+ only
            </p>
          </div>

          {/* Age Confirmation */}
          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 text-luxury-rose bg-luxury-muted border-luxury-rose rounded focus:ring-luxury-rose focus:ring-2"
              />
              <span className="luxury-body text-luxury-white text-sm leading-relaxed">
                I confirm that I am <strong>18 years of age or older</strong> and agree to the 
                <a href="/terms" className="text-luxury-rose hover:underline ml-1">Terms of Service</a> and 
                <a href="/privacy" className="text-luxury-rose hover:underline ml-1">Privacy Policy</a>
              </span>
            </label>
          </div>
        </div>

        {/* Role Selection */}
        {ageConfirmed && (
          <div className="bg-luxury-accent border border-luxury-muted rounded-2xl p-8 mb-6">
            <h3 className="text-lg luxury-heading text-luxury-white mb-6 text-center">
              How will you be using SolSinister?
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={() => setSelectedRole('viewer')}
                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                  selectedRole === 'viewer'
                    ? 'border-luxury-rose bg-luxury-rose/10'
                    : 'border-luxury-muted hover:border-luxury-rose/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-luxury-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="luxury-subheading text-luxury-white text-sm">VIEWER</h4>
                    <p className="luxury-body text-gray-300 text-xs">
                      Browse and subscribe to premium creator content
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole('creator')}
                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                  selectedRole === 'creator'
                    ? 'border-luxury-gold bg-luxury-gold/10'
                    : 'border-luxury-muted hover:border-luxury-gold/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9V3H13.5L19 8.5V9H21ZM12 8L19 15H12L5 8H12Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="luxury-subheading text-luxury-white text-sm">CREATOR</h4>
                    <p className="luxury-body text-gray-300 text-xs">
                      Upload content and monetize your exclusive creations
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Wallet Information */}
        {ageConfirmed && selectedRole && (
          <div className="bg-luxury-accent/30 border border-luxury-muted rounded-xl p-6 mb-4">
            <div className="text-center mb-4">
              <h4 className="luxury-subheading text-luxury-white text-sm mb-2">
                SUPPORTED WALLETS
              </h4>
              <p className="luxury-body text-gray-300 text-xs">
                We support Solana-native wallets that permit adult content
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-3 bg-luxury-black/30 rounded-lg p-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">P</span>
                </div>
                <div>
                  <span className="text-luxury-white text-sm font-medium">Phantom</span>
                  <p className="text-gray-400 text-xs">Most Popular</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-luxury-black/30 rounded-lg p-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div>
                  <span className="text-luxury-white text-sm font-medium">Solflare</span>
                  <p className="text-gray-400 text-xs">Professional</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="luxury-body text-gray-400 text-xs">
                ⚠️ MetaMask not supported due to adult content restrictions
              </p>
              <p className="luxury-body text-gray-500 text-xs mt-1">
                Phantom and Solflare are adult-content friendly
              </p>
            </div>
          </div>
        )}

        {/* Connect Wallet Button */}
        {ageConfirmed && selectedRole && (
          <button
            onClick={handleProceed}
            disabled={isConnecting || connecting}
            className="w-full btn-luxury py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connected ? 'WALLET CONNECTED - ENTERING...' : 
             isConnecting || connecting ? 'CONNECTING WALLET...' : 
             'CONNECT SOLANA WALLET & ENTER'}
          </button>
        )}

        {/* Legal Notice */}
        <div className="mt-8 text-center">
          <p className="luxury-body text-gray-500 text-xs">
            By entering, you certify that you are of legal age and agree to our terms.
            <br />
            SolSinister is a premium adult entertainment platform.
          </p>
        </div>

        {/* Custom Wallet Modal */}
        <CustomWalletModal 
          visible={showCustomModal}
          onClose={() => setShowCustomModal(false)}
        />
      </div>
    </div>
  );
}