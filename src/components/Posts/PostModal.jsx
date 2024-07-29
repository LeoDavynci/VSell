import React, { useState, useEffect } from "react";
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
   Tooltip,
} from "@chakra-ui/react";
import { FaLocationDot, FaRegHeart, FaHeart } from "react-icons/fa6";
import useLikePost from "../../hooks/useLikePost";
import { getTimeDifference } from "../../utils/getTimeDifference";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { createOrUpdateConversation } from "../../services/conversationService";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import useShowToast from "../../hooks/useShowToast";
import SwipeableGallery from "./SwipeableGallery";
import { useNavigate } from "react-router-dom";

const PostModal = ({
   isOpen,
   onClose,
   post,
   userProfile,
   authUser,
   handleBuyClick,
}) => {
   const { handleLikePost, isLiked, likes } = useLikePost(post);
   const [showOfferInput, setShowOfferInput] = useState(false);
   const [offerAmount, setOfferAmount] = useState("");
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const sellerName = userProfile?.fullName;
   const [lastOfferTime, setLastOfferTime] = useState(0);
   const [offerCount, setOfferCount] = useState(0);
   const [isOfferButtonDisabled, setIsOfferButtonDisabled] = useState(false);
   const showToast = useShowToast();
   const navigate = useNavigate();

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

   const timeAgo = getTimeDifference(post.createdAt);
   const displayPrice = post.price ? (
      `$${post.price}`
   ) : (
      <Text color="#79A88E">Free</Text>
   );

   const handleOfferClick = () => {
      const currentTime = Date.now();
      const cooldownPeriod = 5 * 60 * 1000; // 5 minutes in milliseconds
      const maxOffers = 3;

      if (currentTime - lastOfferTime < cooldownPeriod) {
         showToast(
            "Error",
            "Please wait 5 minutes before making another offer.",
            "error"
         );
         return;
      }

      if (offerCount >= maxOffers) {
         showToast(
            "Error",
            "You've reached the maximum number of offers for this item.",
            "error"
         );
         return;
      }

      setShowOfferInput(true);
   };

   const submitOffer = async () => {
      setIsOfferButtonDisabled(true);
      await createOrUpdateConversation(
         post.createdBy,
         authUser.uid,
         post.id,
         "OFFER_REQUEST",
         {
            itemId: post.id,
            itemPic: post.imageURLs[0],
            itemName: post.itemName,
            currentPrice: post.price,
            offerPrice: parseFloat(offerAmount),
         },
         authUser.fullName,
         sellerName
      );
      setShowOfferInput(false);
      setOfferAmount("");
      setLastOfferTime(Date.now());
      setOfferCount((prevCount) => prevCount + 1);
      onClose();
      showToast("Offer Submitted", "Your offer has been submitted.", "success");
   };

   const qualityColor = (quality) => {
      switch (quality) {
         case "New":
            return "#716FE9";
         case "Like New":
            return "#47C243";
         case "Very Good":
            return "#8FD078";
         case "Good":
            return "#CBDC6A";
         case "Fair":
            return "#FFA72C";
         case "Poor":
            return "#F44336";
         default:
            return "#716FE9";
      }
   };

   const goToProfile = () => {
      onClose();
      navigate(`/${userProfile?.username}`);
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
                     // {...handlers}
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
                     <SwipeableGallery images={post.imageURLs} />
                     {post.imageURLs.length > 1 && (
                        <>
                           <Button
                              position="absolute"
                              left="30%"
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
                              left="60%"
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
                              left="41%"
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
                           fontSize={{ base: "30px", md: "50px" }}
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

                     {/* Category */}
                     {post.category && (
                        <Box>
                           <Flex
                              fontSize={{ base: 12, md: 16 }}
                              flexDir={"row"}
                           >
                              <Box borderRadius={50} color={"gray"}>
                                 {post.category}
                              </Box>
                           </Flex>
                        </Box>
                     )}

                     {/* Quality */}
                     {post.itemQuality && (
                        <Box>
                           <Flex
                              fontSize={{ base: "15px", md: "25px" }}
                              fontWeight="semibold"
                              flexDir={"row"}
                              gap={"5px"}
                              alignItems={"center"}
                           >
                              <Box>Quality:</Box>
                              <Flex
                                 bg={qualityColor(post.itemQuality)}
                                 px={{ base: 2, md: 4 }}
                                 h={{ base: "20px", md: "30px" }}
                                 borderRadius={50}
                                 color={"white"}
                                 fontSize={{ base: "10px", md: "15px" }}
                                 justifyContent={"center"}
                                 alignItems={"center"}
                              >
                                 {" "}
                                 {post.itemQuality}
                              </Flex>
                           </Flex>
                        </Box>
                     )}

                     {/* Price */}
                     <Box
                        fontSize={{ base: "40px", md: "60px" }}
                        lineHeight="1.25"
                        fontWeight="semibold"
                     >
                        <Flex gap="40px">
                           <Text fontWeight={700}>{displayPrice}</Text>
                           {post.isOBO && (
                              <Tooltip
                                 label="Or Best Offer"
                                 borderRadius={50}
                                 top={-15}
                              >
                                 <Text
                                    fontWeight={700}
                                    color="#716FE9"
                                    cursor="help"
                                 >
                                    OBO
                                 </Text>
                              </Tooltip>
                           )}
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
                                       disabled={isOfferButtonDisabled}
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
                        <Flex
                           justifyItems="center"
                           alignItems="center"
                           gap={2}
                           onClick={goToProfile}
                           cursor="pointer"
                        >
                           {userProfile && (
                              <Avatar
                                 src={userProfile.profilePicURL}
                                 name={userProfile?.fullName || "User"}
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
