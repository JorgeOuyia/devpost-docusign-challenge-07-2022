import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import Login from './components/Login';
import { firebase } from './firebase'
import { logOffAction, readUserAction } from './redux/userDuck';

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(null);

  // const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    firebase.onAuthStateChanged(user =>  {
      if (user) {
        setFirebaseUser(user);
        dispatch(readUserAction(user));
      }
      else {
        setFirebaseUser(null);
        dispatch(readUserAction(null));
      }
    })
  }, []);

  return firebaseUser !== null ? (
    <div className="container">
      <button type='button' className='btn btn-dark btn-lg' onClick={() => dispatch(logOffAction())}>Log off</button>
    </div>
  ) : (
    <Login />
  )
}

export default App;
