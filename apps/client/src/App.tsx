import { useEffect, useState , lazy,Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
const Auth = lazy(() => import('./components/visitor/Authentication'));
import { useSetRecoilState } from 'recoil';
import { authState } from './store/authState';
import { useNavigate } from 'react-router-dom';
import Home from './components/visitor/Home';
import NoMatch from './components/visitor/NoMatch';
import AllYourBid from './components/buyer/AllYourBids';
import AddProduct from './components/seller/AddProduct';
import Accounts from './components/visitor/Account';
import AddBid from './components/buyer/AddBid';
const {Account} =Accounts;
const AllProduct = lazy(()=>import('./components/visitor/AllProducts')) ;

function App() {
  return (
    <Router>
    <InitState />
    <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/addBid/:id' element={<AddBid />} />
        <Route path='/home' element={<Home />} />
        <Route path='/allYourBids' element={<AllYourBid/>}/>
        <Route path='/addAProduct' element={<AddProduct/>}/>
       
        <Route path='/allProduct' element={<AllProduct/>}/>
       
        <Route path='/Account' element={<Account/>}/>
        <Route path='/' element={<InitState/>} />
        <Route path="*" element={<NoMatch />} />
    </Routes>
</Router>
  )
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
      const token = localStorage.getItem("token");
      try {
          const response = await fetch('http://localhost:4242/auth/me', {
              headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.username) {
              setAuth({ token: data.token, username: data.username });
              navigate("/home");
          } else {
              navigate("/auth");
          }
      } catch (e) {
          navigate("/auth");
      }
  }
  useEffect(() => {
      init();
  }, [])
  return <></>
}


export default App
