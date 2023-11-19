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
        return <div key={index} style={{display:"inline-grid",gridTemplateColumns:"1fr 3fr"}}>
        <div>
        <img src={element.image} alt="" />
        </div>
        <div>
            <p>{element.name}</p>
            <p>{element._id}</p>
            <p>{element.sellerId}</p>
            <p>Buy Price : {element.sellPrice} INR</p>
        </div>
        </div>
       })}
    </div>
}

export default AllYourBoughtProducts;