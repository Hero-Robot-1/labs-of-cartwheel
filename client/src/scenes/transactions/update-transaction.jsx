import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

const UpdateTransaction = () => {
    const [id, setId] = useState('');
    const [benefit, setBenefit] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [clientName, setClientName] = useState('');
    const updateData = () => {

        axios.put(`http://localhost:3001/transactions/${id}`, {
            id,
            benefit,
            businessName,
            clientName
        });
    }
    return (
        <div>
            <Form className="udpate-form">
                <Form.Field>
                    <label>ID</label>
                    <input placeholder='ID' onChange={(e) => setId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Benefit</label>
                    <input placeholder='Benefit' onChange={(e) => setBenefit(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Business Name</label>
                    <input placeholder='Business Name' onChange={(e) => setBusinessName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Client Name</label>
                    <input placeholder='Client Name' onChange={(e) => setClientName(e.target.value)}/>
                </Form.Field>

                <Button onClick={updateData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default UpdateTransaction;
