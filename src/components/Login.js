import React,{useState} from 'react';
import style from './Login.css';

function Login({loggedIn,setLoggedIn}) {

   
    const [userData, setUserData] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(userData.username == 'admin@gmail.com' && userData.password == 'admin@gmail.com'){
            // alert('correct data');
            setLoggedIn(true)
        }else{
            alert('wrong data');
        }
      }

let name,value;
const getUserData = (event) =>{
    name = event.target.name;
    value = event.target.value;
    // console.log(name,value);
    setUserData({...userData,[name]:value})
    // console.log('userData = ',userData)
}
    return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="username"
              onChange={getUserData}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              onChange={getUserData}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    );
}


export default Login;