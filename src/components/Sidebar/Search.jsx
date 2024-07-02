import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { MdSearch } from "react-icons/md";

const Search = () => {
   return (
      <Flex width={"70px"} height={"70px"} align={"center"} justify={"center"}>
         <Box
            width={"50px"}
            height={"50px"}
            borderRadius={"50%"}
            bg={"white"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
         >
            <MdSearch color="black" size={40} />
         </Box>
      </Flex>
   );
};

export default Search;
