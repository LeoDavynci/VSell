import { Box, Flex, Image, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
   return (
      <Flex
         width={{ base: "70px", md: "140px" }}
         height={"50px"}
         align={"center"}
         justify={"center"}
         pl={2}
      >
         <Link to={"/"} as={RouterLink} cursor="pointer">
            <Box>
               <Image src="/VSELL.png" size={40} />
            </Box>
         </Link>
      </Flex>
   );
};

export default Home;
