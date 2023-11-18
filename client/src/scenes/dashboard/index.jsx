import { Box } from "@mui/material";
import Header from "../../components/Header";
import GetPartnerNft from "../../components/GetPartnerNFT.jsx";
import WalletConnect from "../../components/WalletConnect";
import GetTokenMetaData from "../../components/GetTokenMetaData";
import BenefitsView from "../../components/BenefitsView";
import { serverUrl } from "../../index";


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

        
        {walletIsConnected && walletData === "1" ? ( // club manager 
          <div>
            <Header title="Welcome Club Manager " />
            <div>Here you can view your NFT and the club benefits</div>
            <GetTokenMetaData
            walletData={walletData}
            />
            <BenefitsView
            Header={Header}
            serverUrl={serverUrl()}

            />
          </div>
        )  : walletIsConnected && walletData === "0" ? ( // non memeber 
        <div>
          <div>
          <Header title="Join the club" />
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="logo-image"
              width="1200px"
              height="500px"
              src={`/assets/JoinClub.png`}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <br/>
          <div>
          * If you don't have any Goerli tokens, get 100% free tokens <a href="https://goerli-faucet.pk910.de/" style={{ color: 'blue', textDecoration: 'underline' }}> here </a>.
        </div>          
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
      ) : walletIsConnected && (walletData !== "1" && walletData !== "0" && walletData !== undefined ) ? ( // club memeber 
          <div>
            <Header title="Welcome dear Member " />
            <div>Here you can view your NFT and the club benefits</div>
            <GetTokenMetaData
            walletData={walletData}
            />
            <BenefitsView
            Header={Header}
            serverUrl={serverUrl()}

            />
          </div>
          
        ) : (
          // Add a condition here if needed // wallet is not connected 
          <>
            <Header title="Join the Club and Enjoy" />
            
            <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="logo-image"
              width="1200px"
              height="500px"
              src={`/assets/welcome.png`}
              style={{ cursor: "pointer" }}
            />
          </Box>
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
      </Box>
    </div>
  );
};

export default Dashboard;
