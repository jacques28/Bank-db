import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = ({ userID }) => {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/transaction?userID=${userID}`);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, [userID]);

  return (
    <div>
      <h2>Transactions</h2>
      {transactions ? (
        transactions.map((transaction, index) => (
          <div key={index}>

            <p>Type: {transaction.type}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.date}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Transactions;
