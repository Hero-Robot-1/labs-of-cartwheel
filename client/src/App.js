import { useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
// import Contacts from "./scenes/members";
import Dashboard from "./scenes/dashboard";
import Transaction from "./scenes/transactions";
import CreateTransaction from "./scenes/transactions/create-transaction";
import DeleteTransaction from "./scenes/transactions/delete-transaction";
import UpdateTransaction from "./scenes/transactions/update-transaction";

// import Benefits from "./scenes/benefits";
import Members from "./scenes/members"; 


import CreateBenefits from "./scenes/team/create-buisnessBenefits";
import DeleteBenefit from "./scenes/team/delete-buisnessBenefits";
import UpdateBenefit from "./scenes/team/update-buisnessBenefits";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletData, setWalletData] = useState("0");

  const location = useLocation();
  const hideTopbarAndSidebar = location.pathname.includes("/create-form");

  // events for the get NFT button 
  const [eventResult, setEventResult] = useState(null); // State to store event data
  const [isLoadingEvent, setIsLoadingEvent] = useState(false); // Loading state for event data
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {!hideTopbarAndSidebar && (
          <Sidebar walletData={walletData} walletIsConnected={walletIsConnected} />
        )}
          <main className="content">
          {!hideTopbarAndSidebar && (
            <Topbar
              walletIsConnected={walletIsConnected}
              setWalletIsConnected={setWalletIsConnected}
              setWalletData={setWalletData}
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
            />
          )}
            <Routes>
              <Route path="/" element={
              <Dashboard
               walletIsConnected={walletIsConnected}
               setWalletIsConnected={setWalletIsConnected}
               setWalletData={setWalletData}
               walletData={walletData}
               setWalletAddress={setWalletAddress}
               eventResult={eventResult}
               setEventResult={setEventResult}
               isLoadingEvent={isLoadingEvent}
               setIsLoadingEvent={setIsLoadingEvent}
               isPopupVisible={isPopupVisible}
               setIsPopupVisible={setIsPopupVisible}

              />} />
              <Route path="/team" element={<Team
                walletIsConnected={walletIsConnected}
                setWalletIsConnected={setWalletIsConnected}
                setWalletData={setWalletData}
                walletData={walletData}
                setWalletAddress={setWalletAddress}
               

              />} />
              <Route path="/members" element={<Members />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/create-form" element={<CreateTransaction />} />
              <Route path="/update-form" element={<UpdateTransaction />} />
              <Route path="/delete-form" element={<DeleteTransaction />} />
              <Route path="/create-form-B" element={<CreateBenefits />} />
              <Route path="/update-form-B" element={<UpdateBenefit />} />
              <Route path="/delete-form-B" element={<DeleteBenefit />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;