import { Box, Image, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import PostFooter from "./PostFooter";
import PostModal from "./PostModal";
import PurchaseModal from "./PurchaseModal";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import useLikePost from "./../../hooks/useLikePost";
import useAuthStore from "../../store/authStore";
import { createMessage } from "../../services/messageService";

import {
   addDoc,
   collection,
   getFirestore,
   serverTimestamp,
} from "firebase/firestore";

const Post = ({ post }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { userProfile } = useGetUserProfileById(post.createdBy);
   const authUser = useAuthStore((state) => state.user);
   const [showOfferInput, setShowOfferInput] = useState(false);
   const [offerAmount, setOfferAmount] = useState("");
   const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [meetupLocation, setMeetupLocation] = useState("");
   const db = getFirestore();

   const handlePurchaseSubmit = async (info) => {
      await createMessage(
         post.createdBy,
         authUser.uid,
         post.id,
         "buy",
         post.itemName,
         post.price,
         authUser.fullName,
         info
      );
      setIsPurchaseModalOpen(false);
      onClose();
      // Reset the selections
      setInfo("");
   };

   const handleBuyClick = () => {
      setIsPurchaseModalOpen(true);
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
         {/* Posts on the main page */}
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

         {/* Individual Post Opened */}
         <PostModal
            isOpen={isOpen}
            onClose={onClose}
            post={post}
            userProfile={userProfile}
            authUser={authUser}
            handleBuyClick={handleBuyClick}
            handleOfferSubmit={handleOfferSubmit}
         />

         {/* Buying page */}
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
