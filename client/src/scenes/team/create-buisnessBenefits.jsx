import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { serverUrl } from "../../index";

const CreateBenefits = () => {
    const [id, setId] = useState('');
    const [benefit, setBenefit] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [clubName, setClubName] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const postData = () => {
        axios.post(`${serverUrl()}/buisnessBenefits`, {
            id,
            clubName,
            benefit,
            businessName,
            timestamp
        });
    }
    return (
        <div>
        <Form className="create-form">
            <Form.Field>
                <label>Club name</label>
                <input placeholder='club name ' style={{ color: 'black' }} onChange={(e) => setClubName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Business Name</label>
                <input placeholder='Business Name' style={{ color: 'black' }} onChange={(e) => setBusinessName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Benefit</label>
                <input placeholder='benefit' style={{ color: 'black' }} onChange={(e) => setBenefit(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Timestamp</label>
                <input placeholder='Timestamp' style={{ color: 'black' }} onChange={(e) => setTimestamp(e.target.value)} />
            </Form.Field>

            <Button onClick={postData} type='submit'>Submit</Button>
        </Form>
    </div>
    )
}

export default CreateBenefits;
