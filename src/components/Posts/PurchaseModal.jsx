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
      setInfo("");
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
         size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
      >
         <ModalOverlay />
         <ModalContent borderRadius={{ base: "15", md: "25" }}>
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
                  <Box>
                     <FormControl isRequired>
                        <FormLabel>Message Buyer</FormLabel>
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
            <ModalFooter gap={5} pt={8}>
               <Button
                  bg="#79A88E"
                  color="white"
                  borderRadius={{ base: "10", md: "15" }}
                  onClick={handleSubmit}
               >
                  Confirm Purchase
               </Button>
               <Button
                  variant="outline"
                  border="3px solid #79A88E"
                  color="#79A88E"
                  borderRadius={{ base: "10", md: "15" }}
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
