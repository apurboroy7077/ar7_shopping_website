let nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("./secret");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});
let sendEmailWithNodeMailer = async (emailData) => {
  try {
    let mailOptions = {
      from: smtpUsername,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    let emailInfo = await transporter.sendMail(mailOptions);
    return emailInfo;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { sendEmailWithNodeMailer };
