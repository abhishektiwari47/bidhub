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
const express = require('express');
const stripe = require('stripe')('sk_test_51O6XH8SB4wTdUGUwGmOUHuqFJfHN5ymg7mYqyQWEldgXRQpifGQv8SE5KmlbUCCi0Y92sAS9woJv1rljV6FQJxQa00V7qVvBfR');
const router = express.Router();
const db_1 = require("../db");
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_a55cc4d5c9356c608b059a8803d89b327c037bef71795d01694f2beb199f05ec";
router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = request.headers['stripe-signature'];
    let event;
    let userIdFromWebhook;
    let amount;
    try {
        event = yield stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        userIdFromWebhook = event.data.object.metadata.userId;
        amount = event.data.object.metadata.amount;
        console.log("this is userId " + userIdFromWebhook);
        console.log("this is the amount " + amount);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log("this is done");
            try {
                const user = yield db_1.User.findById(userIdFromWebhook);
                if (user) {
                    user.balance += amount;
                    yield user.save();
                    console.log(`Updated balance for user: ${user.username}, New Balance: ${user.balance}`);
                }
                else {
                    console.log(`User not found with ID: ${userIdFromWebhook}`);
                }
            }
            catch (error) {
                console.error(`Error updating user balance: ${error.message}`);
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
}));
exports.default = router;
