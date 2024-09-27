export const sendNotificationEmail = async (
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

      // Check if the response status indicates success
      if (!response.ok) {
         // Try to parse the response if it's not empty
         let errorMessage = "Failed to send email";
         if (response.headers.get("content-length") > 0) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
         }
         throw new Error(errorMessage);
      }

      console.log("Email sent successfully");
   } catch (error) {
      console.error("Error sending email:", error);
      throw error;
   }
};
