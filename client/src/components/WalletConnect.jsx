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
  const REACT_APP_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
  setWalletAddress(address);
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
      <IconButton>
        <button>Connect wallet</button>
      </IconButton>
    </div>
  );
};

export default WalletConnect;
