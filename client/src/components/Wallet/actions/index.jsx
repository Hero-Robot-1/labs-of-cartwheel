import { hooks } from "@paytweed/frontend-sdk-react";
import { Button } from "../../../style";
import { ethers } from "ethers";

export default function WalletActionsSection({ selectedChain }) {
  const [sendCoinToWallet] = hooks.useSendCoinToWallet();
  const [createRecoveryKit] = hooks.useCreateRecovery();
  const [buyNft] = hooks.useBuyNft();
  const tweedClient = hooks.useTweedFrontendSDK();
  const { data: tweedProvider } = hooks.useBlockchainProvider({
    chainId: selectedChain,
  });

  const sendTransactionEthers = async () => {
    const web3Provider = new ethers.BrowserProvider.Web3Provider(tweedProvider);
    const address = await tweedClient.wallet.getAddress({
      blockchainId: selectedChain,
    });
    const signer = web3Provider.getSigner();
    await signer.sendTransaction({ to: address });
  };

  async function handleSendTransaction() {
    const address = await tweedClient.wallet.getAddress({
      blockchainId: selectedChain,
    });
    sendCoinToWallet({
      walletAddress: address,
      value: "1",
      blockchainId: selectedChain,
    });
  }

  function handleCreateRecoveryKit() {
    createRecoveryKit({
      callbacks: { onSuccess: () => console.log("logged out") },
    });
  }

  function handleBuyNft() {
    buyNft({ nftId: "1" });
  }

  return (
    <>
      <Button onClick={handleSendTransaction}>Send Transaction</Button>
      <Button onClick={handleCreateRecoveryKit}>Create a Recovery Kit</Button>
      <Button onClick={handleBuyNft}>Buy Nft</Button>
      <Button onClick={sendTransactionEthers}>Send Transaction (ethers)</Button>
    </>
  );
}
