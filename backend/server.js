import * as dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/connectDB.js";
import mongoose from "mongoose";
import express from "express";
import router from "./routes/taskRoutes.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", router);

mongoose.connection.once("open", () => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});
