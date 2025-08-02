'use client';

import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

interface SolSinisterWalletProviderProps {
  children: React.ReactNode;
}

export default function SolSinisterWalletProvider({ children }: SolSinisterWalletProviderProps) {
  // You can also provide a custom RPC endpoint
  const network = WalletAdapterNetwork.Devnet; // Change to Mainnet for production
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Initialize supported wallets - Solana-native only (adult content friendly)
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      // Note: MetaMask explicitly excluded due to adult content restrictions
      // Torus and Ledger removed due to dependency conflicts
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider featuredWallets={2}>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}