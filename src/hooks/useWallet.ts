'use client';

import { useWallet as useWalletAdapter } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState, useEffect, useCallback } from 'react';

export function useWallet() {
  const { connection } = useConnection();
  const { 
    wallet, 
    publicKey, 
    connected, 
    connecting, 
    disconnect,
    select
  } = useWalletAdapter();
  
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Get wallet balance
  const getBalance = useCallback(async () => {
    if (!publicKey || !connection) return;
    
    try {
      setLoading(true);
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [publicKey, connection]);

  // Update balance when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      getBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, getBalance]);

  // Disconnect wallet
  const handleDisconnect = useCallback(async () => {
    await disconnect();
    setBalance(null);
  }, [disconnect]);

  // Connect to specific wallet
  const connectWallet = useCallback((walletName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select(walletName as any);
  }, [select]);

  return {
    wallet,
    publicKey,
    connected,
    connecting,
    balance,
    loading,
    disconnect: handleDisconnect,
    connectWallet,
    refreshBalance: getBalance,
    walletAddress: publicKey?.toString(),
  };
}