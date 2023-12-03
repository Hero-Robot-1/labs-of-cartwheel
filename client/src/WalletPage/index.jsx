import { hooks } from "@paytweed/frontend-sdk-react";
import { useCallback, useEffect, useState } from "react";
import WalletData from "../components/Wallet/index.jsx";
import S from "./style.jsx";
import { serverUrl } from "../index";
import SettingSection from './index';

const Wallet = ({ setIsLoggedIn, isLoggedIn }) => {
  const { data: walletExists, error, loading } = hooks.useWalletExists();
  const [createWallet] = hooks.useCreateWallet();
  const [newUserCreated, setNewUserCreated] = useState(false);

  const onWalletCreated = useCallback(() => {
    setIsLoggedIn(true);
    setNewUserCreated(true);
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (walletExists === undefined) return; // Check if the data is fetched properly
    if (!walletExists && !newUserCreated) {
      createWallet({ callbacks: { onSuccess: onWalletCreated } });
    }
  }, [walletExists, createWallet, onWalletCreated, newUserCreated]);

  const renderContent = () => {
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error: {error}</div>;
    return walletExists || newUserCreated ? (
      <WalletData />
    ) : (
      "Creating new Membership for you, please wait and login again once done :)"
    );
  };

  return <S.Container>{renderContent()}</S.Container>;
};

export default Wallet;
