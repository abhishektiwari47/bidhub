import mongoose, { mongo } from "mongoose";
import { useRecoilState } from "recoil";
import { buyProductState, buyState } from "../../data/RelatedStates";
import axios from "axios";
import { productListState,singleProductDataState, userData } from "../../data/ComponentData";
import { useNavigate } from "react-router-dom";

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

function ProductCard(allProducts:{data:Product,userId:string}){
  const navigate = useNavigate();
  const [user,setUser] = useRecoilState(userData)
  const [isBuyPressed, setBuyPressed] = useRecoilState(buyState);
  const [productId,setProductId] = useRecoilState(buyProductState);
    const {data,userId} = allProducts
    const [productData,setProductData] = useRecoilState(singleProductDataState);
   
    function getUserBid(productBid:Bid[], userId:string) {
      if (userId === "") {
        return 0;
      }
    
    
      const userBid = productBid.find(element => element.userId.toString() === userId);
      return userBid ? userBid.amount : 0;
    }
  
    const userBidAmount = getUserBid(data.bids, userId);
    console.log(userId)
      return <div key={data._id} className="card mx-auto mb-10 rounded-md overflow-hidden w-[80%] sm:w-[60%] lg:w-[60%]" style={{boxShadow:"0 4px 8px 0", backgroundColor:"#F0EDED",
        }}>
      <img className="" src={data.image.toString()} alt="Avatar" style={{height:"14em",width:"30em"}}/>
      <div className="container inline-grid grid-cols-2 px-3 py-2">
        <div>
        <h6><b>{data.name.toString()}</b></h6>
        {(userId=="")?
        <div>
       <button className="shadow-md bg-green-500 text-white px-2 border-solid border-2 border-white rounded">Buy</button>
  

        <button onClick={()=>{navigate(`/addBid/${data}`); setProductData(data);}} className="Bid shadow-md text-white px-2 border-solid border-2 border-[white] mx-1 rounded bg-[#FF6B00] ">Bid</button>
        </div>:<div>
            <p className="text-sm font-bold text-[#ff6b00]">Your Bid : {userBidAmount} INR</p>
        </div>}</div>
        <div className="text-right text-sm">
        <p>Original Price : {data.originalPrice.toString()} INR</p>
        <p>Max Bid : {data.maxBid.toString()} INR</p>
        <p>Min Bid : {data.minBid.toString()} INR</p></div>
      </div>
    </div>
    }

export default ProductCard;