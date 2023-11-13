import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown, Message } from 'semantic-ui-react';
import axios from 'axios';
import { serverUrl } from "../../index";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const CreateTransaction = () => {
    const [id, setId] = useState('');
    const [benefit, setBenefit] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [cost, setCost] = useState('');
    const [tokenId, setTokenID] = useState(10); // Set tokenID to 10 by default
    const [timestamp, setTimestamp] = useState('');
    const [businessNames, setBusinessNames] = useState([]);
    const [businessBenefits, setBusinessBenefits] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        // Fetch business names and benefits from the API
        axios.get(`${serverUrl()}/buisnessBenefits`)
            .then((response) => {
                // Extract business names and benefits from the API response
                const businessNamesFromAPI = response.data.buisnessBenefits.map(item => ({
                    key: item.businessName,
                    text: item.businessName,
                    value: item.businessName,
                }));

                // Update the state with the fetched data
                setBusinessNames(businessNamesFromAPI);
                // Create a mapping of business names to benefits for easy lookup
                const businessBenefitsMap = {};
                response.data.buisnessBenefits.forEach(item => {
                    businessBenefitsMap[item.businessName] = item.benefit;
                });
                setBusinessBenefits(businessBenefitsMap);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleBusinessNameChange = (e, { value }) => {
        setBusinessName(value);
        // Set the benefit to the relevant benefit for the selected business
        setBenefit(businessBenefits[value]);

        // Set the timestamp to the current date and time
        setTimestamp(new Date().toISOString());
    };

    const postData = () => {
        // Make the post request

        // Reset the form values and set the formSubmitted flag to true
        setId('');
        setBenefit('');
        setBusinessName('');
        setCost('');
        setTokenID(10);
        setTimestamp('');
        setFormSubmitted(true);
    };

    return (
        <Box m="20px">
            <Header title="New Member Transaction" subtitle="Enter the user Transaction" />
            <Dropdown
                placeholder='Select Business Name:'
                clearable
                selection
                options={businessNames}
                onChange={handleBusinessNameChange}
            />
            <br/>
            <Form className="create-form">
               
                <div style={{ marginTop: '10px' }}>
                    <strong>Selected Business: </strong> {businessName}
                    <br />
                    <strong>Selected Benefit: </strong> {benefit}
                    <br />
                    <strong>User ID: </strong> {tokenId}
                </div>
                <Form.Field>
                    <label style={{ fontSize: '1.2em' }}>Cost:</label>
                    <br />
                    <input placeholder='Cost' style={{ color: 'black', fontSize: '1em', marginTop: '5px' }} onChange={(e) => setCost(e.target.value)} />
                </Form.Field>
                <Button onClick={postData} type='submit' style={{ fontSize: '1.2em', marginTop: '10px' }}>Submit</Button>
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
