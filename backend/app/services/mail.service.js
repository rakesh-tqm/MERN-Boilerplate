const nodemailer = require("nodemailer");

const transport_opt = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
};

const transport = nodemailer.createTransport(transport_opt);

// transport.on("token", (token) => {
//   console.log("A new access token was generated");
//   console.log("User: %s", token.user);
//   console.log("Access Token: %s", token.accessToken);
//   console.log("Expires: %s", new Date(token.expires));
// });

const sendMailCommon = ({ to, subject, html }) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  };

  const info = transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = { sendMailCommon };
