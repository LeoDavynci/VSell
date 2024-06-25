import { Box, Flex, Text } from "@chakra-ui/react";
import { MdOutlineSell } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const ProfileTabs = () => {
   return (
      <Flex
         w={"full"}
         justifyContent={"center"}
         gap={{ base: 4, sm: 10 }}
         textTransform={"uppercase"}
         fontWeight={"bold"}
         pt={2}
      >
         <Flex
            borderTop={"1px solid black"}
            justifyContent={"center"}
            p="2"
            gap={1}
            cursor={"pointer"}
            flexDirection={"column"}
         >
            <Flex
               alignItems={"center"}
               justifyContent={"center"}
               gap={1}
               cursor={"pointer"}
            >
               <Box fontSize={25}>
                  <MdOutlineSell />
               </Box>

               <Text fontSize={12} display={{ base: "none", sm: "block" }}>
                  Listings
               </Text>
            </Flex>
         </Flex>

         <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            cursor={"pointer"}
         >
            <Box fontSize={25}>
               <FaRegHeart />
            </Box>
            <Text fontSize={12} display={{ base: "none", sm: "block" }}>
               Likes
            </Text>
         </Flex>
      </Flex>
   );
};

export default ProfileTabs;
