import { Box, Container, Flex, VStack, Text } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
   return (
      <Flex
         minH={"100vh"}
         justifyContent={"center"}
         alignItems={"center"}
         px={4}
         bg={"linear-gradient(to right, #5E2BFF, #FC6DAB)"}
      >
         <Container maxW={"xlcontainer.md"} padding={0}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={20}>
               <Box display={{ base: "none", md: "block" }}>
                  <Box>
                     <Text fontSize="5xl" color="White" as="b">
                        SELLING.
                     </Text>
                  </Box>
                  <Box>
                     <Text fontSize="5xl" color="White" as="b">
                        BETTER.
                     </Text>
                  </Box>
               </Box>

               <VStack spacing={4} align={"stretch"}>
                  <AuthForm />
               </VStack>
            </Flex>
         </Container>
      </Flex>
   );
};

export default AuthPage;
