// emailService.js
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendNotificationEmail = async (
   buyerName,
   sellerEmail,
   messageContent
) => {
   const msg = {
      to: sellerEmail,
      from: "vsell.web@gmail.com",
      subject: "New Buy or Offer Request",
      text: `Hi ${buyerName},\n\n${messageContent}`,
      html: `<strong>Hi ${buyerName},</strong><br/><p>${messageContent}</p>`,
   };

   try {
      await sgMail.send(msg);
      console.log("Notification email sent successfully.");
   } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Optional: rethrow error to handle in calling code
   }
};

module.exports = { sendNotificationEmail };
