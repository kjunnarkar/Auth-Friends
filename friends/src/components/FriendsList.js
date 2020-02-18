import React, { useContext } from 'react';
import styled from 'styled-components';
import FriendsContext from '../contexts/FriendsContext';
//import EditForm from './EditForm';
import { axiosWithAuth } from '../utils/axiosWithAuth';

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
    margin-left: 3%;
    background-color: yellow;
`

const EditButton = styled.button `
    margin-left: 3%;
    background-color: yellow;
`
// end styled-components


const FriendsList = ({ person, history }) => {

    console.log(history);
    const { friends, setFriends } = useContext(FriendsContext);

  /*  const [editFriend, setEditFriend] = useState([
      {
        id: '',
        name: '',
        age: '',
        email: ''
      }
    ])
*/
    const handleDelete = id => {
        axiosWithAuth()
        .delete(`/friends/${id}`)
        .then(res => {
            setFriends(friends.filter(oldFriends => oldFriends.id !== id))
        })
    };
/*
    const handleEdit = personID => {
      if (editFriend[0].name) {
        axiosWithAuth()
          .put(`/friends/${personID}`, editFriend);
          setEditFriend({name: '', age:'', email: ''});
      }
      else {
        setFriends(editFriend);
      }
    };
*/

const handleEdit = (id) => {
  //event.preventDefault();
  console.log('here is the id:')
  console.log(`${id}`);
  //console.log('this is history', history.push)
  history.push(`/friends/${id}`);
}

    return (
        <div>
          <Card>
              <Info>
                  <Name>Name: {person.name}</Name>
                  <ListItems>Age: {person.age}</ListItems>
                  <ListItems>Email: {person.email}</ListItems>
              </Info>
              <DeleteButton onClick={() => handleDelete(person.id)}>Remove Friend</DeleteButton>
              <EditButton onClick={() => handleEdit(person.id)}>Edit Friend</EditButton>
            </Card>      
        </div>
    )
}
export default FriendsList;
