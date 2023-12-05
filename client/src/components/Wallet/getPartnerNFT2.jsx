import React, { useState } from "react";
import { hooks } from "@paytweed/frontend-sdk-react";

const GetPartnerNft2 = ({ chainIds, setShowNFT }) => {
  const {
    data: walletAddresses,
    error: walletAddressError,
    loading: walletAddressLoading,
  } = hooks.useWalletAddresses({
    blockchainIds: chainIds,
  });

  const [buyNft] = hooks.useBuyNft();
  const [buttonText, setButtonText] = useState("Click to Join Club");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  console.log("wallet address: ", walletAddresses);

  function handleBuyNft() {
    if (walletAddresses) {
      console.log("trying to get the NFT...");
      buyNft({ nftId: walletAddresses });
      setShowNFT(true);
      setButtonText("Please logout and login to view your Membership Card");
      setButtonDisabled(true);
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
          disabled={buttonDisabled}
          className={`rounded-full py-2 px-4 focus:outline-none focus:shadow-outline-green`}
          style={{
            width: "25%", // Set the width to 25% of its parent container
            backgroundColor: buttonDisabled ? "#006400" : "#00CED1", // Green when disabled, blue when enabled
            borderRadius: "20px",
            color: "white",
            border: "none",
            fontSize: "17px",
            maxWidth: "250px", // Max width for responsiveness
            borderColor: "red",
            outline: "none",
            marginTop: "40px",
            padding: "10px 20px",
            fontFamily: "Arial, Helvetica, sans-serif",
            cursor: "pointer",
            transition: "transform 0.3s ease", // Transition on hover
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.009)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default GetPartnerNft2;
