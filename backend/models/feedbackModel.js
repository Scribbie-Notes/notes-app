const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);