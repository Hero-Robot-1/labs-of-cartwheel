import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../index";
import { DataGrid } from "@mui/x-data-grid";

const Benefits = ({ walletData, Header }) => {
  const columns = [
    {
      field: "businessName",
      headerName: "Business Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "benefit",
      headerName: "Benefit",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl()}/buisnessBenefits`).then((response) => {
      setAPIData(response.data.buisnessBenefits);
    });
  }, []);

  return (
    <Box m="20px">
      <Header title="Benefits" subtitle="Club Benefits" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        className="custom-datagrid"
      >
        <DataGrid
          rows={APIData}
          columns={columns}
          autoHeight
          components={{
            columnHeader: () => (
              <div style={{ textAlign: "center" }}>
                <Typography variant="subtitle1">Business Name</Typography>
              </div>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Benefits;
