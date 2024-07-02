import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const PostFooter = ({ name, price, location }) => {
   const [liked, setLiked] = useState(false);
   const [likes, setLikes] = useState(10);

   const handleLike = () => {
      if (liked) {
         setLiked(false);
         setLikes(likes - 1);
      } else {
         setLiked(true);
         setLikes(likes + 1);
      }
   };

   const displayPrice = price ? `$${price}` : "Free";
   const showOBO = price && price !== "Free";

   return (
      <Flex
         display={"flex"}
         justifyContent={"space-between"}
         alignItems={"center"}
         gap={0}
         w={"full"}
         pt={0}
         mb={2}
         mt={"auto"}
         flexDirection={"column"}
      >
         <Flex w={"160px"} overflow="hidden">
            <Text fontWeight={400} fontSize={15} isTruncated textAlign="left">
               {name || "Item"}
            </Text>
         </Flex>
         <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
            h={"25px"}
         >
            <Text fontSize="24" fontWeight={700}>
               {displayPrice}
            </Text>
            {showOBO && (
               <Text fontWeight={700} fontSize="24" color="#716FE9">
                  OBO
               </Text>
            )}
            <Flex flexDirection={"column"} alignItems={"center"}>
               <Box
                  onClick={handleLike}
                  cursor={"pointer"}
                  fontSize={18}
                  pr={1}
               >
                  {!liked ? <FaRegHeart /> : <FaHeart />}
               </Box>
            </Flex>
         </Flex>
         <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
            position={"relative"}
         >
            <Text fontWeight={300} fontSize={"12"} color={"gray"}>
               {location || "Anywhere"}
            </Text>
            <Flex flexDirection={"column"} alignItems={"center"}>
               <Text
                  fontWeight={600}
                  fontSize={"12"}
                  alignSelf={"center"}
                  pr={1}
               >
                  {likes}
               </Text>
            </Flex>
         </Flex>
      </Flex>
   );
};

export default PostFooter;
