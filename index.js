import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Welcome to IRCTC app !");
});

app.use('/auth', authRoutes);    
app.use('/trains', trainRoutes);  
app.use('/bookings', bookingRoutes);  

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
