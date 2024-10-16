const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] }, // Ensure this is an array
    attachments:{type:[String],default:[]},
    isPinned: { type: Boolean, required: false },

    isArchived:{type:Boolean , default:false},
    deleted: {
        type: Boolean,
        default: false,  // Default is false, meaning the note is not deleted
      },
    userId: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    background: { type: String },
    deletedAt: Date, 

});



module.exports = mongoose.model("Note", noteSchema);