



import express from "express";
import mongoose from "mongoose";
const app = express();

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/activities";
import cors from "cors";
import { connectionString, port } from "./constants";

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect(connectionString, { dbName: "bidhub" }).then(()=>{
    console.log("Connected to The database");
});
