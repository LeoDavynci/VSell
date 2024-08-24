import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

const AuthForm = ({ initialIsLogin = true }) => {
   const [isLogin, setIsLogin] = useState(initialIsLogin);

   return (
      <>
         <Box
            border={"1px solid white"}
            padding={8}
            borderRadius="20px"
            color="black"
            bg={"white"}
         >
            <VStack spacing={5} direction="column">
               {/* Swap */}
               <Flex direction="column" textAlign="left" w={"100%"} gap={1}>
                  <Text
                     fontSize="30px"
                     color="Black"
                     textAlign="left"
                     as="b"
                     fontWeight={500}
                  >
                     {isLogin ? "Log In" : "Sign Up"}
                  </Text>
                  <Flex width={"100%"} gap={1}>
                     <Text fontSize={14} textAlign="left" fontWeight={300}>
                        {isLogin
                           ? "Don't have an account?"
                           : "Already have an account?"}
                     </Text>
                     <Text
                        onClick={() => setIsLogin(!isLogin)}
                        color={"black"}
                        cursor={"pointer"}
                        fontSize={14}
                        fontWeight={500}
                        textDecor={"underline"}
                     >
                        {isLogin ? "Sign up" : "Log in"}
                     </Text>
                  </Flex>
               </Flex>

               {isLogin ? <Login /> : <Signup />}
            </VStack>
         </Box>
      </>
   );
};

export default AuthForm;
