import React from "react";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const ChatHeader = ({ conversation, authUserId }) => {
   const otherUserId = conversation.participants.find(
      (id) => id !== authUserId
   );
   const { userProfile } = useGetUserProfileById(otherUserId);

   return (
      <Box p={2} borderRadius={"xl"} bg={"#A2C0B0"} w={"full"}>
         <Flex flexDir={"row"} align={"center"} justify={"end"} gap={2}>
            <Flex
               flexDir={"row"}
               align={"center"}
               justify={"center"}
               gap={1}
               w={"min-content"}
               bg={"#6A937C"}
               borderRadius={"lg"}
               p={2}
            >
               <Avatar
                  size="xs"
                  src={userProfile?.profilePicURL}
                  name={userProfile?.fullName || "Unknown User"}
               />
               <Text fontWeight="bold" w={"max-content"}>
                  {userProfile ? userProfile.fullName : "Loading..."}
               </Text>
            </Flex>
         </Flex>
      </Box>
   );
};

export default ChatHeader;
