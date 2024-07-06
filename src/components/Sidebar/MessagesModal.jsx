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

   const handleReply = async (message) => {
      try {
         await addDoc(collection(db, "messages"), {
            senderId: authUser.uid,
            receiverId: message.senderId,
            postId: message.postId,
            type: "reply",
            content: replyText,
            status: "unread",
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
            replyToId: message.id,
         });
         setReplyText("");
      } catch (error) {
         console.error("Error sending reply:", error);
      }
   };

   const handleAccept = async (message) => {
      try {
         // Delete the message
         await deleteDoc(doc(db, "messages", message.id));

         // Send confirmation to the buyer
         await addDoc(collection(db, "messages"), {
            senderId: authUser.uid,
            receiverId: message.senderId,
            postId: message.postId,
            type: "confirmation",
            content: "Your buy request has been accepted!",
            status: "unread",
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
         });

         // Remove the post from the database
         await deleteDoc(doc(db, "posts", message.postId));
      } catch (error) {
         console.error("Error accepting buy request:", error);
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
                        borderWidth={2}
                        borderRadius="md"
                     >
                        <Text fontWeight="bold">
                           {message.type === "buy" ? "Buy Request" : "Offer"}
                        </Text>
                        <Text>Amount: ${message.amount}</Text>
                        <Text>Status: {message.status}</Text>
                        {message.type === "buy" && (
                           <>
                              <Text>Buyer: {message.senderName}</Text>
                              <Text>Meetup Date: {message.meetupDate}</Text>
                              <Text>Meetup Time: {message.meetupTime}</Text>
                              <Text>
                                 Meetup Location: {message.meetupLocation}
                              </Text>
                           </>
                        )}
                        <Text fontSize={10}>
                           {message.createdAt.toDate().toLocaleString()}
                        </Text>
                        {message.status === "unread" && (
                           <Button onClick={() => markAsRead(message.id)}>
                              Mark as Read
                           </Button>
                        )}
                        {message.type === "buy" && (
                           <Button onClick={() => handleAccept(message)}>
                              Accept
                           </Button>
                        )}
                        <Input
                           placeholder="Reply to this message"
                           value={replyText}
                           onChange={(e) => setReplyText(e.target.value)}
                        />
                        <Button onClick={() => handleReply(message)}>
                           Reply
                        </Button>
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
