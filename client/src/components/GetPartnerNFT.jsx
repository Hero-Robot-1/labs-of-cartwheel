import { usePrepareContractWrite, useContractWrite, useContractEvent } from "wagmi";
import NFTContractABI from "../contracts/NFTContract.json";
import React, { useState } from "react";
import WalletConnect from "./WalletConnect";
import Confetti from 'react-confetti'


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

  const { config, error } = usePrepareContractWrite({
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
       type="button"
        disabled={error}
        onClick={() => {
          setIsLoadingEvent(true); // lets start waiting for the event from the contract. WIP - make it after confirm?
          write?.();
        }}
        className={`rounded-full py-2 px-4 focus:outline-none focus:shadow-outline-green ${error ? 'bg-gray-400 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'}`}
        >
        Join To Become A Memeber
      </button>
      <br/>
      {isLoadingEvent && <p>Loading, Please Wait for The Welcome Pop Up, It might take ap to a minute...</p>}
      {error && <p>Club is no longer accepting memeber, you can ask club manager or buy a memebership from a memeber </p>}
      {isPopupVisible && (
        <div style={popupStyle}>
            <Confetti
            width={500}
            height={300}
            />
         <p className="popup-title" style={{ fontSize: "24px", fontWeight: "bold" }}>
      Welcome to the Club!
    </p>
        
          <br/>
                        Member NFT sent to your Wallet Address
                        <br/>
                        <br/>
                        Reconnect Wallet To View Benfits and Your Personal Memeber NFT
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
