import React from "react";
import Home from "./Home";
import Search from "./Search";
import ProfileLink from "./ProfileLink";
import CreatePost from "./CreatePost";
import { Flex } from "@chakra-ui/react";

const SidebarItems = () => {
   return (
      <Flex justifyContent={"space-between"} px={3}>
         <Flex>
            <Home />
         </Flex>

         <Flex>
            <Search />
            <CreatePost />
            <ProfileLink />
         </Flex>
      </Flex>
   );
};

export default SidebarItems;
