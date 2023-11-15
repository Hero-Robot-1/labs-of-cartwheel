import { usePrepareContractWrite } from "wagmi";
import NFTContractABI from "../contracts/NFTContract.json";
import React, { useState, useEffect } from "react";

const REACT_APP_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const GetTokenMetaData = (walletData) => {
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  console.log(walletData.walletData, " this is the wallt data ");

  const contractRead = usePrepareContractWrite({
    address: REACT_APP_CONTRACT_ADDRESS,
    abi: NFTContractABI,
    functionName: "getNFTData",
    args: [walletData.walletData],
    onSuccess(data) {
      const imageLink = data?.result; // Replace 'image' with the actual key in your JSON
      fetch(imageLink)
        .then((res) => res.json())
        .then((data) => {
          console.log("jdata data json: ", data);
          console.log("jdata image json: ", data?.image);
          setIsLoadingEvent(false);
          if (data?.image) {
            setImageUrl(data?.image);
          }
        })
        .catch((err) => {
          console.log("can't fetch NFT image: " , err.message);
          setIsLoadingEvent(false);
        });
    },
    onError(error) {
      console.log('NFT data Error', error);
      setIsLoadingEvent(false);
    },
  });

  return (
    <div>
      {isLoadingEvent && <p>Loading...</p>}
      {imageUrl ? (
        <img src={imageUrl} alt="NFT Image" style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default GetTokenMetaData;
