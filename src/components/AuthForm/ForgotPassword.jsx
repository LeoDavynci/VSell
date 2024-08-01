import React, { useState } from "react";
import {
   Box,
   Button,
   Flex,
   Input,
   Text,
   VStack,
   useToast,
} from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Adjust this import based on your project structure
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const toast = useToast();

   const handleResetPassword = async (e) => {
      e.preventDefault();
      if (!email) {
         toast({
            title: "Error",
            description: "Please enter your email address.",
            status: "error",
            duration: 3000,
            isClosable: true,
         });
         return;
      }

      setIsLoading(true);
      try {
         await sendPasswordResetEmail(auth, email);
         toast({
            title: "Success",
            description: "Password reset email sent. Please check your inbox.",
            status: "success",
            duration: 5000,
            isClosable: true,
         });
         navigate("/auth");
      } catch (error) {
         toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <Flex
         minHeight="100vh"
         width="full"
         align="center"
         justifyContent="center"
         bg={"#79A88E"}
      >
         <Box
            borderWidth={1}
            px={4}
            width="full"
            maxWidth="350px"
            borderRadius={20}
            textAlign="center"
            bg={"#FAFAFA"}
         >
            <Box p={4}>
               <VStack spacing={8} align="stretch">
                  <Text fontSize="lg" fontWeight="bold">
                     Reset Your Password
                  </Text>
                  <form onSubmit={handleResetPassword}>
                     <VStack spacing={4} align="stretch">
                        <Input
                           type="email"
                           placeholder="Enter your email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           borderColor="black"
                           borderWidth="2px"
                           borderRadius="10px"
                        />
                        <Button
                           type="submit"
                           colorScheme="black"
                           bg="black"
                           color="white"
                           size="lg"
                           fontSize="md"
                           borderRadius="10px"
                           isLoading={isLoading}
                        >
                           Send Reset Email
                        </Button>
                     </VStack>
                  </form>
               </VStack>
            </Box>
         </Box>
      </Flex>
   );
};

export default ForgotPassword;
