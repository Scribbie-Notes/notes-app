const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
    rating:{type:Number,required:true},
    createdOn: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback