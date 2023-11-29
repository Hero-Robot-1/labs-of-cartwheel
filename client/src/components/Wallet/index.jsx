// import Logo from "@/public/tweed-logo";
import { hooks } from "@paytweed/frontend-sdk-react";
import { useEffect, useState } from "react";
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

  
  const chainIds = blockchainList?.map((chain) => chain.chainId);
  console.log('Blockchain List:', blockchainList);
  console.log('Chain IDs:', chainIds);


  useEffect(() => {
    if (!blockchainList) return;
    setSelectedChain(chainIds?.[3]);
  }, [blockchainList]);

  useEffect(() => {
    const sendSelectedChainToBackend = async () => {
      await fetch("http://localhost:3001/blockchain-id", {
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
      
      <Title style={{ fontWeight: 'bold', color: '#131d5c' , fontStyle:"italic"}}>Lo Frayerim Club</Title>
      <br/>
      {/* <WalletAddress chainIds={chainIds} selectedChain={"ethereumSepolia"} /> */}
      {/* <Balance chainIds={chainIds} selectedChain={"ethereumSepolia"}  /> */}
      {imageUrl && (  <ShowNFT setImageUrl={setImageUrl} /> )} {/* Pass the setImageUrl function to ShowNFT */}
        
      {!imageUrl && (
    
        <GetPartnerNft  chainIds={chainIds} selectedChain={"ethereumSepolia"}/>
        )}
     
      {/* <Menu>
        <MenuItemsLine>
          <WalletActionsSection selectedChain={"ethereumSepolia"} />
        </MenuItemsLine>
      </Menu> */}
      {/* <WalletTransactionsSection selectedChain={"ethereumSepolia"} /> */}
      <br/>
      <br/>
      <br/>
      <BenefitImage/>
      <br/>
      <br/>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
     
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </div>
      
    </Wrapper>
  );
};
export default WalletData;
