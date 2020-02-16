import React, { useState, useContext } from 'react';
import FriendsContext from '../contexts/FriendsContext';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// styled-components
const FormHeading = styled.h2 `
    margin-top: 40px;
    margin-bottom: 20px;
`;

const FormSetup = styled.form `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`;

const EnterInput = styled.input `
    margin-top: 20px;
    margin-bottom: 20px;
`;

const SubmitButton = styled.button `
    margin-top: 30px;
`;
// end styled-components

const AddFriends = ({ history }) => {
    const { friends, setFriends } = useContext(FriendsContext);
    
    const [addBuddy, setAddBuddy] = useState(
        {
            id: Math.random(),
            name: '',
            age: '',
            email: ''
        }
    );

    const handleChange = event => {

        setAddBuddy({ ...addBuddy, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/friends', addBuddy)
            .then(res => {
                console.log('this is post response for AddFriend', res);
                setAddBuddy({
                    name: '',
                    age: '',
                    email: ''
                })
                setFriends([...friends, res])
                history.push('/friends');
            })
    };

    return (
        <div>
            <FormHeading>Enter New Friend Information</FormHeading>
            <FormSetup onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <EnterInput
                    id='name'
                    type='text'
                    name='name'
                    placeholder='Enter Name'
                    onChange={handleChange}
                    value={addBuddy.name}
                />
                <label htmlFor='age'>Age</label>
                <EnterInput
                    id='age'
                    type='text'
                    name='age'
                    placeholder='Enter Age'
                    onChange={handleChange}
                    value={addBuddy.age}
                />
                <label htmlFor='email'>Email</label>
                <EnterInput
                    id='email'
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    onChange={handleChange}
                    value={addBuddy.email}
                />
                <SubmitButton type='submit'>Add Friend</SubmitButton>
            </FormSetup>
        </div>
    )
}

export default AddFriends;
