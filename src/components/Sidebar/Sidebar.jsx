import {
   Box,
   Button,
   Flex,
   Image,
   Input,
   InputGroup,
   InputRightElement,
   Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaAtlassian } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
   const [searchQuery, setSearchQuery] = useState("");

   const handleSearch = () => {
      event.preventDefault(); // Prevent the default form submission behavior
      console.log(searchQuery); // Or navigate using something like `history.push(`/search?query=${searchQuery}`)`
      // You could use React Router's `useHistory` or `useNavigate` here for navigation
   };

   return (
      <Box
         width="100%"
         height="70px"
         borderColor={"white"}
         padding={"3px"}
         position={"sticky"}
         top={0}
         left={0}
         bg={"linear-gradient(to right, #5E2BFF, #FC6DAB)"}
      >
         <Flex
            as="form"
            onSubmit={handleSearch}
            direction={"row"}
            gap={3}
            w="full"
            height="full"
            alignItems={"center"}
         >
            <Link
               to={"/"}
               as={RouterLink}
               pl={2}
               display={{ base: "none", md: "block" }}
               cursor="pointer"
            >
               <Image
                  src="/VSELL_Logo.png"
                  alt="VSELL"
                  height={["65px", "65px", "65px"]}
                  width={["160px", "160px", "160px"]}
                  objectFit="contain"
               />
            </Link>
            <Link
               to={"/"}
               as={RouterLink}
               pl={2}
               display={{ base: "block", md: "none" }}
               cursor="pointer"
            >
               <FaAtlassian size={40} color="white" />
            </Link>

            {/* Search Bar */}
            <InputGroup size="lg" pr={"10px"} ml={2}>
               <Input
                  pr="10px"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  borderWidth="1px"
                  borderRadius="30px"
                  bg="white"
               />
               <InputRightElement width="4.5rem">
                  <Button
                     h="45px"
                     w="35"
                     size="sm"
                     borderRadius="30px"
                     onClick={handleSearch}
                     bg={"white"}
                  >
                     <FaSearch size={25} />
                  </Button>
               </InputRightElement>
            </InputGroup>

            <Box width={"90px"} height={"70px"} boxSizing="border-box">
               <Flex align="center" justify="center" height="100%">
                  <Link to={"/"} as={RouterLink} cursor="pointer">
                     <IoPersonCircleSharp size={55} color="white" />
                  </Link>
               </Flex>
            </Box>
         </Flex>
      </Box>
   );
};

export default Sidebar;
