import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import CreatePost from "./CreatePost";
import { Flex, Box, Input, IconButton, useMediaQuery } from "@chakra-ui/react";
import Messages from "./Messages";
import Search from "./Search";
import { CloseIcon } from "@chakra-ui/icons";
import { SearchContext } from "../../store/searchContext";
import { IoSearchCircle } from "react-icons/io5";

const SidebarItems = () => {
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchInputValue, setSearchInputValue] = useState("");
   const location = useLocation();
   const [isMobile] = useMediaQuery("(max-width: 768px)");
   const { setSearchTerm } = useContext(SearchContext);

   const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
      if (isSearchOpen) {
         clearSearch();
      }
   };

   const clearSearch = () => {
      setSearchInputValue("");
      setSearchTerm("");
      setIsSearchOpen(false);
   };

   const handleSearchChange = (e) => {
      setSearchInputValue(e.target.value);
   };

   const handleSearchSubmit = () => {
      setSearchTerm(searchInputValue);
   };

   return (
      <Flex
         justifyContent={"space-between"}
         flexDirection={isSearchOpen ? "column" : "row"}
         height={isSearchOpen ? "70px" : "70px"}
      >
         {!isSearchOpen && (
            <Flex justifyContent="center" alignItems="center" pl={3}>
               <Home />
            </Flex>
         )}

         {isSearchOpen ? (
            <Flex
               width="100%"
               height="100%"
               padding={2}
               alignItems="center"
               justifyContent="center"
               gap={2}
            >
               <IconButton
                  bg={"none"}
                  icon={<CloseIcon color={"white"} />}
                  onClick={clearSearch}
                  h={"50px"}
                  w={"50px"}
                  rounded={12}
               />
               <Input
                  rounded={12}
                  placeholder="Search for items..."
                  flex={1}
                  bg={"#719C83"}
                  border={"none"}
                  color={"white"}
                  h={"50px"}
                  value={searchInputValue}
                  onChange={handleSearchChange}
               />
               <IconButton
                  bg={"#719C83"}
                  icon={<IoSearchCircle color="white" size={35} />}
                  onClick={handleSearchSubmit}
                  h={"50px"}
                  w={"50px"}
                  rounded={12}
                  _hover={{ bg: "#5C7F6C" }}
               />
            </Flex>
         ) : (
            <Flex
               w={isMobile ? "100%" : "auto"}
               paddingX={2}
               justifyContent="end"
               alignItems="center"
            >
               {location.pathname === "/" && (
                  <Box onClick={toggleSearch}>
                     <Search />
                  </Box>
               )}
               <Messages />
               <CreatePost />
               <ProfileLink />
            </Flex>
         )}
      </Flex>
   );
};

export default SidebarItems;
