
const express = require('express');
const stripe = require('stripe')('sk_test_51O6XH8SB4wTdUGUwGmOUHuqFJfHN5ymg7mYqyQWEldgXRQpifGQv8SE5KmlbUCCi0Y92sAS9woJv1rljV6FQJxQa00V7qVvBfR');
const router = express.Router();
import { Request, Response, NextFunction, json } from "express";
import mongoose from 'mongoose';
import { Product,User } from "../db";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_a55cc4d5c9356c608b059a8803d89b327c037bef71795d01694f2beb199f05ec";

router.post('/webhook', express.raw({type: 'application/json'}), async (request:Request, response:Response) => {
  const sig = request.headers['stripe-signature'];

  let event;
  let userIdFromWebhook:string;
  let amount:number;
  try {
    event = await stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    userIdFromWebhook= event.data.object.metadata.userId;
    amount = event.data.object.metadata.amount;
    
    console.log("this is userId "+userIdFromWebhook);
    console.log("this is the amount "+amount)
  } catch (err:any) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log("this is done");
    
      try {
        const user = await User.findById(userIdFromWebhook);
        if (user) {
          user.balance += amount;
          await user.save();
          console.log(`Updated balance for user: ${user.username}, New Balance: ${user.balance}`);
        } else {
          console.log(`User not found with ID: ${userIdFromWebhook}`);
        }
      } catch (error:any) {
        console.error(`Error updating user balance: ${error.message}`);
      }
      break;
    // ... handle other event types
    default:
     
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



export default router;