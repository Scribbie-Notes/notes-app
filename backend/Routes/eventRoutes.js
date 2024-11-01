// routes/event.js
import { Router } from "express";
import Event from "../models/eventModel.js";
import { authenticationToken } from "../middlewares/user.middlewares.js";

const eventRoutes = Router();

// Middleware to extract user from request
const getUserFromRequest = (req) => req.user?.user;

// Create an event
eventRoutes.post('/add/event', authenticationToken, async (req, res) => {
    const { date, title, color } = req.body;
    const user = getUserFromRequest(req);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const event = new Event({ date, title, color, userId: user._id });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all events
eventRoutes.get('/get/events', authenticationToken, async (req, res) => {
    const user = getUserFromRequest(req);

    try {
        const events = await Event.find({ userId: user._id });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an event
eventRoutes.delete('/delete/event/:id', authenticationToken, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default eventRoutes;
