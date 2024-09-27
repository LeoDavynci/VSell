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
         from: "vsell.web@gmail.com", // your verified sender email
         subject: "New Buy or Offer Request",
         text: `Hi ${buyerName},\n\n${messageContent}`,
         html: `<strong>Hi ${buyerName},</strong><br/><p>${messageContent}</p>`,
      };

      try {
         console.log("Sending email to:", sellerEmail); // Log the email recipient
         await sgMail.send(msg);
         res.status(200).json({ message: "Email sent successfully" });
      } catch (error) {
         console.error(
            "Error sending email:",
            error.response ? error.response.body : error
         ); // Log detailed SendGrid error
         res.status(500).json({
            error: "Failed to send email",
            details: error.response ? error.response.body : error,
         });
      }
   } else {
      res.status(405).json({ error: "Method not allowed" });
   }
}
