import { useRecoilState, useRecoilValue } from "recoil";
import imageLink from "../../assets/imageLink";
import {userData} from "../../data/ComponentData"
import axios from "axios";
import { useEffect } from "react";
import AddMoneyIcon from '../../assets/svg/AddMoneyIcon.svg';
import {  activeListItemstate, logoutState } from "../../data/RelatedStates";
import MenuList from "./MenuList";
import { VerticalLine } from "../common";
import { DisplayArea } from "./Display";
import mongoose from "mongoose";
import { Navigate, useNavigate } from "react-router-dom";



function Home()
{
    const [user,setUser] = useRecoilState(userData)
    const [isDialogOpen, setDialogOpen] = useRecoilState(logoutState);
    const navigate = useNavigate();
    //This will close the opened Dialog box of logout...
    const closeDialog = () => {
        setDialogOpen(false);
      };

    //This will logout the user...
    function logoutUser(){
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'))
        navigate('/auth');
       setUser({
        userId:"",
    username: "",
    password: "",
    balance: 0,
    fullName:"",
    hostelName:"",
    hostelRoom:"",
    imageLink:"",
    productId: []
       })
        closeDialog();
    }

    //This will get user's data
     function getUserData() {
        
        let token = localStorage.getItem('token');
        let authString="";
        if(token){
        authString = "Bearer "+token;}
        let response =  axios.get('http://localhost:4242/auth/me',{
            headers:{
               authorization:authString
            }
           })
      return response;
       
    }
    useEffect( ()=>{
        const fetchUserData = async () => {
            let response = await getUserData();
            if(response.status==200)
            {
                console.log(response.data)
              setUser(response.data);
            }
            else{
                console.log(response.data)
            }
        }
        fetchUserData();
       
    },[])



    
    return <div>
        <nav>
            <span ><img style={{height:"7vh", width:"7vh", borderRadius:"50%",objectFit:"cover", backgroundColor:"red"}} src={user.imageLink.toString()} alt="" /></span>
            <span>{user.username.toString()}</span>
            <span><input type="text" name="" id="" placeholder="Hi Abhishek , search for a product here..."/></span>
            <span>{user.balance.toString()} INR<a> <img src={AddMoneyIcon} alt="Add Money" /></a></span>

        </nav>
    <main>
    <button style={{display:"inline"}}>Sell Your Product</button>
    <div style={{height:"80%", display:"block",}}>
    <MenuList/>
    
    <VerticalLine/>
     
    <DisplayArea/>
    {isDialogOpen && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
                <p>Do you want to logout of Bidhub?</p>
              <span className="close" onClick={closeDialog}>Close</span>
            <span className="logout" onClick={logoutUser}>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
    </main>
    </div>
}

export default Home;