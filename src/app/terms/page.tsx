'use client';

import Header from '@/components/Header';
import { useWallet } from '@/hooks/useWallet';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function TermsOfServicePage() {
  const { setVisible } = useWalletModal();
  const { connected, connecting, walletAddress, disconnect } = useWallet();

  const handleConnectWallet = () => {
    setVisible(true);
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-solsinister-dark via-solsinister-accent to-solsinister-dark">
      <Header 
        isWalletConnected={connected}
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-solsinister-accent/30 backdrop-blur-sm border border-solsinister-red/20 rounded-2xl p-8">
          <h1 className="text-4xl font-heading font-bold mb-8 text-solsinister-gold">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground/80 mb-6">
              <strong>Last Updated:</strong> December 2024
            </p>
            
            <div className="space-y-8 text-foreground/80">
              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  1. Acceptance of Terms
                </h2>
                <p className="mb-4">
                  By accessing or using SolSinister ("the Platform"), you agree to be bound by these Terms of Service. 
                  If you disagree with any part of these terms, you may not access the Platform.
                </p>
                <p>
                  SolSinister is a decentralized platform for adult content creators and subscribers. 
                  You must be at least 18 years old to use this platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  2. Platform Description
                </h2>
                <p className="mb-4">
                  SolSinister is a Web3 platform built on the Solana blockchain that enables:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Anonymous wallet-based access without personal data collection</li>
                  <li>Decentralized creator content monetization</li>
                  <li>VIP subscriber benefits and exclusive content access</li>
                  <li>Direct creator-subscriber interactions through blockchain technology</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  3. Age Verification & Legal Compliance
                </h2>
                <p className="mb-4">
                  <strong>Age Requirements:</strong> All users must be 18+ years old. Creators must complete KYC verification.
                </p>
                <p className="mb-4">
                  <strong>Geographic Restrictions:</strong> Access is blocked in certain jurisdictions including but not limited to:
                  Turkey, Philippines, and other regions where adult content platforms are prohibited.
                </p>
                <p>
                  IP geolocation blocking is enforced. Circumventing these restrictions violates these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  4. Creator Requirements & KYC
                </h2>
                <p className="mb-4">
                  <strong>KYC Verification:</strong> All creators must complete identity verification including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Government-issued photo ID</li>
                  <li>Proof of age (18+ required)</li>
                  <li>Wallet verification and ownership proof</li>
                  <li>Compliance with local laws regarding adult content creation</li>
                </ul>
                <p>
                  KYC data is encrypted and securely stored. Creator identities are protected from public access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  5. Content Guidelines & Restrictions
                </h2>
                <p className="mb-4">
                  <strong>Prohibited Content:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Content involving minors (under 18) in any form</li>
                  <li>Non-consensual content or revenge sharing</li>
                  <li>Content promoting illegal activities</li>
                  <li>Content violating copyright or intellectual property rights</li>
                  <li>Violent or harmful content beyond consensual BDSM/kink</li>
                </ul>
                <p>
                  Content is subject to moderation and may be removed without notice if it violates guidelines.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  6. Payment Terms & Fees
                </h2>
                <p className="mb-4">
                  <strong>Processing Fees:</strong> All transactions include a 5% platform fee plus SOL equivalent of $0.99 processing fee.
                </p>
                <p className="mb-4">
                  <strong>Payment Processing:</strong> All payments are processed through Solana blockchain. 
                  Gas fees apply according to network conditions.
                </p>
                <p>
                  Creators receive payments directly to their connected wallets minus platform fees.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  7. Privacy & Data Protection
                </h2>
                <p className="mb-4">
                  <strong>Anonymous Access:</strong> Subscribers connect via wallet only. No personal data required.
                </p>
                <p className="mb-4">
                  <strong>Data Logging:</strong> We log IP addresses for security and compliance purposes.
                </p>
                <p>
                  <strong>Creator Data:</strong> KYC information is encrypted and stored securely, 
                  accessible only to authorized compliance personnel.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibent mb-4 text-solsinister-gold">
                  8. Content Takedown & DMCA
                </h2>
                <p className="mb-4">
                  <strong>Takedown Process:</strong> Content removal requests can be submitted to our compliance team.
                </p>
                <p className="mb-4">
                  <strong>DMCA Compliance:</strong> We respond to valid DMCA takedown notices within 24-48 hours.
                </p>
                <p>
                  <strong>Counter-Notifications:</strong> Creators may file counter-notifications for incorrectly removed content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibent mb-4 text-solsinister-gold">
                  9. Account Deletion & Data Rights
                </h2>
                <p className="mb-4">
                  <strong>Account Deletion:</strong> Users may request account deletion at any time.
                </p>
                <p className="mb-4">
                  <strong>Data Retention:</strong> KYC data may be retained for legal compliance periods even after account deletion.
                </p>
                <p>
                  <strong>Content Removal:</strong> Creators may remove their content, but previously purchased content 
                  remains accessible to subscribers who paid for it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibent mb-4 text-solsinister-gold">
                  10. Dispute Resolution
                </h2>
                <p className="mb-4">
                  Disputes are resolved through binding arbitration. Class action lawsuits are waived.
                </p>
                <p>
                  For disputes under $10,000, small claims court jurisdiction is preserved.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibent mb-4 text-solsinister-gold">
                  11. Platform Modifications
                </h2>
                <p className="mb-4">
                  SolSinister reserves the right to modify these terms, platform features, or suspend service 
                  with reasonable notice.
                </p>
                <p>
                  Continued use after modifications constitutes acceptance of updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibent mb-4 text-solsinister-gold">
                  12. Contact Information
                </h2>
                <p className="mb-4">
                  For legal notices, complaints, or support:
                </p>
                <p className="mb-4">
                  <strong>Email:</strong> legal@solsinister.com<br/>
                  <strong>Support:</strong> support@solsinister.com<br/>
                  <strong>DMCA Notices:</strong> dmca@solsinister.com
                </p>
                <p>
                  Response time: 24-48 hours for critical issues, 3-5 business days for general inquiries.
                </p>
              </section>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-solsinister-red/10 border border-solsinister-red/20 rounded-lg">
            <p className="text-solsinister-red font-semibold mb-2">
              ⚠️ Important Legal Notice
            </p>
            <p className="text-sm text-foreground/80">
              By using SolSinister, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
              This platform contains adult content and is intended for users 18+ only.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}