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
      >
         <Flex
            justifyContent={"center"}
            py={2}
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
      </Flex>
   );
};

export default ProfileTabs;
