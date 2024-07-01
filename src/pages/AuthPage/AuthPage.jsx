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
         <Box w={{ base: "100%", md: "70%" }}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={100}>
               <Flex
                  display={{ base: "none", md: "flex" }}
                  flexDir={"column"}
                  gap={5}
                  alignItems="center"
               >
                  <Box
                     display={"flex"}
                     justifyContent="center"
                     alignItems="center"
                  >
                     <Text fontSize="90" color="White" as="b" align={"center"}>
                        VSELL
                     </Text>
                  </Box>
                  <Box w={"360px"} right={"10px"} ml={4}>
                     <Img src={"/GivingW.png"} />
                  </Box>
               </Flex>

               <VStack spacing={4} align={"stretch"}>
                  <AuthForm />
               </VStack>
            </Flex>
         </Box>
      </Flex>
   );
};

export default AuthPage;
