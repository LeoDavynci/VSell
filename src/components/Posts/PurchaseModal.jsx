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
} from "@chakra-ui/react";

const PurchaseModal = ({
   isOpen,
   onClose,
   post,
   userProfile,
   handlePurchaseSubmit,
}) => {
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [meetupLocation, setMeetupLocation] = useState("");

   const handleSubmit = () => {
      handlePurchaseSubmit(selectedDate, selectedTime, meetupLocation);
      onClose();
   };

   return (
      <Modal
         isOpen={isOpen}
         onClose={() => {
            onClose();
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
            <ModalBody color="black" fontWeight={500}>
               <Stack spacing={4}>
                  <Box>
                     <Text>Item(s): {post.itemName || "Item"}</Text>
                     <Text>
                        Price: {post.price ? `$${post.price}` : "Free"}
                     </Text>
                     <Text>Sold By: {userProfile?.fullName}</Text>
                  </Box>
                  <Box pt={8}>
                     <FormControl isRequired>
                        <FormLabel>Meetup Date</FormLabel>
                        <Input
                           borderRadius={{ base: "25", md: "35" }}
                           border="2px solid black"
                           type="date"
                           value={selectedDate}
                           onChange={(e) => setSelectedDate(e.target.value)}
                        />
                     </FormControl>
                     <FormControl isRequired>
                        <FormLabel>Meetup Time</FormLabel>
                        <Input
                           borderRadius={{ base: "25", md: "35" }}
                           border="2px solid black"
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
                              border="2px solid black"
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
