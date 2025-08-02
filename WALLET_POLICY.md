# SolSinister Wallet Policy

## Supported Wallets

SolSinister exclusively supports **Solana-native wallets** that permit adult content transactions and interactions.

### ✅ Currently Supported:

1. **Phantom Wallet** - Primary recommendation
   - Most popular Solana wallet
   - Adult content friendly
   - Excellent user experience

2. **Solflare Wallet** - Secondary recommendation  
   - Professional Solana wallet
   - Multi-platform support
   - Adult content permissive

3. **Torus Wallet** - Alternative option
   - Social login integration
   - Adult content friendly
   - Good for new crypto users

4. **Ledger Hardware Wallet** - Security-focused option
   - Hardware security
   - Adult content neutral
   - For high-value accounts

### ❌ Explicitly NOT Supported:

1. **MetaMask** - EXCLUDED
   - **Reason**: MetaMask's Terms of Service explicitly prohibit adult content
   - **Risk**: Account suspension/banning for adult content transactions
   - **Policy**: Never integrate MetaMask into adult platforms

2. **Coinbase Wallet** - EXCLUDED  
   - **Reason**: Conservative policies around adult content
   - **Risk**: Potential restrictions on adult content transactions

### Technical Implementation

```typescript
// WalletProvider.tsx
const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),      // ✅ Adult content friendly
    new SolflareWalletAdapter(),     // ✅ Adult content friendly  
    new TorusWalletAdapter(),        // ✅ Adult content friendly
    new LedgerWalletAdapter(),       // ✅ Hardware security
    // ❌ MetaMask explicitly excluded due to ToS restrictions
  ],
  []
);
```

### Why Solana-Only?

1. **Regulatory Freedom**: Solana ecosystem generally more permissive
2. **Lower Fees**: Better for micropayments and subscriptions  
3. **Speed**: Fast transactions for real-time interactions
4. **Adult Content Acceptance**: Solana wallets typically don't restrict adult content
5. **DeFi Integration**: Better adult-focused DeFi protocols on Solana

### Future Wallet Additions

When considering new wallets, evaluate:

1. ✅ **Terms of Service** - No adult content restrictions
2. ✅ **Solana Native** - Built for Solana ecosystem
3. ✅ **Active Development** - Regular updates and support
4. ✅ **User Base** - Significant adoption
5. ✅ **Security** - Proper security practices

### User Education

Always inform users about wallet restrictions:
- Display supported wallets clearly
- Explain why MetaMask is not supported
- Provide installation links for recommended wallets
- Educate about Solana ecosystem benefits

---

**Last Updated**: December 2024  
**Policy Review**: Every 6 months or when new wallets emerge