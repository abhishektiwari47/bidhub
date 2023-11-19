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

function AddProduct(){
   
   
    const navigate = useNavigate();

    return <>
    <nav><img src={BackButton} onClick={() => navigate(-1)} alt="" /></nav>
     <div style={{display:"inline-grid",  gridTemplateColumns:"1fr 1fr",width:"100%"}}>
     <div style={{height:"85vh", width:"75%" ,backgroundColor:"yellow"}}>
         <div style={{width:"100%",height:"30vh"}}>
           dkjfkdj
         </div>
         <div style={{width:"100%",height:"30vh"}}>
         kdjfkjd

         </div>
       </div>
       <div style={{height:"85vh", width:"75%" ,backgroundColor:"green"}}>
         dkjfk
           
            
            </div>
        

     
     </div>
    </>
}

export default AddProduct;