'use client';

import Header from '@/components/Header';
import { useWallet } from '@/hooks/useWallet';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground/80 mb-6">
              <strong>Last Updated:</strong> December 2024
            </p>
            
            <div className="space-y-8 text-foreground/80">
              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  1. Privacy Philosophy
                </h2>
                <p className="mb-4">
                  SolSinister is built on the principle of maximum privacy and anonymity. We collect only the minimum 
                  data necessary for platform operation and legal compliance.
                </p>
                <p>
                  Your privacy is our priority. We use blockchain technology to minimize data collection while 
                  ensuring platform security and regulatory compliance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  2. Data We Collect
                </h2>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">For All Users:</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Wallet address (public blockchain data)</li>
                  <li>IP address (for security and geo-blocking)</li>
                  <li>Transaction history (on-chain, publicly visible)</li>
                  <li>Browser fingerprinting for security</li>
                  <li>Usage analytics (anonymized)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-foreground">For Creators (KYC Required):</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Government-issued identification</li>
                  <li>Proof of age documentation</li>
                  <li>Wallet ownership verification</li>
                  <li>Tax information (if applicable)</li>
                  <li>Content metadata and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  3. Data We DO NOT Collect
                </h2>
                <ul className="list-disc pl-6 mb-4">
                  <li>Email addresses or phone numbers (for subscribers)</li>
                  <li>Real names or personal information (for subscribers)</li>
                  <li>Payment method details (crypto payments only)</li>
                  <li>Social media profiles or external accounts</li>
                  <li>Device contacts or personal files</li>
                  <li>Location data beyond IP-based region detection</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  4. How We Use Your Data
                </h2>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">Essential Platform Operations:</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Processing blockchain transactions</li>
                  <li>Maintaining platform security and preventing fraud</li>
                  <li>Enforcing geographic restrictions and age verification</li>
                  <li>Providing customer support</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-foreground">Legal Compliance:</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Age verification and KYC for creators</li>
                  <li>Anti-money laundering (AML) compliance</li>
                  <li>Responding to lawful requests from authorities</li>
                  <li>Content moderation and safety enforcement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  5. Data Storage & Security
                </h2>
                <p className="mb-4">
                  <strong>Encryption:</strong> All sensitive data is encrypted at rest and in transit using industry-standard protocols.
                </p>
                <p className="mb-4">
                  <strong>Storage Location:</strong> Data is stored on secure servers with adult-content-friendly hosting providers.
                </p>
                <p className="mb-4">
                  <strong>Access Controls:</strong> Strict access controls ensure only authorized personnel can access KYC data.
                </p>
                <p>
                  <strong>Retention:</strong> KYC data is retained for regulatory compliance periods. Other data is deleted when no longer needed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  6. Data Sharing & Third Parties
                </h2>
                <p className="mb-4">
                  <strong>We DO NOT sell or rent your personal data to third parties.</strong>
                </p>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">Limited Sharing Scenarios:</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Legal compliance: When required by law or court order</li>
                  <li>Safety: To prevent illegal activity or harm</li>
                  <li>Service providers: Encrypted data to essential service providers (hosting, security)</li>
                  <li>Blockchain: Transaction data is publicly visible on Solana blockchain</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  7. Geographic Restrictions & IP Logging
                </h2>
                <p className="mb-4">
                  <strong>IP Address Logging:</strong> We log IP addresses to enforce geographic restrictions and prevent access 
                  from prohibited jurisdictions.
                </p>
                <p className="mb-4">
                  <strong>Blocked Regions:</strong> Access is blocked from countries where adult content platforms are illegal, 
                  including but not limited to Turkey, Philippines, and others.
                </p>
                <p>
                  <strong>VPN Detection:</strong> We employ VPN detection to prevent circumvention of geographic restrictions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  8. Cookies & Tracking
                </h2>
                <p className="mb-4">
                  <strong>Essential Cookies:</strong> We use necessary cookies for platform functionality and security.
                </p>
                <p className="mb-4">
                  <strong>Analytics:</strong> Anonymous usage analytics help us improve the platform experience.
                </p>
                <p>
                  <strong>No Advertising Tracking:</strong> We do not use advertising cookies or cross-site tracking.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  9. Your Privacy Rights
                </h2>
                <p className="mb-4">
                  <strong>Access:</strong> Request information about data we hold about you.
                </p>
                <p className="mb-4">
                  <strong>Correction:</strong> Request correction of inaccurate personal data.
                </p>
                <p className="mb-4">
                  <strong>Deletion:</strong> Request deletion of your account and associated data (subject to legal retention requirements).
                </p>
                <p className="mb-4">
                  <strong>Data Portability:</strong> Request a copy of your data in a structured format.
                </p>
                <p>
                  <strong>Consent Withdrawal:</strong> Withdraw consent for data processing (may limit platform functionality).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  10. Age Verification & Minors
                </h2>
                <p className="mb-4">
                  <strong>18+ Only:</strong> SolSinister is exclusively for users 18 years and older.
                </p>
                <p className="mb-4">
                  <strong>Age Verification:</strong> We use various methods to verify user age and prevent minor access.
                </p>
                <p>
                  <strong>Zero Tolerance:</strong> Any discovered minor access results in immediate account termination and 
                  reporting to authorities if required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  11. Data Breaches
                </h2>
                <p className="mb-4">
                  In the unlikely event of a data breach affecting personal information, we will:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Notify affected users within 72 hours</li>
                  <li>Report to relevant authorities as required by law</li>
                  <li>Provide detailed information about the breach scope</li>
                  <li>Offer credit monitoring or identity protection if applicable</li>
                  <li>Implement additional security measures to prevent recurrence</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  12. International Users
                </h2>
                <p className="mb-4">
                  <strong>GDPR Compliance:</strong> EU users have additional rights under GDPR, including data portability and erasure.
                </p>
                <p className="mb-4">
                  <strong>CCPA Compliance:</strong> California residents have rights to know, delete, and opt-out of data sales.
                </p>
                <p>
                  <strong>Global Standards:</strong> We apply privacy-by-design principles globally, not just where legally required.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  13. Contact & Privacy Requests
                </h2>
                <p className="mb-4">
                  For privacy-related questions or to exercise your rights:
                </p>
                <p className="mb-4">
                  <strong>Privacy Officer:</strong> privacy@solsinister.com<br/>
                  <strong>Data Protection:</strong> dpo@solsinister.com<br/>
                  <strong>General Support:</strong> support@solsinister.com
                </p>
                <p>
                  <strong>Response Time:</strong> We respond to privacy requests within 30 days (or as required by local law).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-semibold mb-4 text-solsinister-gold">
                  14. Policy Updates
                </h2>
                <p className="mb-4">
                  We may update this Privacy Policy to reflect changes in our practices or legal requirements.
                </p>
                <p>
                  Material changes will be communicated through platform notifications and require user acknowledgment.
                </p>
              </section>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-solsinister-gold/10 border border-solsinister-gold/20 rounded-lg">
            <p className="text-solsinister-gold font-semibold mb-2">
              🔒 Privacy Commitment
            </p>
            <p className="text-sm text-foreground/80">
              SolSinister is committed to protecting your privacy through anonymity, encryption, and minimal data collection. 
              Your trust is essential to our mission of providing a safe, luxurious adult content platform.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}