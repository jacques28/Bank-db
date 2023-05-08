import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckBalance = ({ userID }) => {
  const [balance, setBalance] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/balance?userID=${userID}`);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchData();
  }, [userID]);

  return (
    <div>
      <h2>Check Balance</h2>
      {balance !== null ? <p>Balance: {balance}</p> : <p>Loading...</p>}
    </div>
  );
};

export default CheckBalance;