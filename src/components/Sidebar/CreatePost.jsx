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

import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
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
   const imageRef = useRef(null);

   const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
   const showToast = useShowToast();
   const { isLoading, handleCreatePost } = useCreatePost();

   const handlePostCreation = async () => {
      try {
         await handleCreatePost(
            selectedFile,
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
         setSelectedFile(null);
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
                     onChange={(e) => setItemName(e.target.value)}
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
                           type="number"
                           min="0"
                           max="9999"
                           borderRadius={15}
                           borderColor={"black"}
                           borderWidth={"2px"}
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
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
                     onChange={(e) => setPickupLocation(e.target.value)}
                  />
                  <Text mt={2}>Description</Text>
                  <Textarea
                     maxLength={250}
                     borderRadius={15}
                     borderColor={"black"}
                     borderWidth={"2px"}
                     value={caption}
                     onChange={(e) => setCaption(e.target.value)}
                  />

                  <Input
                     type="file"
                     hidden
                     ref={imageRef}
                     onChange={handleImageChange}
                  />

                  <Button
                     mt={4}
                     borderRadius={15}
                     onClick={() => imageRef.current.click()}
                  >
                     Upload Photo
                  </Button>

                  {selectedFile && (
                     <Flex
                        mt={5}
                        w={"full"}
                        position={"relative"}
                        justifyContent={"center"}
                        borderRadius={15}
                     >
                        <Image
                           borderRadius={15}
                           s
                           src={selectedFile}
                           alt="Image"
                        />
                        <CloseButton
                           position={"absolute"}
                           top={2}
                           right={2}
                           onClick={() => {
                              setSelectedFile(null);
                           }}
                        />
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
      selectedFile,
      caption,
      itemName,
      price,
      pickupLocation,
      isOBO
   ) => {
      if (isLoading) return;
      if (!selectedFile) throw new Error("Please select an image");
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
         const imageRef = ref(storage, `posts/${postDocRef.id}`);

         await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
         await uploadString(imageRef, selectedFile, "data_url");
         const downloadURL = await getDownloadURL(imageRef);

         await updateDoc(postDocRef, { imageURL: downloadURL });

         newPost.imageURL = downloadURL;

         console.log("userProfile:", userProfile);
         console.log("authUser:", authUser);

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
