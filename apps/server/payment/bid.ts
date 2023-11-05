import express from 'express';
import { authenticateJwt } from '../middleware';
const router = express.Router();
import { Request, Response} from "express";
import { Product, User } from '../db';
import mongoose from 'mongoose';

interface bid {
    userId : mongoose.Types.ObjectId,
    amount : number
}


router.put('/addBid/:productId',authenticateJwt,async (req:Request,res:Response)=>{
   const userId = req.headers["userId"];
   const {productId} = req.params;
   const product = await Product.findById(productId);
   const user = await User.findById(userId);
   const amount = req.body.amount;
   if(!userId || !amount){
    return res.send(400).json({error:"No userId or amount"})
   }
   if(!product)
   {
    return res.status(404).json({ error: 'product not found' });
   }
   if(!user)
   {
       return res.status(404).json({ error: 'user not found' });
   }
   if(userId==product.sellerId)
   {
    
     return res.status(400).json({error:"userId is same as sellerId."})
   }
   if(amount>product.maxBid || amount<product.minBid)
   {
    return res.json({error:"Amount should be not less than minBid or greater than maxBid"})
   }
   else if(amount===product.maxBid){
    return res.json({message:"You can not bid at Maximum biding pricing. Would you like to buy it?"})
   }
   const productWhereThisUserHasBid = await Product.findOne(
    {
      _id: productId, // Match the product by its ID
      'bids.userId': userId, // Match the bid by the specific user
    })
   if(productWhereThisUserHasBid)
   {
    const bidIndex = productWhereThisUserHasBid.bids.findIndex((bid)=>bid?.userId?.toString()===userId)
    console.log(productWhereThisUserHasBid.bids);
    console.log(userId)
    if (bidIndex !== -1) {
        productWhereThisUserHasBid.bids[bidIndex].amount = amount;
        await productWhereThisUserHasBid.save();
        return res.json(productWhereThisUserHasBid);
      } else {
        return res.json("Bid not found for this user.");
      }
   }
   
   const bid:bid = {
    userId:new mongoose.Types.ObjectId(userId.toString()),
    amount:amount
   }
   user.balance = Number(user.balance)-Number(amount);
   user.save();
   product.bids.push(bid);
   product.save();
   return res.status(200).json(product);

})

router.get('/allYourBids',authenticateJwt,async (req:Request,res:Response)=>
{
    const userId = req.headers["userId"];
    const productWhereThisUserHasBid = await Product.find(
        {
          'bids.userId': userId, // Match the bid by the specific user
        })
       if(productWhereThisUserHasBid)
       {
        return res.json({productWhereThisUserHasBid})
       }
       else {
        return res.json(
            {message:"No bidding done by You"}
        )
       }
}
)

router.delete('/removeBid/:productId',authenticateJwt,async (req:Request,res:Response)=>
{
    const userId = req.headers["userId"];
    const productWhereThisUserHasBid = await Product.findOneAndRemove(
        {
          'bids.userId': userId, // Match the bid by the specific user
        })
       if(productWhereThisUserHasBid)
       {
        return res.json({productWhereThisUserHasBid})
       }
       else {
        return res.json(
            {message:"No bidding done by You"}
        )
       }
}
)


export default router
