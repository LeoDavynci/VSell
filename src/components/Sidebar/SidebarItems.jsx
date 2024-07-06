import React from "react";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import CreatePost from "./CreatePost";
import { Flex } from "@chakra-ui/react";
import Messages from "./Messages";

const SidebarItems = () => {
   return (
      <Flex justifyContent={"space-between"} px={3}>
         <Flex>
            <Home />
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
