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
         bg={theme.colors.primary[100]}
      >
         <Box w={{ base: "100%", md: "90%" }}>
            <Flex alignItems={"center"} gap={50}>
               <Flex
                  display={{ base: "none", md: "flex" }}
                  flexDir={"column"}
                  gap={5}
                  alignItems="end"
                  w={"50%"}
               >
                  <Box>
                     <Box
                        display={"flex"}
                        justifyContent="center"
                        alignItems="center"
                     >
                        <Text
                           fontSize="90"
                           color="White"
                           as="b"
                           align={"center"}
                        >
                           VSELL
                        </Text>
                     </Box>
                     <Box w={"360px"} right={"10px"} ml={4}>
                        <Img src={"/GivingW.png"} />
                     </Box>
                  </Box>
               </Flex>

               <VStack align={"stretch"} bg={"blue"} h={"100%"}>
                  <AuthForm />
               </VStack>
            </Flex>
         </Box>
      </Flex>
   );
};

export default AuthPage;
