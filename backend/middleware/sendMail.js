const sgMail = require("@sendgrid/mail");
const sendMailApi_key =
  process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendMailApi_key);
module.exports.sendGrid = (option) => {
  const message = {
    to: option.email,
    from: process.env.FROM_EMAIL,
    subject: option.subject,
    text: option.text,
    html: option.html,
  };

  sgMail.send(message);
};
