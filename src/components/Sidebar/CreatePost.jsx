import React, { useRef, useState } from "react";
import {
   Box,
   Button,
   Checkbox,
   CloseButton,
   Flex,
   Image,
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
   Select,
} from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import {
   addDoc,
   arrayUnion,
   collection,
   doc,
   updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { handleImageChange } from "../../utils/imageUtils";

const CreatePost = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [itemName, setItemName] = useState("");
   const [price, setPrice] = useState("");
   const [pickupLocation, setPickupLocation] = useState("");
   const [isOBO, setIsOBO] = useState(false);
   const [caption, setCaption] = useState("");
   const [selectedFiles, setSelectedFiles] = useState([]);
   const imageRef = useRef(null);
   const showToast = useShowToast();
   const { isLoading, handleCreatePost } = useCreatePost();

   const [itemQuality, setItemQuality] = useState("");
   const qualityOptions = [
      { value: "New", label: "New" },
      { value: "Like New", label: "Like New" },
      { value: "Very Good", label: "Very Good" },
      { value: "Good", label: "Good" },
      { value: "Fair", label: "Fair" },
      { value: "Poor", label: "Poor" },
   ];

   const [suggestedLocations, setSuggestedLocations] = useState([]);
   const fetchSuggestedLocations = (input) => {
      // This is a mock function. In a real scenario, you'd call an API here.
      const mockLocations = [
         "Crawford House",
         "East House",
         "Hank Ingram House",
         "Gillette House",
         "Memorial House",
         "Murray House",
         "North House",
         "Stambaugh House",
         "Sutherland House",
         "West House",
         "Warren College",
         "Moore College",
         "Mayfields",
         "McGills",
         "McTyeire",
         "Barnard Hall",
         "Cole Hall",
         "Lupton House",
         "Scales House",
         "Stapleton House",
         "Tolman Hall",
         "Vanderbilt Hall",
         "Vaughn House",
         "Blakemore House",
         "Chaffins",
         "Lewis",
         "Morgan",
         "Carmichael College",
         "Stevenson Library",
         "MRB",
         "FGH",
         "Buttrick",
         "Sony Building",
         "Divinity School",
         "Rand",
         "Wilson",
         "Kirkland",
         "EBI",
         "Olin",
         "The Wondry",
         "Blair",
         "Central Library",
         "Peabody Library",
         "Commons Center",
         "The Rec",
         "The Pub",
         "Alumni Hall",
         "Kissam",
         "Rothschild",
         "Zeppos",
      ];

      return mockLocations.filter((location) =>
         location.toLowerCase().includes(input.toLowerCase())
      );
   };

   const handleImageChangeWrapper = (event) => {
      handleImageChange(event, selectedFiles, setSelectedFiles, showToast);
   };

   const handlePostCreation = async () => {
      try {
         await handleCreatePost(
            selectedFiles,
            caption,
            itemName,
            price,
            pickupLocation,
            isOBO,
            itemQuality
         );
         onClose();
         setCaption("");
         setItemName("");
         setPrice("");
         setPickupLocation("");
         setIsOBO(false);
         setSelectedFiles([]);
         setItemQuality("");
      } catch (error) {
         showToast("Error", error.message, "error");
      }
   };

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
               bg={"none"}
               display={"flex"}
               alignItems={"center"}
               justifyContent={"center"}
               cursor="pointer"
               onClick={onOpen}
            >
               <IoMdAddCircle color="white" size={30} />
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
                  <Text mt={-2}>Item Name</Text>
                  <Input
                     autoCapitalize=""
                     maxLength={40}
                     borderRadius={15}
                     borderColor={"black"}
                     borderWidth={"2px"}
                     value={itemName}
                     onChange={(e) => {
                        const newValue = e.target.value.slice(0, 40);
                        setItemName(newValue);
                     }}
                  />
                  <Text mt={2}>Price</Text>
                  <Flex align="center">
                     <InputGroup width="150px">
                        <InputLeftElement
                           pointerEvents="none"
                           color="gray.300"
                           fontSize="1.2em"
                        >
                           $
                        </InputLeftElement>
                        <Input
                           value={price}
                           onChange={(e) => {
                              const value = e.target.value;

                              // Allow empty input
                              if (value === "") {
                                 setPrice("");
                                 return;
                              }

                              // Only allow numbers and one decimal point
                              const regex = /^\d*\.?\d{0,2}$/;
                              if (regex.test(value)) {
                                 const numValue = parseFloat(value);
                                 if (
                                    !isNaN(numValue) &&
                                    numValue >= 0 &&
                                    numValue <= 9999.99
                                 ) {
                                    setPrice(value);
                                 }
                              }
                           }}
                           onKeyPress={(e) => {
                              const charCode = e.which ? e.which : e.keyCode;
                              if (
                                 charCode > 31 &&
                                 (charCode < 48 || charCode > 57) &&
                                 charCode !== 46
                              ) {
                                 e.preventDefault();
                              }
                           }}
                           inputMode="decimal"
                           borderRadius={15}
                           borderColor="black"
                           borderWidth="2px"
                        />
                     </InputGroup>
                     <Checkbox
                        colorScheme={"green"}
                        color={"#79A88E"}
                        ml={4}
                        isChecked={isOBO}
                        onChange={(e) => setIsOBO(e.target.checked)}
                     >
                        OBO
                     </Checkbox>
                  </Flex>
                  <Text mt={2}>Item Quality</Text>
                  <Select
                     required
                     placeholder="Select quality"
                     borderRadius={15}
                     borderColor="black"
                     borderWidth="2px"
                     value={itemQuality}
                     onChange={(e) => setItemQuality(e.target.value)}
                     bg="white"
                     color="gray.800"
                     sx={{
                        "& option": {
                           bg: "white",
                           color: "gray.800",
                        },
                        "& option:hover": {
                           bg: "#79A88E",
                        },
                        "& option:checked": {
                           bg: "#79A88E !important",
                           color: "white !important",
                        },
                     }}
                  >
                     {qualityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                           {option.label}
                        </option>
                     ))}
                  </Select>
                  <Text mt={2}>Pickup Location</Text>
                  <Input
                     borderRadius={15}
                     borderColor={"black"}
                     borderWidth={"2px"}
                     value={pickupLocation}
                     onChange={(e) => {
                        const newValue = e.target.value.slice(0, 20);
                        setPickupLocation(newValue);
                        if (newValue.length > 1) {
                           const suggestions =
                              fetchSuggestedLocations(newValue);
                           setSuggestedLocations(suggestions);
                        } else {
                           setSuggestedLocations([]);
                        }
                     }}
                  />
                  {suggestedLocations.length > 0 && (
                     <Box
                        mt={2}
                        borderWidth={1}
                        borderRadius={15}
                        maxH="200px"
                        overflowY="auto"
                     >
                        {suggestedLocations.map((location, index) => (
                           <Box
                              key={index}
                              p={2}
                              _hover={{ bg: "gray.100" }}
                              cursor="pointer"
                              onClick={() => {
                                 setPickupLocation(location);
                                 setSuggestedLocations([]);
                              }}
                           >
                              {location}
                           </Box>
                        ))}
                     </Box>
                  )}
                  <Text mt={2}>Description</Text>
                  <Textarea
                     maxLength={250}
                     borderRadius={15}
                     borderColor={"black"}
                     borderWidth={"2px"}
                     value={caption}
                     onChange={(e) => {
                        const newValue = e.target.value.slice(0, 250);
                        setCaption(newValue);
                     }}
                  />

                  <Input
                     type="file"
                     hidden
                     ref={imageRef}
                     onChange={handleImageChangeWrapper}
                  />

                  <Text mt={2}>Upload up to 4 photos</Text>
                  <Button
                     borderRadius={15}
                     onClick={() => imageRef.current.click()}
                  >
                     Upload Photo
                  </Button>

                  {selectedFiles.length > 0 && (
                     <Flex
                        mt={5}
                        w={"full"}
                        flexWrap="wrap"
                        justifyContent={"center"}
                     >
                        {selectedFiles.map((file, index) => (
                           <Box key={index} position="relative" m={2}>
                              <Image
                                 borderRadius={15}
                                 src={file}
                                 alt={`Image ${index + 1}`}
                                 maxH="200px"
                                 maxW="200px"
                              />
                              <CloseButton
                                 position={"absolute"}
                                 top={2}
                                 right={2}
                                 onClick={() => {
                                    setSelectedFiles((prev) =>
                                       prev.filter((_, i) => i !== index)
                                    );
                                 }}
                              />
                           </Box>
                        ))}
                     </Flex>
                  )}
               </ModalBody>

               <ModalFooter>
                  <Button
                     bg={"#79A88E"}
                     _hover={{ bg: "#A2C0B0" }}
                     variant="solid"
                     color={"white"}
                     size={"lg"}
                     borderRadius={15}
                     onClick={handlePostCreation}
                     isLoading={isLoading}
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

