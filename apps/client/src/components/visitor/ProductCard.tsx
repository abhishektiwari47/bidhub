import mongoose, { mongo } from "mongoose";

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

function ProductCard(allProducts:{data:Product,userId:string},){
    const {data,userId} = allProducts
    function getUserBid(productBid:Bid[], userId:string) {
      if (userId === "") {
        return 0;
      }
    
    
      const userBid = productBid.find(element => element.userId.toString() === userId);
      return userBid ? userBid.amount : 0;
    }
  
    const userBidAmount = getUserBid(data.bids, userId);
    console.log(userId)
      return <div key={data._id} className="card" style={{boxShadow:"0 4px 8px 0", backgroundColor:"#F0EDED",width:"35%", margin:"0 45px",
        }}>
      <img src={data.image.toString()} alt="Avatar" style={{height:"50px",width:"60px"}}/>
      <div className="container">
        <h4><b>{data.name.toString()}</b></h4>
        {(userId=="")?
        <div>
        <button className="Buy">Buy</button>
        <button className="Bid">Bid</button>
        </div>:<div>
            <p>Your Bid : {userBidAmount} INR</p>
        </div>}
        <p>Original Price : {data.originalPrice.toString()} INR</p>
        <p>Max Bid : {data.maxBid.toString()} INR</p>
        <p>Min Bid : {data.minBid.toString()} INR</p>
      </div>
    </div>
    }

export default ProductCard;