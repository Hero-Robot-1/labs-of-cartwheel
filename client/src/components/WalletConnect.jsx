import { useConnect, useDisconnect, useAccount, useContractRead } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import WalletIcon from "@mui/icons-material/Wallet";
import { IconButton } from "@mui/material";
import NFTContractABI from "../contracts/NFTContract.json"; // Import your contract ABI


  
const WalletConnect = ({
  walletIsConnected,
  setWalletIsConnected,
  walletAddress,
  setWalletAddress,
  setWalletData,
}) => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { address, isConnected } = useAccount();
  setWalletAddress(address);
  const REACT_APP_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
  
  const { data } = useContractRead({
    abi: NFTContractABI,
    address: REACT_APP_CONTRACT_ADDRESS,
    functionName: "getTokenIdByAddress",
    args: [address],
    enabled: isConnected,

    onSuccess() {
      console.log("token ID in wallet address:", data?.toString());
      console.log("walletAddress: ", walletAddress, address);

      setWalletData(data?.toString());
    },
    onError(error) {
      console.log("get token ID Error", error);
      setWalletData("0");
    },
  });

 

  const { disconnect } = useDisconnect();
  if (walletIsConnected) {
    return (
      <div
        type="button"
        onClick={() => {
          disconnect();
          setWalletIsConnected(false);
          console.log("disconnecting wallet address: ", walletAddress);
        }}
      >
        <IconButton
          style={{
            backgroundColor: "#21b6ae",
          }}
        >
          <WalletIcon />
        </IconButton>
      </div>
    );
  }

  
  return (
    <div
      onClick={() => {
        connect();
        setWalletIsConnected(true);
        console.log("connecting wallet");
      }}
    >
      <br/>
      <IconButton>
      <button style={{backgroundColor: '#2196f3', // Blue background color
        borderRadius: '30px', // Round shape
        padding: '10px 10px', // Adjust padding as needed
        color: '#fff', // White text color
        fontWeight: 'bold',
        fontSize: "1rem",
        border: 'none',
        cursor: 'pointer'}}
       >Connect Wallet</button>
      </IconButton>
      <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={{
                backgroundColor: "#2196f3",
                borderRadius: "30px",
                padding: "10px 10px",
                fontSize: "1rem",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                marginLeft: "10px", // Add some space between buttons
              }}
            >
              Download Wallet
            </button>
          </a>
    </div>
  );
};

export default WalletConnect;
