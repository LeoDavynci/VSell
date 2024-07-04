import {
   Box,
   Button,
   Flex,
   Image,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
   VStack,
} from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";
import useLikePost from "./../../hooks/useLikePost";

const Post = ({ post }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { handleLikePost, isLiked, likes } = useLikePost(post);
   const timeAgo = getTimeDifference(post.createdAt);
   const displayPrice = post.price ? `$${post.price}` : "Free";

   return (
      <>
         <VStack
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
            padding={2}
            w="full"
            minW="100px"
            maxW="1fr"
            onClick={onOpen}
         >
            <Box>
               <Box w="10rem" h="auto" position="relative">
                  <Image
                     src={post.imageURL}
                     borderRadius="10px"
                     objectFit="cover"
                     position="relative"
                     overflow={"hidden"}
                     w="10rem"
                     h="10rem"
                  />
               </Box>
               <PostFooter post={post} />
            </Box>
         </VStack>

         <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered={true}
            size={{ base: "xs", sm: "xs", md: "3xl", lg: "6xl" }}
         >
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent bg={"white"} borderRadius={40} mt={"10%"}>
               <ModalHeader py={5} borderTopRadius={40}>
                  <Box position="static" top="10px" left="10px">
                     <ModalCloseButton size="lg" _hover={{ bg: "none" }} />
                  </Box>
               </ModalHeader>

               <ModalBody py={3} px={3}>
                  <Flex flexDirection={{ base: "column", md: "row" }}>
                     <Box
                        borderRadius={30}
                        position="relative"
                        overflow="hidden"
                        flex={1}
                        w={"100%"}
                        _before={{
                           content: '""',
                           display: "block",
                           pt: { base: "100%", md: "56.25%" },
                        }}
                     >
                        <Image
                           src={post.imageURL}
                           objectFit="cover"
                           position="absolute"
                           top="0"
                           left="0"
                           width="100%"
                           height="100%"
                        />
                     </Box>

                     <Flex
                        flex={1}
                        flexDirection="column"
                        pl={{ base: "0", md: "10" }}
                        pr={{ base: "0", md: "10" }}
                        justifyContent={{ base: "start", md: "start" }}
                        w={{
                           base: "100%",
                           md: "300px",
                        }}
                        h={"550px"}
                     >
                        <Box
                           display="flex"
                           justifyContent={"space-between"}
                           gap={{ base: "10", sm: "10", md: "10" }}
                           pt={1}
                        >
                           <Text
                              fontSize={{ base: 12, md: 20 }}
                              color="gray"
                              fontWeight={400}
                           >
                              Posted {timeAgo}
                           </Text>
                           <Flex gap={1} fontSize={{ base: 12, md: 20 }}>
                              <FaLocationDot color="gray" fontWeight={400} />
                              <Text color="gray">
                                 {post.pickupLocation || "Anywhere"}
                              </Text>
                           </Flex>
                        </Box>

                        <Flex
                           justifyContent="space-between"
                           alignContent="flex-start"
                           ml={-1}
                        >
                           <Box
                              fontSize={{ base: 36, md: 56 }}
                              fontWeight={500}
                              as="h4"
                              lineHeight="1.2"
                              overflow="hidden"
                              display="-webkit-box"
                              webkitlineclamp="2"
                              webkitboxorient="vertical"
                              maxW="100%"
                           >
                              {post.itemName || "Item"}
                           </Box>
                        </Flex>

                        <Flex
                           justifyContent="space-between"
                           gap={{ base: 0, md: 0 }}
                           flexDirection={{ base: "column" }}
                        >
                           <Box
                              fontSize={{
                                 base: "60px",
                                 md: "80px",
                              }}
                              as="h4"
                              lineHeight="1.5"
                              fontWeight="semibold"
                              mt={-3}
                           >
                              <Flex gap={"40px"}>
                                 <Text fontWeight={700}>{displayPrice}</Text>
                                 <Text fontWeight={700} color={"#716FE9"}>
                                    {post.isOBO ? " OBO" : ""}
                                 </Text>
                              </Flex>
                           </Box>

                           <Flex
                              flexDirection={"row"}
                              alignItems={"center"}
                              mt={-3}
                           >
                              <Box
                                 cursor={"pointer"}
                                 fontSize={30}
                                 pr={1}
                                 onClick={handleLikePost}
                              >
                                 {!isLiked ? <FaRegHeart /> : <FaHeart />}
                              </Box>
                              <Text
                                 fontWeight={600}
                                 fontSize={"30"}
                                 alignSelf={"center"}
                                 pr={1}
                              >
                                 {likes}
                              </Text>
                           </Flex>
                        </Flex>

                        <Flex gap={{ base: 5, md: 15 }}>
                           <Button
                              bg={"#79A88E"}
                              _hover={{ bg: "#A2C0B0" }}
                              variant="solid"
                              color={"white"}
                              borderRadius={{ base: 45, md: 35 }}
                              fontSize="36px"
                              py={9}
                              px={14}
                           >
                              Buy
                           </Button>

                           {post.isOBO && (
                              <Button
                                 bg="clear"
                                 variant="outline"
                                 color={"#79A88E"}
                                 borderRadius={{ base: 45, md: 35 }}
                                 borderColor={"#79A88E"}
                                 borderWidth={5}
                                 fontSize="36px"
                                 py={8}
                                 px={12}
                              >
                                 Offer
                              </Button>
                           )}
                        </Flex>

                        <Flex pr={5} py={5}>
                           <Box width="100%">
                              <Text fontWeight={"bold"}>Description</Text>
                              <Text>{post.caption}</Text>
                           </Box>
                        </Flex>
                     </Flex>
                  </Flex>
               </ModalBody>
               <ModalFooter py={5} borderBottomRadius={40}></ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default Post;

function getTimeDifference(timestamp) {
   const now = Date.now();
   const diffInSeconds = Math.floor((now - timestamp) / 1000);

   if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
   if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
   if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
   if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
   if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
   return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}
