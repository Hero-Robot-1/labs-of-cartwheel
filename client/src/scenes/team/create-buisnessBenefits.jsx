import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react'
import axios from 'axios';
import { serverUrl } from "../../index";
import Header from "../../components/Header";

const CreateBenefits = () => {
    const [id, setId] = useState('');
    const [benefit, setBenefit] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [clubName, setClubName] = useState('Lo Frayer');
    const [timestamp, setTimestamp] = useState(new Date().toISOString());
    const [formSubmitted, setFormSubmitted] = useState(false);

    const postData = async () => {
        try {
            // Make the POST request after updating the state
            await axios.post(`${serverUrl()}/buisnessBenefits`, {
                id,
                clubName,
                benefit,
                businessName,
                timestamp
            });

            // Optionally, you can reset the state after the request is successful
            setId('');
            setBenefit('');
            setBusinessName('');
            setClubName('');
            setTimestamp('');
            setFormSubmitted(true);
        } catch (error) {
            // Handle errors here
            console.error('Error posting data:', error);
        }
    }

    return (
        <div>
       <Header title="Submit New Club Benefit" subtitle="Lets add a Benefit" />
        <Form className="create-form">
            <Form.Field>
                <label style={{ marginBottom: '10px', color: "black" }}>Business Name:   </label>
                <input placeholder='Enter Business Name' style={{ color: 'black' }} onChange={(e) => setBusinessName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label style={{ marginBottom: '10px', color: "black" }}>Benefit:   </label>
                <input placeholder='Enter Benefit' style={{ color: 'black' }} onChange={(e) => setBenefit(e.target.value)} />
            </Form.Field>
            <Button
                onClick={postData}
                type='submit'
                size='large' // Increased button size
                style={{ marginTop: '10px', 
                border: '1px solid #2185d0' ,
                backgroundColor: '#2185d0', // Set background color to blue
                color: 'white', // Set text color to white
            
            }} // Added border for a button-like appearance
            >
                Submit
            </Button>
            {formSubmitted && (
                    <Message positive>
                        <Message.Header  style={{ color: 'black' }}>Thank you!</Message.Header>
                        <p  style={{ color: 'black' }}>Your Benefit has been submitted.</p>
                    </Message>
                )}
        </Form>
    </div>
    )
}

export default CreateBenefits;