function useCreatePost() {
   const showToast = useShowToast();
   const [isLoading, setIsLoading] = useState(false);
   const authUser = useAuthStore((state) => state.user);
   const createPost = usePostStore((state) => state.createPost);
   const addPost = useUserProfileStore((state) => state.addPost);
   const userProfile = useUserProfileStore((state) => state.userProfile);
   const { pathname } = useLocation();

   const handleCreatePost = async (
      selectedFiles,
      caption,
      itemName,
      price,
      pickupLocation,
      isOBO,
      itemQuality
   ) => {
      if (isLoading) return;
      if (selectedFiles.length === 0)
         throw new Error("Please select at least one image");
      setIsLoading(true);
      const newPost = {
         itemName: itemName,
         price: parseFloat(price),
         pickupLocation: pickupLocation,
         isOBO: isOBO,
         caption: caption,
         itemQuality: itemQuality,
         likes: [],
         createdAt: Date.now(),
         createdBy: authUser.uid,
      };

      try {
         const postDocRef = await addDoc(
            collection(firestore, "posts"),
            newPost
         );
         const userDocRef = doc(firestore, "users", authUser.uid);

         await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

         const imageURLs = await Promise.all(
            selectedFiles.map(async (file, index) => {
               const imageRef = ref(storage, `posts/${postDocRef.id}_${index}`);
               await uploadString(imageRef, file, "data_url");
               return getDownloadURL(imageRef);
            })
         );

         await updateDoc(postDocRef, { imageURLs: imageURLs });

         newPost.imageURLs = imageURLs;

         if (
            userProfile &&
            authUser.user &&
            userProfile.uid === authUser.user.uid
         ) {
            createPost({ ...newPost, id: postDocRef.id });
         }

         if (
            pathname !== "/" &&
            userProfile &&
            authUser.user &&
            userProfile.uid === authUser.user.uid
         ) {
            addPost({ ...newPost, id: postDocRef.id });
         }

         showToast("Success", "Post created successfully", "success");
      } catch (error) {
         showToast("Error", error.message, "error");
      } finally {
         setIsLoading(false);
      }
   };

   return { isLoading, handleCreatePost };
}
