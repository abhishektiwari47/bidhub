"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const middleware_1 = require("../middleware");
const express = require("express");
const app = express();
const cors = require("cors");
// app.use('/api/subs/stripe-webhook', express.raw({type: "*/*"}))
app.use(express.json());
const router = express.Router();
app.use(cors());
const stripe = require("stripe")("sk_test_51O6XH8SB4wTdUGUwGmOUHuqFJfHN5ymg7mYqyQWEldgXRQpifGQv8SE5KmlbUCCi0Y92sAS9woJv1rljV6FQJxQa00V7qVvBfR");
let x = 10;
router.post("/create-checkout-session", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers["userId"];
        const amount = req.body.amount; // Set the fixed amount in cents (e.g., 10000 cents = 100 INR
        // const userId = req.body.userId;
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            metadata: {
                userId: userId,
                amount: amount
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
            success_url: "http://localhost:5173/home",
            cancel_url: "http://localhost:5173/home"
        });
        res.json({ url: session.url });
    }
    catch (e) {
        x = 3;
        console.log(x);
        res.status(500).json({ error: e.message });
    }
}));
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
exports.default = router;
