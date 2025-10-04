// const nodemailer = require("nodemailer")

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       secure: false,
//     })

//     let info = await transporter.sendMail({
//       from: `"studynotion | CodeHelp" <${process.env.MAIL_USER}>`, // sender address
//       to: `${email}`, // list of receivers
//       subject: `${title}`, // Subject line
//       html: `${body}`, // html body
//     })
//     console.log(info.response)
//     return info
//   } catch (error) {
//     console.log(error.message)
//     return error.message
//   }
// }

// module.exports = mailSender

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: 587, // use 465 for SSL
//       secure: false, // true if port is 465
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: `"studynotion | CodeHelp" <${process.env.MAIL_USER}>`,
//       to: `${email}`, // list of receivers
//       subject: `${title}`, // Subject line
//       html: `${body}`, // html body
//     });

//     console.log("Email sent successfully:", info.response);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return null;
//   }
// }

// module.exports = mailSender

// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,       // smtp.gmail.com
//       port: 587,                         // STARTTLS port
//       secure: false,                     // false for STARTTLS
//       requireTLS: true,                  // enforce TLS
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,     // Gmail App Password
//       },
//       tls: {
//         rejectUnauthorized: false,       // allow cloud server certs
//       },
//     });

//     let info = await transporter.sendMail({
//       from: `"studynotion | CodeHelp" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("Email sent successfully:", info.response);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return null;
//   }
// };

// module.exports = mailSender;


// mailSender.js

// Polyfill for fetch and Headers (needed for Resend in Node.js)
// mailSender.js

// Add these lines at the top to polyfill fetch and Headers for Node.js
const fetch = require("node-fetch");
global.fetch = fetch;
global.Headers = fetch.Headers;

const { Resend } = require("resend");

// Use your Resend API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    const response = await resend.emails.send({
      from: "noreply@studynotion-backend.com", // Must match your verified sender domain
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return null;
  }
};

module.exports = mailSender;


