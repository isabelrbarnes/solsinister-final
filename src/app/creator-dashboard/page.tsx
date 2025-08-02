'use client';

import { useWallet } from '@/hooks/useWallet';
import Header from '@/components/Header';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function CreatorDashboardPage() {
  const { setVisible } = useWalletModal();
  const { connected, connecting, walletAddress, disconnect, balance } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  const [kycStatus, setKycStatus] = useState('pending'); // 'pending', 'verified', 'rejected'

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
              Creator Access Required
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Connect your wallet to access the creator dashboard and start earning.
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
        {/* Creator Dashboard Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-solsinister-gold">
              Creator Studio
            </h1>
            {kycStatus === 'verified' && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
                ✅ Verified Creator
              </span>
            )}
            {kycStatus === 'pending' && (
              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/30">
                ⏳ KYC Pending
              </span>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-xl text-foreground/70 mb-4 md:mb-0">
              Manage your content, subscribers, and earnings
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-solsinister-accent/50 border border-solsinister-gold/30 rounded-lg px-4 py-2">
                <span className="text-solsinister-gold font-semibold">
                  Balance: {balance?.toFixed(4) || '0.0000'} SOL
                </span>
              </div>
              <button className="btn-luxury-gold px-4 py-2 text-sm">
                💰 Withdraw Earnings
              </button>
            </div>
          </div>
        </div>

        {/* KYC Alert */}
        {kycStatus !== 'verified' && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">⚠️</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                  KYC Verification Required
                </h3>
                <p className="text-foreground/80 mb-4">
                  Complete your KYC verification to start accepting payments and unlock all creator features. 
                  This helps us maintain platform safety and legal compliance.
                </p>
                <button className="btn-luxury-gold text-sm px-6 py-2">
                  🔒 Complete KYC Verification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-6">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="text-lg font-semibold text-solsinister-gold mb-1">Subscribers</h3>
            <p className="text-2xl font-bold text-foreground">1,247</p>
            <p className="text-sm text-green-400">+12% this month</p>
          </div>
          
          <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-gold/20 rounded-2xl p-6">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="text-lg font-semibold text-solsinister-gold mb-1">Monthly Revenue</h3>
            <p className="text-2xl font-bold text-foreground">284.7 SOL</p>
            <p className="text-sm text-green-400">+8% this month</p>
          </div>
          
          <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-6">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="text-lg font-semibold text-solsinister-gold mb-1">Content Posts</h3>
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-sm text-blue-400">23 this month</p>
          </div>
          
          <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-6">
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="text-lg font-semibold text-solsinister-gold mb-1">VIP Subscribers</h3>
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-solsinister-gold">Premium tier</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-2 mb-8 flex space-x-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'content', label: 'Content', icon: '📱' },
            { id: 'subscribers', label: 'Subscribers', icon: '👥' },
            { id: 'earnings', label: 'Earnings', icon: '💰' },
            { id: 'messages', label: 'Messages', icon: '💬' },
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
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-solsinister-accent/30 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Creator Overview
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { action: "New subscriber", user: "@user789", time: "2 hours ago", type: "subscribe" },
                      { action: "Content purchased", user: "@user456", time: "4 hours ago", type: "purchase" },
                      { action: "VIP upgrade", user: "@user123", time: "6 hours ago", type: "vip" },
                      { action: "Custom request", user: "@user321", time: "1 day ago", type: "request" }
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-solsinister-muted/30 rounded-lg">
                        <div className="text-lg">
                          {activity.type === 'subscribe' && '👥'}
                          {activity.type === 'purchase' && '💰'}
                          {activity.type === 'vip' && '👑'}
                          {activity.type === 'request' && '💬'}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.action}</p>
                          <p className="text-xs text-foreground/60">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-solsinister-red/20 hover:bg-solsinister-red/30 border border-solsinister-red/30 rounded-lg p-4 text-left transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📸</span>
                        <div>
                          <p className="font-medium text-foreground">Upload New Content</p>
                          <p className="text-sm text-foreground/60">Share photos, videos, or live streams</p>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full bg-solsinister-gold/20 hover:bg-solsinister-gold/30 border border-solsinister-gold/30 rounded-lg p-4 text-left transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">💬</span>
                        <div>
                          <p className="font-medium text-foreground">Message Subscribers</p>
                          <p className="text-sm text-foreground/60">Send updates or promotional content</p>
                        </div>
                      </div>
                    </button>
                    
                    <button className="w-full bg-solsinister-accent/50 hover:bg-solsinister-accent/70 border border-solsinister-red/30 rounded-lg p-4 text-left transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🎯</span>
                        <div>
                          <p className="font-medium text-foreground">Create Custom Offer</p>
                          <p className="text-sm text-foreground/60">Set special pricing for VIP content</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-solsinister-gold">
                  Content Management
                </h2>
                <button className="btn-luxury-gold px-6 py-3">
                  📸 Upload New Content
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({length: 12}, (_, i) => (
                  <div key={i} className="bg-solsinister-muted/30 border border-solsinister-red/20 rounded-xl overflow-hidden hover:border-solsinister-gold/40 transition-colors">
                    <div className="aspect-square bg-gradient-to-br from-solsinister-red/20 to-solsinister-gold/20 relative">
                      <div className="absolute top-2 right-2">
                        <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {Math.floor(Math.random() * 100) + 1} views
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center justify-between">
                          <span className="text-solsinister-gold text-xs font-semibold">
                            {(Math.random() * 5 + 1).toFixed(1)} SOL
                          </span>
                          <div className="flex space-x-1">
                            <button className="bg-black/50 hover:bg-black/70 text-white p-1 rounded">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button className="bg-black/50 hover:bg-black/70 text-white p-1 rounded">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        Content #{i + 1}
                      </p>
                      <p className="text-xs text-foreground/60">
                        Uploaded {Math.floor(Math.random() * 30) + 1} days ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subscribers' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Subscriber Management
              </h2>
              <p className="text-foreground/70">Subscriber management features coming soon...</p>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Earnings & Analytics
              </h2>
              <p className="text-foreground/70">Detailed earnings analytics coming soon...</p>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Messages & Requests
              </h2>
              <p className="text-foreground/70">Direct messaging system coming soon...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-solsinister-gold">
                Creator Settings
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Profile Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Creator Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full bg-solsinister-muted border border-solsinister-red/30 rounded-lg px-4 py-3 text-foreground focus:border-solsinister-gold focus:outline-none"
                        placeholder="Your creator display name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Bio
                      </label>
                      <textarea 
                        rows={4}
                        className="w-full bg-solsinister-muted border border-solsinister-red/30 rounded-lg px-4 py-3 text-foreground focus:border-solsinister-gold focus:outline-none"
                        placeholder="Tell your audience about yourself..."
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Subscription Pricing</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Monthly Subscription (SOL)
                      </label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="w-full bg-solsinister-muted border border-solsinister-red/30 rounded-lg px-4 py-3 text-foreground focus:border-solsinister-gold focus:outline-none"
                        placeholder="2.5"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        VIP Tier Pricing (SOL)
                      </label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="w-full bg-solsinister-muted border border-solsinister-red/30 rounded-lg px-4 py-3 text-foreground focus:border-solsinister-gold focus:outline-none"
                        placeholder="5.0"
                      />
                    </div>
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