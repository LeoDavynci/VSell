import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendNotificationEmail = async (
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
      throw error;
   }
};
