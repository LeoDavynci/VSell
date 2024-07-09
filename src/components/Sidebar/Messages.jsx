import { Box, Flex, useDisclosure, Badge } from "@chakra-ui/react";
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
            width={"70px"}
            height={"70px"}
            align={"center"}
            justify={"center"}
            position="relative"
         >
            <Box
               width={"50px"}
               height={"50px"}
               borderRadius={"50%"}
               bg={"none"}
               display={"flex"}
               alignItems={"center"}
               justifyContent={"center"}
               cursor="pointer"
               onClick={onOpen}
            >
               <IoChatboxEllipses color="white" size={30} />
            </Box>
            {unreadCount > 0 && (
               <Badge
                  colorScheme="red"
                  position="absolute"
                  top="9"
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
