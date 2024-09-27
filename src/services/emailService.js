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

      // Check if response has content and is a JSON response
      const contentType = response.headers.get("content-type");

      // Handle no content (e.g., 204 status or empty response)
      if (response.status === 204 || !contentType) {
         console.log("No content to parse");
         return;
      }

      // Only parse as JSON if the response content-type is JSON
      if (contentType.includes("application/json")) {
         const responseData = await response.json();
         console.log("Response data:", responseData);
      } else {
         console.log("Non-JSON response received");
      }

      if (!response.ok) {
         throw new Error("Failed to send email");
      }

      console.log("Email sent successfully");
   } catch (error) {
      console.error("Error sending email:", error);
      throw error;
   }
};
