import { useRecoilState } from "recoil";
import {productListState, userData} from "../../data/ComponentData"
import axios from "axios";
import { useEffect, useState } from "react";
import AddMoneyIcon from '../../assets/svg/AddMoneyIcon.svg';
import {  activeListItemstate, buyProductState, buyState, isDarkModeState, logoutState, menuState } from "../../data/RelatedStates";
import MenuList from "./MenuList";
import { VerticalLine } from "../common";
import { DisplayArea } from "./Display";
import mongoose from "mongoose";
import { useNavigate } from "react-router-dom";
import UserAccount from './Account';
const {ProfilePhoto}=UserAccount;
import SearchIcon from '../../assets/svg/SearchIcon.svg';
import SearchIcon2 from '../../assets/svg/SearchIcon2.png';
import menu from '../../assets/svg/menu.svg';
import x from '../../assets/svg/x.svg';
import DayNightToggle from 'react-day-and-night-toggle';
import { base_url } from "../../store/constants";
import FloatingButton from "./FloatingButton";
import Confetti from 'react-confetti';

function Home()
{
    const [user,setUser] = useRecoilState(userData)
    const [isDialogOpen, setDialogOpen] = useRecoilState(logoutState);
    const [isBuyPressed, setBuyPressed] = useRecoilState(buyState);
    const [confetti, setConfetti] = useState(false);
    const [isDarkMode,SetIsDarkMode] = useRecoilState(isDarkModeState)
    const navigate = useNavigate();
    //This will close the opened Dialog box of logout...
    const closeDialog = () => {
        setDialogOpen(false);
        setBuyPressed(false);
      };

    //This will logout the user...
    function logoutUser(){
      console.log("logedout");
      
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

    interface Product {
      _id:string;
      name: string;
      description: string;
      originalPrice: number;
      image: string;
      maxBid: { type: number; required: true };
      minBid: { type: number; required: true };
      sold: boolean;
      sellPrice: number;
      sellerId: string;
      buyerId: string;
      bids: Bid[];
    }

    interface Bid {
      amount: number,
      userId: mongoose.Types.ObjectId,
    }


    const [productList,setProductList]=useRecoilState(productListState)
    const [menuOpen,setMenuOpen] = useRecoilState(menuState)
    
    const [productId] = useRecoilState(buyProductState)
    async function buyAProduct()
    {
      const authorization = "bearer "+localStorage.getItem('token');
      console.log(authorization);
      console.log("this is product Id");
      
      console.log(productId);
      
      const response = await axios.put(`${base_url}/general/buy/${productId}`,{},{
        headers:{
          Authorization:authorization
        }
          });
         if(response.data.message=="Low Balance")
         {
             console.log("low balance");
             closeDialog();
             alert("Sorry, Your Account Has Low Balance.")
             
         }
       else if(response.status===200)
        {
          setConfetti(true);
          let array = [...productList];
          
          let index = array.findIndex((element:Product)=>element._id==productId);
          array.forEach((element:Product)=>{
            if (element._id === productId) {
              setUser(prevUser => {
                return {
                  ...prevUser,
                  balance: Number(prevUser.balance) - Number(element.maxBid)
                };
              });
            }
          })
          
          array.splice(index,1);
          setProductList(array);
          closeDialog();
          setTimeout(() => {
            setConfetti(false);
          }, 5000);
          setActiveListItem(2);
        }
        else{
          console.log(response.data)
        }
    }
    //This will get user's data
     function getUserData() {
        let token = localStorage.getItem('token');
        let authString="";
        if(token){
        authString = "Bearer "+token;}
        let response =  axios.get(`${base_url}/auth/me`,{
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

    const [activeListItem,setActiveListItem] = useRecoilState(activeListItemstate)
    console.log(activeListItem);
    
    const searchHolder = `Hi ${user.username.toString()} , search for a here...`;
    
    return <div className="relative p-1 h-[100vh] w-[100%]" style={{backgroundColor:(isDarkMode)?"#03001C":'white'}}>
        <FloatingButton/>
        <nav className="flex items-center justify-between m-5 ">
            <span className="hidden  lg:flex items-center space-x-4">
            <ProfilePhoto user={user} dimention={7}/>
              <span style={{color:(isDarkMode)?"white":"black"}} className="font-medium">{user.username.toString()}</span></span>
              {/* This is search box */}
            
            <span className="w-[70vw] hidden lg:w-[40vw]  border-b-2 px-4 flex m-auto" >
              <input style={{backgroundColor:(isDarkMode)?"#03001C":"white",color:(isDarkMode)?"white":"black"}} className="w-[80vw] focus:outline-none" type="text" name="" id="" placeholder={searchHolder}/><img src={(isDarkMode)?SearchIcon2:SearchIcon} alt="" /></span>
            <span style={{color:(isDarkMode)?"white":"#3F3F3F"}} className="hidden lg:flex  items-center space-x-4 "><span><span className="text-gray-400">Balance :</span> {user.balance.toString()} INR</span> <img onClick={()=>setActiveListItem(5)} src={AddMoneyIcon} alt="Add Money" /></span>

            <div className="flex  items-center space-x-4 mx-4"> <DayNightToggle onChange={()=>{
              SetIsDarkMode(!isDarkMode);
              if(isDarkMode){
              localStorage.setItem('isDarkMode','false');
            }
              else{
                localStorage.setItem('isDarkMode','true');
              }
            
              }} checked={isDarkMode} /></div>
        </nav>
    <main className="m-5">
    <div className="flex  justify-between align-center">
    <button className="btn-primary px-5 lg:my-5 inline my-5" onClick={()=>navigate("/addAProduct")} >Sell Your Product</button>
     <img onClick={()=>setMenuOpen(prev => !prev)} className="inline-block align-center my-auto lg:hidden h-10" src={(menuOpen)?x:menu} alt="" /></div>
    <div style={{height:"80%", display:"block",}}>
    <MenuList/>  
   <VerticalLine/>
   {confetti && <Confetti />}
    <DisplayArea/>
    {(isDialogOpen||isBuyPressed) && (
        <div className="overlay">
          <div className="modal lg:w-[25%] m-2">
            <div className="modal-content   font-medium">
                {isDialogOpen?<p>Do you want to logout of Bidhub?</p>:<p>Do you want to buy this product at Max Bid Price?</p>}
              <div className="my-4 flex justify-between">
              <span className="close" onClick={closeDialog}>Close</span>
            {isDialogOpen?<span className="logout text-red-700 " onClick={logoutUser}>Logout</span>:<span className="buy cursor-pointer text-green-700" onClick={buyAProduct}>Buy</span>}</div>
            </div>
          </div>
        </div>
      )}
     
    </div>
    </main>
    </div>
}
// type userType = {
//   userId: string;
//   username: string;
//   password: string;
//   balance: number;
//   fullName: string;
//   hostelName: string;
//   hostelRoom: string;
//   imageLink: string;
//   productId: never[];}

// type propsType = {
//   user:userType;
//   dimention:number;
// }

export default Home;