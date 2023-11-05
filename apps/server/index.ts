import express from "express";
import mongoose from "mongoose";
const app = express();

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/activities";
import paymentRoutes from "./payment/createCheckoutSession"
import eventRoutes from './payment/webhook';
import bidRoutes from './payment/bid';
import cors from "cors";
import { connectionString, port } from "./constants";

app.use(cors());
app.use("/auth", express.json(), authRoutes);
app.use("/todo", express.json(), todoRoutes);
app.use("/pay", express.json(), paymentRoutes);
app.use("/event",eventRoutes)
app.use("/bid",express.json(),bidRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect(connectionString, { dbName: "bidhub" }).then(()=>{
    console.log("Connected to The database");
});



