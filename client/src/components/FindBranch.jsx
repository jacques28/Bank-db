import React, { useState } from 'react';

const FindBranch = () => {
  const [city, setCity] = useState('');
  const [branches, setBranches] = useState([]);

  const branchesData = {
    'New York': ['123 Main St', '456 Broadway Ave', '789 Wall St'],
    'Paris': ['123 Rue de Rivoli', '456 Avenue des Champs-Élysées', '789 Rue de Courcelles'],
    'Lome' : ['Agoe','Adidogome','Dekon', 'Adakpame', 'Nyekonakpoe'],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setBranches(branchesData[city] || []);
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
            <li key={index}>{branch}</li>
          ))}
        </ul>
      ) : (
        <p>No branches found in the specified city.</p>
      )}
    </div>
  );
};

export default FindBranch;
