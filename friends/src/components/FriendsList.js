import React, { useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FriendsContext from '../contexts/FriendsContext';

// styled-components
const Card = styled.div `
  border: solid black 2px;
  margin: 50px 250px 50px 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
`;

const Name = styled.h1 `
  color: yellow;
  font-weight: bold;
`;

const Info = styled.ul `
  list-style-type: none;
`;

const ListItems = styled.li `
  color: white;
`;

const DeleteButton = styled.button `
    margin-left: 20%;
`
// end styled-components


const FriendsList = ({ person }) => {

    const { friends, setFriends } = useContext(FriendsContext);

    const handleDelete = id => {
        axios.delete(`http://localhost:5000/api/friends/${id}`)
        .then(res => {
            setFriends(friends.filter(oldFriends => oldFriends.id !== id))
        })
    }

    return (
        <Card>
            <Info>
                <Name>Name: {person.name}</Name>
                <ListItems>Age: {person.age}</ListItems>
                <ListItems>Email: {person.email}</ListItems>
            </Info>
            <DeleteButton onClick={() => handleDelete(person.id)}>Remove Friend</DeleteButton>
        </Card>
    )
}
export default FriendsList;
