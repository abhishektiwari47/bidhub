import axios from "axios";
import {useEffect} from 'react';
import { productListState } from "../../data/ComponentData";
import { useRecoilState } from "recoil";
import mongoose from "mongoose";
import ProductCard from "./ProductCard";




function AllProduct(){
    const [productList,setProductList]=useRecoilState(productListState)
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
    {productList.map((element:any,index:number) => {
       return <ProductCard key={index} data={element} userId={""}/>
    })}
    
    </>
}



export default AllProduct;