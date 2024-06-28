import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

const AuthForm = () => {
   const [isLogin, setIsLogin] = useState(true);

   return (
      <>
         <Box
            border={"1px solid white"}
            padding={8}
            borderRadius="30px"
            color="black"
            bg={"white"}
         >
            <VStack spacing={5} direction="column">
               {/* Swap */}
               <Flex
                  direction="column"
                  textAlign="left"
                  padding={5}
                  border={"1px solid white"}
                  gap={0}
                  paddingTop={0}
               >
                  <Text fontSize="30px" color="Black" textAlign="left" as="b">
                     {isLogin ? "Sign In" : "Sign Up"}
                  </Text>
                  <Flex alignItems={"center"} justifyContent={"center"} gap={1}>
                     <Text mx={2} fontSize={14} textAlign="left">
                        {isLogin
                           ? "Don't have an account?"
                           : "Already have an account?"}
                     </Text>
                     <Text
                        onClick={() => setIsLogin(!isLogin)}
                        color={"black"}
                        cursor={"pointer"}
                        textAlign="left"
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
