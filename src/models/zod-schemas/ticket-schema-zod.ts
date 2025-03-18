import {z} from "zod";

const ticketSchemaZod = z.object({
    eventId: z.string(),
    userId: z.string(),
    ticketType: z.string(),
    buyDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "The date must be in format YYYY-MM-DD"),
    status: z.enum(["active","validated","canceled",]),
    qrCode: z.string(),
})

export {ticketSchemaZod}