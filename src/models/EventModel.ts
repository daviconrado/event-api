import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    name: String,
    date: String,
    local: String,
    description: {type: String, required:false},
    ticketTypes: {
        types: String,
        price: Number,
        totalQuantity: Number,
        selledQuantity: Number
    }
})

const Events = model("Events",eventSchema)
export default Events;