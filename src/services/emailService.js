export const sendNotificationEmail = async (
   buyerName,
   sellerEmail,
   messageContent
) => {
   try {
      const response = await fetch("/api/send-email", {
         method: "POST", // Make sure it's a POST request
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ buyerName, sellerEmail, messageContent }),
      });

      if (!response.ok) {
         const errorMessage = await response.text(); // Use text() instead of JSON for non-JSON responses
         throw new Error(errorMessage || "Failed to send email");
      }

      console.log("Email sent successfully");
   } catch (error) {
      console.error("Error sending email:", error);
      throw error;
   }
};
