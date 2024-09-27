import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
   if (req.method === "POST") {
      const { buyerName, sellerEmail, messageContent } = req.body;

      const msg = {
         to: sellerEmail,
         from: "vsell.web@gmail.com",
         subject: "New Buy or Offer Request",
         text: `Hi ${buyerName},\n\n${messageContent}`,
         html: `<strong>Hi ${buyerName},</strong><br/><p>${messageContent}</p>`,
      };

      try {
         await sgMail.send(msg);
         res.status(200).json({ message: "Email sent successfully." });
      } catch (error) {
         console.error("Error sending email:", error);
         res.status(500).json({ error: "Failed to send email." });
      }
   } else {
      res.status(405).json({ error: "Method not allowed" });
   }
}
