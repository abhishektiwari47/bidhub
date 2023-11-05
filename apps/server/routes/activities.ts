import express from 'express';
import { authenticateJwt } from "../middleware/index";
import {SECRET} from '../constants/index';
import { Product,User } from "../db";
import mongoose from 'mongoose';
const router = express.Router();

interface bid {
  userId : mongoose.Types.ObjectId,
  amount : number
}

router.post('/addProduct' , authenticateJwt, (req, res) => {
  const { name,
    description,
    originalPrice,
    image,
    maxBid,
    minBid,} = req.body;
  const sold = false;
  const sellerId = req.headers["userId"];
  const buyerId = "";
  const newProduct = new Product({ 
    name,
    description,
    originalPrice,
    image,
    maxBid,
    minBid,
    sold,
    sellerId,
    buyerId
  });

  newProduct.save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/yourProductsForSell', authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];

  Product.find({ sellerId:userId })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.get('/yourBoughtProducts', authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];

  User.findById({ _id:userId }).populate("productId").exec()
    .then((user) => {
      if(!user)
      {
        res.sendStatus(4002);
      }
      else
      res.json({productId:user.productId});
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});


router.delete('/product/sold/:productId', authenticateJwt, (req, res) => {
  const { productId } = req.params;
  const userId = req.headers["userId"];

  Product.deleteOne({ _id: productId, sellerId:userId })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(updatedProduct);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

router.get('/getAllProducts', authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];

  Product.find()
    .then((products) => {
      if (!products) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});
router.put('/buy/:productId', authenticateJwt, async (req, res) => {
  const userId = req.headers["userId"];
  const productId = req.params.productId;
  

  try {
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if(product.sold==true)
    {
      return res.status(404).json({ error: 'Already Sold' });
    }
    const user = await User.findById(userId);
    if (!user || userId==undefined) {
      return res.status(404).json({ error: 'User not found' });
    }
    if(user.balance<product.maxBid)
    {
      return res.json({message:"Low Balance"});
    }
    const seller = await User.findById(product.sellerId);
    if(!seller)
    {
      return res.json({message:"no seller with this userId"});
    }
    if(product.sellerId==userId)
    {
      return res.json({message:"You Can't Buy your own product"})
    }

    user.balance=user.balance-product.maxBid;
    
    const productIdAsObjectId = new mongoose.Types.ObjectId(productId)
    user.productId.push(productIdAsObjectId)
    product.buyerId= userId.toString();
    product.sold=true; 
    
    console.log(seller.username);
    console.log(seller.balance);
    console.log(product.maxBid);
    let x =seller.balance+product.maxBid;
    seller.balance=x;

    let allBids = product.bids;
    
    allBids.forEach( async (element,index,array) => {
      const tempUser = await User.findById(element.userId);
      if(tempUser && element.amount!=undefined){
      tempUser.balance=tempUser.balance+element.amount;
      await tempUser.save();
      }
    });
    
    product.bids = new mongoose.Types.DocumentArray([]);
  
   
    
    // const user = await User.findOneAndUpdate(
    //   { _id: userId },
    //   { $push: { productId: productId } },
    //   { new: true }
    // );
    await product.save();
    await user.save();
    await seller.save();
    res.json({message:"Done"});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user or product' });
  }

  
});
export default router;
