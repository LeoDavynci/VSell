import React from "react";
import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";

const CreatePostButton = ({ onOpen }) => {
   return (
      <Flex width={"60px"} height={"60px"} align={"center"} justify={"center"}>
         <Tooltip
            label="Listing"
            aria-label="List an Item"
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
               onClick={onOpen}
               borderRadius={15}
            >
               <IoMdAddCircle color="white" size={30} />
            </Box>
         </Tooltip>
      </Flex>
   );
};

export default CreatePostButton;
