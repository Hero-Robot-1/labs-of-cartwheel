import { Box } from "@mui/material";
import { useAccount } from "wagmi";
import Header from "../../components/Header";

const Dashboard = () => {
    const { address, isConnected } = useAccount();

    return (
        <Box m="20px">
            <Header title="DASHBOARD" subtitle="Customizable Dashboard" />
            {isConnected ? <div>Hello , This is your wallet address: {address}</div> : null}
        </Box>
    );
};

export default Dashboard;
