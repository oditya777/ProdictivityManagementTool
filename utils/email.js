const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };




// host: 'smtp.ethereal.email',
//  user: 'bethel.oreilly41@ethereal.email',
//       pass: 'DzRFabxEuBeD3KwDhM'


//       from: '"password reset👻" <odityakatre12@gmail.com.email>',
//       to: to,
//       subject: subject,
//       text: text,
//     };