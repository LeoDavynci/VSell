import { Box, Image, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import PostFooter from "./PostFooter";
import PostModal from "./PostModal";
import PurchaseModal from "./PurchaseModal";
import useGetUserProfileById from "../../hooks/useGetuserProfileById";
import useLikePost from "./../../hooks/useLikePost";
import useAuthStore from "../../store/authStore";
import { createOrUpdateConversation } from "../../services/conversationService";

import {
   deleteDoc,
   doc,
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
   const db = getFirestore();

   const handlePurchaseSubmit = async (info) => {
      await createOrUpdateConversation(
         post.createdBy,
         authUser.uid,
         post.id,
         "BUY_REQUEST",
         {
            itemId: post.id,
            itemPic: post.imageURLs[0],
            itemName: post.itemName,
            currentPrice: post.price || 0,
            info: info,
         },
         authUser.fullName,
         userProfile.fullName
      );
      setIsPurchaseModalOpen(false);
      onClose();

      // await deleteDoc(doc(db, "posts", post.id));
   };

   const handleBuyClick = () => {
      setIsPurchaseModalOpen(true);
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
            rounded={"xl"}
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
                     src={post.imageURLs[0]}
                     borderRadius="10px"
                     objectFit="cover"
                     position="relative"
                     overflow={"hidden"}
                     w="10rem"
                     h="10rem"
                  />
               </Box>
               <PostFooter post={post} userProfile={userProfile} />
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
