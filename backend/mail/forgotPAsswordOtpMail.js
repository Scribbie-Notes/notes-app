require("dotenv").config();
const nodemailer = require("nodemailer");

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: "sourabhrawat782@gmail.com",
    // user: process.env.BREVO_USER,
    pass: "vkwqrfmeqvxmanzd",
    // pass: process.env.BREVO_PASS,
  },
});

exports.sendVerificationMail = async(email, verificationCode) => {
    const emailText = `
      Dear Customer,
      
      Please use this verification code for resetting your password. Here's your code':
  
      Code: ${verificationCode}
      
      Thank you for choosing our service. We are happy to help you.
  
      Best regards,
    `;
    console.log("hii");
    
    try {
      await transporter.sendMail({
        from: '"Notes App" <alerts@notes.com>',
        to: email,
        subject: "Password Reset Verification Code",
        text: emailText,
      });

      console.log("hlo");
      
      
    } catch (error) {
      console.log(`Failed to send verification email: ${error.message}`);
      
    }
  
  }