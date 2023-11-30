
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import BidhubDesign from '../../assets/svg/BidhubDesign.svg';
import { useRecoilState } from 'recoil';
import { isDarkModeState } from '../../data/RelatedStates';

function Auth(){
  const [showComponentA, setShowComponentA] = useState(true);
  const [isDarkMode]=useRecoilState(isDarkModeState)
  const toggleComponent = () => {
    setShowComponentA(!showComponentA);
  };
  
  let authDivStyle='block  mx-auto sm:h-screen sm:flex sm:items-start';
   if(isDarkMode)
   {
    authDivStyle=`block bg-[#03001C] mx-auto sm:h-screen sm:flex sm:items-start`;
   }
   console.log("this is ");
   
   console.log(localStorage.getItem('isDarkMode'));
   
  return (
    <div className={authDivStyle}>
      <div className='block  w-2/3  h-screen mx-auto sm:inline-block sm:mx-0 '>
        <div style={{color:(isDarkMode)?"white":"black"}} className="h-[0.3] py-[20%] sm:p-10 text-[35px] text-center sm:text-left">Welcome to <h1 className='text-[70px] text-[#FF6B00]'>BidHub</h1></div>
        <div><img className=' sm:block h-[50vh] mt-10 mb-10' src={BidhubDesign} alt="" /></div>
      </div>
      <div className='border-solid bg-white rounded m-5 sm:m-0 border-2 block lg:w-1/4 h-[80vh] sm:mt-[10vh] sm:mb-[10vh] py-2 px-10 '>
      {showComponentA ? <Login/> : <Signup />}
      
      <p className='font-medium text-center m-3'>{showComponentA ? "New User? " : "Existing User? "}
      <a className='text-[#FF6B00] ' onClick={toggleComponent}>{showComponentA ? "SignUp" : "Login"}</a></p>
      </div>
    </div>
  );
}

const Login = () => {
  const [username, setUsername] = useState('Karan');
  const [password, setPassword] = useState('test');
  const navigate = useNavigate();
  let body = { username, password };
  const handleLogin = async () => {
      const response = await axios.post(`${base_url}/auth/login`, body);
      // Todo: Create a type for the response that you get back from the server
      console.log(response.data);
      
      const data = response.data;
      if (data.token) {
          localStorage.setItem("token", data.token)
          navigate("/home")
      } else {
          alert("invalid credentials");
      }
  };

  return (
      <div >
          <div>
              <h2 className='text-center text-[20px] font-medium pb-5'>Login</h2>
              <p className='text-[#808080]'>User Name</p>
              <input className='input1' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
              <p className='text-[#808080]'>Password</p>
              <input className='input1' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
             
              <button className='btn-primary px-10 sm:w-2/3 md:w-2/3 lg:w-2/3 mx-auto mt-[36.3vh]' onClick={handleLogin}>Login</button>
          </div>
      </div>
  )
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
    hostelRoom:hostelRoom,
    imageLink:"",
  }
  const handleSignup = async () => {
      // const response = await fetch("http://ec2-15-206-194-131.ap-south-1.compute.amazonaws.com:4242/auth/signup", {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ username, password })
      // });

      const response = await axios.post(`${base_url}/auth/signup`, body,);
      // Todo: Create a type for the response that you get back from the server
      console.log(response.status);

      
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
              <h2 className='text-center text-[20px] font-medium pb-5'>Signup</h2>
              <p className='text-[#808080]'>User Name</p>
              <input className='input1' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
              <p className='text-[#808080]'>Password</p>
              <input className='input1' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <p className='text-[#808080]'>Full Name</p>
              <input  className='input1' type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <p className='text-[#808080]'>Hostel Name</p>
              <input className='input1'  type='text' value={hostelName} onChange={(e) => setHostelName(e.target.value)} />
              <p className='text-[#808080]'>Hostel Room</p>
              <input className='input1'  type='text' value={hostelRoom} onChange={(e) => setHostelRoom(e.target.value)} />
              <button className='btn-primary sm:w-2/3 md:w-2/3 lg:w-2/3 mx-auto mt-[5vh]' onClick={handleSignup}>Signup</button>
          </div>
      </div>
  );
};

export default Auth;
