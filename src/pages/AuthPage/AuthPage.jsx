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
               <Flex
                  w={{ base: "100%", md: "50%" }}
                  h={"100%"}
                  justify={{ base: "center", md: "flex-start" }}
               >
                  <Box>
                     <AuthForm />
                  </Box>
               </Flex>
            </Flex>
         </Box>
      </Flex>
   );
};

export default AuthPage;
