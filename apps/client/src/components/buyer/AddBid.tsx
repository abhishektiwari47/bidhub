import { useNavigate} from "react-router-dom";
import BackButton from "../../assets/svg/BackButton.svg";
import BackButton2 from "../../assets/svg/BackButton2.svg";
import {  useRecoilState } from "recoil";
import { singleProductDataState, userData } from "../../data/ComponentData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { isDarkModeState } from "../../data/RelatedStates";
import { base_url } from "../../store/constants";

// interface Bid {
//     amount: number,
//     userId: mongoose.Types.ObjectId,
// }
// interface Product {
//     _id:string;
//     name: string;
//     description: string;
//     originalPrice: number;
//     image: string;
//     maxBid: { type: number; required: true };
//     minBid: { type: number; required: true };
//     sold: boolean;
//     sellPrice: number;
//     sellerId: string;
//     buyerId: string;
//     bids: Bid[];
//   }
interface User {
   fullName:string,
    hostelName:string,
    hostelRoom:string,   
}

function AddBid(){
     const [isDarkMode] = useRecoilState(isDarkModeState)
     
    // const { id } = useParams<{ id: string }>();
    const [user] = useRecoilState(userData);
    const [seller,setSeller] = useState<User>({
      fullName:"",
       hostelName:"",
       hostelRoom:"",
    })
    const [productData,setProductData] = useRecoilState(singleProductDataState);
    const [bidValue,setBidValue] = useState(0)
    const authentication = "Bearer " + localStorage.getItem('token'); 
    

    async function bid(){
      const body = {
        amount:bidValue
      }
      const response = await axios.put(`${base_url}/bid/addBid/${productData._id}`,body,{
        headers: {
          Authorization: authentication,
        },
      })
      
      
      if(response.status===200)
      {
        
        setProductData(response.data)
        
      }
      
    }

    console.log(authentication);
    
      let highestBid = 0;
      let highestBiddingUser:string="";
      productData.bids.forEach((bid)=>{
          if(bid.amount>highestBid)
          {
             highestBid = bid.amount;
             highestBiddingUser = bid.userId.toString();
          } 
      })

    let body:object;
    if(highestBiddingUser!="")
    {
      body={userId:highestBiddingUser}
    }
    
    async function sellAtMaxBid(){
        console.log(highestBiddingUser+highestBid);
        
       const response = await axios.post(`${base_url}/general/acceptABid/${productData._id}`,body,{
        headers: {
          Authorization: authentication,
        },
       });
       if(response.status==200)
       {
         console.log("sold");
         
       }

    }
    
    
    useEffect(() => {
      async function getSellerId() {
        const response = await axios.get(`${base_url}/auth/getSeller/${productData.sellerId}`, {
          headers: {
            Authorization: authentication,
          },
        });
        
        setSeller(response.data);
      }
    
      if(productData.sellerId)
      {
        getSellerId();
      }
     
    }, []);
    console.log("this is user");
     
    console.log(user);
     console.log("this is product");
     console.log(productData);
     
    
    const navigate = useNavigate();

    return <div className="p-1 lg:h-screen" style={{backgroundColor:(isDarkMode)?"#03001C":"white"}}>
    {/* nav */}
    <nav><img className="h-6 mx-6 my-6"  src={(isDarkMode)?BackButton2:BackButton} onClick={() => navigate(-1)} alt="" /></nav>
    <div className=" px-20 py-2 lg:flex lg:space-x-32 space-y-5 lg:space-y-0" style={{ gridTemplateColumns:"1fr 1fr",width:"100%"}}>

   <div className="bg-white m-auto shadow-md shadow-gray-800 " style={{height:"85vh", width:"75%" }}>
     <div className="text-center bg-[#FF6B00] text-white py-2" style={{display:"inline-grid", gridTemplateColumns:"1fr 1fr",width:"100%"}}><div>UserId</div><div>Bid(INR)</div></div>
    {/* Bid List Div */}
     <div className="text-center " style={{height:"70vh",backgroundColor:"white",overflow:"auto", display:"inline-grid", gridTemplateColumns:"1fr 1fr",width:"100%"}}>
    
     {/* This is the bid Id */}
            <div>    
                {productData.bids.map((element,index) => (
                  
                  <React.Fragment  key={element.userId.toString()}>
                    <div className="p-2"  style={{color:(element.userId.toString()==user.userId)?"orange":"black", backgroundColor:(index%2==0)?"#E3E3E3":"#F3F3F3"}}>{element.userId.toString()}</div>
                  </React.Fragment>
                ))}
            </div>
          {/* Bid Amount */}
            <div  > 
                  {productData.bids.map((element,index) => (
                  <React.Fragment key={element.userId.toString()}>
                    
                    <div className="p-2" style={{color:(element.userId.toString()==user.userId)?"orange":"black", backgroundColor:(index%2==0)?"#E3E3E3":"#F3F3F3"}}>{element.amount.toString()}</div>
                  </React.Fragment>
                ))}
            </div>
      </div>
      

      {/* Here  */}
      {(user.userId!=productData.sellerId)?
      <div className="flex text-center justify-center items-center space-x-5 m-2" ><span className="text-green-700 font-medium">INR</span> <input className="input1 px-2 w-[60%]" type="number" onChange={(e)=>{setBidValue(Number(e.target.value));}}/>
       <button className="btn-primary px-5 shadow-md shadow-gray" onClick={()=>bid()}>Bid</button>
      </div> :<div className="flex text-center justify-center items-center space-x-5 m-2" >
        <button className="btn-primary px-5 shadow-md shadow-gray" onClick={()=>{sellAtMaxBid();}}>Sell At Highest Bid </button>
      </div>}


       </div>

  {/* Here is the product */}
       <div className="m-auto flex flex-col " style={{height:"85vh", width:"75%" }}>
         <div  style={{width:"100%"}}>
            <img   className="m-auto h-[40vh] w-[100%] rounded-md" src={productData.image} alt="" />
         </div>
         <div style={{width:"100%",height:"30vh",color:(isDarkMode)?"white":"black"}}>
           <div className="my-2"  style={{display:"inline-grid" , gridTemplateColumns:"1fr 1fr",width:"100%",}} >
            <p style={{color:(isDarkMode)?"white":"black"}} className='font-medium text-[20px]'>{productData.name}</p>{(productData.sold)?<p  className='font-medium text-red-600 text-[15px] text-right'>Already Sold</p>:<p className='font-medium text-[15px] text-right text-green-600'>Available</p>}</div>
           <div>
            <h6  className="my-2">
                {productData.description}
            </h6>
            <h6 className="my-1">Original Price : {productData.originalPrice} INR</h6>
            <div className="my-1" style={{display:"inline-grid" , gridTemplateColumns:"1fr 1fr",width:"100%",}}><h6>Max Bid : {productData.maxBid.toString()}</h6><h6 className="text-right">Min Bid : {productData.minBid.toString()}</h6></div>
           { (productData.sellerId!=undefined || productData.sellerId==null)?<><div>
              <h6 className="my-1">Seller Id : {productData.sellerId}</h6></div>
            <div className="my-1"><h6>Seller Name : {seller.fullName}</h6></div>
            <div className="my-1"><h6>Seller Name : {seller.hostelName}</h6></div>
            <div className="my-1"><h6>Seller Name : {seller.hostelRoom}</h6></div>

           </>:<></>}
           </div>

         </div>
       </div>
     </div>
    </div>
}

export default AddBid;