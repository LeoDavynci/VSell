import {
   Box,
   Button,
   Flex,
   Input,
   InputGroup,
   InputRightElement,
   VStack,
   Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
   const [isLogin, setIsLogin] = useState(true);
   const [show, setShow] = React.useState(false);
   const handleClick = () => setShow(!show);

   const navigate = useNavigate();
   const [inputs, setInputs] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });
   const handleAuth = () => {
      if (!inputs.email || !inputs.password) {
         alert("Please fill all the forms");
         return;
      }
      navigate("/");
   };

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

               {/* Name */}
               {!isLogin ? (
                  <Input
                     placeholder="Name"
                     fontSize={14}
                     type="username"
                     borderColor="black"
                     borderWidth="2px"
                     borderRadius="10px"
                     bg="white"
                     value={inputs.name}
                     onChange={(e) =>
                        setInputs({ ...inputs, name: e.target.value })
                     }
                  />
               ) : null}

               {/* Email */}

               <Input
                  placeholder="Email"
                  fontSize={14}
                  type="email"
                  borderColor="black"
                  borderWidth="2px"
                  borderRadius="10px"
                  bg="white"
                  value={inputs.email}
                  onChange={(e) =>
                     setInputs({ ...inputs, email: e.target.value })
                  }
               />

               {/* Password */}
               <InputGroup>
                  <Input
                     pr="4.5rem"
                     type={show ? "text" : "password"}
                     placeholder="Password"
                     borderColor="black"
                     borderWidth="2px"
                     borderRadius="10px"
                     bg="white"
                     fontSize={14}
                     value={inputs.password}
                     onChange={(e) =>
                        setInputs({
                           ...inputs,
                           password: e.target.value,
                        })
                     }
                  />
                  <InputRightElement width="4.5rem">
                     <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                        colorScheme="blackAlpha"
                     >
                        {show ? "Hide" : "Show"}
                     </Button>
                  </InputRightElement>
               </InputGroup>

               {/* Confirm Password */}
               {!isLogin ? (
                  <InputGroup>
                     <Input
                        pr="4.5rem"
                        type={show ? "text" : "Confirm Password"}
                        placeholder="Confirm Password"
                        borderColor="black"
                        borderWidth="2px"
                        borderRadius="10px"
                        bg="white"
                        fontSize={14}
                        value={inputs.confirmPassword}
                        onChange={(e) =>
                           setInputs({
                              ...inputs,
                              confirmPassword: e.target.value,
                           })
                        }
                     />
                     <InputRightElement width="4.5rem">
                        <Button
                           h="1.75rem"
                           size="sm"
                           onClick={handleClick}
                           colorScheme="blackAlpha"
                           color="white"
                        >
                           {show ? "Hide" : "Show"}
                        </Button>
                     </InputRightElement>
                  </InputGroup>
               ) : null}

               {/* Log in/out button */}
               <Button
                  w={"full"}
                  color="white"
                  bg="black"
                  colorScheme="black"
                  size={"sm"}
                  fontSize={14}
                  borderRadius="10px"
                  onClick={handleAuth}
               >
                  {isLogin ? "Log in" : "Sign Up"}
               </Button>
            </VStack>
         </Box>
      </>
   );
};

export default AuthForm;
