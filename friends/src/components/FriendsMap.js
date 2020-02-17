import React, { useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import FriendsContext from '../contexts/FriendsContext';
import FriendsList from './FriendsList';

const FriendsMap = () => {
    
    const { friends, setFriends } = useContext(FriendsContext);

    axiosWithAuth()
        .get('/friends')
        .then(res => {
            console.log('Here are the friends', res.data);
            setFriends(res.data);
        })
        .catch(err => console.log('Did not get list of friends', err))

    return (
        <div>
            <h2>My Friends</h2>
            {friends.map(person => {
                return <FriendsList key={person.id} person={person} />
            })}
        </div>
    )
}
export default FriendsMap;
