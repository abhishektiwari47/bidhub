
const express = require('express');
const stripe = require('stripe')('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');
const router = express.Router();
import { Request, Response, NextFunction, json } from "express";
// import mongoose from 'mongoose';
import { Product,User } from "../db";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_a55cc4d5c9356c608b059a8803d89b327c037bef71795d01694f2beb199f05ec";
let count =0;
router.post('/webhook', express.raw({type: 'application/json'}), async (request:Request, response:Response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  let userIdFromWebhook:string;
  let amount:number;
  let succeeded:boolean=false;
  try {
    event = await stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    
    // if(event.type=="checkout.session.completed"){
    // console.log("this is userId "+userIdFromWebhook);
    // console.log("this is the amount "+amount)}
  } catch (err:any) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    // case 'payment_intent.succeeded':
    //   console.log("payment done");
    //   console.log("this data is from intent"+ event.data.object.metadata.userId)
    //   succeeded =true;
    case 'checkout.session.completed':
      userIdFromWebhook= event.data.object.metadata.userId;
      amount = event.data.object.metadata.amount;
      const paymentIntentStatus = event.data.object.payment_status;
      if (paymentIntentStatus === 'paid') {
        console.log("payment Done");
        try {
          const user = await User.findById(userIdFromWebhook);
          console.log(userIdFromWebhook)
          if (user) {
            let tempBalance = Number(user.balance)+Number(amount)/100;
            user.balance = tempBalance;
            await user.save();
            console.log(`Updated balance for user: ${user.username}, New Balance: ${user.balance}`);
          } else {
            console.log(`User not found with ID: ${userIdFromWebhook}`);
          }
        } catch (error:any) {
          console.error(`Error updating user balance: ${error.message}`);
        }
      } else {
       console.log("payment not done");
      }
      break;
 
    default:
     
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



export default router;