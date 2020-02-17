import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import FriendsContext from './contexts/FriendsContext';
import Login from './components/Login';
import FriendsMap from './components/FriendsMap';
import AddFriends from './components/AddFriends';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  
  const [friends, setFriends] = useState([
    {
      id: '',
      name: '',
      age: '',
      email: ''
    }
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Favorite Buddy</h1>
      </header>
        
      <FriendsContext.Provider value={{ friends, setFriends }}>

        <Router>
          <ul className='TopLinks'>
            <li>
              <Link className='ListLinks' to='/login'>Login</Link>
            </li>
            <li>
              <Link className='ListLinks' to='/friends'>Friends</Link>
            </li>
            <li>
              <Link className='ListLinks' to='/add'>Add Friends</Link>
            </li>
          </ul>
          <Switch>
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/friends' component={FriendsMap} />
            <ProtectedRoute path='/friends/:id' component={FriendsMap} />
            <ProtectedRoute path='/add' component={AddFriends} />
          </Switch>
        </Router>

      </FriendsContext.Provider>
    </div>
  );
}

export default App;
