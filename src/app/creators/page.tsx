'use client';

import { useState, useEffect } from 'react';

export default function CreatorsPage() {
  const [spotsRemaining, setSpotsRemaining] = useState(88);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subCount: '',
    platformLink: '',
    agency: '',
    kinkContentType: [] as string[],
    location: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTermsModal, setShowTermsModal] = useState(false);

  const kinkTags = [
    'BDSM', 'CNC (consensual)', 'Chastity', 'Pet Play', 'Impact', 
    'Watersports', 'Hypno', 'Dollification', 'Medical', 'Rope/Bondage',
    'Latex/Rubber', 'Financial Domination', 'Foot Fetish', 'Sissy', 
    'Cuckolding', 'Femdom', 'Maledom', 'Switch', 'Degradation', 'Praise'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subCount.trim()) newErrors.subCount = 'Subscriber count is required';
    if (!formData.platformLink.trim()) newErrors.platformLink = 'At least one platform link is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/creator-apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.ok) {
        setIsSubmitted(true);
      } else {
        setErrors({ submit: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addKinkTag = (tag: string) => {
    if (!formData.kinkContentType.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        kinkContentType: [...prev.kinkContentType, tag]
      }));
    }
  };

  const removeKinkTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      kinkContentType: prev.kinkContentType.filter(t => t !== tag)
    }));
  };

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // Fetch current spots remaining
  useEffect(() => {
    const fetchSpotsRemaining = async () => {
      try {
        const response = await fetch('/api/creator-apply');
        if (response.ok) {
          const data = await response.json();
          setSpotsRemaining(data.spotsRemaining);
        }
      } catch (error) {
        console.error('Error fetching spots remaining:', error);
      }
    };

    fetchSpotsRemaining();
  }, []);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <img 
              src="/solsinisterlogo.png" 
              alt="SolSinister Logo" 
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl luxury-heading text-luxury-gold mb-6">
            You're on the list.
          </h1>
          <p className="text-luxury-white text-lg mb-8 leading-relaxed luxury-body">
            Watch your email for admission. If you're selected for the first cohort, you'll have <strong>48 hours to complete KYC</strong> and another <strong>48 hours after approval</strong> to create your account before your spot is passed to the next applicant.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-luxury-gold hover:text-luxury-white transition-colors duration-300 luxury-body"
          >
            ← Back to application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Limited Offer Badge */}
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-r from-luxury-gold to-luxury-rose p-[1px] rounded-full">
              <div className="bg-luxury-black px-6 py-3 rounded-full">
                <div className="text-center">
                  <p className="text-luxury-gold text-sm font-semibold tracking-wide luxury-body mb-1">
                    🔥 FIRST 100 CREATORS KEEP 100% OF EARNINGS FOR LIFE
                  </p>
                  <p className="text-luxury-rose text-xs font-medium tracking-wider luxury-body">
                    ⏰ {spotsRemaining} SPOTS REMAINING
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="w-20 h-20 mx-auto mb-8">
            <img 
              src="/solsinisterlogo.png" 
              alt="SolSinister Logo" 
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
          </div>

          <h1 className="text-5xl md:text-7xl luxury-heading text-luxury-white mb-6 tracking-tight leading-tight">
            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-rose to-luxury-gold">Founding Creator</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto luxury-body">
            Dark luxury. No shame. High-spend fans. Total control.
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center px-12 py-6 text-lg font-semibold tracking-wider uppercase bg-gradient-to-r from-luxury-rose to-luxury-gold text-luxury-black rounded-lg transition-all duration-500 hover:shadow-2xl hover:shadow-luxury-rose/25 hover:scale-105 transform"
          >
            Apply Now — Claim Founding Rates
          </button>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-6 bg-luxury-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl luxury-heading text-center text-luxury-white mb-16">
            Why SolSinister?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            <div className="bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11C15.4 11 16 11.4 16 12V16C16 16.6 15.6 17 15 17H9C8.4 17 8 16.6 8 16V12C8 11.4 8.4 11 9 11V10C9 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.2 9 10.2 10V11H13.8V10C13.8 9 12.8 8.2 12 8.2Z"/>
                </svg>
              </div>
              <h3 className="text-xl luxury-subheading text-luxury-gold mb-4">
                Kink-Safe, Not Vanilla
              </h3>
              <p className="text-gray-300 luxury-body">
                Built specifically for alternative lifestyles and fetish content. No judgment, no restrictions on consensual adult content, and no restrictions on legal content.
              </p>
            </div>

            <div className="bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <h3 className="text-xl luxury-subheading text-luxury-gold mb-4">
                Privacy First
              </h3>
              <p className="text-gray-300 luxury-body">
                Wallet login only. Anonymous buyers. No personal data collection. Complete digital privacy for creators and fans.
              </p>
            </div>

            <div className="bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl luxury-subheading text-luxury-gold mb-4">
                High-Spend VIP Audience
              </h3>
              <p className="text-gray-300 luxury-body">
                Affluent, discerning fans who value privacy, exclusivity, and bespoke experiences — willing to invest more for rare, high-quality content than on traditional platforms.
              </p>
            </div>

            <div className="bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7z"/>
                </svg>
              </div>
              <h3 className="text-xl luxury-subheading text-luxury-gold mb-4">
                No Platform Cut (Founders)
              </h3>
              <p className="text-gray-300 luxury-body">
                First 100 creators keep 100% of earnings forever. Buyers pay a small processing fee. You keep everything.
              </p>
            </div>

            <div className="bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <h3 className="text-xl luxury-subheading text-luxury-gold mb-4">
                Live Chat, Customs, Video Calls
              </h3>
              <p className="text-gray-300 luxury-body">
                Full interaction suite for premium fan engagement. Direct monetization of your time and attention.
              </p>
            </div>

            <div className="bg-luxury-accent/50 border border-luxury-gold/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h3 className="text-xl luxury-subheading text-luxury-gold mb-4">
                Most Luxury Creator Platform
              </h3>
              <p className="text-gray-300 luxury-body">
                We aim to be the most luxury creator platform with everything curated to create the best buyer and creator experience possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Details Section */}
      <section className="py-20 px-6 bg-luxury-accent/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl luxury-heading text-center text-luxury-white mb-12">
            The Founding Creator Offer
          </h2>
          
          <div className="bg-luxury-accent/50 border border-luxury-gold/30 rounded-xl p-8 backdrop-blur-sm">
            <div className="space-y-6 text-gray-300 luxury-body">
              <div>
                <h3 className="text-luxury-gold font-semibold mb-2">The Offer:</h3>
                <p>The first 100 approved creators will keep <strong className="text-luxury-white">100% of their earnings for life</strong> on this account.</p>
              </div>
              
              <div>
                <h3 className="text-luxury-gold font-semibold mb-2">Buyer Fees:</h3>
                <p>A <strong className="text-luxury-white">5% processing fee + $0.99</strong> platform fee is added to the buyer's total.</p>
              </div>
              
              <div>
                <h3 className="text-luxury-gold font-semibold mb-2">Lock-In:</h3>
                <p>This is a one-time offer, available only to the first 100 approved creators. These creators will have the <strong className="text-luxury-white">lowest rates on the platform forever</strong>.</p>
              </div>
              
              <div>
                <h3 className="text-luxury-gold font-semibold mb-2">Legal Terms:</h3>
                <p>This offer applies <strong className="text-luxury-white">only to the single account</strong> that is approved and is <strong className="text-luxury-white">locked to the KYC'd applicant(s)</strong>. No other user may use that account unless they were added at signup and included in KYC. <strong className="text-luxury-white">Rates may increase for other creators</strong> in the future.</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-luxury-gold/20">
              <button 
                onClick={() => setShowTermsModal(true)}
                className="text-luxury-gold hover:text-luxury-white transition-colors text-sm"
              >
                View Full Offer Terms →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-20 px-6 bg-luxury-black">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl luxury-heading text-luxury-white mb-6">
              Apply Now
            </h2>
            <p className="text-gray-300 text-lg luxury-body">
              This application is for creators only. We will verify age and identity via KYC if selected.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-luxury-gold text-sm font-medium mb-2 luxury-body">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 bg-luxury-black border rounded-lg text-luxury-white placeholder-gray-400 focus:ring-2 transition-all duration-300 ${
                  errors.name 
                    ? 'border-luxury-rose focus:border-luxury-rose focus:ring-luxury-rose/20' 
                    : 'border-luxury-gold/30 focus:border-luxury-gold focus:ring-luxury-gold/20'
                }`}
                placeholder="Your full name"
              />
              {errors.name && <p className="text-luxury-rose text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-luxury-gold text-sm font-medium mb-2 luxury-body">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 bg-luxury-black border rounded-lg text-luxury-white placeholder-gray-400 focus:ring-2 transition-all duration-300 ${
                  errors.email 
                    ? 'border-luxury-rose focus:border-luxury-rose focus:ring-luxury-rose/20' 
                    : 'border-luxury-gold/30 focus:border-luxury-gold focus:ring-luxury-gold/20'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-luxury-rose text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Subscriber Count */}
            <div>
              <label className="block text-luxury-gold text-sm font-medium mb-2 luxury-body">
                Current Subscriber Count *
              </label>
              <input
                type="text"
                value={formData.subCount}
                onChange={(e) => setFormData(prev => ({ ...prev, subCount: e.target.value }))}
                className={`w-full px-4 py-3 bg-luxury-black border rounded-lg text-luxury-white placeholder-gray-400 focus:ring-2 transition-all duration-300 ${
                  errors.subCount 
                    ? 'border-luxury-rose focus:border-luxury-rose focus:ring-luxury-rose/20' 
                    : 'border-luxury-gold/30 focus:border-luxury-gold focus:ring-luxury-gold/20'
                }`}
                placeholder="e.g., 10K, 50K, 100K+"
              />
              {errors.subCount && <p className="text-luxury-rose text-sm mt-1">{errors.subCount}</p>}
            </div>

            {/* Platform Links */}
            <div>
              <label className="block text-luxury-gold text-sm font-medium mb-2 luxury-body">
                Platform Links *
              </label>
              <textarea
                value={formData.platformLink}
                onChange={(e) => setFormData(prev => ({ ...prev, platformLink: e.target.value }))}
                rows={4}
                className={`w-full px-4 py-3 bg-luxury-black border rounded-lg text-luxury-white placeholder-gray-400 focus:ring-2 transition-all duration-300 resize-none ${
                  errors.platformLink 
                    ? 'border-luxury-rose focus:border-luxury-rose focus:ring-luxury-rose/20' 
                    : 'border-luxury-gold/30 focus:border-luxury-gold focus:ring-luxury-gold/20'
                }`}
                placeholder="https://onlyfans.com/yourname&#10;https://twitter.com/yourname&#10;https://instagram.com/yourname&#10;(one per line)"
              />
              {errors.platformLink && <p className="text-luxury-rose text-sm mt-1">{errors.platformLink}</p>}
            </div>

            {/* Agency */}
            <div>
              <label className="block text-luxury-gold text-sm font-medium mb-2 luxury-body">
                Agency (optional)
              </label>
              <input
                type="text"
                value={formData.agency}
                onChange={(e) => setFormData(prev => ({ ...prev, agency: e.target.value }))}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gold/30 rounded-lg text-luxury-white placeholder-gray-400 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
                placeholder="Agency name (if applicable)"
              />
            </div>

            {/* Kink Content Types */}
            <div>
              <label className="block text-luxury-gold text-sm font-medium mb-2 luxury-body">
                Content Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {kinkTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addKinkTag(tag)}
                    className={`px-3 py-2 text-xs rounded-full border transition-all duration-200 ${
                      formData.kinkContentType.includes(tag)
                        ? 'bg-luxury-gold text-luxury-black border-luxury-gold'
                        : 'bg-transparent text-gray-300 border-gray-600 hover:border-luxury-gold hover:text-luxury-gold'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {formData.kinkContentType.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.kinkContentType.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-xs bg-luxury-gold text-luxury-black rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeKinkTag(tag)}
                        className="ml-2 hover:text-luxury-rose"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-luxury-gold text-sm font-medium mb-2 luxury-body">
                Location (optional)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gold/30 rounded-lg text-luxury-white placeholder-gray-400 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
                placeholder="City, State/Province, Country"
              />
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-luxury-gold text-sm font-medium mb-2 luxury-body">
                Additional Information (optional)
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gold/30 rounded-lg text-luxury-white placeholder-gray-400 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300 resize-none"
                placeholder="Anything else you'd like us to know..."
              />
            </div>

            {errors.submit && (
              <div className="bg-luxury-rose/10 border border-luxury-rose rounded-lg p-4">
                <p className="text-luxury-rose text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-luxury-rose to-luxury-gold text-luxury-black font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-luxury-rose/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Apply Now — Claim Your Spot'}
            </button>

            <p className="text-gray-500 text-xs text-center leading-relaxed luxury-body">
              By applying, you agree this limited offer applies only to your approved, KYC-verified account. All applicants for the account must be included in KYC. Rates may change for non-founding creators.
            </p>
          </form>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 px-6 bg-luxury-accent/50 border-t border-luxury-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm luxury-body">
            We will notify all creators ahead of launch with the final launch date so you can prepare content and announcements.
          </p>
        </div>
      </section>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-luxury-black/80 flex items-center justify-center p-6 z-50">
          <div className="bg-luxury-black border border-luxury-gold/30 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl luxury-heading text-luxury-gold">
                  Full Offer Terms
                </h3>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="text-gray-400 hover:text-luxury-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 text-gray-300 luxury-body">
                <p>
                  This offer will only apply to the single account for life and is locked to the user who applies and uses KYC; no other user will be permitted to use the account if they are not added at signup and all applicants per account must be included in KYC. Rates will be subject to increases in the future for other creators.
                </p>
                
                <p>
                  The first 100 approved creators will keep 100% of their earnings for life on this account. A 5% processing fee + $0.99 platform fee is added to the buyer's total. This is a one-time offer, available only to the first 100 approved creators.
                </p>
                
                <p>
                  Selected applicants will have 48 hours to complete KYC verification and another 48 hours after KYC approval to create their account before their spot is passed to the next applicant.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-luxury-gold/20">
                <a href="/terms" className="text-luxury-gold hover:text-luxury-white transition-colors">
                  View Complete Terms of Service →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}