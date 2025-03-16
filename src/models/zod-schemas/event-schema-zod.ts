import {z} from "zod";

const ticketTypeSchema = z.object({
    types: z.string().min(3),
    price: z.number().positive("The price must be positive"),
    totalQuantity: z.number().positive("The total quantity must be positive"),
    selledQuantity: z.number().positive("The selled quantity must be positive")
})

const eventSchemaZod = z.object({
    name: z.string().min(3,"The name must have at least 3 characters"),
    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "The date must be in format YYYY-MM-DD"),
    local: z.string().min(3,"The local must have at least 3 characters"),
    description: z.string().optional(),
    ticketTypes: ticketTypeSchema
})

export {eventSchemaZod}