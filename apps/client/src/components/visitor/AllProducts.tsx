import axios from "axios";
import {useEffect} from 'react';
import { productListState, userData } from "../../data/ComponentData";
import { useRecoilState } from "recoil";
import mongoose from "mongoose";
import ProductCard from "./ProductCard";
import { buyState } from "../../data/RelatedStates";




function AllProduct(){
   
    const [productList,setProductList]=useRecoilState(productListState)
    const [user]=useRecoilState(userData)
    
    async function getAllProductList()
    {
        const authorization = "Bearer "+localStorage.getItem('token');
        const response = await axios.get("http://localhost:4242/general/getAllProducts",{
            headers:{
                Authorization:authorization
            }
        })
       return response;
    }
    useEffect( ()=>{
      const fetchData = async ()=>{
        const response = await getAllProductList();
        if(response.status==200)
        {
            setProductList(response.data);
        }
        else{
            console.log("something went wrong in all products.tsx");
        }
      }
      fetchData();
    },[])
  
    
    return <>
    {productList.filter((element: any) => (!element.sold&& user.userId!=element.sellerId)).map((element:any,index:number) => {
       return <ProductCard key={index} data={element} userId={""}/>
    })}
    
    </>
}



export default AllProduct;