import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { serverUrl } from "../../index";

const UpdateTransaction = () => {
    const [id, setId] = useState('');
    const [benefit, setBenefit] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [cost, setCost] = useState('');
    const [tokenID, setTokenID] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const updateData = () => {

        axios.put(`${serverUrl()}/transactions/${id}`, {
            id,
            benefit,
            businessName,
            cost, 
            tokenID,
            timestamp
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
                <label>Cost</label>
                <input placeholder='Cost' style={{ color: 'black' }} onChange={(e) => setCost(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>TokenID</label>
                <input placeholder='TokenID' style={{ color: 'black' }} onChange={(e) => setTokenID(e.target.value)} />
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

export default UpdateTransaction;
