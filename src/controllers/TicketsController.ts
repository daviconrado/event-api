import { NextFunction, Request, Response } from "express";
import { ticketSchemaZod } from "../models/zod-schemas/user-schema-zod";
import Tickets from "../models/TicketModel";

export class TicketsController{
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const validatedZodData = ticketSchemaZod.parse(req.body)
            const ticket = new Tickets(validatedZodData)
            await ticket.save()
            res.status(201).json(ticket)
        } catch (error) {
            next(error)
        }
    }

    index(req: Request, res: Response, next: NextFunction){
        res.send("passei1");
    }

    show(req: Request, res: Response, next: NextFunction){
        res.send("passei2"); 
    }

    update(req: Request, res: Response, next: NextFunction){
        res.send("passei3"); 
    }

    remove(req: Request, res: Response, next: NextFunction){
        res.send("passei4"); 
    }
}