import { Box, Container, Flex } from "@chakra-ui/react";
import Posts from "../../components/Posts/Posts";

const HomePage = () => {
   return (
      <Container maxW={"100%"} padding={"10px"} height={"100%"} bg={"blue"}>
         <Flex
            gap={10}
            border={"2px solid red"}
            padding={"2%"}
            maxW={"container.2xl"}
            justifyContent={"center"}
         >
            <Box flex={1} bg={"green"} padding={0} justifyContent={"center"}>
               <Posts />
            </Box>
         </Flex>
      </Container>
   );
};

export default HomePage;
