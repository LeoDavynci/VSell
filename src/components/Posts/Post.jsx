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
import React, { useState } from "react";
import PostFooter from "./PostFooter";
import PostModal from "./PostModal";
import PurchaseModal from "./PurchaseModal";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import { createMessage } from "../../services/messageService";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";
import useLikePost from "./../../hooks/useLikePost";
import useAuthStore from "../../store/authStore";

import {
   addDoc,
   collection,
   getFirestore,
   serverTimestamp,
} from "firebase/firestore";

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
   const authUser = useAuthStore((state) => state.user);

   const [showOfferInput, setShowOfferInput] = useState(false);
   const [offerAmount, setOfferAmount] = useState("");

   const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [meetupLocation, setMeetupLocation] = useState("");

   const db = getFirestore();

   const createMessage = async (type, amount) => {
      try {
         await addDoc(collection(db, "messages"), {
            senderId: authUser.uid,
            receiverId: post.createdBy,
            postId: post.id,
            type: type,
            amount: amount,
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
         });
         console.log("Message created successfully");
      } catch (error) {
         console.error("Error creating message: ", error);
      }
   };

   const handleBuyClick = () => {
      setIsPurchaseModalOpen(true);
   };

   const handlePurchaseSubmit = async () => {
      await createMessage("buy", post.price);
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

   const handleOfferSubmit = async () => {
      await createMessage("offer", offerAmount);
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

         <PostModal
            isOpen={isOpen}
            onClose={onClose}
            post={post}
            userProfile={userProfile}
            authUser={authUser}
            handleBuyClick={handleBuyClick}
            handleOfferSubmit={handleOfferSubmit}
         />

         <PurchaseModal
            isOpen={isPurchaseModalOpen}
            onClose={() => setIsPurchaseModalOpen(false)}
            post={post}
            userProfile={userProfile}
            handlePurchaseSubmit={handlePurchaseSubmit}
         />
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
