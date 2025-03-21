import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import {z} from "zod";

extendZodWithOpenApi(z);

const ticketSchemaZod = z.object({
    eventId: z.string()
        .openapi({
            example: "Event ID",
            type: "string" 
        }),
    userId: z.string()
        .openapi({
            example: "User ID",
            type: "string" 
        }),
    ticketType: z.string()
        .openapi({
            example: "VIP",
            type: "string" 
        }),
    buyDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "The date must be in format YYYY-MM-DD")
    .openapi({
        example: "YYYY-MM-DD",
        type: "string" 
    }),
    status: z.enum(["active","validated","canceled",])
        .openapi({
            example: "active/validated/canceled",
            type: "string" 
        }),
    qrCode: z.string()
        .optional()
        .openapi({
            example: "Generate for API",
            type: "string" 
        }),
}).openapi({
    title: "Ticket",
    type: "object"
})

export {ticketSchemaZod}