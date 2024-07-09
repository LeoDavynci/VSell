import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Posts from "../../components/Posts/Posts";

const HomePage = () => {
   return (
      <Container
         maxW={"100%"}
         padding={"10px"}
         minHeight={"100vh"}
         bg={"white"}
      >
         <Flex
            flexDir={{ base: "column", md: "row" }}
            p={"10px"}
            w={{ base: "100%", md: "50%" }}
            bg={"#79A88E"}
            borderRadius={20}
            fontWeight={700}
            gap={3}
         >
            <Box borderRadius={10} bg={"#A2C0B0"} p={"10px"}>
               {" "}
               Announcment: buying and selling will just add and remove posts
               from the homepage. You will NOT USE REAL MONEY to purchase items
            </Box>
            <Box borderRadius={10} bg={"#A2C0B0"} p={"10px"}>
               {" "}
               Latest Updates: added location suggestion and item quality
            </Box>
         </Flex>

         <Flex
            gap={10}
            padding={"2%"}
            maxW={"container.3xl"}
            justifyContent={"center"}
         >
            <Box w="full" padding={0} minHeight={"fit-content"}>
               <Posts />
            </Box>
         </Flex>
      </Container>
   );
};

export default HomePage;
