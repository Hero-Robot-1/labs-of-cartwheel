import React from "react";
import { hooks } from "@paytweed/frontend-sdk-react";

const ShowNFT = ({ chainIds ,imageUrl }) => {
  const {
    data: walletAddresses,
    error: walletAddressError,
    loading: walletAddressLoading,
  } = hooks.useWalletAddresses({
    blockchainIds: chainIds,
  });


  return (
    <>
    {imageUrl && (
      <div style={{ margin: '5px auto', color: '#0E4B8A', font: "rubik"  }}>
        Present your Card to get Discounts
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
