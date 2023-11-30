import axios from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react";
import DeleteIcon from '../../assets/svg/DeleteIcon.svg';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { singleProductDataState } from "../../data/ComponentData";

interface Bid {
    amount: number,
    userId: mongoose.Types.ObjectId,
     
    
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

function ProductForSell(){
     const [boughtProducts,setBoughtProducts] = useState([])
     const authentication = "Bearer "+localStorage.getItem('token');
     async function deleteProduct(id:string)
     {
      console.log(id)
        let obj = new mongoose.Types.ObjectId(id)
        console.log(obj);
        
        const response = await axios.delete(`http://ec2-15-206-194-131.ap-south-1.compute.amazonaws.com:4242/general/product/sold/${id}`,{
         
          headers:{
              Authorization:authentication
          }
        });
        if(response.status==200)
        {
          return true
        }
        else{
          return false;
        }
     }
    async function allYourBroughtProducts(){
      console.log("called");
      
      const response = await axios.get("http://ec2-15-206-194-131.ap-south-1.compute.amazonaws.com:4242/general/yourProductsForSell",{
        headers:{
            Authorization:authentication
        }
      });
      if(response.status==200)
      {
        console.log(response.data);
        
        return response.data

      }
      else {
        console.log(response.status);
        return null;
      }
      
    }
    
    const [productData,setProductData]= useRecoilState(singleProductDataState);
    useEffect(()=>{
        const fetchData = async ()=>{
         const response = await allYourBroughtProducts();
         if(response)
         {
            setBoughtProducts(response);
         }
        } 
        fetchData();
    },[productData]);
    const navigate = useNavigate();
    return <div >
       {boughtProducts.map((element:Product,index:number)=>{
        let highestBid = 0;
        element.bids.forEach((bid)=>{
            if(bid.amount>highestBid)
            {
               highestBid = bid.amount;
            } 
        });
        return <div onClick={()=>{
          console.log(element);
          
          navigate(`/addBid/${element}`);setProductData(element)}} key={index} className="bg-[#EEEEEE] p-3 lg:p-0 my-4 lg:m-7 sm:inline-grid " style={{gridTemplateColumns:"2fr 3fr 2fr"}}>
        <div  className="flex items-center justify-center my-4 h-32 lg:m-7 border-2 rounded-lg overflow-clip">
        <img src={element.image} alt="" />
        </div>
        <div className="flex flex-col my-auto justify-between">
            <p  className="font-bold mb-3">{element.name}</p>
            <p>Product Id : {element._id}</p>
           
            {element.sold===false? <p>Total Bids : {element.bids.length}</p>:<p>Buyer Id : {element.buyerId}</p>}
            {element.sold===false?<p>Highest Bid : {highestBid} INR</p>:<p>Sell Price : {element.sellPrice} INR</p>}


        </div>
        <div className="flex flex-col my-auto p-5">
            <div className="flex justify-end space-x-7">
              {element.sold===false?<span className="text-[green]">Active</span>:<span className="text-[red]">Already Sold</span>}
            {element.sold==false?
             
              <img className="" onClick={async ()=>{let done = await deleteProduct(element._id);if(done){let array =  [...boughtProducts]; array.splice(index,1)
            ;setBoughtProducts(array)}}} src={DeleteIcon} alt="" />
            :<></>}
            </div>
            <div className="text-right text-sm">
        <p>Original Price : {element.originalPrice.toString()} INR</p>
        <p>Max Bid : {element.maxBid.toString()} INR</p>
        <p>Min Bid : {element.minBid.toString()} INR</p></div>
      </div>
        </div>
       })}
    </div>
}

export default ProductForSell;