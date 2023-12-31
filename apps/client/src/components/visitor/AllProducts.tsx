import axios from "axios";
import {useEffect} from 'react';
import { productListState, userData } from "../../data/ComponentData";
import { useRecoilState } from "recoil";
import ProductCard from "./ProductCard";
import { base_url } from "../../store/constants";




function AllProduct(){
   
    const [productList,setProductList]=useRecoilState(productListState)
    const [user]=useRecoilState(userData)
    
    async function getAllProductList()
    {
        const authorization = "Bearer "+localStorage.getItem('token');
        const response = await axios.get(`${base_url}/general/getAllProducts`,{
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