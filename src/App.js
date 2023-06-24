import React ,{useEffect,useState}from 'react'
// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Home from './components/Home'
import Banner from './components/Banner'
import PastMatches from './components/PastMatches'
import UpcommingMatches from './components/UpcommingMatches'
import News from './components/News'
import Users from './components/Users'
import PaymentHistory from './components/PaymentHistory'
import Login from './components/Login'
import PlaceBetLink from './components/PlaceBetLink'

function App() {
const [loggedIn,setLoggedIn] = useState(false );
  useEffect(()=>{

    },[]);

  return (
    <Router basename={'/'}>
        {
          loggedIn?
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/UpcommingMatches" element={<UpcommingMatches/>}/>
              <Route exact path="/PastMatches" element={<PastMatches/>}/>
              <Route exact path="/Banner" element={<Banner/>}/>
              <Route exact path="/News" element={<News/>}/>
              <Route exact path="/Users" element={<Users/>}/>
              <Route exact path="/BetLink" element={<PlaceBetLink/>}/>
              <Route exact path="/PaymentHistory" element={<PaymentHistory/>}/>
              <Route path="*" element={<h1>Path not Found</h1>}/>
            </Routes>
            :
            <Routes> 
              <Route exact path="/" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
              <Route path="*" element={<h1>Not Logged in <a href="/">Go to login page</a></h1>}/>
            </Routes>
        }
        
      
    
  </Router>
  
  );
}


export default App;
