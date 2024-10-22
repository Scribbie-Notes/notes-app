const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD,
  },
});

const contactSendMail = asyncHandler(async (email, name, html) => {
	await transporter.sendMail({
		from: '"Notes App" <alerts@notes.com>',
		to: email,
		name: name,
		html: html,
	});
});

module.exports = contactSendMail;