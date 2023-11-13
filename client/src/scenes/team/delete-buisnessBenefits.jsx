import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { serverUrl } from "../../index";

const DeleteBenefit = () => {
    const [id, setId] = useState('');
    const deleteData = () => {

        axios.delete(`${serverUrl()}/buisnessBenefits/${id}`, {
            id
        });
    }
    return (
        <div>
            <Form className="delete-form">
                <Form.Field>
                    <label>ID to Delete</label>
                    <input placeholder='ID' style={{ color: 'black' }} onChange={(e) => setId(e.target.value)}/>
                </Form.Field>

                <Button onClick={deleteData} type='submit'>Delete</Button>
            </Form>
        </div>
    )
}

export default DeleteBenefit;
