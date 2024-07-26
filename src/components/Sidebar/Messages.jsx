import { Box, Flex, useDisclosure, Badge, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import MessagesModal from "./MessagesModal";
import {
   getFirestore,
   collection,
   query,
   where,
   onSnapshot,
} from "firebase/firestore";
import useAuthStore from "../../store/authStore";

const Messages = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [unreadCount, setUnreadCount] = useState(0);
   const authUser = useAuthStore((state) => state.user);
   const db = getFirestore();

   useEffect(() => {
      if (!authUser) return;

      const q = query(
         collection(db, "messages"),
         where("receiverId", "==", authUser.uid),
         where("status", "==", "unread")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         setUnreadCount(querySnapshot.size);
      });

      return () => unsubscribe();
   }, [authUser]);

   return (
      <>
         <Flex
            width={"60px"}
            height={"60px"}
            align={"center"}
            justify={"center"}
            position="relative"
         >
            <Tooltip
               label="Messages"
               aria-label="Messages"
               hasArrow
               bg="#79A88E"
               color="white"
               fontWeight="medium"
               fontSize="sm"
               padding="4px 8px"
               borderRadius="lg"
               boxShadow="md"
            >
               <Box
                  width={"50px"}
                  height={"50px"}
                  borderRadius={15}
                  bg={"#719C83"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  cursor="pointer"
                  onClick={onOpen}
                  transition="background-color 0.2s"
                  _hover={{ bg: "#5E8069" }}
                  _active={{ bg: "#4B664F" }}
               >
                  <IoChatboxEllipses color="white" size={30} />
               </Box>
            </Tooltip>
            {unreadCount > 0 && (
               <Badge
                  colorScheme="red"
                  position="absolute"
                  top="8"
                  right="3"
                  borderRadius="full"
               >
                  {unreadCount}
               </Badge>
            )}
         </Flex>

         <MessagesModal isOpen={isOpen} onClose={onClose} />
      </>
   );
};

export default Messages;
