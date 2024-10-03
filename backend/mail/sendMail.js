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

const sendMail = asyncHandler(async (email, url) => {
  await transporter.sendMail({
    from: '"Notes App" <alerts@notes.com>',
    to: email,
    subject: "Verification Link For Notes Account",
    text: "Click the link below to verify your account",
    html: url,
  });
});

module.exports = sendMail;
