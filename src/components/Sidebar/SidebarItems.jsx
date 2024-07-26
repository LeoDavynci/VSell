import React from "react";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import CreatePost from "./CreatePost";
import { Flex, Box, Text } from "@chakra-ui/react";
import Messages from "./Messages";

const SidebarItems = () => {
   return (
      <Flex justifyContent={"space-between"}>
         <Flex>
            <Home />
            {/* <Flex height={"100%"} justify={"center"} align={"center"} px={3}>
               <Box
                  bg={"#716FE9"}
                  height={{ base: "30%", md: "40%" }}
                  align={"center"}
                  justify={"center"}
                  px={2}
                  pb={1}
                  borderRadius={"5px"}
               >
                  <Text fontWeight={700} color={"white"}>
                     Beta
                  </Text>
               </Box>
            </Flex> */}
         </Flex>

         <Flex>
            <Messages />
            <CreatePost />
            <ProfileLink />
         </Flex>
      </Flex>
   );
};

export default SidebarItems;
