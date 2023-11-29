import { hooks } from "@paytweed/frontend-sdk-react";
import { WalletAddress, QrButton } from "../../../style";
import { useState, useEffect } from "react";
import SendTx from '../sendTx.jsx';

export default function WalletBalance({ chainIds, selectedChain }) {
  const {
    data: walletAddresses,
    error: walletAddressError,
    loading: walletAddressLoading,
  } = hooks.useWalletAddresses({
    blockchainIds: chainIds,
  });
  const tweedClient = hooks.useTweedFrontendSDK();
  const [balance, setBalance] = useState(null);


  useEffect(() => {
    async function fetchBalance() {
      try {
        const balanceData = await tweedClient.coin.getBalance({ blockchainId: selectedChain });
        setBalance(balanceData[selectedChain]?.value);

        // I need to check balance is < 0.003
        // If it is than I need to create TX -> sign TX with Privet key -> SendSignTX to the new wallet address 
        // Once the wallet has the balance I can initiate the mintNFT function 

      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("Error");
      }
    }
    fetchBalance();
  }, [selectedChain, tweedClient.coin]);

  if (walletAddressLoading) {
    return <WalletAddress>loading wallet address...</WalletAddress>;
  }
  if (walletAddressError) {
    return <WalletAddress>error loading wallet address</WalletAddress>;
  }
  if (walletAddresses) {
    return (
      <WalletAddress>
        {walletAddresses[selectedChain] }
      
       <QrButton> Your balance is {balance !== null ? balance : "Loading..."} </QrButton>
       {balance === 0 && <SendTx />} {/* Render SendTx component only if balance is 0 */}
      </WalletAddress>
      
    );
  }

  return null;
}
