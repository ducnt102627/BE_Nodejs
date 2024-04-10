import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routers/auth';
import productRouter from './routers/product'
import categoryRouter from './routers/category'
import cartRouter from './routers/cart'
import attributeRouter from './routers/attribute'
import orderRouter from './routers/order'
dotenv.config()
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))

//connect db
connectDB(process.env.DB_URI)
//router
app.use('/api', authRouter);
app.use('/api', productRouter)
app.use('/api', categoryRouter)
app.use('/api', cartRouter);
app.use('/api', attributeRouter)
app.use('/api', orderRouter)
export const viteNodeApp = app;