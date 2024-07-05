import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({ post }) => {
   const { handleLikePost, isLiked, likes } = useLikePost(post);

   const displayPrice = post.price ? `$${post.price}` : "Free";

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
               {post.itemName || "Item"}
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

            <Text fontWeight={700} fontSize="24" color="#716FE9">
               {post.isOBO ? " OBO" : ""}
            </Text>
            <Flex flexDirection={"row"} justifyContent={"center"}>
               <Box
                  onClick={handleLikePost}
                  cursor={"pointer"}
                  fontSize={18}
                  pr={1}
               >
                  {!isLiked ? <FaRegHeart /> : <FaHeart />}
               </Box>
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
         <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
            position={"relative"}
         >
            <Text fontWeight={300} fontSize={"12"} color={"gray"}>
               {post.pickupLocation || "Anywhere"}
            </Text>
         </Flex>
      </Flex>
   );
};

export default PostFooter;
