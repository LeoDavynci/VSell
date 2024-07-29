import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({ post, userProfile }) => {
   const { handleLikePost, isLiked, likes } = useLikePost(post);

   const displayPrice = post.price ? (
      `$${post.price}`
   ) : (
      <Text color={"#79A88E"}>Free</Text>
   );

   return (
      <Flex
         display={"flex"}
         justifyContent={"space-between"}
         alignItems={"center"}
         gap={0}
         w={"full"}
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
            <Text fontSize={{ base: "20px", md: "20px" }} fontWeight={700}>
               {displayPrice}
            </Text>

            <Text
               fontWeight={700}
               fontSize={{ base: "20px", md: "20px" }}
               color="#716FE9"
            >
               {post.isOBO ? " OBO" : ""}
            </Text>
         </Flex>

         <Flex
            justifyItems="center"
            alignItems="center"
            gap={1}
            fontSize={"12"}
            w={"full"}
            pt={1}
         >
            {userProfile && (
               <Avatar src={userProfile.profilePicURL} size="2xs" />
            )}
            {userProfile ? userProfile.fullName : "Loading..."}
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
            <Flex flexDirection={"row"} justifyContent={"center"}>
               {/* <Box
                  onClick={handleLikePost}
                  cursor={"pointer"}
                  fontSize={{ base: "12px", md: "16px" }}
                  pr={1}
               >
                  {!isLiked ? <FaRegHeart /> : <FaHeart />}
               </Box>
               <Text
                  fontWeight={600}
                  fontSize={{ base: "8px", md: "12px" }}
                  alignSelf={"center"}
                  pr={1}
               >
                  {likes}
               </Text> */}
            </Flex>
         </Flex>
      </Flex>
   );
};

export default PostFooter;
