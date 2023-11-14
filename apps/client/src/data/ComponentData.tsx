import { atom,selector } from "recoil";
import mongoose from 'mongoose';

 const userData = atom({
    key: 'userData',
    default: {
    userId:"",
    username: "",
    password: "",
    balance: 0,
    fullName:"",
    hostelName:"",
    hostelRoom:"",
    imageLink:"",
    productId: []
    },
  });

 const productListState = atom({
  key:"productListState",
  default:[]
})
const productBidsListState = atom({
  key:"productBidListState",
  default:[]
})

export {userData,productListState,productBidsListState}