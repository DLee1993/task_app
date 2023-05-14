import * as dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/connectDB.js";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";
import rootRouter from "./routes/root.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);

app.use("/dashboard", taskRouter);

app.use("/users", userRouter);

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("text").send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});
