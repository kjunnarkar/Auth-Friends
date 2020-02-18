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

const EditForm = ({ history }) => {
    const { friends, setFriends } = useContext(FriendsContext);
    
    const [editFriend, setEditFriend] = useState(
        {
            id: '',
            name: '',
            age: '',
            email: ''
        }
    );

    const handleChange = event => {

        setEditFriend({ ...editFriend, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
            .put('/friends/:id', editFriend)
            .then(res => {
                console.log('this is post response for edit friend', res);
                setEditFriend({
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
            <FormHeading>Edit Friend Information</FormHeading>
            <FormSetup onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <EnterInput
                    id='name'
                    type='text'
                    name='name'
                    placeholder='Enter Name'
                    onChange={handleChange}
                    value={editFriend.name}
                />
                <label htmlFor='age'>Age</label>
                <EnterInput
                    id='age'
                    type='text'
                    name='age'
                    placeholder='Enter Age'
                    onChange={handleChange}
                    value={editFriend.age}
                />
                <label htmlFor='email'>Email</label>
                <EnterInput
                    id='email'
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    onChange={handleChange}
                    value={editFriend.email}
                />
                <SubmitButton type='submit'>Update Information</SubmitButton>
            </FormSetup>
        </div>
    )
}

export default EditForm;
