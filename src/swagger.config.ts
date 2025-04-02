import { generateSchema } from '@anatine/zod-openapi';
import { loginSchemaZod, userSchemaZod } from "./validations/zod-schemas/user-schema-zod";
import { eventSchemaZod } from "./validations/zod-schemas/event-schema-zod";
import { ticketSchemaZod } from "./validations/zod-schemas/ticket-schema-zod";
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
import path from 'path';

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Event API',
        version: '1.0.0',
        description: 'API Documentation',
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
          Login: generateSchema(loginSchemaZod),
          Ticket: generateSchema(ticketSchemaZod),
          Event: generateSchema(eventSchemaZod)
        }
      },
    },
    apis: [
      path.join(__dirname, '../dist/routes/*.js'), // Caminho de produção
      path.join(__dirname, '../src/routes/*.ts') // Para desenvolvimento
    ],
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);

export {swaggerSpec}