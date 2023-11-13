import { Box } from "@mui/material";
import Header from "../../components/Header";
import GetPartnerNft from "../../components/GetPartnerNFT.jsx";
import WalletConnect from "../../components/WalletConnect";

const Dashboard = ({
  walletData,
  walletIsConnected,
  walletAddress,
  setWalletIsConnected,
  setWalletAddress,
  setWalletData,
  eventResult,
  setEventResult,
  isLoadingEvent,
  setIsLoadingEvent,
  isPopupVisible,
  setIsPopupVisible
}) => {
  return (
    <div className="flex justify-center">
      <Box m="20px">
        {walletIsConnected && walletData === "18" ? ( // club manager 
          <div>
            <Header title="Welcome Club Manager " />
            <div>Here you can view your NFT and the club benefits</div>
          </div>
        ) : walletIsConnected && walletData !== "18" && walletData !== "0" ? ( // club memeber 
          <div>
            <Header title="Welcome dear Member " />
            <div>Here you can view your NFT and the club benefits</div>
          </div>
        ) : walletIsConnected && walletData === "0" ? ( // non memeber 
          <div>
            <div>
            <Header title="Join the club!" />
            <div>Get your NFT and enjoy club benefits</div>
          </div>
          <br/>
          <br/>
            <GetPartnerNft 
             eventResult={eventResult}
             setEventResult={setEventResult}
             isLoadingEvent={isLoadingEvent}
             setIsLoadingEvent={setIsLoadingEvent}
             isPopupVisible={isPopupVisible}
             setIsPopupVisible={setIsPopupVisible}
            />
            
            </div>
        ) : (
          // Add a condition here if needed // wallet is not connected 
          <>
            <Header title="Join the Club and enjoy" />
            <div>Please connect wallet to enter Lo Frayerim</div>
            
            <div>
              <WalletConnect
                walletIsConnected={walletIsConnected}
                setWalletIsConnected={setWalletIsConnected}
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                setWalletData={setWalletData}
                walletData={walletData}
              />
              
            </div>
          
          </>
        )}
          <br/>
          <br/>
        <img src="assets/lofrayer.png" alt="logo" style={{ display: 'block', margin: 'auto' }} />
      </Box>
    </div>
  );
};

export default Dashboard;
