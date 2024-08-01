import { Box, Flex, Text, useTheme, Img } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
   const theme = useTheme();
   return (
      <Flex
         minH={"100vh"}
         minW={"100vw"}
         justify={"center"}
         align={"center"}
         bg={theme.colors.primary[100]}
      >
         <Box w={{ base: "100%", md: "85%" }} h={{ base: "90%", md: "80%" }}>
            <Flex
               align={"center"}
               justify={"center"}
               gap={{ base: "0px", md: "20px" }}
            >
               <Flex
                  display={{ base: "none", md: "flex" }}
                  flexDir={"column"}
                  alignItems="end"
                  w={"50%"}
                  h={"200px"}
               >
                  <Box>
                     <Box w={"360px"} right={"10px"} ml={4} top={"30px"}>
                        <Img src={"/GivingW.png"} />
                     </Box>
                  </Box>
               </Flex>
               <Flex
                  w={{ base: "100%", md: "50%" }}
                  h={"100%"}
                  justify={{ base: "center", md: "flex-start" }}
               >
                  <Flex
                     flexDir={"column"}
                     alignContent={"center"}
                     justifyContent={"center"}
                  >
                     <Text
                        fontSize="80"
                        as="b"
                        align={"center"}
                        color={"white"}
                        justify={"center"}
                        centerContent
                     >
                        VSELL
                     </Text>
                     <AuthForm />
                  </Flex>
               </Flex>
            </Flex>
         </Box>
      </Flex>
   );
};

export default AuthPage;
