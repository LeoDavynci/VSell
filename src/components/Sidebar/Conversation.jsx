import React from "react";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const Conversation = ({ conversation, authUserId, isSelected, onClick }) => {
   const otherUserId = conversation.participants.find(
      (id) => id !== authUserId
   );
   const { userProfile } = useGetUserProfileById(otherUserId);

   return (
      <Box
         p={3}
         borderRadius={{ base: "20px", md: "30px" }}
         bg={isSelected ? "#A2C0B0" : "#EBEBEB"}
         onClick={onClick}
         cursor="pointer"
      >
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

         <Text>{conversation.lastMessage?.content || "No messages yet"}</Text>
      </Box>
   );
};

export default Conversation;
