import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { serverUrl } from "../../index";

const UpdateBenefit = () => {
    const [id, setId] = useState('');
    const [benefit, setBenefit] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [clubName, setClubName] = useState('');
    const [Timestamp, setTimestamp] = useState('');
    const updateData = () => {

        axios.put(`${serverUrl()}/buisnessBenefits/${id}`, {
            id,
            clubName,
            benefit,
            businessName,
            Timestamp
        });
    }
    return (
        <div>
        <Form className="create-form">
            <Form.Field>
                <label>Benefit</label>
                <input placeholder='Benefit' style={{ color: 'black' }} onChange={(e) => setBenefit(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Business Name</label>
                <input placeholder='Business Name' style={{ color: 'black' }} onChange={(e) => setBusinessName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Club Name</label>
                <input placeholder='Club' style={{ color: 'black' }} onChange={(e) => setClubName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Timestamp</label>
                <input placeholder='Timestamp' style={{ color: 'black' }} onChange={(e) => setTimestamp(e.target.value)} />
            </Form.Field>

                <Button onClick={updateData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default UpdateBenefit;
