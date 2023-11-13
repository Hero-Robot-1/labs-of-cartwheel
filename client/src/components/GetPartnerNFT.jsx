import { usePrepareContractWrite, useContractWrite, useContractEvent } from "wagmi";
import NFTContractABI from "../contracts/NFTContract.json";
import React, { useState } from "react";

const REACT_APP_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgba(50, 50, 150, 0.7)", // Blue with transparency
  padding: "60px",
  zIndex: "999",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
};

const GetPartnerNft = () => {
  const [eventResult, setEventResult] = useState(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const { config } = usePrepareContractWrite({
    address: REACT_APP_CONTRACT_ADDRESS,
    abi: NFTContractABI,
    functionName: "mintNFT",
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  useContractEvent({
    address: REACT_APP_CONTRACT_ADDRESS,
    abi: NFTContractABI,
    eventName: "MintedNFT",
    listener(log) {
      console.log(log);
      console.log(log[0].args);
      setIsLoadingEvent(false);
      togglePopup();
    },
  });

  const { write } = useContractWrite(config);

  return (
    <>
      <button
        onClick={() => {
          write();
          setIsLoadingEvent(true);
        }}
        className="bg-green-500 text-white rounded-full py-2 px-4 hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-700"
      >
        Join the club Become Partner
      </button>

      {isLoadingEvent && <p>Loading...</p>}

      {isPopupVisible && (
        <div style={popupStyle}>
         <p className="popup-title" style={{ fontSize: "24px", fontWeight: "bold" }}>
      Welcome to the Club!
    </p>
        
          <br/>
                        Member NFT sent to your Wallet Address, check wallet, you might need to import the NFT to view the Image.
                        <br/>
                        <br/>
                        <br/>
                        <br/>

          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </>
  );
};

export default GetPartnerNft;
