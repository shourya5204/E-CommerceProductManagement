import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

dotenv.config(); // Load environment variables

const app = express();
// Set PORT from environment variables or default to 5000
const PORT = process.env.PORT || 5000;
// Connect to Database before starting the server
connectDB(); 

const __dirname = path.resolve();


app.use(express.json()); // Middleware to accept JSON data


app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
