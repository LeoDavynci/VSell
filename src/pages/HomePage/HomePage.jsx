import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import Posts from "../../components/Posts/Posts";

const HomePage = () => {
   return (
      <Box w="100%" minHeight="calc(100vh - 70px)" bg="white" pt={20}>
         <Container maxW="100%" padding="10px">
            <Flex
               gap={10}
               padding="2%"
               maxW="container.3xl"
               justifyContent="center"
            >
               <Box w="full" padding={0} minHeight="fit-content">
                  <Posts />
               </Box>
            </Flex>
         </Container>
      </Box>
   );
};

export default HomePage;
