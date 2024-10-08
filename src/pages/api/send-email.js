import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
   if (req.method === "POST") {
      const { buyerName, sellerEmail, messageContent } = req.body;

      if (!buyerName || !sellerEmail || !messageContent) {
         return res.status(400).json({ error: "Missing required fields" });
      }

      const msg = {
         to: sellerEmail,
         from: "vsell.web@gmail.com",
         subject: "New Buy or Offer Request",
         text: `Hi ${buyerName},\n\n${messageContent}`,
         html: `<strong>Hi ${buyerName},</strong><br/><p>${messageContent}</p>`,
      };

      try {
         await sgMail.send(msg);
         return res.status(200).json({ message: "Email sent successfully" });
      } catch (error) {
         // Log the error details and return a proper response
         console.error(
            "Error sending email:",
            error.response ? error.response.body : error.message
         );
         return res.status(500).json({
            error: "Failed to send email",
            details: error.response ? error.response.body : error.message,
         });
      }
   } else {
      return res.status(405).json({ error: "Method Not Allowed" });
   }
}
