import { hooks, Widget } from "@paytweed/frontend-sdk-react";
import { useCallback, useEffect } from "react";
import WalletData from "../components/Wallet/index.jsx";
import S from "./style.jsx";
import { serverUrl } from "../index";

const Wallet = ({setIsLoggedIn}) => {
  const { data: walletExists, error, loading } = hooks.useWalletExists();
  const [createWallet] = hooks.useCreateWallet();

  const onWalletCreated = useCallback(() => {
    window.location.href = "/";
    setIsLoggedIn(true); 
  }, []);

  useEffect(() => {
    if (walletExists === undefined) return;
    if (!walletExists) {
      createWallet({ callbacks: { onSuccess: onWalletCreated } });
    }
  }, [walletExists]);

  const renderContent = () => {
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error: {error}</div>;
    return walletExists ? (
      <WalletData/>
    ) : (
      "Creating new Memebership for you, please wait and Login again once done :) " 
      
    );
    
  };

  return <S.Container>{renderContent()}</S.Container>;
};

export default Wallet;
