const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "joey.fahey11@ethereal.email",
      pass: "6E1PPVTGZNAyjuyD11",
    },
  });
  
  const info = transporter.sendMail({
    from: '"Ozumah Ebenezer" <ozumahe@mail.com>',
    to: "bar@example.com",
    subject: "Hello Ozumahe",
    html: "<b>I am A ful stack developer</b>",
  });

  res.json(await info);
};

module.exports = sendEmail;
