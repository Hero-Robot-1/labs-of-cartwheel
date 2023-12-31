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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100px',
                    height: '100px',
                    background: '#FBDCD9',
                    marginRight: '20px',
                    marginTop: '10px', // Margin between buttons
                    padding: '5px 10px', // Adjust padding as needed
                    backgroundColor: '#8BCDCE', // Background color
                    color: '#2185d0', // Text color
                    
                    backgroundImage: item.businessName.includes('papi')
                    ? `url(${process.env.PUBLIC_URL}/assets/pizza.png)`
                    : item.businessName.includes('nahat')
                    ? `url(${process.env.PUBLIC_URL}/assets/coffee.png)`
                    : item.businessName.includes('milio')
                    ? `url(${process.env.PUBLIC_URL}/assets/wine.png)`
                    : item.businessName.includes('marlen')
                    ? `url(${process.env.PUBLIC_URL}/assets/cocktail.png)`
                    : `url(${process.env.PUBLIC_URL}/assets/coffee.png)`,
                    backgroundColor: item.businessName.includes('marlen') || item.businessName.includes('papi')
                    ? '#FBDCD9'
                    : '#8BCDCE',

                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center 40%', // Center the background image
                    backgroundSize: '50px 50px',
                    textAlign: 'center',
                    textTransform: 'uppercase', // To uppercase the text
                    fontSize: '13px', // Adjust the font size
                    borderRadius: '15px', // Add rounded corners

                  }}
                  basic={!businessName || businessName !== item.businessName}
                  color={businessName === item.businessName ? '#8BCDCE' : null}
                  className={businessName === item.businessName ? 'active_2' : null}
                  onClick={() => handleBusinessNameChange(null, { value: item.businessName })}
                >
                  {item.businessName}
                </Button>

                
              ),
            }));
      
            // Update the state with the fetched data
            setBusinessNames(businessNamesFromAPI);
            console.log("never reaching here businessNamesFromAPI: ", businessNamesFromAPI);
            // Create a mapping of business names to benefits for easy lookup
            
            response.data.buisnessBenefits.forEach((item) => {
              businessBenefitsMap[item.businessName] = item.benefit;
            });
            setBusinessBenefits(businessBenefitsMap);
            console.log("never reaching here businessBenefitsMap: ", businessBenefitsMap);

          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, [businessName]);

    const handleBusinessNameChange = (e, { value }) => {
        console.log("businessBenefits: ", businessBenefitsMap[value]);
        console.log("businessBenefitsMap: ", businessBenefitsMap);
        console.log("businessBenefits 2: ", businessBenefitsMap[value]);
        
        setBenefit(businessBenefitsMap[value])

        setBusinessName(value);
        console.log("business benefit: " ,value," " , businessBenefits[value]);
        // Set the benefit to the relevant benefit for the selected business
        // setBenefit(businessBenefits[value] || '');
        // Set the timestamp to the current date and time
        setTimestamp(new Date().toISOString());
        
    };

    const postData = () => {
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
        setCost('')// Clear the cost field after a slight delay
        setBenefit('');
        setBusinessName('');
        setTokenID(tokenIdFromUrl);
        setTimestamp(new Date().toISOString());
        setFormSubmitted(true);
    };

    return (
        <Box m="20px">
            <Header title="Submit Transaction" subtitle="Select Business and Enter Cost" />
            <Form className="create-form">
                <Form.Field>
                    <div className="business-buttons">
                        {businessNames.map((business, index) => (
                            <React.Fragment key={index}>{business.content}</React.Fragment>
                        ))}
                    </div>
                </Form.Field>
                <div style={{ marginTop: '10px', color: "black" }}>
                <br />
                    {/* <strong>Selected Business: </strong> 
                    <br />
                    {businessName}
                    <br />
                    <br />
                    <strong>Business Benefit: </strong> 
                    <br />
                    {benefit}
                    <br />
                    <br /> */}
                    {/* <strong>User ID: </strong> {tokenId} */}
                </div>
                <Form.Field style={{ display: 'flex', alignItems: 'center' }}>
          <br />
          <input
            placeholder='Cost'
            value={cost} // Ensure the value is bound to the cost state
            style={{ color: 'black', fontSize: '1.3em', marginTop: '5px' }}
            onChange={(e) => setCost(e.target.value)}
              /> 
            <Button
            onClick={postData}
            disabled={(!cost || !businessName)} // Disable the button if the cost is empty
            style={{
              marginLeft: "10px", // Adjust margin between the input and the button
              padding: "4px 15px", // Adjust padding as needed
              borderRadius: "4px", // Square frame with border radius
              backgroundColor: (!cost || !businessName) ? "gray" : "#2185d0", // Change color to gray if disabled
              color: "#fff", // Text color
              border: "2px solid", // Border style
              borderColor: "#2185d0", // Border color
              cursor: (!cost || !businessName) ? "not-allowed" : "pointer", // Change cursor if disabled

            }}
          >
            Submit
          </Button>
        </Form.Field>
                {formSubmitted && (
                    <Message positive>
                        <Message.Header style={{ color: 'black', fontSize: '1em', marginTop: '5px' }}>Thank you!</Message.Header>
                        <p style={{ color: 'black', fontSize: '1em', marginTop: '5px' }}>Your transaction has been submitted.</p>
                    </Message>
                )}
            </Form>
        </Box>
    );
}

export default CreateTransaction;
