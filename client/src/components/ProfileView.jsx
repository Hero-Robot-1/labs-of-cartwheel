import { Box, Typography, useTheme } from "@mui/material";

import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";

const ProfileView = ({ walletData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {walletData !== undefined ? (
        <Box mb="25px">
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="logo-image"
              width="150px"
              height="100px"
              src={`/assets/lofrayer.png`}
              style={{ cursor: "pointer" }}
            />
          </Box>

          <Box textAlign="center">
            <Typography
              variant="h2"
              color={colors.grey[100]}
              fontWeight="bold"
              sx={{ m: "10px 0 0 0" }}
            >
              {walletData === "0" ? `Join Us :)` : walletData === "1" ? `Club Manager` : `Member`}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[500]}>
              {walletData === "0"
                ? null
                : walletData === "1"
                ? `Manager tokenId : ${walletData}`
                : `Trusted user tokenId : ${walletData}`}
            </Typography>
          </Box>
        </Box>
      ) : null}
    </>
  );
};
export default ProfileView;