import React from "react";
import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { IoSearchCircle } from "react-icons/io5";

const Search = () => {
   return (
      <Flex width={"60px"} height={"60px"} align={"center"} justify={"center"}>
         <Tooltip
            label="Search"
            aria-label="Search an Item"
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
               bg={"#719C83"}
               display={"flex"}
               alignItems={"center"}
               justifyContent={"center"}
               cursor="pointer"
               borderRadius={15}
            >
               <IoSearchCircle color="white" size={35} />
            </Box>
         </Tooltip>
      </Flex>
   );
};

export default Search;
