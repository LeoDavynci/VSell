import {
   Avatar,
   Box,
   Button,
   Flex,
   Image,
   Link,
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
   AlertDialog,
   AlertDialogBody,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogContent,
   AlertDialogOverlay,
   Input,
   InputGroup,
   InputRightElement,
} from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";
import useLikePost from "./../../hooks/useLikePost";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import useAuthStore from "../../store/authStore";
import { useRef, useState } from "react";

const Post = ({ post }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { handleLikePost, isLiked, likes } = useLikePost(post);
   const timeAgo = getTimeDifference(post.createdAt);
   const displayPrice = post.price ? (
      `$${post.price}`
   ) : (
      <Text color={"#79A88E"}>Free</Text>
   );
   const { userProfile } = useGetUserProfileById(post.createdBy);
   const authUser = useAuthStore();

   const [isAlertOpen, setIsAlertOpen] = useState(false);
   const [showOfferInput, setShowOfferInput] = useState(false);
   const [offerAmount, setOfferAmount] = useState("");
   const cancelRef = useRef();

   const handleBuyClick = () => {
      setIsAlertOpen(true);
   };

   const handleConfirmBuy = () => {
      // Implement buy logic here
      setIsAlertOpen(false);
   };

   const handleOfferClick = () => {
      setShowOfferInput(true);
   };

   const handleOfferSubmit = () => {
      // Implement offer submission logic here
      console.log(`Offer submitted: ${offerAmount}`);
      setShowOfferInput(false);
      setOfferAmount("");
   };

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
         >
            <Box>
               <Box
                  w="10rem"
                  h="auto"
                  position="relative"
                  onClick={onOpen}
                  cursor={"pointer"}
               >
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
                     {/* Picture */}
                     <Box
                        borderRadius={30}
                        position="relative"
                        overflow="hidden"
                        w={{ base: "100%", md: "50%" }}
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

                     {/* Info */}
                     <Flex
                        flex={1}
                        flexDirection="column"
                        pl={{ base: "0", md: "10" }}
                        pr={{ base: "0", md: "20" }}
                        justifyContent={{ base: "start", md: "start" }}
                        w={{
                           base: "100%",
                           md: "50%",
                        }}
                        h={"550px"}
                     >
                        {/* Time and Place */}
                        <Flex
                           justifyContent={"space-between"}
                           py={1}
                           fontSize={{ base: 12, md: 16 }}
                           fontWeight={400}
                           color="gray"
                        >
                           {/* Time */}
                           <Text>Posted {timeAgo}</Text>

                           {/* Place */}
                           <Flex gap={1}>
                              <Box mt={1}>
                                 <FaLocationDot />
                              </Box>
                              <Text>{post.pickupLocation || "Anywhere"}</Text>
                           </Flex>
                        </Flex>

                        {/* Item Name */}
                        <Flex alignContent="flex-start">
                           <Box
                              fontSize={{ base: 30, md: 50 }}
                              fontWeight={500}
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

                        {/* Price */}
                        <Box
                           fontSize={{
                              base: "40px",
                              md: "60px",
                           }}
                           lineHeight="1.5"
                           fontWeight="semibold"
                        >
                           <Flex gap={"40px"}>
                              <Text fontWeight={700}>{displayPrice}</Text>
                              <Text fontWeight={700} color={"#716FE9"}>
                                 {post.isOBO ? " OBO" : ""}
                              </Text>
                           </Flex>
                        </Box>

                        {/* Buttons */}
                        <Box
                           bg={"lime"}
                           h={{ base: "64px", md: "64px" }}
                           alignContent={"center"}
                        >
                           {authUser?.user.uid !== post.createdBy && (
                              <Flex gap={{ base: 5, md: 15 }} align={"center"}>
                                 <Box bg={"lightblue"} h={"64px"}>
                                    <Button
                                       h={"100%"}
                                       bg={"#79A88E"}
                                       _hover={{ bg: "#A2C0B0" }}
                                       variant="solid"
                                       color={"white"}
                                       borderRadius={{ base: 45, md: 35 }}
                                       fontSize={{ base: "24px", md: "32px" }}
                                       onClick={handleBuyClick}
                                    >
                                       Buy
                                    </Button>
                                 </Box>

                                 <Box bg={"lightblue"} h={"64px"}>
                                    {post.isOBO && !showOfferInput && (
                                       <Button
                                          h={"100%"}
                                          bg="clear"
                                          variant="outline"
                                          color={"#79A88E"}
                                          borderRadius={{ base: 45, md: 35 }}
                                          borderColor={"#79A88E"}
                                          borderWidth={{
                                             base: "2px",
                                             md: "4px",
                                          }}
                                          fontSize={{
                                             base: "24px",
                                             md: "32px",
                                          }}
                                          onClick={handleOfferClick}
                                       >
                                          Offer
                                       </Button>
                                    )}

                                    {post.isOBO && showOfferInput && (
                                       <Box
                                          bg={"pink"}
                                          h={"64px"}
                                          alignContent={"center"}
                                       >
                                          <InputGroup>
                                             <Input
                                                placeholder="$"
                                                value={offerAmount}
                                                onChange={(e) =>
                                                   setOfferAmount(
                                                      e.target.value
                                                   )
                                                }
                                                pr="4.5rem"
                                                fontSize={{
                                                   base: "18px",
                                                   md: "24px",
                                                }}
                                                height="60px"
                                                borderRadius="30px"
                                                borderColor="#79A88E"
                                                borderWidth="3px"
                                                _focus={{
                                                   borderColor: "#79A88E",
                                                }}
                                             />
                                             <InputRightElement
                                                width="4.5rem"
                                                height="60px"
                                             >
                                                <Button
                                                   h="50px"
                                                   size="sm"
                                                   onClick={handleOfferSubmit}
                                                   bg="#79A88E"
                                                   color="white"
                                                   _hover={{ bg: "#A2C0B0" }}
                                                   borderRadius="25px"
                                                   mr={1}
                                                >
                                                   Offer
                                                </Button>
                                             </InputRightElement>
                                          </InputGroup>
                                       </Box>
                                    )}
                                 </Box>
                              </Flex>
                           )}
                        </Box>

                        {/* Name and Likes */}
                        <Flex
                           justifyContent={"space-between"}
                           fontSize={"24px"}
                           pt={5}
                           pb={3}
                        >
                           {/* Name */}
                           <Flex
                              justifyItems={"center"}
                              alignItems={"center"}
                              gap={2}
                           >
                              {userProfile && (
                                 <Avatar
                                    src={userProfile.profilePicURL}
                                    size={"sm"}
                                 />
                              )}

                              {userProfile
                                 ? userProfile.fullName
                                 : "Loading..."}
                           </Flex>

                           {/* Likes */}
                           <Flex
                              cursor={"pointer"}
                              pr={1}
                              onClick={handleLikePost}
                              flexDir={"row"}
                              alignItems={"center"}
                              justifyItems={"center"}
                              gap={1}
                           >
                              {!isLiked ? <FaRegHeart /> : <FaHeart />}
                              {likes}
                           </Flex>
                        </Flex>

                        {/* Description */}
                        <Flex>
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

         <AlertDialog
            isOpen={isAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsAlertOpen(false)}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     Confirm Purchase
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     Are you sure you want to buy this item?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button
                        ref={cancelRef}
                        onClick={() => setIsAlertOpen(false)}
                     >
                        Cancel
                     </Button>
                     <Button
                        colorScheme="green"
                        onClick={handleConfirmBuy}
                        ml={3}
                     >
                        Confirm
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
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
