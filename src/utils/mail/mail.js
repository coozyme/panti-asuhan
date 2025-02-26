const config = require("../../config/config");

const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = config.tokenEmail;

const transport = Nodemailer.createTransport(
   MailtrapTransport({
      token: TOKEN,
   })
);

const sender = {
   address: "hello@demomailtrap.com",
   name: "Panti Asuhan",
};

// transport
//    .sendMail({
//       from: sender,
//       to: recipients,
//       subject: "You are awesome!",
//       text: "Congrats for sending test email with Mailtrap!",
//       category: "Integration Test",
//    })
//    .then(console.log, console.error);

async function SendEmailActive(recipient) {

   const recipients = [];
   recipients.push(recipient);

   await transport
      .sendMail({
         from: sender,
         to: recipients,
         subject: "Account Activation",
         text: " Congrats, your account has been activated!",
         category: "Integration Test",
      })
      .then(console.log, console.error);
}

module.exports = {
   SendEmailActive,
}