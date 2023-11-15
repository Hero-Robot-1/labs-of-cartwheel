import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../index";

// clubName
// businessName
// benefit
// timestamp

const BuisnessBenefits = ({ walletData, walletIsConnected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "clubName",
      headerName: "club Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "businessName",
      headerName: "Business Name",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "benefit",
      headerName: "Benefit",
      flex: 1,
    },
    {
      field: "timestamp",
      headerName: "time",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const [APIData, setAPIData] = useState([]);
  console.log("server url ", serverUrl());
  useEffect(() => {
    axios.get(`${serverUrl()}/buisnessBenefits`).then((response) => { // this route is broken 
      console.log("this is the response benefits ", response);
      setAPIData(response.data.buisnessBenefits);
    });
  }, []);

  const navigate = useNavigate();

  const handleCreateClick = () => navigate("/create-form-B");
  const handleDeleteClick = () => navigate("/delete-form-B");
  const handleUpdateClick = () => navigate("/update-form-B");

  return (
    <Box m="20px">
      <Header title="Benefits" subtitle="Club Benefits" />
      
      {walletData === "1" ? (
      <Button onClick={handleCreateClick} type="submit">
        Create New Benefit ////  
      </Button>
      ) : null}
    {walletData === "1" ? (
      <Button onClick={handleUpdateClick} type="submit">
        Update Benefit ////
      </Button>
     ) : null}

    {walletData === "1" ? (
      <Button onClick={handleDeleteClick} type="submit">
        Delete Benefit
      </Button>
     ) : null}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={APIData} columns={columns} />
      </Box>
    </Box>
  );
};

export default BuisnessBenefits;
