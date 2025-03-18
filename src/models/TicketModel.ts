import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    eventId: { 
        type: Schema.Types.ObjectId, 
        ref: "Events", 
        required: true 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "Users", 
        required: true 
    },
    ticketType: String,
    buyDate: String,
    status: String,
    qrCode: String,
})

const Tickets = model("Tickets",ticketSchema)
export default Tickets;