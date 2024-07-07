import React, { useState, useEffect } from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   VStack,
   Text,
   Box,
   Input,
} from "@chakra-ui/react";
import {
   getFirestore,
   collection,
   query,
   where,
   onSnapshot,
   orderBy,
   updateDoc,
   doc,
   deleteDoc,
   addDoc,
   serverTimestamp,
   arrayRemove,
} from "firebase/firestore";
import useAuthStore from "../../store/authStore";

const MessagesModal = ({ isOpen, onClose }) => {
   const [messages, setMessages] = useState([]);
   const [replyText, setReplyText] = useState("");
   const authUser = useAuthStore((state) => state.user);
   const db = getFirestore();

   const markAsRead = async (messageId) => {
      try {
         await updateDoc(doc(db, "messages", messageId), {
            status: "read",
            lastUpdated: serverTimestamp(),
         });
      } catch (error) {
         console.error("Error marking message as read:", error);
      }
   };

   const handleReject = async (message) => {
      try {
         await addDoc(collection(db, "messages"), {
            receiverId: message.senderId,
            senderId: authUser.uid,
            postId: message.postId,
            type: "rejection",
            item: message.item,
            price: message.price,
            seller: message.seller,
            buyer: message.buyer,
            info: replyText,
            status: "unread",
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
         });

         setReplyText("");
      } catch (error) {
         console.error("Error rejection:", error);
      }
   };

   const handleAccept = async (message) => {
      console.log("Message object:", message);
      try {
         // Send confirmation to the buyer
         await addDoc(collection(db, "messages"), {
            receiverId: message.senderId,
            senderId: authUser.uid,
            postId: message.postId,
            type: "confirmation",
            item: message.item,
            price: message.price,
            seller: message.seller,
            buyer: message.buyer,
            info: replyText,
            status: "unread",
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
         });

         // Remove the current message from the database
         await deleteDoc(doc(db, "messages", message.id));

         setReplyText("");
         // Remove the post from the database
         await deleteDoc(doc(db, "posts", message.postId));

         // Update the user's posts array
         const userRef = doc(db, "users", authUser.uid);
         await updateDoc(userRef, {
            posts: arrayRemove(message.postId),
         });
      } catch (error) {
         console.error("Error accepting buy request:", error);
      }
   };

   const handleDelete = async (message) => {
      try {
         await deleteDoc(doc(db, "messages", message.id));
      } catch (error) {
         console.error("Error deleting message", error);
      }
   };

   useEffect(() => {
      if (!authUser) return;

      const q = query(
         collection(db, "messages"),
         where("receiverId", "==", authUser.uid),
         orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         const messagesArray = [];
         querySnapshot.forEach((doc) => {
            messagesArray.push({ id: doc.id, ...doc.data() });
         });
         setMessages(messagesArray);
      });

      return () => unsubscribe();
   }, [authUser]);

   return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Your Messages</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               <VStack spacing={4} align="stretch">
                  {messages.map((message) => (
                     <Box
                        key={message.id}
                        p={4}
                        border={"2px solid black"}
                        borderRadius="25px"
                     >
                        <Text fontWeight="bold">
                           {message.type === "buy"
                              ? "Buy Request"
                              : message.type === "rejection"
                              ? "Rejection"
                              : message.type === "confirmation"
                              ? "Confirmation"
                              : message.type === "reply"
                              ? "Reply"
                              : ""}{" "}
                           from{" "}
                           {message.type === "buy" || message.type === "offer"
                              ? message.buyer
                              : message.type === "confirmation"
                              ? message.seller || authUser.displayName
                              : message.type === "rejection"
                              ? message.seller
                              : "Unknown"}
                        </Text>

                        <Text>Item: {message.item}</Text>
                        <Text>
                           Amount:{" "}
                           {message.price ? `$${message.price}` : "Free"}
                        </Text>

                        <Text>Status: {message.status}</Text>
                        {message.info && <Text pt={5}>{message.info}</Text>}

                        {/* Reply Box */}
                        {message.type !== "confirmation" && (
                           <Input
                              placeholder="Reply to this message with contact infomation"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                           />
                        )}

                        {/* Accept Button */}
                        {message.type === "buy" && (
                           <Button onClick={() => handleAccept(message)}>
                              Accept
                           </Button>
                        )}

                        {/* Reject Button */}
                        {message.type === "buy" && (
                           <Button onClick={() => handleReject(message)}>
                              Reject
                           </Button>
                        )}

                        {/* Delete Button */}
                        {message.type !== "buy" && (
                           <Button onClick={() => handleDelete(message)}>
                              Delete
                           </Button>
                        )}

                        <Text fontSize={10}>
                           {message.createdAt.toDate().toLocaleString()}
                        </Text>
                     </Box>
                  ))}
               </VStack>
            </ModalBody>
            <ModalFooter>
               <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default MessagesModal;
