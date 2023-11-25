import axios, { all } from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react";

type Product = {
    image:string,
    name:string,
    _id: string,
    sellerId:string,
    sellPrice:number
 
}

function AllYourBoughtProducts(){
     const [boughtProducts,setBoughtProducts] = useState([])
     const authentication = "bearer "+localStorage.getItem('token');
    async function allYourBroughtProducts(){
      const response = await axios.get("http://localhost:4242/general/yourBoughtProducts",{
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
    useEffect(()=>{
        const fetchData = async ()=>{
         const response = await allYourBroughtProducts();
         if(response)
         {
            setBoughtProducts(response);
         }
        } 
        fetchData();
    },[])
    
    return <div >
       {boughtProducts.map((element:Product,index:number)=>{
        return <div key={index} className="bg-[#EEEEEE] p-3 lg:p-0 my-4 lg:m-7 sm:inline-grid " style={{gridTemplateColumns:"1fr 3fr"}}>
        <div className="flex items-center justify-center h-32 my-4 lg:m-7 border-2 rounded-lg overflow-clip">
        <img className="" src={element.image} alt="" />
        </div>
        <div className="flex flex-col my-auto justify-between">
            <p className="font-bold mb-3">{element.name}</p>
            <p>ProductId : {element._id}</p>
            <p>SellerId : {element.sellerId}</p>
            <p className="font-bold mt-3">Buy Price : <span className="text-[#FF6B00]">{element.sellPrice} INR</span></p>
        </div>
        </div>
       })}
    </div>
}

export default AllYourBoughtProducts;