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
} from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";
import Compressor from "compressorjs";
import Resizer from "react-image-file-resizer";
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

   const handleImageChange = (event) => {
      const files = Array.from(event.target.files);
      if (files.length + selectedFiles.length > 4) {
         showToast("Error", "You can only upload up to 4 images", "error");
         return;
      }

      files.forEach((file) => {
         Resizer.imageFileResizer(
            file,
            800, // max width
            800, // max height
            "JPEG", // output format
            80, // quality
            0, // rotation
            (uri) => {
               const blob = dataURLtoBlob(uri);
               new Compressor(blob, {
                  quality: 0.8, // quality of the compressed image
                  success: (compressedResult) => {
                     const compressedFile = new File(
                        [compressedResult],
                        file.name,
                        { type: compressedResult.type }
                     );
                     const fileReader = new FileReader();
                     fileReader.onload = () => {
                        setSelectedFiles((prev) => [
                           ...prev,
                           fileReader.result,
                        ]);
                     };
                     fileReader.readAsDataURL(compressedFile);
                  },
               });
            },
            "base64" // output type
         );
      });
   };

   const dataURLtoBlob = (dataurl) => {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
         u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
   };
   const handlePostCreation = async () => {
      try {
         await handleCreatePost(
            selectedFiles,
            caption,
            itemName,
            price,
            pickupLocation,
            isOBO
         );
         onClose();
         setCaption("");
         setItemName("");
         setPrice("");
         setPickupLocation("");
         setIsOBO(false);
         setSelectedFiles([]);
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
               <IoMdAddCircle color="white" size={40} />
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
                  <Text mt={2}>Pickup Location</Text>
                  <Input
                     borderRadius={15}
                     borderColor={"black"}
                     borderWidth={"2px"}
                     value={pickupLocation}
                     onChange={(e) => {
                        const newValue = e.target.value.slice(0, 20);
                        setPickupLocation(newValue);
                     }}
                  />
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
                     onChange={handleImageChange}
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
      isOBO
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
