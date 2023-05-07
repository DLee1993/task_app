import * as dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/connectDB.js";
import mongoose from "mongoose";

connectDB();

mongoose.connection.once("open", () => {
    console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});
