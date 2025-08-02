'use client';

import { useState } from 'react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [creatorName, setCreatorName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll log the data - in production this would go to Supabase or email
      const waitlistData = {
        email,
        isCreator,
        creatorName: isCreator ? creatorName : null,
        walletAddress: isCreator ? walletAddress : null,
        timestamp: new Date().toISOString(),
      };

      console.log('Waitlist submission:', waitlistData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <img 
              src="/solsinisterlogo.png" 
              alt="SolSinister Logo" 
              className="w-full h-full object-contain filter drop-shadow-2xl animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/30 to-luxury-rose/30 rounded-full blur-xl -z-10 animate-pulse"></div>
            {/* Success checkmark overlay */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl luxury-heading text-luxury-gold mb-4">
            You're on the list.
          </h1>
          <p className="luxury-body text-luxury-white text-lg mb-8">
            We'll be in touch soon with exclusive early access.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="luxury-body text-yellow-500 hover:text-white transition-colors duration-300"
          >
            ← Back to waitlist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-6 relative">
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <img 
                src="/solsinisterlogo.png" 
                alt="SolSinister Logo" 
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />

            </div>
            
            <h1 className="text-4xl md:text-6xl luxury-heading text-luxury-white mb-6 tracking-wider leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-rose to-luxury-gold">
                Welcome to
              </span>
              <br />
              <span className="text-luxury-white" style={{ fontStyle: 'italic' }}>SolSinister</span>
            </h1>
            
            <p className="text-xl md:text-2xl luxury-body text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Private. Decentralized. Kink-Safe.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center px-12 py-6 text-lg font-semibold tracking-wider uppercase bg-gradient-to-r from-luxury-rose to-luxury-gold text-luxury-black rounded-lg transition-all duration-500 hover:shadow-2xl hover:shadow-luxury-rose/25 hover:scale-105 transform"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9,7H7V5A3,3 0 0,1 10,2H14A3,3 0 0,1 17,5V7H15V5A1,1 0 0,0 14,4H10A1,1 0 0,0 9,5V7M6,8H18A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8M12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13Z"/>
            </svg>
            Join the Waitlist & Become a Sinner
          </button>
          
          <p className="luxury-body text-gray-500 text-sm mt-6">
            18+ Only • Blockchain Powered • Anonymous Access
          </p>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist-form" className="min-h-screen flex items-center justify-center p-6 relative">
        <div className="relative z-10 max-w-md w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl luxury-heading text-luxury-gold mb-6">
              Enter the Realm Before the Doors Open
            </h2>
            <p className="luxury-body text-gray-300 text-lg leading-relaxed">
              Join for first access to creators, kinks, and luxury only the bold can handle.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Creator Toggle */}
            <div className="flex items-center space-x-3 mb-6">
              <input
                type="checkbox"
                id="creator-toggle"
                checked={isCreator}
                onChange={(e) => setIsCreator(e.target.checked)}
                className="w-5 h-5 bg-luxury-black border-2 border-luxury-gold rounded focus:ring-luxury-gold focus:ring-2"
              />
              <label 
                htmlFor="creator-toggle" 
                className="luxury-subheading text-yellow-500 font-medium cursor-pointer"
              >
                I'm a Creator
              </label>
            </div>

            {/* Creator Fields */}
            {isCreator && (
              <div className="space-y-4 p-4 bg-luxury-rose/10 border border-luxury-rose/20 rounded-lg">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0e0e0e] border border-[#d4af37]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Solana Wallet Address (Optional)"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0e0e0e] border border-[#d4af37]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className={`w-full px-4 py-4 bg-luxury-black border rounded-lg text-luxury-white placeholder-gray-400 focus:ring-2 transition-all duration-300 luxury-body ${
                  emailError 
                    ? 'border-luxury-rose focus:border-luxury-rose focus:ring-luxury-rose/20' 
                    : 'border-luxury-gold/30 focus:border-luxury-gold focus:ring-luxury-gold/20'
                }`}
                required
              />
              {emailError && (
                <p className="luxury-body text-luxury-rose text-sm mt-2">
                  {emailError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-luxury-rose to-luxury-gold text-luxury-black font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-luxury-rose/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed luxury-subheading"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {isSubmitting ? 'Joining...' : 'Join Now'}
            </button>

            <p className="luxury-body text-gray-500 text-xs text-center leading-relaxed">
              By joining, you confirm you're 18+ and agree to receive updates about SolSinister. 
              Your data is kept private and secure.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}