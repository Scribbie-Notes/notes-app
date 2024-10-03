const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
	attachments:{type:[String],default:[]},
    isPinned: { type: Boolean, required: false },
    userId: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});



module.exports = mongoose.model("Note", noteSchema);
