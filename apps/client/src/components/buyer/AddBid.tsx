import { useParams ,useNavigate} from "react-router-dom";
import BackButton from "../../assets/svg/BackButton.svg";
import BidButton from '../../assets/svg/BidButton.svg';
import mongoose from "mongoose";
import { constSelector, useRecoilState } from "recoil";
import { singleProductDataState, userData } from "../../data/ComponentData";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Bid {
    amount: number,
    userId: mongoose.Types.ObjectId,
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
interface User {
   fullName:string,
    hostelName:string,
    hostelRoom:string,   
}

function AddBid(){
   
    const { id } = useParams<{ id: string }>();
    const [user] = useRecoilState(userData);
    const [seller,setSeller] = useState<User>({
      fullName:"",
       hostelName:"",
       hostelRoom:"",
    })
    const [productData,setProductData] = useRecoilState(singleProductDataState);
    const [bidValue,setBidValue] = useState(0)
    const authentication = "Bearer " + localStorage.getItem('token'); 
    

    async function bid(){
      const body = {
        amount:bidValue
      }
      const response = await axios.put(`http://localhost:4242/bid/addBid/${productData._id}`,body,{
        headers: {
          Authorization: authentication,
        },
      })
      console.log("hmm")
      console.log(response.data);
      
      if(response.status===200)
      {
        
        console.log("done")
        console.log(response.data.bids);
        setProductData(response.data)
        
      }
      
    }

    

    useEffect(() => {
      async function getSellerId() {
        const response = await axios.get(`http://localhost:4242/auth/getSeller/${productData.sellerId}`, {
          headers: {
            Authorization: authentication,
          },
        });
        
        setSeller(response.data);
      }
    
  
      getSellerId();
    }, [productData.sellerId, authentication]); 
    
    const navigate = useNavigate();

    return <>
    <nav><img src={BackButton} onClick={() => navigate(-1)} alt="" /></nav>
     <div style={{display:"inline-grid", gridTemplateColumns:"1fr 1fr",width:"100%"}}>
       <div style={{height:"85vh", width:"75%" ,backgroundColor:"green"}}>
           <div style={{display:"inline-grid", gridTemplateColumns:"1fr 1fr",width:"100%"}}><div>UserId</div><div>Bid(INR)</div></div>
           <div style={{height:"70vh",backgroundColor:"white",overflow:"auto", display:"inline-grid", gridTemplateColumns:"1fr 1fr",width:"100%"}}><div>
           {productData.bids.map((element) => (
      
      <React.Fragment  key={element.userId.toString()}>
        <div style={{color:(element.userId.toString()==user.userId)?"orange":"black"}}>{element.userId.toString()}</div>
      </React.Fragment>
    ))}
            </div>
            <div> 
            {productData.bids.map((element) => (
      <React.Fragment key={element.userId.toString()}>
        
        <div style={{color:(element.userId.toString()==user.userId)?"orange":"black"}}>{element.amount.toString()}</div>
      </React.Fragment>
    ))}
            </div>
            </div>
         <div>INR <input type="number" onChange={(e)=>{setBidValue(Number(e.target.value)); 

         }}/> <img src={BidButton} onClick={bid} alt="" /></div> 
       </div>

       <div style={{height:"85vh", width:"75%" ,backgroundColor:"yellow"}}>
         <div style={{width:"100%",height:"30vh"}}>
            <img src={productData.image} alt="" />
         </div>
         <div style={{width:"100%",height:"30vh"}}>
           <div style={{display:"inline-grid" , gridTemplateColumns:"1fr 1fr",width:"100%",}} ><p>{productData.name}</p>{(productData.sold)?<p>Already Sold</p>:<p>Available</p>}</div>
           <div>
            <h6>
                {productData.description}
            </h6>
            <h6>Original Price : {productData.originalPrice} INR</h6>
            <div style={{display:"inline-grid" , gridTemplateColumns:"1fr 1fr",width:"100%",}}><h6>Max Bid : {productData.maxBid.toString()}</h6><h6>Min Bid : {productData.minBid.toString()}</h6></div>
            <div><h6>Seller Id : {productData.sellerId}</h6></div>
            <div><h6>Seller Name : {seller.fullName}</h6></div>
            <div><h6>Seller Name : {seller.hostelName}</h6></div>
            <div><h6>Seller Name : {seller.hostelRoom}</h6></div>

           </div>

         </div>
       </div>
     </div>
    </>
}

export default AddBid;