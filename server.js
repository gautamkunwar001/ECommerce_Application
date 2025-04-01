import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";


const app = express();
// configure env 
dotenv.config();


// database config
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoute);

// rest api
app.get('/', (req,res) => {
        res.send("welcome to ecommerce website");
});

// const port = 8080;
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});