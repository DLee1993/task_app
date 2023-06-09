import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router; 