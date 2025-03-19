import {z} from "zod";

const ticketUpdateSchema = z.object({
    status: z.enum(["active","validated","canceled",])
})

const ticketTypeSchema = z.object({
    types: z.string().min(3).optional(),
    price: z.number().positive("The price must be positive").optional(),
    totalQuantity: z.number().positive("The total quantity must be positive").optional(),
    selledQuantity: z.number().positive("The selled quantity must be positive").optional()
})

const eventUpdateSchema = z.object({
   name: z.string().min(3,"The name must have at least 3 characters").optional(),
       date: z.string()
           .regex(/^\d{4}-\d{2}-\d{2}$/, "The date must be in format YYYY-MM-DD")
           .optional(),
       local: z.string().min(3,"The local must have at least 3 characters").optional(),
       description: z.string().optional(),
       ticketTypes: ticketTypeSchema.optional()
})

const userUpdateSchema = z.object({
    name: z.string().min(3).min(3,"The name must have at least 3 characters").optional(),
    email: z.string().email().optional(),
    password: z.string().min(6,"The password must have at least 6 characters").optional(),
    role: z.enum(["admin","user"]).optional()
})

export {ticketUpdateSchema, eventUpdateSchema, userUpdateSchema}