import { z } from "zod";
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

extendZodWithOpenApi(z);

const userSchemaZod = z.object({
    name: z.string()
        .min(3, "The name must have at least 3 characters")
        .openapi({
            example: "Davi Conrado",
            type: "string" 
        }),
    email: z.string()
        .email()
        .openapi({
            example: "user@example.com",
            format: "email"
        }),
    password: z.string()
        .min(6, "The password must have at least 6 characters")
        .openapi({
            type: "string",
            format: "password"
        }),
    role: z.enum(["admin", "user"])
        .default("user")
        .openapi({
            example: "user",
            enum: ["admin", "user"]
        })
}).openapi({
    title: "User",
    type: "object" 
});

const loginSchemaZod = z.object({
    email: z.string()
        .email()
        .openapi({
            example: "user@example.com",
            format: "email"
        }),
    password: z.string()
        .min(6, "The password must have at least 6 characters")
        .openapi({
            type: "string",
            format: "password"
        })
}).openapi({
    title: "Login",
    type: "object"
});

export { userSchemaZod, loginSchemaZod };