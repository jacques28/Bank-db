import React, { useState } from 'react';
import axios from 'axios';

const Deposit = ({ userID }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/transaction`, {
        userID,
        type: 'deposit',
        amount: parseFloat(amount),
      });
      setMessage(response.data.message);
     
      if (response.status === 201) {
        props.onBalanceChange();
      }
    } catch (error) {
      console.error('Error depositing money:', error);
      setMessage('Error depositing money');
    }
  };
  
  

  return (
    <div>
      <h2>Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Deposit;
