import type { Metadata } from "next";
import "./globals.css";
import SolSinisterWalletProvider from "@/components/WalletProvider";
import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "SolSinister - Private. Decentralized. Kink-Safe.",
  description: "The premier decentralized platform where luxury meets desire, creators reign supreme, and privacy is paramount.",
  keywords: ["solana", "web3", "decentralized", "adult", "content", "creators", "luxury"],
  robots: "noindex, nofollow", // Since this is adult content
  icons: {
    icon: '/solsinisterlogo.png',
    shortcut: '/solsinisterlogo.png',
    apple: '/solsinisterlogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-luxury-black text-luxury-white font-body antialiased min-h-screen">
        <UserProvider>
          <SolSinisterWalletProvider>
            {children}
          </SolSinisterWalletProvider>
        </UserProvider>
      </body>
    </html>
  );
}