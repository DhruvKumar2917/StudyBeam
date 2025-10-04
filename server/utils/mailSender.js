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

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,       // smtp.gmail.com
      port: 587,                         // STARTTLS port
      secure: false,                     // false for STARTTLS
      requireTLS: true,                  // enforce TLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,     // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,       // allow cloud server certs
      },
    });

    let info = await transporter.sendMail({
      from: `"studynotion | CodeHelp" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
};

module.exports = mailSender;
