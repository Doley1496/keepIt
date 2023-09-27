/* */

const nodemailer = require("nodemailer");

/* Creating a function with name sendMail which contains the logic to send a email message link to 
   the use to activate his account.
   We will use nodemailer to send email message link to the user's provided email.
*/
const sendMail = async (email, subject, message) => {
  /* */

  try {
    /* Creating transport. */
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICE,
      secure: Boolean(process.env.SMPT_SECURE),
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    /* What options we want to send in the email to the registering user. */
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: email,
      subject: subject,
      text: message,
    };
    /* From the transporter variable we are sending mail to a particular user with all the mailOptions. */
    await transporter.sendMail(mailOptions);
    // await transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email has been sent:", info.response);
    //   }
    // });

    res.status(200).send({
      success: true,
      message: "Email sent successfully",
      user,
    });
    console.log("Email sent successfully");

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};

/* Exporting sendMail modules */
module.exports = sendMail;
