'use client';

import { useState } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-luxury-black flex flex-col">
      {/* Header */}
      <header className="relative z-50 bg-luxury-black border-b border-luxury-muted/30">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-center">
          <h1 className="text-4xl luxury-heading text-luxury-white" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
            SolSinister
          </h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Hero Section */}
          <div className="mb-16">
                      <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <img 
                src="/solsinisterlogo.png" 
                alt="SolSinister Logo" 
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-rose/20 to-luxury-gold/20 rounded-full blur-2xl -z-10 animate-pulse"></div>
            </div>
              
              <h2 className="text-4xl md:text-6xl luxury-heading text-luxury-white mb-6 tracking-wider leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-rose to-luxury-gold">
                  Indulge in the Forbidden.
                </span>
                <br />
                Privately. Luxuriously.
              </h2>
              
              <p className="text-xl md:text-2xl luxury-subheading text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                The premier decentralized platform where luxury meets desire, 
                creators reign supreme, and privacy is paramount.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-luxury-rose/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-luxury-rose" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11C15.4 11 16 11.4 16 12V16C16 16.6 15.6 17 15 17H9C8.4 17 8 16.6 8 16V12C8 11.4 8.4 11 9 11V10C9 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.2 9 10.2 10V11H13.8V10C13.8 9 12.8 8.2 12 8.2Z"/>
                  </svg>
                </div>
                <h3 className="luxury-subheading text-luxury-white text-lg mb-3">Anonymous & Secure</h3>
                <p className="luxury-body text-gray-400 text-sm">
                  Connect with just your wallet. No emails, no personal data, complete privacy on the blockchain.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="luxury-subheading text-luxury-white text-lg mb-3">Premium Content</h3>
                <p className="luxury-body text-gray-400 text-sm">
                  Curated luxury experiences from verified creators. Professional quality, exclusive access.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-luxury-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-luxury-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <h3 className="luxury-subheading text-luxury-white text-lg mb-3">Creator Empowerment</h3>
                <p className="luxury-body text-gray-400 text-sm">
                  Direct creator-to-fan relationships. Transparent earnings, complete control, premium positioning.
                </p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-luxury-accent/30 border border-luxury-muted rounded-2xl p-8 mb-16">
              <h3 className="text-2xl luxury-heading text-luxury-white mb-6">
                Where Web3 Meets Desire
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="luxury-subheading text-luxury-rose mb-3">For Connoisseurs</h4>
                  <ul className="space-y-2 luxury-body text-gray-300 text-sm">
                    <li>• Anonymous wallet-based access</li>
                    <li>• VIP experiences and exclusive content</li>
                    <li>• Direct creator communication</li>
                    <li>• Blockchain-secured transactions</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="luxury-subheading text-luxury-gold mb-3">For Creators</h4>
                  <ul className="space-y-2 luxury-body text-gray-300 text-sm">
                    <li>• You make the rules — and the money</li>
                    <li>• We just handle the pipes (2% + $0.99 processing)</li>
                    <li>• Complete content control</li>
                    <li>• Professional verification system</li>
                    <li>• Global, borderless payments</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="luxury-body text-gray-400 mb-8 text-lg">
                Ready to explore the intersection of luxury, technology, and desire?
              </p>
              
              <p className="luxury-body text-gray-500 text-sm mb-8">
                A decentralized adult entertainment platform built on Solana blockchain
              </p>
              
              <button
                onClick={onEnter}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`
                  inline-flex items-center justify-center
                  px-12 py-6 text-lg font-medium tracking-wider uppercase
                  bg-gradient-to-r from-luxury-rose to-luxury-gold
                  text-luxury-black rounded-lg
                  transition-all duration-500 ease-out
                  hover:shadow-2xl hover:shadow-luxury-rose/25
                  hover:scale-105 hover:from-luxury-gold hover:to-luxury-rose
                  ${isHovering ? 'animate-pulse' : ''}
                `}
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9,7H7V5A3,3 0 0,1 10,2H14A3,3 0 0,1 17,5V7H15V5A1,1 0 0,0 14,4H10A1,1 0 0,0 9,5V7M6,8H18A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8M12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13Z"/>
                </svg>
                Unlock the Forbidden
              </button>
              
              <p className="luxury-body text-gray-500 text-xs mt-4">
                18+ Only • Blockchain Powered • Anonymous Access
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-luxury-muted/30 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="luxury-body text-gray-500 text-sm">
              © 2024 SolSinister. Where luxury meets the blockchain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}