import {NextFunction, Request, Response} from "express"
import Event from "../models/EventModel"
import { AppError } from "../utils/AppError"
import { eventSchemaZod } from "../validations/zod-schemas/event-schema-zod";
import { eventUpdateSchema } from "../validations/zod-schemas/update-schema-zod";

export class EventsController{
     /*
    *index -- GET -- para listar varios registros
    *show -- GET -- para listar um registro
    *create -- POST -- criar um registro
    *update -- PUT -- para atualizar um registro
    *remove -- DELETE -- para deletar um registro
    */
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const events = await Event.find({});
            res.status(200).json(events);
        } catch (error : any) {
            next(error);
        }
    }
    

   async show(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const events = await Event.findById(id);

        if(JSON.stringify(events)==="null"){
            next(new AppError("Event not found",404));
            return;
        }

        res.status(200).json(events);
    } catch (error : any) {
        next(new AppError("",404));
    }
}

   async create(req: Request, res: Response,next: NextFunction){
    try {
        const validatedZodData = eventSchemaZod.parse(req.body)
        const event = new Event(validatedZodData)
        await event.save()
        res.status(201).json(event)
    } catch (error) {
        next(error)
    }
   }

   async update(req: Request, res: Response,next: NextFunction){
    try {
        const {id} = req.params
        const validatedZodData = eventUpdateSchema.parse(req.body)
        await Event.updateOne({_id:id},validatedZodData)

        const event = await Event.findById(id);
        res.status(200).json(event)
    } catch (error) {
        next(error)
    }
   }

   async remove(req: Request, res: Response,next: NextFunction){
    try {
        const {id} = req.params
        const events = await Event.deleteOne({_id:id});
        res.status(204).json(events);
    } catch (error : any) {
        next(new AppError(error.message));
    }
   }


}