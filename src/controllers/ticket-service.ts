import Event from "../models/EventModel"
import { AppError } from "../utils/AppError";

export async function sellTicket(eventId : string): Promise<any>{
    const event = await Event.findById(eventId);
    if(!Event){
        throw new AppError("Event not found",404)
    }

    const totalQuantity = event?.ticketTypes?.totalQuantity ?? 0;
    const soldQuantity = event?.ticketTypes?.soldQuantity ?? 0;
    if(totalQuantity<=soldQuantity){
        throw new AppError("Tickets are sold out")
    }

    const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId, "ticketTypes.soldQuantity": { $gt: 0 } },
        { $inc: {"ticketTypes.soldQuantity": 1 } },
        { new: true }
    );

    return updatedEvent;
}