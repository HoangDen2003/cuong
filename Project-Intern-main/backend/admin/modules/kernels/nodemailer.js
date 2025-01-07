const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "gmail.com",
  // port: 465,
  // secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
  // tls: {
  //   servername: "http://localhost:3000/auth/forgot-password",
  // },
});

// Function to send email
const sendMail = async (code) => {
  let info = await transporter.sendMail({
    from: '"Admin" <hadinhhoang031104@gmail.com>', // Sender address
    to: "hadinhhoang031104@gmail.com", // List of receivers
    subject: code.subject, // Subject line
    text: code.text, // Plain text body
  });
  return info;
};

module.exports = { sendMail };
