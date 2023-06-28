import React, { useState } from 'react';
import axios from 'axios';

const FindBranch = () => {
  const [city, setCity] = useState('');
  const [branches, setBranches] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/branch?city=${city}`);
      setBranches(response.data.branches);
    } catch (error) {
      console.error('Error fetching branches:', error);
      setBranches([]);
    }
  };

  return (
    <div>
      <h2>Find a Branch</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {branches.length > 0 ? (
        <ul>
          {branches.map((branch, index) => (
            <li key={index}>{branch.address}</li>
          ))}
        </ul>
      ) : (
        <p>No branches found in the specified city.</p>
      )}
    </div>
  );
};

export default FindBranch;
