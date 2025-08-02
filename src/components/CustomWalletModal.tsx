'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

interface CustomWalletModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CustomWalletModal({ visible, onClose }: CustomWalletModalProps) {
  const { wallets, select, connecting } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  // Filter to only show our approved wallets
  const approvedWallets = wallets.filter(wallet => 
    wallet.adapter.name === 'Phantom' || 
    wallet.adapter.name === 'Solflare'
  );

  const handleWalletSelect = async (walletName: string) => {
    setSelectedWallet(walletName);
    try {
      select(walletName as any);
      // Don't close modal immediately - let the parent component handle it when connection succeeds
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setSelectedWallet(null);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-luxury-accent border border-luxury-muted rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl luxury-heading text-luxury-white">
            Connect Wallet
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-luxury-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-300 text-sm mb-6">
          Connect with a Solana wallet to continue. Only adult-content friendly wallets are supported.
        </p>

        <div className="space-y-3">
          {approvedWallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => handleWalletSelect(wallet.adapter.name)}
              disabled={connecting || selectedWallet === wallet.adapter.name}
              className="w-full flex items-center space-x-4 p-4 bg-luxury-black/30 hover:bg-luxury-black/50 border border-luxury-muted hover:border-luxury-rose rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                {wallet.adapter.icon ? (
                  <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-8 h-8" />
                ) : (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    wallet.adapter.name === 'Phantom' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}>
                    <span className="text-white text-sm font-bold">
                      {wallet.adapter.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="text-luxury-white font-medium">
                  {wallet.adapter.name}
                </div>
                <div className="text-gray-400 text-xs">
                  {wallet.readyState === 'Installed' ? 'Detected' : 'Not Installed'}
                </div>
              </div>

              {connecting && selectedWallet === wallet.adapter.name && (
                <div className="w-5 h-5 border-2 border-luxury-rose border-t-transparent rounded-full animate-spin"></div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            ⚠️ MetaMask not supported due to adult content restrictions
          </p>
        </div>
      </div>
    </div>
  );
}