import { atom } from "recoil";
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

  const imageState = atom<string>({
    key:"imageState",
    default:undefined
  })

 const productListState = atom({
  key:"productListState",
  default:[]
})
const productBidsListState = atom({
  key:"productBidListState",
  default:[]
})

interface Bid {
  amount: number;
  userId: mongoose.Types.ObjectId;
}

interface Product {
  _id: string;
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

const singleProductDataState = atom<Product>({
  key: 'singleProductDataState',
  default: undefined,
});


export {userData,productListState,productBidsListState,singleProductDataState,imageState}