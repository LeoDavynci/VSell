import React, { useState } from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   Stack,
   Box,
   Text,
   FormControl,
   FormLabel,
   Input,
   Textarea,
} from "@chakra-ui/react";

const PurchaseModal = ({
   isOpen,
   onClose,
   post,
   userProfile,
   handlePurchaseSubmit,
}) => {
   const [info, setInfo] = useState("");

   const handleSubmit = () => {
      handlePurchaseSubmit(info);
      onClose();
   };

   return (
      <Modal
         isOpen={isOpen}
         onClose={() => {
            onClose();
            setInfo("");
         }}
         isCentered
         size={{ base: "sm", sm: "sm", md: "3xl", lg: "6xl" }}
      >
         <ModalOverlay />
         <ModalContent borderRadius={{ base: "25", md: "35" }}>
            <ModalHeader fontSize={28}>Confirm Purchase</ModalHeader>
            <ModalCloseButton />
            <ModalBody color="black" fontWeight={500}>
               <Stack spacing={4}>
                  <Box>
                     <Text>Item(s): {post.itemName || "Item"}</Text>
                     <Text>
                        Price: {post.price ? `$${post.price}` : "Free"}
                     </Text>
                     <Text>Sold By: {userProfile?.fullName}</Text>
                     {post.pickupLocation && (
                        <Text>Pickup at {post.pickupLocation}</Text>
                     )}
                  </Box>
                  <Box pt={8}>
                     <FormControl isRequired>
                        <FormLabel>Meetup Information</FormLabel>
                        <Textarea
                           borderRadius={{ base: "5", md: "15" }}
                           border="2px solid black"
                           type="text"
                           placeholder="Contact info, meet time, location, date, etc"
                           value={info}
                           onChange={(e) => setInfo(e.target.value)}
                        ></Textarea>
                     </FormControl>
                  </Box>
               </Stack>
            </ModalBody>
            <ModalFooter gap={5} pt={16}>
               <Button
                  bg="#79A88E"
                  color="white"
                  borderRadius={{ base: "25", md: "35" }}
                  onClick={handleSubmit}
               >
                  Confirm Purchase
               </Button>
               <Button
                  variant="outline"
                  border="3px solid #79A88E"
                  color="#79A88E"
                  borderRadius={{ base: "25", md: "35" }}
                  onClick={onClose}
               >
                  Cancel
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};
export default PurchaseModal;
