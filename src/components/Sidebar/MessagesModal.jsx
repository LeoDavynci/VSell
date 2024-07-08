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

   //    const handleReject = async (message) => {
   //       try {
   //          await addDoc(collection(db, "messages"), {
   //             receiverId: message.senderId,
   //             senderId: authUser.uid,
   //             postId: message.postId,
   //             type: "rejection",
   //             item: message.item,
   //             price: message.price,
   //             seller: message.seller,
   //             buyer: message.buyer,
   //             info: replyText,
   //             status: "unread",
   //             createdAt: serverTimestamp(),
   //             lastUpdated: serverTimestamp(),
   //          });

   //          setReplyText("");
   //       } catch (error) {
   //          console.error("Error rejection:", error);
   //       }
   //    };

   const handleAccept = async (message) => {
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

   const handleOfferAccept = async (message, newPrice) => {
      try {
         // Send confirmation to the buyer
         await addDoc(collection(db, "messages"), {
            receiverId: message.senderId,
            senderId: authUser.uid,
            postId: message.postId,
            type: "offerConfirmation",
            item: message.item,
            price: message.price,
            seller: message.seller,
            buyer: message.buyer,
            info: newPrice,
            status: "unread",
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
         });

         // Remove the current message from the database
         await deleteDoc(doc(db, "messages", message.id));
      } catch (error) {
         console.error("Error accepting buy request:", error);
      }
   };

   const handleOfferReject = async (message, newPrice) => {
      try {
         // Send rejection to the buyer
         await addDoc(collection(db, "messages"), {
            receiverId: message.senderId,
            senderId: authUser.uid,
            postId: message.postId,
            type: "offerRejection",
            item: message.item,
            price: message.price,
            seller: message.seller,
            buyer: message.buyer,
            info: newPrice,
            status: "unread",
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
         });

         // Remove the current message from the database
         await deleteDoc(doc(db, "messages", message.id));
      } catch (error) {
         console.error("Error rejecting buy request:", error);
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
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         size={{ base: "sm", sm: "sm", md: "3xl", lg: "6xl" }}
      >
         <ModalOverlay />
         <ModalContent borderRadius={{ base: "25px", md: "35px" }} mt={"70px"}>
            <ModalHeader>Your Messages</ModalHeader>
            <ModalCloseButton />
            <ModalBody px={"10px"} pb={"10px"}>
               <VStack spacing={4} align="stretch">
                  {messages.map((message) => (
                     <Box
                        key={message.id}
                        p={3}
                        borderRadius={{ base: "20px", md: "30px" }}
                        bg={"#EBEBEB"}
                     >
                        <Text fontWeight="bold">
                           {message.type === "buy"
                              ? `Buy Request from ${message.buyer}`
                              : message.type === "offer"
                              ? `Offer from ${message.buyer}`
                              : message.type === "confirmation"
                              ? `Confirmation from ${
                                   message.seller || authUser.displayName
                                }`
                              : message.type === "rejection"
                              ? `Rejection from ${message.seller}`
                              : message.type === "offerConfirmation"
                              ? `${message.seller} has accepted your offer`
                              : message.type === "offerRejection"
                              ? `${message.seller} has rejected your offer`
                              : ""}
                        </Text>

                        {/* Item Name */}
                        <Text>Item: {message.item}</Text>

                        <Text>
                           Amount:{" "}
                           {["buy", "confirmation", "rejection"].includes(
                              message.type
                           ) ? (
                              `$${message.price || "Free"}`
                           ) : [
                                "offer",
                                "offerConfirmation",
                                "offerRejection",
                             ].includes(message.type) ? (
                              <>
                                 <s>${message.price}</s>{" "}
                                 {message.info || "Free"}
                              </>
                           ) : (
                              "Free"
                           )}
                        </Text>

                        {/* Message */}
                        {["buy", "confirmation", "rejection"].includes(
                           message.type
                        ) && <Text pt={5}>Message: {message.info}</Text>}
                        <Box pt={5}>
                           {/* Reply Box if Buy */}
                           {message.type === "buy" && (
                              <Input
                                 variant={"flushed"}
                                 fontSize={16}
                                 placeholder="Reply to this message with contact info"
                                 value={replyText}
                                 onChange={(e) => setReplyText(e.target.value)}
                              />
                           )}
                        </Box>
                        <Box pt={5}>
                           {/* Accept Button if buy */}
                           {message.type === "buy" && (
                              <Button
                                 onClick={() => handleAccept(message)}
                                 bg="#79A88E"
                                 _hover={{ bg: "#A2C0B0" }}
                                 variant="solid"
                                 color="white"
                                 borderRadius={"15px"}
                              >
                                 Accept
                              </Button>
                           )}

                           {/* Accept Button if offer*/}
                           {message.type === "offer" && (
                              <Button
                                 onClick={() =>
                                    handleOfferAccept(message, message.info)
                                 }
                                 bg="#79A88E"
                                 _hover={{ bg: "#A2C0B0" }}
                                 variant="solid"
                                 color="white"
                                 borderRadius={"15px"}
                              >
                                 Accept
                              </Button>
                           )}

                           {/* Reject Button if offer*/}
                           {message.type === "offer" && (
                              <Button
                                 onClick={() =>
                                    handleOfferReject(message, message.info)
                                 }
                                 borderRadius={"15px"}
                              >
                                 Reject
                              </Button>
                           )}

                           {/* Delete Button if confirmation or rejection*/}
                           {(message.type === "confirmation" ||
                              message.type === "rejection" ||
                              message.type === "offerConfirmation" ||
                              message.type === "offerRejection") && (
                              <Button
                                 onClick={() => handleDelete(message)}
                                 bg="#716FE9"
                                 _hover={{ bg: "#A5A4F8" }}
                                 variant="solid"
                                 color="white"
                                 borderRadius={"15px"}
                              >
                                 Delete
                              </Button>
                           )}
                        </Box>

                        {/* Date and time request was sent*/}
                        <Text fontSize={10} pt={2}>
                           Sent {message.createdAt.toDate().toLocaleString()}
                        </Text>
                     </Box>
                  ))}
               </VStack>
            </ModalBody>
         </ModalContent>
      </Modal>
   );
};

export default MessagesModal;
