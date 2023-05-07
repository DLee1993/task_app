import * as dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/connectDB.js";
import mongoose from "mongoose";
import express from "express";
const router = express.Router();
import { Task } from "./model/Tasks.js";

connectDB();

const getData = await Task.find({});

console.log(getData);

mongoose.connection.once("open", () => {
    console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});
