import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { productBidsListState, userData } from "../../data/ComponentData";
import ProductCard from "../visitor/ProductCard";

function AllYourBid(){
    const [user] = useRecoilState(userData)
    const [bidProductList,setBidProductList] = useRecoilState(productBidsListState);
    async function getAllBidProductList()
    {
        const authorization = "Bearer "+localStorage.getItem('token');
        const response = await axios.get("http://ec2-15-206-194-131.ap-south-1.compute.amazonaws.com:4242/bid/allYourBids",{
            headers:{
                Authorization:authorization
            }
        })
        console.log(response.data)
        return response;
    }
    useEffect( ()=>{
        const fetchData = async ()=>{
          const response = await getAllBidProductList();
          if(response.status==200)
          {
            console.log(response.data);
            
              setBidProductList(response.data);
          }
          else{
              console.log("something went wrong in all products.tsx");
              
          }
        }
        fetchData();
      },[])

    return <>
    
    {bidProductList.map((element:any,index:number) => {
       return <ProductCard key={index} data={element} userId={user.userId.toString()}/>
    })}
    
    </>

}

export default AllYourBid;
