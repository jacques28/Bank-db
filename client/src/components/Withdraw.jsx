import React, { useState } from 'react';
import axios from 'axios';

const Withdraw = ({ userID }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/transaction`, {
        userID,
        type: 'withdraw',
        amount: parseFloat(amount),
      });
      setMessage(response.data.message);
      props.onBalanceChange();
    } catch (error) {
      console.error('Error withdrawing money:', error);
      setMessage('Error withdrawing money');
    }
  };  

  return (
    <div>
      <h2>Withdraw</h2>
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
        <button type="submit">Withdraw</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


export default Withdraw