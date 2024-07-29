import {
   getFirestore,
   collection,
   addDoc,
   updateDoc,
   doc,
   query,
   where,
   getDocs,
   arrayUnion,
   serverTimestamp,
} from "firebase/firestore";

const db = getFirestore();

export const createOrUpdateConversation = async (
   sellerId,
   buyerId,
   itemId,
   messageType,
   messageContent,
   buyerName,
   sellerName
) => {
   try {
      // Check if a conversation already exists
      const conversationsRef = collection(db, "conversations");
      const q = query(
         conversationsRef,
         where("participants", "array-contains", sellerId),
         where("itemId", "==", itemId)
      );
      const querySnapshot = await getDocs(q);

      let conversationId;
      let existingConversation;

      if (!querySnapshot.empty) {
         // Conversation exists, update it
         existingConversation = querySnapshot.docs[0];
         conversationId = existingConversation.id;
      }

      const newMessage = {
         senderId: buyerId,
         type: messageType,
         content: messageContent,
         timestamp: new Date().toISOString(), // Use ISO string instead of serverTimestamp
         read: false,
      };

      if (existingConversation) {
         // Update existing conversation
         await updateDoc(doc(db, "conversations", conversationId), {
            messages: arrayUnion(newMessage),
            lastMessage: {
               type: messageType,
               content: getMessageSummary(messageType, messageContent),
            },
            lastMessageTimestamp: serverTimestamp(),
         });
      } else {
         // Create new conversation
         const newConversation = {
            sellerName: sellerName,
            buyerName: buyerName,
            participants: [sellerId, buyerId],
            itemId: itemId,
            messages: [newMessage],
            lastMessage: {
               type: messageType,
               content: getMessageSummary(messageType, messageContent),
            },
            lastMessageTimestamp: serverTimestamp(),
         };

         await addDoc(conversationsRef, newConversation);
      }

      console.log("Conversation created or updated successfully");
   } catch (error) {
      console.error("Error in createOrUpdateConversation:", error);
      throw error;
   }
};

const getMessageSummary = (type, content) => {
   switch (type) {
      case "TEXT":
         return content.length > 50
            ? content.substring(0, 47) + "..."
            : content;
      case "BUY_REQUEST":
         return `Buy request: $${content.currentPrice} for ${content.itemName}`;
      case "OFFER_REQUEST":
         return `Offer: $${content.offerPrice || "0"} for ${content.itemName}`;
      case "BUY_ACCEPT":
         return "Buy request accepted";
      default:
         return "New message";
   }
};

// Additional functions can be added here as needed
// You can add more functions here as needed, such as:
// - getConversations(userId)
// - markMessageAsRead(conversationId, messageId)
// - deleteConversation(conversationId)