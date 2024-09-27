export const sendNotificationEmail = async (
   buyerName,
   sellerEmail,
   messageContent
) => {
   try {
      const response = await fetch("/api/send-email", {
         method: "POST", // Make sure it's POST
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ buyerName, sellerEmail, messageContent }), // Ensure body is correct
      });

      if (!response.ok) {
         const errorText = await response.text(); // Log error message if any
         console.error("Response error:", errorText);
         throw new Error("Failed to send email");
      }

      console.log("Email sent successfully");
   } catch (error) {
      console.error("Error sending email:", error);
   }
};
