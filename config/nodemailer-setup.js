const nodemailer = require("nodemailer");


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_email,
    pass: process.env.gmail_password,
  },
});

function sendSignupMail (userDoc){
  const {fullName, email} = userDoc;

  return transport.sendMail({
    from: "Ironhack Sharer Platform <express.users@example.com>",
    to: `${fullName} <${email}>`,
    subject:"Thank you for joining Ironhack sharer platform!",
    text: ` 
    Welcome, ${fullName}!
    Thank you for joining Ironhack Sharer Platform`,
    html: `
    <h1 style ="color: #2D62D7;">Welcome, ${fullName}!</h1>
    <p>Thank you for joining Ironhack Sharer Platform.</p>
    `,
  })
}

module.exports = { sendSignupMail };