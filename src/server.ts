import express from "express"
import {routes} from "./routes"
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import path from 'path';

import { generateSchema } from '@anatine/zod-openapi';
import { loginSchemaZod, userSchemaZod } from "./validations/zod-schemas/user-schema-zod";

require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later',
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Event API',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      { url: 'http://localhost:3333', description: 'Servidor local' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: generateSchema(userSchemaZod),
        Login: generateSchema(loginSchemaZod)
      }
    },
  },
  apis: [path.join(__dirname, 'routes/*.ts')], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
if (!DB_CONNECTION_URL) {
  throw new Error("A variável de ambiente DB_CONNECTION_URL não está definida.");
}

const PORT = 3333;
const app = express()

mongoose.connect(DB_CONNECTION_URL)

app.use(express.json())


app.use(limiter)

app.use(routes)

app.use(errorHandler)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT,()=>{
    console.log(`Server is running at: http://localhost${PORT}`)
})