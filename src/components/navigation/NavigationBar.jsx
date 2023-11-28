import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import { signOut } from 'firebase/auth';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.email);
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    })}, []);

  const login = () => {
    navigate('/login');
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav>
      <div>Company Name</div>
      <div>
        {isLoggedIn && <span>{username}</span>}
        <button
          onClick={isLoggedIn ? logout : login}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
