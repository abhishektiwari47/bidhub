import axios, { all } from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react";
import DeleteIcon from '../../assets/svg/DeleteIcon.svg';

type Bid = {
    amount:number,
}

type Product = {
    image:string,
    name:string,
    _id: string,
    sellerId:string,
    sold:boolean,
    sellPrice:number,
    bids:Bid[],
    originalPrice:number,
    maxBid:number,
    minBid:number,
    buyerId:string
 
}

function ProductForSell(){
     const [boughtProducts,setBoughtProducts] = useState([])
     const authentication = "Bearer "+localStorage.getItem('token');
     async function deleteProduct(id:string)
     {
      console.log(id)
        let obj = new mongoose.Types.ObjectId(id)
        const response = await axios.delete(`http://localhost:4242/general/product/sold/${id}`,{
         
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
      
      const response = await axios.get("http://localhost:4242/general/yourProductsForSell",{
        headers:{
            Authorization:authentication
        }
      });
      if(response.status==200)
      {
        return response.data
      }
      else {
        console.log(response.status);
        return null;
      }
      
    }
    useEffect(()=>{
        const fetchData = async ()=>{
         const response = await allYourBroughtProducts();
         if(response)
         {
            setBoughtProducts(response);
         }
        } 
        fetchData();
    },[]);
    
    return <div >
       {boughtProducts.map((element:Product,index:number)=>{
        let highestBid = 0;
        element.bids.forEach((bid)=>{
            if(bid.amount>highestBid)
            {
               highestBid = bid.amount;
            } 
        });

        return <div key={index} className="bg-[#EEEEEE] p-3 lg:p-0 my-4 lg:m-7 sm:inline-grid " style={{gridTemplateColumns:"2fr 3fr 2fr"}}>
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