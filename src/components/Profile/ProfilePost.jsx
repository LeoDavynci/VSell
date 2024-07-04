import {
   Box,
   Button,
   Flex,
   GridItem,
   Image,
   Img,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import useLikePost from "./../../hooks/useLikePost";

const ProfilePost = ({ post }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const displayPrice = post.price ? `$${post.price}` : "Free";
   const userProfile = useUserProfileStore((state) => state.userProfile);
   const authUser = useAuthStore();
   const showToast = useShowToast();
   const [isDeleting, setIsDeleting] = useState(false);
   const deletePost = usePostStore((state) => state.deletePost);
   const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
   const { handleLikePost, isLiked, likes } = useLikePost(post);
   const timeAgo = getTimeDifference(post.createdAt);

   const handleDeletePost = async () => {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      if (isDeleting) return;
      setIsDeleting(true);

      try {
         const imageRef = ref(storage, `posts/${post.id}`);
         await deleteObject(imageRef);
         const userRef = doc(firestore, "users", authUser.user.uid);
         await deleteDoc(doc(firestore, "posts", post.id));

         await updateDoc(userRef, {
            posts: arrayRemove(post.id),
         });

         deletePost(post.id);
         decrementPostsCount(post.id);
         showToast("Success", "Post deleted successfully", "success");
      } catch (error) {
         showToast("Error", error.message, "error");
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <>
         <GridItem
            cursor={"pointer"}
            borderRadius={10}
            overflow={"hidden"}
            borderColor={"black"}
            position={"relative"}
            aspectRatio={1 / 1}
            onClick={onOpen}
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
                        {likes}
                     </Text>
                  </Flex>
               </Flex>
            </Flex>

            <Img
               src={post.imageURL}
               w={"100%"}
               h={"100%"}
               objectFit={"cover"}
            />
         </GridItem>

         <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered={true}
            size={{ base: "sm", sm: "xl", md: "3xl", lg: "6xl" }}
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
                           gap={{ base: "2", md: "30px" }}
                           pt={1}
                        >
                           <Text fontSize="14px" color="gray">
                              Posted {timeAgo}
                           </Text>
                           <Flex gap={1}>
                              <FaLocationDot color="gray" />
                              <Text fontSize="14px" color="gray">
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
                              fontSize={{ base: "42px", md: "56px" }}
                              fontWeight="normal"
                              as="h4"
                              lineHeight="1.2"
                              overflow="hidden"
                              display="-webkit-box"
                              style={{
                                 WebkitLineClamp: 2,
                                 WebkitBoxOrient: "vertical",
                              }}
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

                        {authUser?.user.uid === userProfile.uid && (
                           <Flex
                              gap={{ base: 3, md: 15 }}
                              flexDir={"row"}
                              mt={{ base: "10px", md: "20px" }}
                           >
                              <Button
                                 bg="#D9D9D9"
                                 variant="solid"
                                 color={"black"}
                                 borderRadius={{ base: 35, md: 25 }}
                                 fontSize="36px"
                                 py={9}
                                 px={14}
                              >
                                 Edit
                              </Button>
                              <Button
                                 bg="#D9D9D9"
                                 variant="solid"
                                 color={"black"}
                                 borderRadius={{ base: 35, md: 25 }}
                                 fontSize="36px"
                                 py={9}
                                 px={14}
                                 onClick={handleDeletePost}
                                 isLoading={isDeleting}
                              >
                                 Delete
                              </Button>
                           </Flex>
                        )}

                        {authUser?.user.uid !== userProfile.uid && (
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
                        )}

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

export default ProfilePost;

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
