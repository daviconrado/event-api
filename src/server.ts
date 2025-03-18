import express from "express"
import {routes} from "./routes"
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";
import Event from "./models/EventModel"
require('dotenv').config();


const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
if (!DB_CONNECTION_URL) {
  throw new Error("A variável de ambiente DB_CONNECTION_URL não está definida.");
}

const PORT = 3333;
const app = express()

mongoose.connect(DB_CONNECTION_URL)

app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running at: http://localhost${PORT}`)
})