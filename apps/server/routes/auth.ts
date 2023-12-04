import jwt from "jsonwebtoken";
import express from 'express';
import { authenticateJwt } from "../middleware/";
import {SECRET} from '../constants/index';
import { User } from "../db";
import {z} from 'zod';
const router = express.Router();
import {InputValidation} from 'validation';
import mongoose from "mongoose";

router.post('/signup', async (req, res) => {
    const parseResponse = InputValidation.safeParse(req.body);
    if(!parseResponse.success)
    {
      return res.status(411).json({
        msg:"err"
      })
    }
    const {username,password,hostelName,hostelRoom,fullName,imageLink} = req.body;
    const user = await User.findOne({ username: username});
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username:username, password:password,productId:[],hostelName,hostelRoom,fullName,balance:100,imageLink});
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '24h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const parseResponse = InputValidation.safeParse(req.body);
    if(!parseResponse.success)
    {
      return res.status(411).json({
        msg:"err"
      })
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '365d' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

router.get('/me', authenticateJwt, async (req, res) => {
      const userId = req.headers["userId"];
      const user = await User.findOne({ _id: userId });
      if (user) {
        res.json({ userId:userId,username: user.username,fullName:user.fullName,hostelName:user.hostelName,hostelRoom:user.hostelRoom,balance:user.balance,productId:user.productId,imageLink:user.imageLink});
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });
router.get('/getSeller/:sellerId',authenticateJwt,async (req,res)=>{
  const {sellerId} = req.params;
  console.log("this is seller id");
  
  console.log(sellerId)
  const seller = await User.findOne({ _id: sellerId });
      if (seller) {
        res.json({ userId:sellerId,username: seller.username,fullName:seller.fullName,hostelName:seller.hostelName,hostelRoom:seller.hostelRoom,balance:seller.balance,productId:seller.productId,imageLink:seller.imageLink});
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
})

  export default router
