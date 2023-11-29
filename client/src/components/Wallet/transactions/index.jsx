import { hooks } from "@paytweed/frontend-sdk-react";
import TransactionsList from "../../TransactionsList";
import { useEffect } from "react";

export default function WalletTransactionsSection({ selectedChain }) {
  const {
    data: transactions,
    error: transactionsError,
    loading: transactionsLoading,
  } = hooks.useCryptoTransactions({
    blockchainIds: [selectedChain],
  });

  if (transactionsLoading)
    return <h5 style={{ textAlign: "center" }}>loading transaction...</h5>;
  if (transactionsError)
    return <h5 style={{ textAlign: "center" }}>error fetching transaction</h5>;
  if (transactions) return <TransactionsList data={transactions} />;

  return null;
}
