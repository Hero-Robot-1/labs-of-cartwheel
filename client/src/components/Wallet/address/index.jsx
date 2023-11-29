import { hooks } from "@paytweed/frontend-sdk-react";
import { QrButton, WalletAddress } from "../../../style";

// Add comments representing the types
/* @type {{ chainIds: string[]; selectedChain: string; }} */
const WalletAddressProps = {};

export default function WalletAddressSection({chainIds, selectedChain,}) 
  {
  const {
    data: walletAddresses,
    error: walletAddressError,
    loading: walletAddressLoading,
  } = hooks.useWalletAddresses({
    blockchainIds: chainIds,
  });
  const tweedClient = hooks.useTweedFrontendSDK();

  console.log("wallet adress: ", walletAddresses );

  function handleShowQr() {
    tweedClient.wallet.showAddress({ blockchainId: selectedChain });
  }

  if (walletAddressLoading) {
    return <WalletAddress>loading wallet address...</WalletAddress>;
  }
  if (walletAddressError) {
    return <WalletAddress>error loading wallet address</WalletAddress>;
  }
  if (walletAddresses) {
    return (
      <WalletAddress>
        {walletAddresses[selectedChain]}
        <QrButton onClick={handleShowQr}>show QR</QrButton>
      </WalletAddress>
    );
  }

  return null;
}
