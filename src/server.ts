import express from "express"
import {routes} from "./routes"
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
require('dotenv').config();

import { swaggerSpec } from "./swagger.config";
import { authMiddleware } from "./middlewares/auth-middleware";
const swaggerUi = require('swagger-ui-express');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later',
});

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
if (!DB_CONNECTION_URL) {
  throw new Error("The variable DB_CONNECTION_URL is undefined");
}

const PORT = 3333;
const app = express()

mongoose.connect(DB_CONNECTION_URL)

app.use(express.json())


app.use(limiter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes)

app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`Server is running at: http://localhost:${PORT}`)
})