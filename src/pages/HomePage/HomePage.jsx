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
            gap={10}
            border={"0px solid red"}
            padding={"2%"}
            maxW={"container.2xl"}
            justifyContent={"center"}
         >
            <Box w="full" padding={0} minHeight={"fit-content"}>
               <Box p={"15px"}>
                  <Text fontWeight={800}>
                     {" "}
                     Announcment: currently buying and selling will just add and
                     remove posts from the homepage. You will NOT USE REAL MONEY
                     to pruchase items. It's currently just a way to list things
                     you are wanting to sell. Try posting something and try
                     selling something by taking a photo of anything.
                  </Text>
               </Box>
               <Posts />
            </Box>
         </Flex>
      </Container>
   );
};

export default HomePage;
