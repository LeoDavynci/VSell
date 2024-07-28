import React from "react";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const ChatHeader = ({ conversation, authUserId }) => {
   const otherUserId = conversation.participants.find(
      (id) => id !== authUserId
   );
   const { userProfile } = useGetUserProfileById(otherUserId);

   return (
      <Box p={3} borderRadius={"xl"} bg={"#A2C0B0"} w={"full"}>
         <Flex flexDir={"row"} align={"center"} gap={2}>
            <Avatar
               size="sm"
               src={userProfile?.profilePicURL}
               name={userProfile?.fullName || "Unknown User"}
            />
            <Text fontWeight="bold">
               {userProfile ? userProfile.fullName : "Loading..."}
            </Text>
         </Flex>
      </Box>
   );
};

export default ChatHeader;
