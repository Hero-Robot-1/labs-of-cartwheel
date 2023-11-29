import React from "react";
import { hooks } from "@paytweed/frontend-sdk-react";

const GetPartnerNft2 = ({ chainIds }) => {
  const {
    data: walletAddresses,
    error: walletAddressError,
    loading: walletAddressLoading,
  } = hooks.useWalletAddresses({
    blockchainIds: chainIds,
  });

  const [buyNft] = hooks.useBuyNft();

  console.log("wallet adress 342: ", walletAddresses);

  function handleBuyNft() {
    if (walletAddresses) {
      buyNft({ nftId: walletAddresses }); // You can access the walletAddresses data here
    } else {
      console.error("Wallet addresses not available");
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {walletAddresses && (
        <button
          type="button"
          onClick={handleBuyNft}
          className={`rounded-full py-2 px-4 focus:outline-none focus:shadow-outline-green`}
          style={{
            width: "25%", // Set the width to 25% of its parent container
            backgroundColor: '#6db5b3',
            borderRadius: '20px',
            color: 'white',
            border: 'none',
            fontSize: '17px',
            maxWidth: '250px', // Max width for responsiveness
            borderColor: 'red',
            outline: 'none',
            marginTop: '40px',
            padding: '10px 20px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            cursor: 'pointer',
            transition: 'transform 0.3s ease', // Transition on hover
          }}
          onMouseOver={(e) => { e.target.style.transform = 'scale(1.009)'; }} // Scale on hover
          onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }} // Reset on mouse out
        >
         Click to Join Club
        </button>
      )}
    </div>
  );
};

export default GetPartnerNft2;
