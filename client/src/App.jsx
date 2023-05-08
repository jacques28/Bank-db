// import React, { useState } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import Login from './components/Login';
// import CheckBalance from './components/CheckBalance';
// import Deposit from './components/Deposit';
// import Withdraw from './components/Withdraw';
// import Transactions from './components/Transactions';
// import Logout from './components/Logout';

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userID, setUserID] = useState(null);

//   const handleLogin = (loggedInUserID) => {
//     setLoggedIn(true);
//     setUserID(loggedInUserID);
//   };
//   const handleLogout = () => {
//     setLoggedIn(false);
//   };
  

//   return (
   
//       <div className="App">
//         <h1>Banking App</h1>
//         {loggedIn ? (
//           <>
//             <nav>
//               <ul>
//                 <li>
//                   <Link to="/balance">Check Balance</Link>
//                 </li>
//                 <li>
//                   <Link to="/deposit">Deposit</Link>
//                 </li>
//                 <li>
//                   <Link to="/withdraw">Withdraw</Link>
//                 </li>
//                 <li>
//                   <Link to="/transactions">View Transactions</Link>
//                 </li>
//               </ul>
//             </nav>
//             <Routes>
//               <Route path="/balance" element={<CheckBalance userID={userID} />} />
//               <Route path="/deposit" element={<Deposit userID={userID} />} />
//               <Route path="/withdraw" element={<Withdraw userID={userID} />} />
//               <Route path="/transactions" element={<Transactions userID={userID} />} />
//               <Route path="/logout" element={<Logout onLogout={handleLogout} />}/>
//             </Routes>
//           </>
//         ) : (
//           <Login onLogin={handleLogin} />
//         )}
//       </div>
    
//   );
// }

// export default App;


import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import CheckBalance from './components/CheckBalance';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Transactions from './components/Transactions';
import Logout from './components/Logout';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  const handleLogin = (loggedInUserID) => {
    setLoggedIn(true);
    setUserID(loggedInUserID);
  };
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
  
      <div className="App">
        <h1>Banking App</h1>
        {loggedIn ? (
          <>
            <nav>
              <ul>
                <li>
                  <Link to="/balance">Check Balance</Link>
                </li>
                <li>
                  <Link to="/deposit">Deposit</Link>
                </li>
                <li>
                  <Link to="/withdraw">Withdraw</Link>
                </li>
                <li>
                  <Link to="/transactions">View Transactions</Link>
                </li>
              </ul>
            </nav>
            <Link to="/logout"><button>Logout</button></Link>
            <Routes>
              <Route path="/balance" element={<CheckBalance userID={userID} />} />
              <Route path="/deposit" element={<Deposit userID={userID} />} />
              <Route path="/withdraw" element={<Withdraw userID={userID} />} />
              <Route path="/transactions" element={<Transactions userID={userID} />} />
              <Route path="/logout" element={<Logout onLogout={handleLogout} />}/>
            </Routes>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
  );
}

export default App;