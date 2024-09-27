const sendNotificationEmail = async (
   buyerName,
   sellerEmail,
   messageContent
) => {
   try {
      const response = await fetch("/api/send-email", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ buyerName, sellerEmail, messageContent }),
      });

      if (!response.ok) {
         throw new Error("Failed to send email");
      }

      console.log("Email sent successfully");
   } catch (error) {
      console.error("Error sending email:", error);
      throw error;
   }
};
