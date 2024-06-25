import { Flex, GridItem, Img, Text } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const ProfilePost = ({ img }) => {
   return (
      <GridItem
         cursor={"pointer"}
         borderRadius={10}
         overflow={"hidden"}
         borderColor={"black"}
         position={"relative"}
         aspectRatio={1 / 1}
      >
         <Flex
            opacity={0}
            _hover={{ opacity: 1 }}
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg={"blackAlpha.700"}
            transition={"all 0.03s ease"}
            zIndex={1}
            justifyContent={"center"}
         >
            <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
               <Flex color={"white"}>
                  <FaHeart size={25} />
                  <Text fontWeight={"bold"} ml={2}>
                     7
                  </Text>
               </Flex>
            </Flex>
         </Flex>

         <Img src={img} w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>
   );
};

export default ProfilePost;
