// import Logo from "@/public/tweed-logo";
import { hooks } from "@paytweed/frontend-sdk-react";
import { useEffect, useState } from "react";
import { serverUrl } from "../../index";
import {
  ChainButton,
  LogoutButton,
  Menu,
  MenuItemsLine,
  Title,
  Wrapper,
} from "../../style";

// import TransactionsList from "../TransactionsList";
import WalletAddress from "./address/index.jsx";
import WalletActionsSection from "./actions/index.jsx";
import WalletTransactionsSection from "./transactions/index.jsx";
import Balance from "./balance/index.jsx";
import GetPartnerNft from "./getPartnerNFT2.jsx";
import BenefitImage from "./BenefitsImage.jsx";
import ShowNFT from "./ShowNFT.jsx";

const WalletData = (
  ) => {
  const [selectedChain, setSelectedChain] = useState('ethereumSepolia');
  const {
    data: blockchainList,
    loading: blockchainListLoading,
    error: blockchainListError,
    
  } = hooks.useBlockchainList();

  const [logoutWallet] = hooks.useWalletLogout();
  const [imageUrl, setImageUrl] = useState(null); // Define imageUrl and setImageUrl
  const [showNFT, setShowNFT] = useState(false);

  const chainIds = blockchainList?.map((chain) => chain.chainId);
  console.log('Blockchain List:', blockchainList);
  console.log('Chain IDs:', chainIds);


  let { data: nftData, error: nftError, loading: nftLoading } = hooks.useNftBalance()
  
  console.log("nftdata change : " , nftData);

  useEffect(() => {
    if (nftData?.ethereumSepolia) {
      let foundMatch = false;

      nftData.ethereumSepolia.forEach((nft) => {
        if (nft.tokenAddress.toLowerCase() === process.env.REACT_APP_CONTRACT_ADDRESS.toLowerCase()) {
          setImageUrl(nft.tokenMedia[0]?.gateway);
          foundMatch = true;
          // window.location.reload(); // This line reloads the screen
        }
      });

      if (!foundMatch) {
        setImageUrl(null);
      }
    } else {
      setImageUrl(null);
    }
  }, [nftData]); // Dependency: nftData changes trigger this logic

  
  useEffect(() => {
    if (!blockchainList) return;
    setSelectedChain(chainIds?.[3]);
  }, [blockchainList]);


  useEffect(() => {
    const sendSelectedChainToBackend = async () => {
      await fetch(`${serverUrl()}/blockchain-id`, {
        body: JSON.stringify({ blockchainId: selectedChain }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
    };

    sendSelectedChainToBackend();
  }, [selectedChain]);

  function handleLogout() {
    logoutWallet({});
    
    window.location.reload();
  }

  if (!selectedChain || !chainIds) return null;

  return (

    <Wrapper style={{ backgroundColor: '#FFF9EF'  }}>
      
      <Title style={{ fontWeight: 'bold', color: '#0E4B8A' , font: "rubic"}}>Lo Frayerim Club</Title>
      {/* <WalletAddress chainIds={chainIds} selectedChain={"ethereumSepolia"} /> */}
      {/* <Balance chainIds={chainIds} selectedChain={"ethereumSepolia"}  /> */}
      {(imageUrl && <ShowNFT setImageUrl={setImageUrl} imageUrl={imageUrl} /> )}
        
      {!imageUrl && (
    
        <GetPartnerNft setShowNFT={setShowNFT} imageUrl={imageUrl} setImageUrl={setImageUrl} chainIds={chainIds} selectedChain={"ethereumSepolia"}/>
        )}
     
      {/* <Menu>
        <MenuItemsLine>
          <WalletActionsSection selectedChain={"ethereumSepolia"} />
        </MenuItemsLine>
      </Menu> */}
      {/* <WalletTransactionsSection selectedChain={"ethereumSepolia"} /> */}
      <br/>
      <BenefitImage/>
      <br/>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <br/>
      <br/>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </div>
      
    </Wrapper>
  );
};
export default WalletData;
