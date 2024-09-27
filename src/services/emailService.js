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
         body: JSON.stringify({ buyerName, sellerEmail, messageContent }), // Properly structured body
      });

      const contentType = response.headers.get("content-type");

      if (response.status === 204 || !contentType) {
         console.log("No content to parse");
         return;
      }

      if (contentType.includes("application/json")) {
         const responseData = await response.json();
         console.log("Response data:", responseData);
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
