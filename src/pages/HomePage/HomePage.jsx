import { Box, Container, Flex } from "@chakra-ui/react";
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
               <Posts />
            </Box>
         </Flex>
      </Container>
   );
};

export default HomePage;
