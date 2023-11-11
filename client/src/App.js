import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Dashboard from "./scenes/dashboard";
import Transaction from "./scenes/transactions";
import CreateTransaction from "./scenes/transactions/create-transaction";
import DeleteTransaction from "./scenes/transactions/delete-transaction";
import UpdateTransaction from "./scenes/transactions/update-transaction";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletData, setWalletData] = useState("0");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar walletData={walletData} walletIsConnected={walletIsConnected} />
          <main className="content">
            <Topbar
              walletIsConnected={walletIsConnected}
              setWalletIsConnected={setWalletIsConnected}
              setWalletData={setWalletData}
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
            />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/create-form" element={<CreateTransaction />} />
              <Route path="/update-form" element={<UpdateTransaction />} />
              <Route path="/delete-form" element={<DeleteTransaction />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
