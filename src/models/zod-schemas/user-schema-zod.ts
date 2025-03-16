import {z} from "zod";

const userSchemaZod = z.object({
    name: z.string().min(3).min(3,"The name must have at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(6,"The password must have at least 6 characters"),
    role: z.enum(["admin","user"])
})

const loginSchemaZod = z.object({
    email: z.string().email(),
    password: z.string().min(6,"The password must have at least 6 characters"),
})

export {userSchemaZod, loginSchemaZod}