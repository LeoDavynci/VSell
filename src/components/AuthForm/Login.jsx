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
import React, { useEffect, useState } from "react";
import useLogin from "../../hooks/useLogin";
import useAuthStore from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
   const [show, setShow] = React.useState(false);
   const authUser = useAuthStore((state) => state.user);
   const handleClick = () => setShow(!show);

   const [inputs, setInputs] = useState({
      email: "",
      password: "",
   });
   const { loading, error, login } = useLogin();
   const isEmailUnverified = error?.message?.includes("verify your email");
   const invalidEmail = error?.message?.includes("invalid-email");
   const invalidPassword = error?.message?.includes("invalid-credential");
   const navigate = useNavigate();

   useEffect(() => {
      if (authUser) {
         navigate("/");
      }
   }, [authUser, navigate]);

   const handleLogin = async () => {
      await login(inputs);
   };

   const redirectToHome = () => {
      navigate("/");
   };

   return (
      <>
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
         <Box w={"full"} mt={-5}>
            <Link
               to="/forgot-password"
               style={{ color: "black", fontSize: "14px" }}
            >
               <Text textAlign="left" position={"relative"} top={0} right={0}>
                  Forgot Password?
               </Text>
            </Link>
         </Box>

         {/* {error && (
            <Alert status="error" fontSize={13} p={2} borderRadius={4}>
               <AlertIcon fontSize={12} />
               {error.message}
            </Alert>
         )} */}

         {invalidEmail && (
            <Flex
               w={"full"}
               h={"full"}
               mt={2}
               justifyContent={"center"}
               alignItems={"center"}
            >
               <Box bg={"#fed7d7"} borderRadius="10px" pb={2} px={2}>
                  <Text fontSize={18} color="red.500" mt={2}>
                     Invalid email.
                  </Text>
               </Box>
            </Flex>
         )}
         {invalidPassword && (
            <Flex
               w={"full"}
               h={"full"}
               mt={2}
               justifyContent={"center"}
               alignItems={"center"}
            >
               <Box bg={"#fed7d7"} borderRadius="10px" pb={2} px={2}>
                  <Text fontSize={18} color="red.500" mt={2}>
                     Invalid password.
                  </Text>
               </Box>
            </Flex>
         )}

         {isEmailUnverified && (
            <Flex
               w={"full"}
               h={"full"}
               mt={2}
               justifyContent={"center"}
               alignItems={"center"}
            >
               <Box bg={"#fed7d7"} borderRadius="10px" pb={2} px={2}>
                  <Text fontSize={18} color="red.500" mt={2}>
                     Please check your email and verify your account before
                     logging in.
                  </Text>
               </Box>
            </Flex>
         )}

         {/* Log In */}
         <Button
            w={"full"}
            h={"2.25rem"}
            color="white"
            bg="black"
            size={"sm"}
            fontSize={16}
            borderRadius="10px"
            isLoading={loading}
            onClick={handleLogin}
         >
            Log in
         </Button>

         {authUser === null && (
            <Button
               w={"full"}
               h={"2.25rem"}
               color="white"
               bg="black"
               size={"sm"}
               fontSize={14}
               borderRadius="10px"
               onClick={redirectToHome}
            >
               Browse as Guest
            </Button>
         )}
      </>
   );
};

export default Login;
