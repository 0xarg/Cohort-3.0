import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js';
import { useRef } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import {  WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './App.css'
import "@solana/wallet-adapter-react-ui/styles.css";
import { Airdrop } from './Airdrop';

function App() {
  
  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/nsie4CkPWDSvgFDKT6Yhg">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton></WalletMultiButton>
          <WalletDisconnectButton></WalletDisconnectButton>
          <Airdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App
