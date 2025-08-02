'use client';

import { useState, useEffect } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import AgeVerification from '@/components/AgeVerification';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [hasEnteredSite, setHasEnteredSite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setVisible } = useWalletModal();
  const { connected, connecting, walletAddress, disconnect } = useWallet();
  const { userRole, isVerified, setUserRole } = useUser();

  // Check if user has previously entered the site
  useEffect(() => {
    // FOR TESTING FLOW: Clear localStorage on every load - COMMENT OUT AFTER TESTING
    localStorage.removeItem('solsinister_has_entered');
    localStorage.removeItem('solsinister_verified');
    localStorage.removeItem('solsinister_user_role');
    
    const hasVisited = localStorage.getItem('solsinister_has_entered');
    if (hasVisited === 'true') {
      setHasEnteredSite(true);
    }
    setIsLoading(false);
  }, []);

  const handleConnectWallet = () => {
    setVisible(true);
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };

  const handleVerified = (role: 'creator' | 'viewer') => {
    setUserRole(role);
  };

  const handleEnterSite = () => {
    setHasEnteredSite(true);
    localStorage.setItem('solsinister_has_entered', 'true');
  };

           // Show loading state while checking localStorage
         if (isLoading) {
           return (
             <div className="min-h-screen bg-luxury-black flex items-center justify-center">
               <div className="text-center">
                 <div className="w-20 h-20 mx-auto mb-4 relative">
                   <img 
                     src="/solsinisterlogo.png" 
                     alt="SolSinister Logo" 
                     className="w-full h-full object-contain filter drop-shadow-2xl animate-pulse"
                   />
                   <div className="absolute inset-0 bg-gradient-to-br from-luxury-rose/20 to-luxury-gold/20 rounded-full blur-2xl -z-10 animate-pulse"></div>
                 </div>
                 <h1 className="text-2xl luxury-heading text-luxury-white" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                   SolSinister
                 </h1>
               </div>
             </div>
           );
         }

  // DEBUG: Log current state
  console.log('Flow Debug:', { 
    hasEnteredSite, 
    isVerified, 
    userRole, 
    isLoading,
    localStorage_entered: localStorage.getItem('solsinister_has_entered'),
    localStorage_verified: localStorage.getItem('solsinister_verified'),
    localStorage_role: localStorage.getItem('solsinister_user_role')
  });

  // STEP 1: Show landing page first (always for new visitors)
  if (!hasEnteredSite) {
    return <LandingPage onEnter={handleEnterSite} />;
  }

  // STEP 2: Show age verification after clicking "Unlock the Forbidden"
  if (!isVerified || !userRole) {
    return <AgeVerification onVerified={handleVerified} />;
  }

  // STEP 3: Show platform after age verification and wallet connection

  // Render different content based on user role
  if (userRole === 'viewer') {
    return (
      <div className="min-h-screen bg-luxury-black">
        <Header 
          isWalletConnected={connected}
          walletAddress={walletAddress}
          onConnectWallet={handleConnectWallet}
          onDisconnectWallet={handleDisconnectWallet}
          userRole={userRole}
        />

        {/* Viewer Hero Banner */}
        <div className="text-center py-8 bg-luxury-black">
          <div className="mb-4 px-6 py-2 bg-luxury-rose/20 border border-luxury-rose rounded inline-block">
            <p className="text-luxury-white text-sm font-medium tracking-wide">
              👁️ VIEWER MODE
            </p>
          </div>
          {connected && (
            <div className="mb-4 px-6 py-2 bg-luxury-muted border border-luxury-rose rounded inline-block">
              <p className="text-luxury-white text-sm font-medium tracking-wide">
                ✓ WALLET CONNECTED
              </p>
            </div>
          )}
          {!connected && (
            <button 
              onClick={handleConnectWallet}
              disabled={connecting}
              className="btn-luxury disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {connecting ? 'CONNECTING...' : 'CONNECT WALLET TO BROWSE'}
            </button>
          )}
        </div>

        {/* Viewer Main Content */}
        <main className="relative bg-luxury-black">
          <div className="text-center py-16 px-6">
            <h1 className="text-4xl md:text-5xl luxury-heading text-luxury-white mb-4 tracking-wider">
              BROWSE CREATORS
            </h1>
            <p className="luxury-subheading text-luxury-rose">
              Discover Premium Adult Content
            </p>
          </div>

          {/* Viewer Creator Grid */}
          <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: "ARIA", 
                  collection: "Turquoise Dreams", 
                  style: "Floral Fantasy", 
                  price: "4.2 SOL", 
                  subscribers: "2.8K",
                  description: "Curly hair beauty in turquoise floral lingerie",
                  imageStyle: "bg-gradient-to-br from-cyan-600 via-blue-500 to-teal-600",
                  pose: "Hand on hip, confident pose"
                },
                { 
                  name: "SCARLETT", 
                  collection: "Black Lace Luxury", 
                  style: "Garter & Stockings", 
                  price: "5.1 SOL", 
                  subscribers: "3.4K",
                  description: "Blonde goddess in black lace with garter belt",
                  imageStyle: "bg-gradient-to-br from-gray-900 via-black to-gray-800",
                  pose: "Front pose, hand on waist"
                },
                { 
                  name: "VALENTINA", 
                  collection: "Rear View Elegance", 
                  style: "Back Profile Beauty", 
                  price: "4.8 SOL", 
                  subscribers: "2.1K",
                  description: "Stunning back view in black lace lingerie",
                  imageStyle: "bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900",
                  pose: "Back view, looking over shoulder"
                },
                { 
                  name: "RAVEN", 
                  collection: "Dark Desire", 
                  style: "Gothic Romance", 
                  price: "4.5 SOL", 
                  subscribers: "3.1K",
                  description: "All-black ensemble with mysterious allure",
                  imageStyle: "bg-gradient-to-br from-purple-900 via-gray-900 to-black",
                  pose: "Sultry side pose"
                },
                { 
                  name: "LUNA", 
                  collection: "Moonlight Satin", 
                  style: "Ethereal Beauty", 
                  price: "3.9 SOL", 
                  subscribers: "2.3K",
                  description: "Satin elegance under moonlight",
                  imageStyle: "bg-gradient-to-br from-slate-700 via-gray-800 to-black",
                  pose: "Graceful standing pose"
                },
                { 
                  name: "CELESTE", 
                  collection: "Nude Sophistication", 
                  style: "Classic Beauty", 
                  price: "3.7 SOL", 
                  subscribers: "1.9K",
                  description: "Timeless nude lace elegance",
                  imageStyle: "bg-gradient-to-br from-rose-800 via-pink-900 to-red-900",
                  pose: "Classic lingerie pose"
                },
                { 
                  name: "IVORY", 
                  collection: "Pure Elegance", 
                  style: "Bridal Luxury", 
                  price: "5.2 SOL", 
                  subscribers: "1.7K",
                  description: "White lace bridal luxury collection",
                  imageStyle: "bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500",
                  pose: "Bridal elegance pose"
                },
                { 
                  name: "CRIMSON", 
                  collection: "Ruby Passion", 
                  style: "Bold & Beautiful", 
                  price: "4.3 SOL", 
                  subscribers: "2.6K",
                  description: "Red passion meets black luxury",
                  imageStyle: "bg-gradient-to-br from-red-800 via-red-900 to-black",
                  pose: "Bold confident stance"
                }
              ].map((creator, i) => (
                <div key={i} className="group relative overflow-hidden luxury-hover cursor-pointer">
                  <div className="aspect-[3/4] relative overflow-hidden border border-luxury-rose/30 rounded-xl shadow-2xl group-hover:border-luxury-gold/50 transition-all duration-300">
                    
                    {/* Full Background Image - Professional Lingerie Photography Style */}
                    <div className={`absolute inset-0 ${creator.imageStyle}`}></div>
                    
                    {/* Model Silhouette Overlay - Representing the Professional Photography */}
                    <div className="absolute inset-0 bg-black">
                      {/* Professional Model Silhouette */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Body silhouette representing professional lingerie photography */}
                          <div className="w-24 h-48 relative">
                            {/* Head */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-luxury-rose/40 to-luxury-gold/40 mx-auto mb-2 border border-luxury-white/20"></div>
                            {/* Body - representing lingerie model pose */}
                            <div className="w-16 h-24 mx-auto bg-gradient-to-b from-luxury-rose/30 to-luxury-gold/30 rounded-lg border border-luxury-white/10 relative">
                              {/* Lingerie details */}
                              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-luxury-rose/50 rounded border border-luxury-white/20"></div>
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-luxury-rose/50 rounded border border-luxury-white/20"></div>
                            </div>
                            {/* Legs */}
                            <div className="flex justify-center space-x-1 mt-1">
                              <div className="w-2 h-12 bg-gradient-to-b from-luxury-rose/30 to-luxury-gold/30 rounded border border-luxury-white/10"></div>
                              <div className="w-2 h-12 bg-gradient-to-b from-luxury-rose/30 to-luxury-gold/30 rounded border border-luxury-white/10"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                    
                    {/* VIP Badge */}
                    <div className="absolute top-4 right-4 z-30">
                      <div className="bg-luxury-gold text-black px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg">
                        VIP
                      </div>
                    </div>

                    {/* Subscriber Count - Top Left */}
                    <div className="absolute top-4 left-4 z-30">
                      <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-luxury-white/20">
                        <span className="text-luxury-white text-xs font-medium">{creator.subscribers}</span>
                      </div>
                    </div>

                    {/* Creator Info Overlay - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
                      <div className="text-center space-y-2">
                        {/* Name with text shadow */}
                        <h3 className="luxury-subheading text-luxury-white text-lg font-bold tracking-wider" 
                            style={{ 
                              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)' 
                            }}>
                          @{creator.name.toLowerCase()}
                        </h3>
                        
                        {/* Collection with text shadow */}
                        <p className="text-luxury-rose text-sm font-medium tracking-wide"
                           style={{ 
                             textShadow: '1px 1px 3px rgba(0,0,0,0.8)' 
                           }}>
                          {creator.collection}
                        </p>
                        
                        {/* Style description with text shadow */}
                        <p className="text-gray-300 text-xs"
                           style={{ 
                             textShadow: '1px 1px 2px rgba(0,0,0,0.8)' 
                           }}>
                          {creator.description}
                        </p>
                        
                        {/* Price and Subscribe button */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-luxury-white/20">
                          <span className="text-luxury-white font-bold text-sm bg-black/60 px-2 py-1 rounded"
                                style={{ 
                                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)' 
                                }}>
                            {creator.price}/month
                          </span>
                          <button className="bg-gradient-to-r from-luxury-rose to-luxury-gold text-black px-4 py-2 text-xs font-bold tracking-wide uppercase hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-full">
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-rose/20 via-transparent to-luxury-gold/20 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Viewer Benefits Section */}
          <section className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl luxury-heading text-luxury-white mb-8 tracking-wide">
                VIEWER BENEFITS
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-luxury-rose/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-luxury-rose" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </div>
                  <h3 className="luxury-subheading text-luxury-white mb-2">ANONYMOUS VIEWING</h3>
                  <p className="text-gray-400 text-sm">Browse and subscribe with complete privacy using only your wallet</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                    </svg>
                  </div>
                  <h3 className="luxury-subheading text-luxury-white mb-2">VIP ACCESS</h3>
                  <p className="text-gray-400 text-sm">Unlock exclusive content and direct communication with creators</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-luxury-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-luxury-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11C15.4 11 16 11.4 16 12V16C16 16.6 15.6 17 15 17H9C8.4 17 8 16.6 8 16V12C8 11.4 8.4 11 9 11V10C9 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.2 9 10.2 10V11H13.8V10C13.8 9 12.8 8.2 12 8.2Z"/>
                    </svg>
                  </div>
                  <h3 className="luxury-subheading text-luxury-white mb-2">SECURE PAYMENTS</h3>
                  <p className="text-gray-400 text-sm">Blockchain-powered payments ensure complete transaction security</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer for Viewers */}
        <footer className="border-t border-luxury-muted bg-luxury-black">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h5 className="luxury-subheading text-luxury-white mb-4">SolSinister</h5>
                <p className="luxury-body text-gray-400 text-sm">Premium adult content platform for discerning viewers.</p>
              </div>
              <div>
                <h6 className="luxury-subheading text-luxury-white mb-3">Browse</h6>
                <ul className="space-y-2 text-sm">
                  <li><a href="/explore" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">All Creators</a></li>
                  <li><a href="/categories" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Categories</a></li>
                  <li><a href="/trending" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Trending</a></li>
                </ul>
              </div>
              <div>
                <h6 className="luxury-subheading text-luxury-white mb-3">Account</h6>
                <ul className="space-y-2 text-sm">
                  <li><a href="/dashboard" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">My Subscriptions</a></li>
                  <li><a href="/favorites" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Favorites</a></li>
                  <li><a href="/settings" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Settings</a></li>
                </ul>
              </div>
              <div>
                <h6 className="luxury-subheading text-luxury-white mb-3">Legal</h6>
                <ul className="space-y-2 text-sm">
                  <li><a href="/terms" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Terms of Service</a></li>
                  <li><a href="/privacy" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/support" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Support</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-luxury-muted mt-8 pt-8 text-center">
              <p className="luxury-body text-gray-500 text-sm">© 2024 SolSinister. Premium adult entertainment platform.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Creator Mode
  return (
    <div className="min-h-screen bg-luxury-black">
      <Header 
        isWalletConnected={connected}
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        userRole={userRole}
      />

      {/* Creator Hero Banner */}
      <div className="text-center py-8 bg-luxury-black">
        <div className="mb-4 px-6 py-2 bg-luxury-gold/20 border border-luxury-gold rounded inline-block">
          <p className="text-luxury-white text-sm font-medium tracking-wide">
            ⚡ CREATOR MODE
          </p>
        </div>
        {connected && (
          <div className="mb-4 px-6 py-2 bg-luxury-muted border border-luxury-rose rounded inline-block">
            <p className="text-luxury-white text-sm font-medium tracking-wide">
              ✓ WALLET CONNECTED
            </p>
          </div>
        )}
        {!connected && (
          <button 
            onClick={handleConnectWallet}
            disabled={connecting}
            className="btn-luxury disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {connecting ? 'CONNECTING...' : 'CONNECT WALLET TO START CREATING'}
          </button>
        )}
      </div>

      {/* Creator Main Content */}
      <main className="relative bg-luxury-black">
        <div className="text-center py-16 px-6">
          <h1 className="text-4xl md:text-5xl luxury-heading text-luxury-white mb-4 tracking-wider">
            CREATOR STUDIO
          </h1>
          <p className="luxury-subheading text-luxury-gold">
            Start Your Journey to Premium Content Creation
          </p>
        </div>

        {/* Creator Onboarding Steps */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl luxury-heading text-luxury-white mb-8 tracking-wide">
              GETTING STARTED
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                <span className="text-luxury-gold font-bold text-lg">1</span>
              </div>
              <h3 className="luxury-subheading text-luxury-white mb-2">VERIFY IDENTITY</h3>
              <p className="text-gray-400 text-sm">Complete KYC verification to ensure platform safety and compliance</p>
              <button className="mt-4 btn-luxury-gold text-xs px-4 py-2">
                START KYC
              </button>
            </div>
            
            <div className="text-center p-6 bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                <span className="text-luxury-gold font-bold text-lg">2</span>
              </div>
              <h3 className="luxury-subheading text-luxury-white mb-2">SET UP PROFILE</h3>
              <p className="text-gray-400 text-sm">Create your professional creator profile with photos and descriptions</p>
              <button className="mt-4 btn-luxury-outlined text-xs px-4 py-2" disabled>
                COMING SOON
              </button>
            </div>
            
            <div className="text-center p-6 bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                <span className="text-luxury-gold font-bold text-lg">3</span>
              </div>
              <h3 className="luxury-subheading text-luxury-white mb-2">START EARNING</h3>
              <p className="text-gray-400 text-sm">Upload content and begin monetizing your exclusive creations</p>
              <button className="mt-4 btn-luxury-outlined text-xs px-4 py-2" disabled>
                COMING SOON
              </button>
            </div>
          </div>
        </section>

        {/* Creator Benefits Section */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl luxury-heading text-luxury-white mb-8 tracking-wide">
              CREATOR BENEFITS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="luxury-subheading text-luxury-white mb-2">PREMIUM EARNINGS</h3>
                <p className="text-gray-400 text-sm">Keep 98% of your earnings with transparent blockchain payments</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                  </svg>
                </div>
                <h3 className="luxury-subheading text-luxury-white mb-2">COMPLETE CONTROL</h3>
                <p className="text-gray-400 text-sm">Set your own prices and manage your content independently</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </div>
                <h3 className="luxury-subheading text-luxury-white mb-2">PRIVACY PROTECTED</h3>
                <p className="text-gray-400 text-sm">Your identity remains secure with blockchain anonymity</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer for Creators */}
      <footer className="border-t border-luxury-muted bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="luxury-subheading text-luxury-white mb-4">SolSinister</h5>
              <p className="luxury-body text-gray-400 text-sm">Premium adult content platform for professional creators.</p>
            </div>
            <div>
              <h6 className="luxury-subheading text-luxury-white mb-3">Create</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="/upload" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Upload Content</a></li>
                <li><a href="/analytics" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Analytics</a></li>
                <li><a href="/earnings" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Earnings</a></li>
              </ul>
            </div>
            <div>
              <h6 className="luxury-subheading text-luxury-white mb-3">Support</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="/creator-help" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Creator Help</a></li>
                <li><a href="/guidelines" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Content Guidelines</a></li>
                <li><a href="/kyc" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">KYC Support</a></li>
              </ul>
            </div>
            <div>
              <h6 className="luxury-subheading text-luxury-white mb-3">Legal</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Creator Terms</a></li>
                <li><a href="/privacy" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Privacy Policy</a></li>
                <li><a href="/tax" className="luxury-body text-gray-400 hover:text-luxury-white transition-colors">Tax Information</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-luxury-muted mt-8 pt-8 text-center">
            <p className="luxury-body text-gray-500 text-sm">© 2024 SolSinister. Empowering creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
