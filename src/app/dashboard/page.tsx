'use client';

import { useWallet } from '@/hooks/useWallet';
import Header from '@/components/Header';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function DashboardPage() {
  const { setVisible } = useWalletModal();
  const { connected, connecting, walletAddress, disconnect, balance } = useWallet();
  const [activeTab, setActiveTab] = useState('subscriptions');

  const handleConnectWallet = () => {
    setVisible(true);
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solsinister-dark via-solsinister-accent to-solsinister-dark">
        <Header 
          isWalletConnected={connected}
          walletAddress={walletAddress}
          onConnectWallet={handleConnectWallet}
          onDisconnectWallet={handleDisconnectWallet}
        />
        
        <main className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-solsinister-gold">
              Access Required
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Connect your wallet to access your personal dashboard and manage your subscriptions.
            </p>
            <button 
              onClick={handleConnectWallet}
              disabled={connecting}
              className="btn-luxury-gold text-lg px-8 py-4 glow-gold disabled:opacity-50"
            >
              {connecting ? '🔄 Connecting...' : '🚀 Connect Wallet'}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solsinister-dark via-solsinister-accent to-solsinister-dark">
      <Header 
        isWalletConnected={connected}
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Dashboard Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-solsinister-gold">
            Your Dashboard
          </h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-xl text-foreground/70 mb-4 md:mb-0">
              Manage your subscriptions, favorites, and VIP status
            </p>
            <div className="bg-solsinister-accent/50 border border-solsinister-gold/30 rounded-lg px-4 py-2">
              <span className="text-solsinister-gold font-semibold">
                Balance: {balance?.toFixed(4) || '0.0000'} SOL
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-6">
            <div className="text-2xl mb-2">🔥</div>
            <h3 className="text-lg font-semibold text-solsinister-gold mb-1">Active Subs</h3>
            <p className="text-2xl font-bold text-foreground">7</p>
          </div>
          
          <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-gold/20 rounded-2xl p-6">
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="text-lg font-semibold text-solsinister-gold mb-1">Favorites</h3>
            <p className="text-2xl font-bold text-foreground">12</p>
          </div>
          
          <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-6">
            <div className="text-2xl mb-2">👑</div>
            <h3 className="text-lg font-semibold text-solsinister-gold mb-1">VIP Status</h3>
            <p className="text-sm text-foreground">Gold Member</p>
          </div>
          
          <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-6">
            <div className="text-2xl mb-2">💎</div>
            <h3 className="text-lg font-semibold text-solsinister-gold mb-1">Total Spent</h3>
            <p className="text-lg font-bold text-foreground">47.8 SOL</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-2 mb-8 flex space-x-2 overflow-x-auto">
          {[
            { id: 'subscriptions', label: 'Subscriptions', icon: '🔥' },
            { id: 'favorites', label: 'Favorites', icon: '⭐' },
            { id: 'purchases', label: 'Purchases', icon: '🛒' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-solsinister-red text-white' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-solsinister-muted/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-solsinister-accent/30 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-8">
          {activeTab === 'subscriptions' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Active Subscriptions
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 7}, (_, i) => (
                  <div key={i} className="bg-solsinister-muted/50 border border-solsinister-red/20 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-solsinister-gold/20 rounded-full flex items-center justify-center">
                        <span className="text-solsinister-gold font-semibold">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">@creator{i + 1}</h3>
                        <p className="text-sm text-foreground/60">Expires in {Math.floor(Math.random() * 28) + 1} days</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-solsinister-gold font-semibold">
                        {(Math.random() * 3 + 1).toFixed(1)} SOL/mo
                      </span>
                      <button className="text-xs bg-solsinister-red/20 hover:bg-solsinister-red/40 text-foreground px-3 py-1 rounded-full transition-colors">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Favorite Creators
              </h2>
              <p className="text-foreground/70">Your favorite creators will appear here.</p>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Purchase History
              </h2>
              <p className="text-foreground/70">Your purchase history and transactions will appear here.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Account Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Privacy Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="form-checkbox text-solsinister-red" defaultChecked />
                      <span className="text-foreground/80">Show me in creator recommendations</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="form-checkbox text-solsinister-red" />
                      <span className="text-foreground/80">Allow direct messages from creators</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="form-checkbox text-solsinister-red" defaultChecked />
                      <span className="text-foreground/80">New content from subscribed creators</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="form-checkbox text-solsinister-red" defaultChecked />
                      <span className="text-foreground/80">Special offers and promotions</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}