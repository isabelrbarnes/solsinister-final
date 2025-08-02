'use client';

import { useWallet } from '@/hooks/useWallet';
import Header from '@/components/Header';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function ExplorePage() {
  const { setVisible } = useWalletModal();
  const { connected, connecting, walletAddress, disconnect } = useWallet();

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
              Access Denied
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Connect your wallet to explore exclusive creator content and experiences.
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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-solsinister-gold">
            Explore Creators
          </h1>
          <p className="text-xl text-foreground/70">
            Discover exclusive content from verified creators in the SolSinister community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-solsinister-accent/50 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search creators..."
              className="flex-1 bg-solsinister-muted border border-solsinister-red/30 rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:border-solsinister-gold focus:outline-none"
            />
            <select className="bg-solsinister-muted border border-solsinister-red/30 rounded-lg px-4 py-3 text-foreground focus:border-solsinister-gold focus:outline-none">
              <option value="">All Categories</option>
              <option value="fetish">Fetish & BDSM</option>
              <option value="lifestyle">Luxury Lifestyle</option>
              <option value="roleplay">Fantasy & Roleplay</option>
              <option value="custom">Custom Content</option>
            </select>
          </div>
        </div>

        {/* Creator Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({length: 9}, (_, i) => (
            <div key={i} className="group relative bg-gradient-to-br from-solsinister-accent to-solsinister-muted rounded-2xl overflow-hidden border border-solsinister-red/20 hover:border-solsinister-gold/40 transition-all duration-500">
              <div className="aspect-[4/5] bg-gradient-to-br from-solsinister-red/20 to-solsinister-gold/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* Creator Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-10 h-10 bg-solsinister-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-solsinister-gold font-semibold">
                        {String.fromCharCode(65 + (i % 26))}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-white">
                        @creator{i + 1}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-solsinister-gold bg-solsinister-gold/20 px-2 py-1 rounded-full">
                          VIP
                        </span>
                        <span className="text-xs text-white/70">
                          {Math.floor(Math.random() * 500) + 100} subs
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-white/80 mb-3 line-clamp-2">
                    Exclusive content creator specializing in luxury kink experiences and custom requests.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-solsinister-gold font-semibold">
                        {(Math.random() * 5 + 0.5).toFixed(1)} SOL/month
                      </span>
                    </div>
                    <button className="text-xs bg-solsinister-red/80 hover:bg-solsinister-red text-white px-4 py-2 rounded-full transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-luxury px-8 py-3">
            Load More Creators
          </button>
        </div>
      </main>
    </div>
  );
}