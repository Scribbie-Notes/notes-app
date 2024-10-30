// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    userId: { type: String, required: true },
});

const Event =  mongoose.model('Event', eventSchema);
export default Event;

