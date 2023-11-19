import { useRecoilState, useRecoilValue } from "recoil";
import imageLink from "../../assets/imageLink";
import {productListState, userData} from "../../data/ComponentData"
import axios from "axios";
import { useEffect } from "react";
import AddMoneyIcon from '../../assets/svg/AddMoneyIcon.svg';
import {  activeListItemstate, buyProductState, buyState, logoutState } from "../../data/RelatedStates";
import MenuList from "./MenuList";
import { VerticalLine } from "../common";
import { DisplayArea } from "./Display";
import mongoose from "mongoose";
import { Navigate, useNavigate } from "react-router-dom";
import UserAccount from './Account';
const {ProfilePhoto}=UserAccount;

function Home()
{
    const [user,setUser] = useRecoilState(userData)
    const [isDialogOpen, setDialogOpen] = useRecoilState(logoutState);
    const [isBuyPressed, setBuyPressed] = useRecoilState(buyState);
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
    
    
    const [productId,setProductId] = useRecoilState(buyProductState)
    async function buyAProduct()
    {
      const authorization = "bearer "+localStorage.getItem('token');
      console.log(authorization);
      console.log("this is product Id");
      
      console.log(productId);
      
      const response = await axios.put(`http://localhost:4242/general/buy/${productId}`,{},{
        headers:{
          Authorization:authorization
        }
          });
          console.log(response.status);
        if(response.status===200)
        {
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

    const [activeListItem,setActiveListItem] = useRecoilState(activeListItemstate)

    
    
    return <div>
        <nav>
            <ProfilePhoto user={user} dimention={7}/>
            <span>{user.username.toString()}</span>
            <span><input type="text" name="" id="" placeholder="Hi Abhishek , search for a product here..."/></span>
            <span>{user.balance.toString()} INR<img onClick={()=>setActiveListItem(5)} src={AddMoneyIcon} alt="Add Money" /></span>
        </nav>
    <main>
    <button onClick={()=>navigate("/addAProduct")} style={{display:"inline"}}>Sell Your Product</button>
    <div style={{height:"80%", display:"block",}}>
    <MenuList/>  
    <VerticalLine/>
    <DisplayArea/>
    {(isDialogOpen||isBuyPressed) && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
                {isDialogOpen?<p>Do you want to logout of Bidhub?</p>:<p>Do you want to buy this product at Max Bid Price?</p>}
              <span className="close" onClick={closeDialog}>Close</span>
            {isDialogOpen?<span className="logout" onClick={logoutUser}>Logout</span>:<span className="buy" onClick={buyAProduct}>Buy</span>}
            </div>
          </div>
        </div>
      )}
    </div>
    </main>
    </div>
}
type userType = {
  userId: string;
  username: string;
  password: string;
  balance: number;
  fullName: string;
  hostelName: string;
  hostelRoom: string;
  imageLink: string;
  productId: never[];}

type propsType = {
  user:userType;
  dimention:number;
}

export default Home;