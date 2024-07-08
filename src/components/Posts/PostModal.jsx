import React, { useState } from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   ModalCloseButton,
   Box,
   Flex,
   Image,
   Text,
   Avatar,
   Button,
   Input,
   InputGroup,
   InputRightElement,
} from "@chakra-ui/react";
import { FaLocationDot, FaRegHeart, FaHeart } from "react-icons/fa6";
import useLikePost from "../../hooks/useLikePost";
import { getTimeDifference } from "../../utils/getTimeDifference";
import { useSwipeable } from "react-swipeable";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const PostModal = ({
   isOpen,
   onClose,
   post,
   userProfile,
   authUser,
   handleBuyClick,
   handleOfferSubmit,
}) => {
   const { handleLikePost, isLiked, likes } = useLikePost(post);
   const [showOfferInput, setShowOfferInput] = useState(false);
   const [offerAmount, setOfferAmount] = useState("");
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [swipeDirection, setSwipeDirection] = useState(null);

   const nextImage = () => {
      setCurrentImageIndex(
         (prevIndex) => (prevIndex + 1) % post.imageURLs.length
      );
   };

   const prevImage = () => {
      setCurrentImageIndex(
         (prevIndex) =>
            (prevIndex - 1 + post.imageURLs.length) % post.imageURLs.length
      );
   };

   const handlers = useSwipeable({
      onSwipedLeft: () => {
         nextImage();
         setSwipeDirection("left");
         setTimeout(() => setSwipeDirection(null), 500);
      },
      onSwipedRight: () => {
         prevImage();
         setSwipeDirection("right");
         setTimeout(() => setSwipeDirection(null), 500);
      },
      preventDefaultTouchmoveEvent: true,
      trackMouse: true,
   });

   const timeAgo = getTimeDifference(post.createdAt);
   const displayPrice = post.price ? (
      `$${post.price}`
   ) : (
      <Text color="#79A88E">Free</Text>
   );

   const handleOfferClick = () => {
      setShowOfferInput(true);
   };

   const submitOffer = () => {
      handleOfferSubmit(offerAmount);
      setShowOfferInput(false);
      setOfferAmount("");
   };

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         isCentered
         size={{ base: "sm", sm: "sm", md: "3xl", lg: "6xl" }}
      >
         <ModalOverlay backdropFilter="blur(10px)" />
         <ModalContent
            bg="white"
            borderRadius={{ base: "25px", md: "35px" }}
            mt="10%"
         >
            <ModalHeader py={5}>
               <Box position="static" top="10px" left="10px">
                  <ModalCloseButton size="lg" _hover={{ bg: "none" }} />
               </Box>
            </ModalHeader>

            <ModalBody py={3} px={3}>
               <Flex flexDirection={{ base: "column", md: "row" }}>
                  {/* Picture */}

                  <Box
                     {...handlers}
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
                        src={post.imageURLs[currentImageIndex]}
                        objectFit="cover"
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        transition="transform 0.3s ease-out"
                        transform={
                           swipeDirection === "left"
                              ? "translateX(-10%)"
                              : swipeDirection === "right"
                              ? "translateX(10%)"
                              : "translateX(0)"
                        }
                     />
                     {post.imageURLs.length > 1 && (
                        <>
                           <Button
                              position="absolute"
                              left="39%"
                              bottom="10px"
                              onClick={prevImage}
                              bg="rgba(0, 0, 0, 0.4)"
                              _hover={{ bg: "rgba(0, 0, 0, 0.6)" }}
                              size={"40px"}
                              borderRadius={"50px"}
                           >
                              <IoIosArrowDropleft color="white" size={"30px"} />
                           </Button>
                           <Button
                              position="absolute"
                              right="38%"
                              bottom="10px"
                              onClick={nextImage}
                              bg="rgba(0, 0, 0, 0.4)"
                              _hover={{ bg: "rgba(0, 0, 0, 0.6)" }}
                              size={"40px"}
                              borderRadius={"50px"}
                           >
                              <IoIosArrowDropright
                                 color="white"
                                 size={"30px"}
                              />
                           </Button>
                           <Box
                              position="absolute"
                              height={"30px"}
                              bottom="10px"
                              left="45%"
                              bg="rgba(0, 0, 0, 0.4)"
                              color="white"
                              px={4}
                              py={1}
                              borderRadius={50}
                              alignItems={"center"}
                              justifyItems={"center"}
                           >
                              <Text>
                                 {currentImageIndex + 1} /{" "}
                                 {post.imageURLs.length}
                              </Text>
                           </Box>
                        </>
                     )}
                  </Box>

                  {/* Info */}
                  <Flex
                     flex={1}
                     flexDirection="column"
                     pl={{ base: "0", md: "10" }}
                     pr={{ base: "0", md: "20" }}
                     justifyContent={{ base: "start", md: "start" }}
                     w={{ base: "100%", md: "50%" }}
                     h="550px"
                  >
                     {/* Time and Place */}
                     <Flex
                        justifyContent="space-between"
                        py={1}
                        fontSize={{ base: 12, md: 16 }}
                        fontWeight={400}
                        color="gray"
                     >
                        <Text>Posted {timeAgo}</Text>
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
                        fontSize={{ base: "40px", md: "60px" }}
                        lineHeight="1.5"
                        fontWeight="semibold"
                     >
                        <Flex gap="40px">
                           <Text fontWeight={700}>{displayPrice}</Text>
                           <Text fontWeight={700} color="#716FE9">
                              {post.isOBO ? " OBO" : ""}
                           </Text>
                        </Flex>
                     </Box>

                     {/* Buttons */}
                     {authUser?.uid !== post.createdBy && (
                        <Box
                           h={{ base: "64px", md: "64px" }}
                           alignContent="center"
                        >
                           <Flex gap={{ base: 7, md: 19 }} align="center">
                              <Box h="64px">
                                 <Button
                                    h="100%"
                                    bg="#79A88E"
                                    _hover={{ bg: "#A2C0B0" }}
                                    variant="solid"
                                    color="white"
                                    borderRadius={{ base: 45, md: 35 }}
                                    fontSize={{ base: "24px", md: "32px" }}
                                    onClick={handleBuyClick}
                                 >
                                    Buy
                                 </Button>
                              </Box>

                              <Box h="64px">
                                 {post.isOBO && !showOfferInput && (
                                    <Button
                                       h="100%"
                                       bg="clear"
                                       variant="outline"
                                       color="#79A88E"
                                       borderRadius={{ base: 45, md: 35 }}
                                       borderColor="#79A88E"
                                       borderWidth={{ base: "4px", md: "4px" }}
                                       fontSize={{ base: "24px", md: "32px" }}
                                       onClick={handleOfferClick}
                                    >
                                       Offer
                                    </Button>
                                 )}

                                 {post.isOBO && showOfferInput && (
                                    <Box
                                       h="64px"
                                       alignContent="center"
                                       w={"140px"}
                                    >
                                       <InputGroup>
                                          <Input
                                             placeholder="$"
                                             value={offerAmount}
                                             onChange={(e) => {
                                                const value = e.target.value;

                                                // Allow empty input
                                                if (value === "") {
                                                   setOfferAmount("");
                                                   return;
                                                }

                                                // Only allow numbers and one decimal point
                                                const regex = /^\d*\.?\d{0,2}$/;
                                                if (regex.test(value)) {
                                                   const numValue =
                                                      parseFloat(value);
                                                   if (
                                                      !isNaN(numValue) &&
                                                      numValue >= 0 &&
                                                      numValue <= 9999.99
                                                   ) {
                                                      setOfferAmount(value);
                                                   }
                                                }
                                             }}
                                             onKeyPress={(e) => {
                                                const charCode = e.which
                                                   ? e.which
                                                   : e.keyCode;
                                                if (
                                                   charCode > 31 &&
                                                   (charCode < 48 ||
                                                      charCode > 57) &&
                                                   charCode !== 46
                                                ) {
                                                   e.preventDefault();
                                                }
                                             }}
                                             inputMode="decimal"
                                             h="64px"
                                             fontSize={{
                                                base: "18px",
                                                md: "24px",
                                             }}
                                             height="64px"
                                             borderRadius={{ base: 45, md: 35 }}
                                             borderColor="#79A88E"
                                             borderWidth={{
                                                base: "4px",
                                                md: "4px",
                                             }}
                                             _focus={{ borderColor: "#79A88E" }}
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
                                                onClick={submitOffer}
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
                        justifyContent="space-between"
                        fontSize="24px"
                        py={3}
                     >
                        <Flex justifyItems="center" alignItems="center" gap={2}>
                           {userProfile && (
                              <Avatar
                                 src={userProfile.profilePicURL}
                                 size="sm"
                              />
                           )}
                           {userProfile ? userProfile.fullName : "Loading..."}
                        </Flex>

                        <Flex
                           cursor="pointer"
                           pr={1}
                           onClick={handleLikePost}
                           flexDir="row"
                           alignItems="center"
                           justifyItems="center"
                           gap={1}
                        >
                           {!isLiked ? <FaRegHeart /> : <FaHeart />}
                           {likes}
                        </Flex>
                     </Flex>

                     {/* Description */}
                     <Flex>
                        <Box width="100%">
                           <Text fontWeight="bold">Description</Text>
                           <Text>{post.caption}</Text>
                        </Box>
                     </Flex>
                  </Flex>
               </Flex>
            </ModalBody>
            <ModalFooter py={5}></ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default PostModal;
