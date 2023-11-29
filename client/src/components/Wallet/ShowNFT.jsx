import React from "react";
import { hooks } from "@paytweed/frontend-sdk-react";

const ShowNFT = ({ chainIds ,setImageUrl }) => {
  const {
    data: walletAddresses,
    error: walletAddressError,
    loading: walletAddressLoading,
  } = hooks.useWalletAddresses({
    blockchainIds: chainIds,
  });

  const { data: nftData, error: nftError, loading: nftLoading } = hooks.useNftBalance();

  console.log("Wallet Addresses: ", walletAddresses);

  console.log("NFT Data + contract: ", nftData);

  console.log("NFT Data: ", nftData?.ethereumSepolia[0]?.tokenMedia[0]?.gateway);

  const imageUrl = nftData?.ethereumSepolia[0]?.tokenMedia[0]?.gateway

  if (imageUrl) { setImageUrl(true)}

  return (
    <>
    {imageUrl && (
      <div style={{ margin: '5px auto', fontWeight: 'bold', color: 'blue' }}>
        My Card - Show it and get Discounts!
      </div>
    )}
    <div style={{ margin: '5px auto', paddingTop: '5px', paddingBottom: '5px' }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="NFT Image"
          style={{
            display: 'block',
            margin: 'auto',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      )}
    </div>
    <div style={{ margin: '5px auto' }}>
      <br />
    </div>
  </>
  );
};

export default ShowNFT;
