import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { goerli } from "wagmi/chains";
import { infuraProvider } from "@wagmi/core/providers/infura";

const REACT_APP_INFURA_API = process.env.REACT_APP_INFURA_API;

const { publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [infuraProvider({ apiKey: REACT_APP_INFURA_API })]
);

const config = createConfig({
  autoConnect: true,

  publicClient,
  webSocketPublicClient,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig config={config}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WagmiConfig>
);
