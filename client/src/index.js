import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";  // Import HashRouter
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { sepolia } from "wagmi/chains";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { TweedFrontendSdkProvider } from "@paytweed/frontend-sdk-react";
import SettingSection from "./components/Settings/index.jsx"; 
import Wallet from "./WalletPage/index.jsx";
import LoginPage from "./components/Settings/LoginGape";

/// tweed integration 

const Application = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // State to track login status
  const [renderApp, setRenderApp] = React.useState(false);

  const REACT_APP_INFURA_API = process.env.REACT_APP_INFURA_API;
  const SIGNER_PRIVATE_KEY = process.env.REACT_APP_SIGNER_PRIVATE_KEY;

  console.log("INFURA API : ", REACT_APP_INFURA_API);

  console.log("PK API : ", SIGNER_PRIVATE_KEY);

  const { publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [infuraProvider({ apiKey: REACT_APP_INFURA_API })]
  );

  const config = createConfig({
    autoConnect: true,

    publicClient,
    webSocketPublicClient,
  });


  //"http://localhost:3001/message"
  const sendMessageToBackend = React.useCallback(async (message) => {
    const response = await fetch(`${serverUrl()}/message`, {
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const { answer } = await response.json();
    return answer;
  }, []);

//"ethereumGoerli

  return (
    <WagmiConfig config={config}>
      <HashRouter>
        <TweedFrontendSdkProvider defaultBlockchainIds={["ethereumSepolia"]} sendMessageToBackend={sendMessageToBackend}>
        {renderApp ? (
            <App />
          ) : isLoggedIn ? (
            <Wallet setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setRenderApp={setRenderApp} />
          )}
        </TweedFrontendSdkProvider>
      </HashRouter>
    </WagmiConfig>
  );
};
export const serverUrl = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://server-vies.onrender.com'
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Application />);

/// tweed integration end 


