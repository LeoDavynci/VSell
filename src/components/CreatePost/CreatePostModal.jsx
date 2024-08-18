import React from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
   Button,
   Text,
   Input,
   Textarea,
   Flex,
} from "@chakra-ui/react";
import PriceInput from "./PriceInput";
import ImageUploader from "./ImageUploader";
import LocationSuggestions from "./LocationSuggestions";
import { qualityOptions, categoryOptions } from "../../utils/postOptions";
import { Select } from "chakra-react-select";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const CreatePostModal = ({
   isOpen,
   onClose,
   formState,
   handleInputChange,
   handlePostCreation,
   isLoading,
   ...props
}) => {
   if (!formState) {
      return null; // or return a loading state
   }
   const navigate = useNavigate();
   const authUser = useAuthStore((state) => state.user);

   const redirectToLogin = () => {
      navigate("/auth");
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
         <ModalOverlay />
         <ModalContent
            bg={"white"}
            border={"1px solid gray"}
            borderRadius={{ base: "15px", md: "25px" }}
            pb={2}
         >
            <ModalHeader fontSize={30}>Sell an item</ModalHeader>
            <ModalCloseButton borderRadius={15} />
            <ModalBody>
               <Text mt={-2}>
                  Item Name <span style={{ color: "red" }}>*</span>
               </Text>
               <Input
                  isRequired
                  maxLength={40}
                  value={formState.itemName}
                  onChange={(e) =>
                     handleInputChange("itemName", e.target.value)
                  }
                  borderRadius={5}
                  borderColor="#E6E6E6"
                  borderWidth="1px"
               />

               <PriceInput
                  price={formState.price}
                  isOBO={formState.isOBO}
                  handleInputChange={handleInputChange}
               />

               <Flex gap={6} w={"full"}>
                  <Flex flexDir={"column"} style={{ width: "40%" }}>
                     <Text mt={2}>
                        Condition <span style={{ color: "red" }}>*</span>
                     </Text>
                     <Select
                        options={qualityOptions}
                        value={qualityOptions.find(
                           (option) => option.value === formState.itemQuality
                        )}
                        onChange={(option) =>
                           handleInputChange("itemQuality", option.value)
                        }
                     />
                  </Flex>
                  <Flex flexDir={"column"} style={{ width: "60%" }}>
                     <Text mt={2}>
                        Category <span style={{ color: "red" }}>*</span>
                     </Text>
                     <Select
                        options={categoryOptions}
                        value={categoryOptions.find(
                           (option) => option.value === formState.category
                        )}
                        onChange={(option) =>
                           handleInputChange("category", option.value)
                        }
                     />
                  </Flex>
               </Flex>

               <LocationSuggestions
                  value={formState.pickupLocation}
                  onChange={(value) =>
                     handleInputChange("pickupLocation", value)
                  }
               />

               <Text mt={2}>Description</Text>
               <Textarea
                  maxLength={250}
                  value={formState.caption}
                  onChange={(e) => handleInputChange("caption", e.target.value)}
                  borderRadius={5}
                  borderColor="#E6E6E6"
                  borderWidth="1px"
               />

               <ImageUploader
                  selectedFiles={formState.selectedFiles}
                  onChange={(files) =>
                     handleInputChange("selectedFiles", files)
                  }
               />
            </ModalBody>
            <ModalFooter>
               {authUser ? (
                  <Button
                     bg={"#79A88E"}
                     _hover={{ bg: "#A2C0B0" }}
                     color={"white"}
                     size={"lg"}
                     borderRadius={10}
                     w={"full"}
                     onClick={handlePostCreation}
                     isLoading={isLoading}
                  >
                     Post
                  </Button>
               ) : (
                  <Button
                     bg={"#716FE9"}
                     _hover={{ bg: "#A2C0B0" }}
                     color={"white"}
                     size={"lg"}
                     borderRadius={10}
                     w={"full"}
                     onClick={redirectToLogin}
                  >
                     Login to Post
                  </Button>
               )}
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default CreatePostModal;
