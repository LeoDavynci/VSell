import {
   Alert,
   AlertIcon,
   Box,
   Button,
   Flex,
   Input,
   InputGroup,
   InputRightElement,
   Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { useNavigate } from "react-router-dom";

const Signup = () => {
   const navigate = useNavigate();
   const [show, setShow] = React.useState(false);
   const handleClick = () => setShow(!show);
   const [inputs, setInputs] = useState({
      fullName: "",
      username: "",
      email: "",
      password: "",
   });

   const handleSignup = async () => {
      await signup(inputs);
      // Clear the form after signup
      setInputs({
         fullName: "",
         username: "",
         email: "",
         password: "",
      });
      navigate("/auth");
   };

   const { loading, error, signup } = useSignUpWithEmailAndPassword();

   const weakPassword = error?.message?.includes("weak-password");
   const existingEmail = error?.message?.includes("email-already-in-use");

   return (
      <>
         {/* Name */}
         <Input
            placeholder="Name"
            fontSize={14}
            type="text"
            borderColor="black"
            borderWidth="2px"
            borderRadius="10px"
            bg="white"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
         />

         {/* Username */}
         <Input
            placeholder="Username"
            fontSize={14}
            type="text"
            borderColor="black"
            borderWidth="2px"
            borderRadius="10px"
            bg="white"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
         />

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
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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

         {error && (
            <Alert
               status="error"
               fontSize={13}
               p={2}
               borderRadius={4}
               style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
            >
               <AlertIcon fontSize={12} />
               {error.message}
            </Alert>
         )}

         {weakPassword && (
            <Flex
               w={"full"}
               h={"full"}
               mt={2}
               justifyContent={"center"}
               alignItems={"center"}
            >
               <Box bg={"#fed7d7"} borderRadius="10px" pb={2} px={2}>
                  <Text fontSize={18} color="red.500" mt={2}>
                     Password should be at least 6 characters.
                  </Text>
               </Box>
            </Flex>
         )}

         {existingEmail && (
            <Flex
               w={"full"}
               h={"full"}
               mt={2}
               justifyContent={"center"}
               alignItems={"center"}
            >
               <Box bg={"#fed7d7"} borderRadius="10px" pb={2} px={2}>
                  <Text fontSize={18} color="red.500" mt={2}>
                     Email already in use.
                  </Text>
               </Box>
            </Flex>
         )}

         {/* Sign Up Button */}
         <Button
            w={"full"}
            h={"2.25rem"}
            color="white"
            bg="black"
            size={"sm"}
            fontSize={14}
            borderRadius="10px"
            isLoading={loading}
            onClick={handleSignup}
         >
            Sign Up
         </Button>

         {!error && (
            <Alert
               status="info"
               fontSize={13}
               p={2}
               borderRadius={10}
               w={"280px"}
               bg={"#79A88E"}
               color={"white"}
               style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
            >
               <AlertIcon fontSize={12} color={"white"} />
               After sign up, please check your email to verify your account
            </Alert>
         )}
      </>
   );
};

export default Signup;
