import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [userID, setUserID] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', { userID });
      if (response.data.success) {
        onLogin(userID);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error logging in');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
