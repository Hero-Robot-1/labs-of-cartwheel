import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import { serverUrl } from "../../index";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const CreateTransaction = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tokenIdFromUrl = searchParams.get('tokenId'); 

    const [id, setId] = useState('');
    const [benefit, setBenefit] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [cost, setCost] = useState('');
    const [tokenId, setTokenID] = useState(tokenIdFromUrl || 999);
    const [timestamp, setTimestamp] = useState(new Date().toISOString());
    const [businessNames, setBusinessNames] = useState([]);
    const [businessBenefits, setBusinessBenefits] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const businessBenefitsMap = {};

    useEffect(() => {
        // Fetch business names and benefits from the API
        axios.get(`${serverUrl()}/buisnessBenefits`)
          .then((response) => {
            // Extract business names and benefits from the API response
            const businessNamesFromAPI = response.data.buisnessBenefits.map((item) => ({
              key: item.businessName,
              text: item.businessName,
              value: item.businessName,
              content: (
                <Button
                  style={{
                    marginRight: "10px", // Margin between buttons
                    marginTop: "10px", // Margin between buttons
                    padding: "5px 10px", // Adjust padding as needed
                    borderRadius: "2px", // Square frame with border radius
                    backgroundColor: "#E8F2FA", // Background color
                    color: "#2185d0", // Text color
                    border: "2px solid", // Border style
                    borderColor: "#2185d0", // Border color
                  }}
                  basic={!businessName || businessName !== item.businessName}
                  color={businessName === item.businessName ? 'green' : null}
                  className={businessName === item.businessName ? 'active_2' : null}
                  onClick={() => handleBusinessNameChange(null, { value: item.businessName })}
                >
                  {item.businessName}
                </Button>

                
              ),
            }));
      
            // Update the state with the fetched data
            setBusinessNames(businessNamesFromAPI);
      
            // Create a mapping of business names to benefits for easy lookup
            
            response.data.buisnessBenefits.forEach((item) => {
              businessBenefitsMap[item.businessName] = item.benefit;
            });
            setBusinessBenefits(businessBenefitsMap);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, [businessName]);

    const handleBusinessNameChange = (e, { value }) => {
        
        setBusinessName(value);
        console.log("business benefit: " ,value," " , businessBenefits[value]);
        // Set the benefit to the relevant benefit for the selected business
        setBenefit(businessBenefits[value]);
        // Set the timestamp to the current date and time
        setTimestamp(new Date().toISOString());
        
    };

    const postData = () => {
        // Make the post request
        console.log("post command to send transaction with this data: ", id,
        benefit,
        businessName,
        cost,
        tokenId,
        timestamp);

        axios.post(`${serverUrl()}/transactions`, {
            id,
            benefit,
            businessName,
            cost,
            tokenId,
            timestamp
            
        })

        // Reset the form values and set the formSubmitted flag to true
        setId('');
        setBenefit('');
        setBusinessName('');
        setCost('');
        setTokenID(tokenIdFromUrl);
        setTimestamp(new Date().toISOString());
        setFormSubmitted(true);
    };

    return (
        <Box m="20px">
            <Header title="Submit Transaction" subtitle="Enter the Client Transaction" />
            <Form className="create-form">
                <Form.Field>
                    <label style={{ fontSize: '1.2em' }}>Select Business Name:</label>
                    <div className="business-buttons">
                        {businessNames.map((business, index) => (
                            <React.Fragment key={index}>{business.content}</React.Fragment>
                        ))}
                    </div>
                </Form.Field>
                <div style={{ marginTop: '10px' }}>
                <br />
                    <strong>Selected Business: </strong> 
                    <br />
                    {businessName}
                    <br />
                    <br />
                    <strong>Business Benefit: </strong> 
                    <br />
                    {benefit}
                    <br />
                    <br />
                    {/* <strong>User ID: </strong> {tokenId} */}
                </div>
                <Form.Field>

                    <label style={{ fontSize: '1.2em' }}>Costumer Bill:</label>
                    <br />
                    <input placeholder='Cost' style={{ color: 'black', fontSize: '1em', marginTop: '5px' }} onChange={(e) => setCost(e.target.value)} />
                </Form.Field>
                <Button
                onClick={postData}
                style={{
                    marginRight: "10px", // Margin between buttons
                    marginTop: "10px", // Margin between buttons
                    padding: "10px 20px", // Adjust padding as needed
                    borderRadius: "4px", // Square frame with border radius
                    backgroundColor: "#2185d0", // Background color
                    color: "#fff", // Text color
                    border: "2px solid", // Border style
                    borderColor: "#2185d0", // Border color
                  }}
                        >
                Submit
            </Button>
                {formSubmitted && (
                    <Message positive>
                        <Message.Header>Thank you!</Message.Header>
                        <p>Your transaction has been submitted.</p>
                    </Message>
                )}
            </Form>
        </Box>
    );
}

export default CreateTransaction;
