
import {Link,useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Auth(){
  const [showComponentA, setShowComponentA] = useState(true);

  const toggleComponent = () => {
    setShowComponentA(!showComponentA);
  };

  return (
    <div>
      <span>
        <div>Welcome to BidHub</div>
        <div></div>
      </span>
      <span>
      
      {showComponentA ? <Login /> : <Signup />}
      <p>{showComponentA ? "New User? " : "Existing User? "}
      <a onClick={toggleComponent}>{showComponentA ? "SignUp" : "Login"}</a></p>
      </span>
      
    </div>
  );
}

const Login = () => {
  const [username, setUsername] = useState('Karan');
  const [password, setPassword] = useState('test');
  const navigate = useNavigate();
  let body = { username, password };
  const handleLogin = async () => {
      const response = await axios.post("http://localhost:4242/auth/login", body);
      // Todo: Create a type for the response that you get back from the server
      const data = response.data;
      if (data.token) {
          localStorage.setItem("token", data.token)
          navigate("/home")
      } else {
          alert("invalid credentials");
      }
  };

  return (
      <div>
          <div className='authCard'>
              <h2>Login</h2>
              <p>User Name</p>
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
              <p>Password</p>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
             
              <button onClick={handleLogin}>Login</button>
          </div>
      </div>
  );
};

 const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hostelName,setHostelName]= useState('');
  const [fullName,setFullName] = useState('');
  const [hostelRoom,setHostelRoom]=useState('');
  const navigate = useNavigate();
  let body =  {
    username: username,
    password: password,
    hostelName:hostelName,
    fullName:fullName,
    hostelRoom:hostelRoom
  }
  const handleSignup = async () => {
      // const response = await fetch("http://localhost:4242/auth/signup", {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ username, password })
      // });

      const response = await axios.post("http://localhost:4242/auth/signup", body,);
      // Todo: Create a type for the response that you get back from the server
      const data = response.data;
      if (data.token) {
          localStorage.setItem("token", data.token)
         navigate('/home')
      } else {
          alert("Error while signing up");
      }
  };

  return (
      <div>
          <div className='authCard'>
              <h2>Signup</h2>
              <p>User Name</p>
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
              <p>Password</p>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <p>Full Name</p>
              <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <p>Hostel Name</p>
              <input type='text' value={hostelName} onChange={(e) => setHostelName(e.target.value)} />
              <p>Hostel Room</p>
              <input type='text' value={hostelRoom} onChange={(e) => setHostelRoom(e.target.value)} />
              <button onClick={handleSignup}>Signup</button>
          </div>
      </div>
  );
};

export default Auth;
