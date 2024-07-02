import {
   Box,
   Button,
   Flex,
   Input,
   InputGroup,
   InputLeftElement,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   Textarea,
   useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsFillImageFill } from "react-icons/bs";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const CreatePost = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   return (
      <>
         <Flex
            width={"70px"}
            height={"70px"}
            align={"center"}
            justify={"center"}
         >
            <Box
               width={"50px"}
               height={"50px"}
               borderRadius={"50%"}
               bg={"white"}
               display={"flex"}
               alignItems={"center"}
               justifyContent={"center"}
               cursor="pointer"
               onClick={onOpen}
            >
               <MdOutlineAddCircleOutline color="black" size={40} />
            </Box>
         </Flex>

         <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />

            <ModalContent
               bg={"white"}
               border={"1px solid gray"}
               borderRadius={30}
               pb={2}
            >
               <ModalHeader fontSize={30}>Sell an item</ModalHeader>
               <ModalCloseButton borderRadius={15} />
               <ModalBody>
                  <Text>Item Name</Text>
                  <Input
                     autoCapitalize=""
                     maxLength={40}
                     required
                     borderRadius={15}
                  />
                  <Text>Price</Text>
                  <InputGroup>
                     <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                     >
                        $
                     </InputLeftElement>
                     <Input
                        type="number"
                        min="0"
                        max="999999"
                        required
                        borderRadius={15}
                     />
                  </InputGroup>
                  <Text>Pickup Location</Text>
                  <Input borderRadius={15} />
                  <Text>Description</Text>
                  <Textarea maxLength={250} borderRadius={15} />

                  <Input type="file" hidden />

                  <BsFillImageFill
                     style={{
                        marginTop: "15px",
                        marginLeft: "5px",
                        cursor: "pointer",
                     }}
                     size={16}
                  />
               </ModalBody>

               <ModalFooter>
                  <Button
                     bg={"#79A88E"}
                     _hover={{ bg: "#A2C0B0" }}
                     variant="solid"
                     color={"white"}
                     size={"lg"}
                     borderRadius={15}
                  >
                     Post
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default CreatePost;
