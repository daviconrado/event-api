import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import {z} from "zod";

extendZodWithOpenApi(z);

const ticketTypeSchema = z.object({
    types: z.string()
        .min(3)
        .openapi({
            example: "VIP",
            type: "string" 
        }),
    price: z.number()
        .positive("The price must be positive")
        .openapi({
            example: "50",
            type: "string" 
        }),
    totalQuantity: z.number()
        .positive("The total quantity must be positive")
        .openapi({
            example: "250",
            type: "string" 
        }),
    selledQuantity: z.number()
        .positive("The selled quantity must be positive")
        .openapi({
            example: "50",
            type: "string" 
        }),
})

const eventSchemaZod = z.object({
    name: z.string()
        .min(3,"The name must have at least 3 characters")
        .openapi({
            example: "Davi's party",
            type: "string" 
        }),
    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "The date must be in format YYYY-MM-DD")
        .openapi({
            example: "YYYY-MM-DD",
            type: "string" 
        }),
    local: z.string()
        .min(3,"The local must have at least 3 characters")
        .openapi({
            example: "Davi's house",
            type: "string" 
        }),
    description: z.string()
        .optional()
        .openapi({
            example: "A super cool party!",
            type: "string" 
        }),
    ticketTypes: ticketTypeSchema
}).openapi({
    title: "Event",
    type: "object" 
})

export {eventSchemaZod, ticketTypeSchema}