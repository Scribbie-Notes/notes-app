const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false, // Make this optional if you don't always collect it
  },
  user_email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Basic email format validation
  },
  message: {
    type: String,
    required: true,
    minlength: 1, // Minimum length of message
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
