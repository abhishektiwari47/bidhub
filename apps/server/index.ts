import express from "express";
import mongoose from "mongoose";
const app = express();

import authRoutes from "./routes/auth";
import generalRoutes from "./routes/activities";
import paymentRoutes from "./payment/createCheckoutSession"
import eventRoutes from './payment/webhook';
import bidRoutes from './payment/bid';
import cors from "cors";
import { connectionString, port } from "./constants";

app.use(cors());
app.use("/auth", express.json(), authRoutes);
app.use("/general", express.json(), generalRoutes);
app.use("/pay", express.json(), paymentRoutes);
app.use("/event",eventRoutes)
app.use("/bid",express.json(),bidRoutes);
app.get("/done",(req,res)=>{
    res.json({"message":"this is done"})
});

app.listen(4242,"0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect(connectionString, { dbName: "bidhub" }).then(()=>{
    console.log("Connected to The database");
});



