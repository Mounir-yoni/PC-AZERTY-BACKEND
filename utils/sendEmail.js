/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require("nodemailer");

// Nodemailer
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mouniryt21@gmail.com",
      pass: "dbjuryskzefutxdv",
    },
  });
  console.log(options);
  const mailOpts = {
    from: "E-shop App <mouniryt21@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;
