import {
   Box,
   Button,
   Container,
   Flex,
   Image,
   Text,
   useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
   const imageSrc = useBreakpointValue({
      base: "/cover.png",
      md: "/cover2.png",
   });
   const navigate = useNavigate();

   const handleLoginClick = () => {
      navigate("/auth", { state: { isLogin: true } });
   };

   const handleSignupClick = () => {
      navigate("/auth", { state: { isLogin: false } });
   };

   return (
      <Box
         w="100%"
         h="100vh"
         bg="linear-gradient(to top, #79A88E, white)"
         pb={10}
         px={{ base: 4, md: 32 }}
         overflow="hidden"
      >
         <Flex
            maxW="100%"
            h={"100px"}
            padding="10px"
            justifyContent={"space-between"}
            alignItems={"center"}
         >
            <Flex h={"100%"} alignItems={"center"} justifyContent={"center"}>
               <Text
                  fontSize={{ base: "32px", md: "56px" }}
                  as="b"
                  align={"center"}
                  color={"black"}
                  justify={"center"}
                  centerContent
                  fontWeight={800}
               >
                  VSELL
               </Text>
            </Flex>
            <Flex gap={4}>
               {/* <Button variant="link">
                  <Text
                     color="black"
                     fontSize={{ base: "12px", md: "20px" }}
                     fontWeight={600}
                  >
                     Features
                  </Text>
               </Button> */}
               <Button
                  bg={"#79A88E"}
                  rounded={{ base: "10px", md: "10px" }}
                  _hover={{ bg: "#5C7F6C" }}
                  paddingY={{ base: "5px", md: "10px" }}
                  onClick={handleLoginClick}
               >
                  <Text
                     color="white"
                     fontSize={{ base: "14px", md: "20px" }}
                     fontWeight={600}
                  >
                     Log In
                  </Text>
               </Button>
            </Flex>
         </Flex>
         <Flex
            maxW="100%"
            h={{ base: "320px", md: "400px" }}
            pt={20}
            alignItems={"center"}
            flexDir={"column"}
         >
            <Flex h={"auto"} alignItems={"center"} justifyContent={"center"}>
               <Text
                  fontSize={{ base: "32px", md: "64px" }}
                  align={"center"}
                  color={"black"}
                  justify={"center"}
                  centerContent
                  fontWeight={800}
               >
                  Selling. Buying. Better
               </Text>
            </Flex>

            <Flex
               h={"auto"}
               alignItems={"center"}
               justifyContent={"center"}
               flexDir={"column"}
               pb={8}
               pt={4}
            >
               <Text
                  fontSize={{ base: "14px", md: "20px" }}
                  align={"center"}
                  color={"black"}
                  justify={"center"}
                  centerContent
                  fontWeight={800}
               >
                  Start selling and buying second hand goods
               </Text>
               <Text
                  fontSize={{ base: "14px", md: "20px" }}
                  align={"center"}
                  color={"black"}
                  justify={"center"}
                  centerContent
                  fontWeight={500}
               >
                  Designed by students, for students
               </Text>
            </Flex>

            <Button
               bg={"#79A88E"}
               rounded={{ base: "10px", md: "10px" }}
               _hover={{ bg: "#5C7F6C" }}
               onClick={handleSignupClick}
            >
               <Text
                  color="white"
                  fontSize={{ base: "14px", md: "20px" }}
                  fontWeight={600}
               >
                  Get Started. It’s FREE
               </Text>
            </Button>
         </Flex>
         <Flex
            maxW="100%"
            h={"400px"}
            alignItems={"center"}
            flexDir={"column"}
            px={{ base: 2, md: 20 }}
         >
            <Image
               src={imageSrc}
               alt="banner"
               rounded={{ base: "20px", md: "20px" }}
               boxShadow="0px 0px 60px rgba(121, 168, 142, 0.9)"
            />
         </Flex>
      </Box>
   );
};
