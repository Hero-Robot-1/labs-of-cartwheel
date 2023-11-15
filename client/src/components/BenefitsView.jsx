import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";



const Benefits = ({ walletData,Header,serverUrl }) => {
   
    const [APIData, setAPIData] = useState([]);
    console.log("server url ", serverUrl);
    // useEffect(() => {
    //   axios.get(`${serverUrl()}/buisnessBenefits`).then((response) => { // this route is broken 
    //     console.log("this is the response benefits ", response);
    //     setAPIData(response.data.buisnessBenefits);
    //   });
    // }, []);
  
  
  
    return (
      <Box m="20px">
        <Header title="Benefits" subtitle="Club Benefits" />
        </Box>
    
    );
  };
  
  export default Benefits;
  