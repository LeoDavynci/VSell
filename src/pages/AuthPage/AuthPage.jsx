import {
   Box,
   Container,
   Flex,
   VStack,
   Text,
   useTheme,
   Img,
} from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
   const theme = useTheme();
   return (
      <Flex
         minH={"100vh"}
         justifyContent={"center"}
         alignItems={"center"}
         px={4}
         bg={theme.colors.primary[100]}
      >
         <Container maxW={"100%"} bg={"lime"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
               <Flex
                  display={{ base: "none", md: "block" }}
                  bg={"salmon"}
                  h={"100%"}
               >
                  <Box bg={"blue"} gap={20}>
                     <Text fontSize="5xl" color="White" as="b">
                        VSELL
                     </Text>
                  </Box>
                  <Box boxSize={"350px"} bg={"red"}>
                     <Img src={"/GivingW.png"} />
                  </Box>
               </Flex>

               <VStack spacing={4} align={"stretch"}>
                  <AuthForm />
               </VStack>
            </Flex>
         </Container>
      </Flex>
   );
};

export default AuthPage;
