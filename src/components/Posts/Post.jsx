import {
   Avatar,
   Box,
   Button,
   Flex,
   Image,
   Stack,
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
   FormControl,
   FormLabel,
} from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";
import useLikePost from "./../../hooks/useLikePost";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import useAuthStore from "../../store/authStore";
import { useState } from "react";

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

   const [showOfferInput, setShowOfferInput] = useState(false);
   const [offerAmount, setOfferAmount] = useState("");

   const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [meetupLocation, setMeetupLocation] = useState("");

   const handleBuyClick = () => {
      setIsPurchaseModalOpen(true);
   };

   const handlePurchaseSubmit = () => {
      // Implement logic to process the purchase with selected date, time, and location
      console.log(`Purchase confirmed for ${selectedDate} at ${selectedTime}`);
      console.log(`Meetup location: ${meetupLocation}`);
      setIsPurchaseModalOpen(false);
      onClose();
      // Reset the selections
      setSelectedDate("");
      setSelectedTime("");
      setMeetupLocation("");
   };

   const handleOfferClick = () => {
      setShowOfferInput(true);
   };

   const handleOfferSubmit = () => {
      // Implement offer submission logic here
      console.log(`Offer submitted: ${offerAmount}`);
      setShowOfferInput(false);
      setOfferAmount("");
      onClose();
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
            size={{ base: "sm", sm: "sm", md: "3xl", lg: "6xl" }}
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

                        {authUser?.user.uid !== post.createdBy && (
                           <Box
                              h={{ base: "64px", md: "64px" }}
                              alignContent={"center"}
                           >
                              <Flex gap={{ base: 5, md: 15 }} align={"center"}>
                                 <Box h={"64px"}>
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

                                 <Box h={"64px"}>
                                    {post.isOBO && !showOfferInput && (
                                       <Button
                                          h={"100%"}
                                          bg="clear"
                                          variant="outline"
                                          color={"#79A88E"}
                                          borderRadius={{ base: 45, md: 35 }}
                                          borderColor={"#79A88E"}
                                          borderWidth={{
                                             base: "4px",
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
                                       <Box h={"64px"} alignContent={"center"}>
                                          <InputGroup>
                                             <Input
                                                placeholder="$"
                                                value={offerAmount}
                                                onChange={(e) =>
                                                   setOfferAmount(
                                                      e.target.value
                                                   )
                                                }
                                                h={"64px"}
                                                fontSize={{
                                                   base: "18px",
                                                   md: "24px",
                                                }}
                                                height="64px"
                                                borderRadius={{
                                                   base: 45,
                                                   md: 35,
                                                }}
                                                borderColor="#79A88E"
                                                borderWidth={{
                                                   base: "4px",
                                                   md: "4px",
                                                }}
                                                _focus={{
                                                   borderColor: "#79A88E",
                                                }}
                                                type="number"
                                                min="0"
                                                max="9999"
                                             />
                                             <InputRightElement
                                                width="4.5rem"
                                                height="64px"
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
                           </Box>
                        )}

                        {/* Name and Likes */}
                        <Flex
                           justifyContent={"space-between"}
                           fontSize={"24px"}
                           py={3}
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

         <Modal
            isOpen={isPurchaseModalOpen}
            onClose={() => {
               setIsPurchaseModalOpen(false);
               // Reset purchase-related states when closing the purchase modal
               setSelectedDate("");
               setSelectedTime("");
               setMeetupLocation("");
            }}
            isCentered
            size={{ base: "sm", sm: "sm", md: "3xl", lg: "6xl" }}
         >
            <ModalOverlay />
            <ModalContent borderRadius={{ base: "25", md: "35" }}>
               <ModalHeader fontSize={28}>Confirm Purchase</ModalHeader>
               <ModalCloseButton />
               <ModalBody color={"black"} fontWeight={500}>
                  <Stack spacing={4}>
                     <Box>
                        <Text>Item(s): {post.itemName || "Item"}</Text>
                        <Text>Price: {displayPrice}</Text>
                        <Text>Sold By: {userProfile?.fullName}</Text>
                     </Box>
                     <Box pt={8}>
                        <FormControl isRequired>
                           <FormLabel>Meetup Date</FormLabel>

                           <Input
                              borderRadius={{ base: "25", md: "35" }}
                              border={"2px solid black"}
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                           />
                        </FormControl>
                        <FormControl isRequired>
                           <FormLabel>Meetup Time</FormLabel>
                           <Input
                              borderRadius={{ base: "25", md: "35" }}
                              border={"2px solid black"}
                              type="time"
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                           />
                        </FormControl>

                        {!post.pickupLocation && (
                           <FormControl isRequired>
                              <FormLabel>Meetup Location</FormLabel>
                              <Input
                                 borderRadius={{ base: "25", md: "35" }}
                                 border={"2px solid black"}
                                 value={meetupLocation}
                                 onChange={(e) =>
                                    setMeetupLocation(e.target.value)
                                 }
                                 placeholder="Enter a specific meetup location"
                              />
                           </FormControl>
                        )}

                        {post.pickupLocation && (
                           <Text mb={4}>
                              Meetup Location: {post.pickupLocation}
                           </Text>
                        )}
                     </Box>
                  </Stack>
               </ModalBody>
               <ModalFooter gap={5} pt={16}>
                  <Button
                     bg={"#79A88E"}
                     color={"white"}
                     borderRadius={{ base: "25", md: "35" }}
                     onClick={handlePurchaseSubmit}
                  >
                     Confirm Purchase
                  </Button>
                  <Button
                     variant="outline"
                     border={"3px solid #79A88E"}
                     color={"#79A88E"}
                     borderRadius={{ base: "25", md: "35" }}
                     onClick={() => setIsPurchaseModalOpen(false)}
                  >
                     Cancel
                  </Button>
               </ModalFooter>
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
