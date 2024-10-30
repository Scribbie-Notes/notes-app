// routes/event.js
import { Router } from "express";
import Event from "../models/eventModel.js";
import { authenticationToken } from "../middlewares/user.middlewares.js";

const eventRoutes = Router();

// Create an event
eventRoutes.post('/events', authenticationToken,async (req, res) => {
    const { date, title, color } = req.body;
    const { user } = req.user;
    const event = new Event({ date, title, color, userId: user._id, });
    try {
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all events
eventRoutes.get('/events',authenticationToken, async (req, res) => {
  const { user } = req.user;
    try {
        const events = await Event.find({  userId: user._id});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an event
eventRoutes.delete('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default eventRoutes;
