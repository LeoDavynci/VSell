import React, { useState, useEffect, useRef } from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalCloseButton,
   Button,
   VStack,
   Text,
   Box,
   Input,
   Flex,
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
   arrayUnion,
   serverTimestamp,
   deleteDoc,
   arrayRemove,
   getDoc,
} from "firebase/firestore";
import useAuthStore from "../../store/authStore";
import Conversation from "./Conversation";
import ChatHeader from "./ChatHeader";
import { IoCloseSharp } from "react-icons/io5";
import useShowToast from "../../hooks/useShowToast";

const MessagesModal = ({ isOpen, onClose }) => {
   const [conversations, setConversations] = useState([]);
   const [selectedConversation, setSelectedConversation] = useState(null);
   const [messageText, setMessageText] = useState("");
   const authUser = useAuthStore((state) => state.user);
   const db = getFirestore();
   const showToast = useShowToast();
   const messagesEndRef = useRef(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   const markMessagesAsRead = async (conversationId) => {
      if (!conversationId) return;

      try {
         const conversationRef = doc(db, "conversations", conversationId);
         const conversationSnap = await getDoc(conversationRef);

         if (conversationSnap.exists()) {
            const conversationData = conversationSnap.data();
            const updatedMessages = conversationData.messages.map((message) => {
               if (message.senderId !== authUser.uid && !message.read) {
                  return { ...message, read: true };
               }
               return message;
            });

            await updateDoc(conversationRef, { messages: updatedMessages });
         }
      } catch (error) {
         console.error("Error marking messages as read:", error);
      }
   };

   useEffect(() => {
      if (isOpen && selectedConversation) {
         markMessagesAsRead(selectedConversation.id);
         scrollToBottom();
      }
   }, [isOpen, selectedConversation]);

   useEffect(() => {
      if (!authUser) return;

      const q = query(
         collection(db, "conversations"),
         where("participants", "array-contains", authUser.uid),
         orderBy("lastMessageTimestamp", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         const conversationsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setConversations(conversationsArray);

         // Update selected conversation if it exists in the new data
         if (selectedConversation) {
            const updatedSelectedConversation = conversationsArray.find(
               (conv) => conv.id === selectedConversation.id
            );
            if (updatedSelectedConversation) {
               setSelectedConversation(updatedSelectedConversation);
            }
         }
      });

      return () => unsubscribe();
   }, [authUser, db]);

   useEffect(() => {
      if (!selectedConversation) return;

      const conversationRef = doc(db, "conversations", selectedConversation.id);
      const unsubscribe = onSnapshot(conversationRef, (doc) => {
         if (doc.exists()) {
            setSelectedConversation({ id: doc.id, ...doc.data() });
            scrollToBottom();
         }
      });

      return () => unsubscribe();
   }, [selectedConversation?.id, db]);

   const sendMessage = async (type, content) => {
      if (!selectedConversation) return;

      try {
         console.log("Sending message:", { type, content });

         const conversationRef = doc(
            db,
            "conversations",
            selectedConversation.id
         );

         const newMessage = {
            senderId: authUser.uid,
            type: type,
            content: content,
            timestamp: new Date().toISOString(), // Use a string timestamp for the array
            read: false,
         };

         // Update Firestore
         await updateDoc(conversationRef, {
            messages: arrayUnion(newMessage),
            lastMessage: {
               type: type,
               content: getMessageSummary(type, content),
            },
         });

         await updateDoc(conversationRef, {
            lastMessageTimestamp: serverTimestamp(),
         });

         setMessageText("");
         scrollToBottom();
      } catch (error) {
         console.error("Error sending message:", error);
      }
   };

   const getMessageSummary = (type, content) => {
      switch (type) {
         case "TEXT":
            return typeof content === "string"
               ? content.length > 50
                  ? content.substring(0, 47) + "..."
                  : content
               : JSON.stringify(content);
         case "BUY_REQUEST":
            return `Buy request: $${content.price || "0"}`;
         case "OFFER_REQUEST":
            return `Offer: $${content.price || "0"}`;
         case "BUY_ACCEPT":
            return "Offer accepted";
         case "BUY_REJECT":
            return "Offer rejected";
         default:
            return "New message";
      }
   };

   const handleAccept = async (message) => {
      try {
         // Check if the post still exists
         const postRef = doc(db, "posts", message.content.itemId);
         const postSnap = await getDoc(postRef);

         if (!postSnap.exists()) {
            showToast("Error", "You have already sold this item!", "error");
            return;
         }

         // Remove the post from the database
         await deleteDoc(postRef);

         // Update the user's posts array
         const userRef = doc(db, "users", authUser.uid);
         await updateDoc(userRef, {
            posts: arrayRemove(message.content.itemId),
         });

         await sendMessage(
            "TEXT",
            "✅ Buy request accepted for " + message.content.itemName
         );
         await sendMessage("RATE_SELLER", "Rate the seller for this item");
         await sendMessage("RATE_BUYER", "Rate the buyer for this item");

         showToast("Success", "Item sold successfully!", "success");
      } catch (error) {
         // console.error("Error in handleAccept:", error);
         showToast(
            "Error",
            "An unexpected error occurred. Please try again.",
            "error"
         );
      }
   };

   const closeMessage = () => {
      setSelectedConversation(null);
   };

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         size={{ base: "sm", md: "3xl", lg: "6xl" }}
      >
         <ModalOverlay />
         <ModalContent borderRadius={{ base: "15px", md: "25px" }} mt={"70px"}>
            <ModalHeader>Your Messages</ModalHeader>
            <ModalCloseButton />
            <ModalBody px={"10px"} pb={"10px"}>
               <Flex flexDir={"column"} w={"full"} gap={3}>
                  {/* Selected conversation */}
                  <Box width="full" bg={"#EBEBEB"} rounded={"xl"}>
                     {selectedConversation ? (
                        <>
                           <Flex>
                              <ChatHeader
                                 conversation={selectedConversation}
                                 authUserId={authUser.uid}
                              />
                              <Button
                                 position={"absolute"}
                                 right={5}
                                 top={20}
                                 bg={"none"}
                                 _hover={{ bg: "none" }}
                                 _active={{ bg: "none" }}
                                 onClick={closeMessage}
                              >
                                 <IoCloseSharp size={30} />
                              </Button>
                           </Flex>
                           <VStack
                              spacing={2}
                              align="stretch"
                              maxHeight="400px"
                              overflowY="auto"
                              p={2}
                           >
                              {selectedConversation.messages?.map(
                                 (message, index) => (
                                    <Box
                                       key={index}
                                       p={2}
                                       bg={
                                          message.senderId === authUser.uid
                                             ? "#A2C0B0"
                                             : "#F5F5F5"
                                       }
                                       borderRadius="lg"
                                       alignSelf={
                                          message.senderId === authUser.uid
                                             ? "flex-end"
                                             : "flex-start"
                                       }
                                    >
                                       {/* Text message */}
                                       {message.type === "TEXT" && (
                                          <Box>
                                             <Text>{message.content}</Text>
                                          </Box>
                                       )}

                                       {/* Offer request message */}
                                       {message.type === "OFFER_REQUEST" && (
                                          <Box>
                                             <Box
                                                p={2}
                                                bg={"#A2C0B0"}
                                                rounded={"sm"}
                                             >
                                                <Text fontWeight="bold">
                                                   Offer
                                                </Text>
                                                <img
                                                   src={message.content.itemPic}
                                                   width="150px"
                                                   height="150px"
                                                />
                                                <Text>
                                                   {message.content.itemName}
                                                </Text>
                                                <Text>
                                                   Offer Price: $
                                                   {message.content
                                                      .offerPrice || "0"}
                                                </Text>
                                                <Text>
                                                   Original Price:
                                                   {message.content
                                                      .currentPrice || "0"}
                                                </Text>
                                             </Box>
                                          </Box>
                                       )}

                                       {/* Buy request message */}
                                       {message.type === "BUY_REQUEST" && (
                                          <Box>
                                             <Box
                                                p={2}
                                                bg={"#A2C0B0"}
                                                rounded={"sm"}
                                             >
                                                <Text fontWeight="bold">
                                                   Buying
                                                </Text>
                                                <img
                                                   src={message.content.itemPic}
                                                   width="150px"
                                                   height="150px"
                                                />

                                                <Text>
                                                   {message.content.itemName}
                                                </Text>
                                                <Text>
                                                   Price: $
                                                   {message.content
                                                      .currentPrice || "0"}
                                                </Text>

                                                {message.senderId !==
                                                   authUser.uid && (
                                                   <Flex
                                                      w={"full"}
                                                      flexDir={"row"}
                                                      justify={"center"}
                                                   >
                                                      <Button
                                                         size="sm"
                                                         bg={"#79A88E"}
                                                         _hover={{
                                                            bg: "#5C7F6C",
                                                         }}
                                                         color={"white"}
                                                         onClick={() =>
                                                            handleAccept(
                                                               message
                                                            )
                                                         }
                                                         mt={2}
                                                      >
                                                         Accept
                                                      </Button>
                                                   </Flex>
                                                )}
                                             </Box>
                                             <Text mt={2}>
                                                {message.content.info}
                                             </Text>
                                          </Box>
                                       )}

                                       {/* Seller rating message */}
                                       {message.type === "RATE_SELLER" &&
                                          authUser.uid !== message.senderId && (
                                             <Box>
                                                <Box
                                                   p={2}
                                                   bg={"#A2C0B0"}
                                                   rounded={"sm"}
                                                >
                                                   <Text fontWeight="bold">
                                                      Rate the seller
                                                   </Text>
                                                   <Box></Box>
                                                </Box>
                                             </Box>
                                          )}

                                       {/* Buyer rating message */}
                                       {message.type === "RATE_BUYER" &&
                                          authUser.uid !== message.senderId && (
                                             <Box>
                                                <Box
                                                   p={2}
                                                   bg={"#A2C0B0"}
                                                   rounded={"sm"}
                                                >
                                                   <Text fontWeight="bold">
                                                      Rate the buyer
                                                   </Text>
                                                   <Box></Box>
                                                </Box>
                                             </Box>
                                          )}
                                    </Box>
                                 )
                              )}
                              <div ref={messagesEndRef} />
                           </VStack>

                           {/* Message input */}
                           <Flex mt={4} p={2}>
                              <Input
                                 value={messageText}
                                 onChange={(e) =>
                                    setMessageText(e.target.value)
                                 }
                                 onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                       e.preventDefault();
                                       sendMessage("TEXT", messageText);
                                    }
                                 }}
                                 placeholder="Type a message..."
                                 mr={2}
                                 borderRadius={2}
                                 borderColor={"black"}
                                 rounded={"md"}
                              />
                              <Button
                                 onClick={() =>
                                    sendMessage("TEXT", messageText)
                                 }
                                 bg={"#79A88E"}
                                 _hover={{ bg: "#6A937C" }}
                                 _active={{ bg: "#6A937C" }}
                                 color={"white"}
                              >
                                 Send
                              </Button>
                           </Flex>
                        </>
                     ) : (
                        <Text></Text>
                     )}
                  </Box>

                  <Flex
                     w={"full"}
                     h={"4px"}
                     align={"center"}
                     justify={"center"}
                  >
                     <Box
                        w={"98%"}
                        h={"4px"}
                        bg={"#EBEBEB"}
                        rounded={"full"}
                     ></Box>
                  </Flex>
                  {/* All conversations */}
                  <VStack spacing={4} align="stretch" width="full">
                     {conversations.map((conversation) => (
                        <Conversation
                           key={conversation.id}
                           conversation={conversation}
                           authUserId={authUser.uid}
                           isSelected={
                              selectedConversation?.id === conversation.id
                           }
                           onClick={() => setSelectedConversation(conversation)}
                        />
                     ))}
                  </VStack>
               </Flex>
            </ModalBody>
         </ModalContent>
      </Modal>
   );
};

export default MessagesModal;
