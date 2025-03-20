import { NextFunction, Request, Response } from "express";
import { ticketSchemaZod } from "../validations/zod-schemas/ticket-schema-zod";
import Tickets from "../models/TicketModel";
import { AppError } from "../utils/AppError";
import { sellTicket } from "../services/ticket-service";
import { ticketUpdateSchema } from "../validations/zod-schemas/update-schema-zod";
import { generateTicketQrCode } from "../services/ticket-qr-service";

export class TicketsController{
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const validatedZodData = ticketSchemaZod.parse(req.body)
            const ticket = new Tickets(validatedZodData)

            const qrcode = await generateTicketQrCode(ticket._id.toString())
            ticket.qrCode = qrcode;
            
            await ticket.save()
            await sellTicket(ticket.eventId.toString())
            res.status(201).json(ticket)
        } catch (error) {
            next(error)
        }
    }

    async index(req: Request, res: Response, next: NextFunction){
        try {
            const {userId} = req.params
            const data = await Tickets.find({userId:userId})
            
            if(!data || data.length===0){
                next(new AppError("Tickets not found",404));
                return;
             }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        } 
    }

    async show(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params
            const data = await Tickets.findById(id)
            
            if(!data){
                next(new AppError("Tickets not found",404));
                return;
             }

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction){ 
        try {
            const {id} = req.params
            const validatedZodData = ticketUpdateSchema.parse(req.body)
            await Tickets.updateOne({_id:id},validatedZodData)
    
            const event = await Tickets.findById(id);
            res.status(200).json(event)
        } catch (error) {
            next(error)
        } 
    }

    async remove(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params
            const events = await Tickets.deleteOne({_id:id});
            res.status(204).json(events);
        } catch (error : any) {
            next(new AppError(error.message));
        }
    }
}