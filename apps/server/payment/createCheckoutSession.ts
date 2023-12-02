require("dotenv").config()
import { Request, Response, NextFunction, json } from "express";
import { authenticateJwt } from "../middleware";
const express = require("express")
const app = express()
const cors = require("cors")
// app.use('/api/subs/stripe-webhook', express.raw({type: "*/*"}))
app.use(express.json())
const router = express.Router();
app.use(
  cors()
)

const stripe = require("stripe")("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")


let x = 10;
console.log(stripe);

router.post("/create-checkout-session",authenticateJwt, async (req: Request, res: Response) => {
    try {
      const userId = req.headers["userId"];
      const amount = req.body.amount; // Set the fixed amount in cents (e.g., 10000 cents = 100 INR
      // const userId = req.body.userId;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
          userId: userId,
          amount:amount
        },
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Add money to bidhub wallet",
              },
              unit_amount: amount, // Use the fixed amount here
            },
            quantity: 1, 
          },
        ],
        success_url: "https://main--bidhub.netlify.app/home",
        cancel_url: "https://main--bidhub.netlify.app/home"
      })
  

      
      
      
      res.json({ url: session.url });
    
      
    } catch (e: any) {
        x=3;
        console.log(x);
      res.status(500).json({ error: e.message });
    }
  });

  // router.post("/webhook", express.raw({type: 'application/json'}), (request:Request, response:Response) => {
  //   console.log("we are inside webhook");
  //   const sig = request.headers["stripe-signature"] as string;
  //   console.log(sig);
  //   let body = request.body;
  //   console.log(JSON.stringify(body));
    
  //   const endpointSecret = "whsec_a55cc4d5c9356c608b059a8803d89b327c037bef71795d01694f2beb199f05ec";
  
  //   let event;
  
  //   try {
  //     event = stripe.webhooks.constructEvent(JSON.stringify(body), sig, endpointSecret); 
  //     console.log(event);// Make sure endpointSecret is defined and imported
  //   } catch (err:any) {
  //       console.log(err.message)
  //     response.status(400).send(`Webhook Error: ${err.message}`);
  //     return;
  //   }
  
  //   // Handle the event
  //   switch (event.type) {
  //     case "payment_intent.succeeded":
  //      console.log("this is done");
  //       break;
  //     // ... handle other event types as needed
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }
  
  //   // Return a 200 response to acknowledge receipt of the event
  //   response.sendStatus(200);
  // });

export default router;
