import { Box, Container, Flex } from "@chakra-ui/react";
import Posts from "../../components/Posts/Posts";

const HomePage = () => {
   return (
      <Container maxW={"100%"} padding={"2%"} height={"100%"} bg={"blue"}>
         <Flex gap={10} border={"2px solid red"}>
            <Box flex={1} bg={"green"} padding={0}>
               <Container maxW={"container.xl"} py={10} px={10} bg={"teal"}>
                  <Posts />
               </Container>
            </Box>
         </Flex>
      </Container>
   );
};

export default HomePage;
