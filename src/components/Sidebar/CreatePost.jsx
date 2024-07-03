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
import { useRef, useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import {
   addDoc,
   collection,
   doc,
   updateDoc,
   arrayUnion,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useAuthStore from "./../../store/authStore";
import usePreviewImg from "./../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useUserProfileStore from "./../../store/userProfileStore";
import usePostStore from "../../store/postStore";

const CreatePost = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [caption, setCaption] = useState("");
   const imageRef = useRef(null);
   const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
   const { isLoading, handleCreatePost } = useCreatePost();
   const showToast = useShowToast();

   const handlePostCreation = async () => {
      try {
         await handleCreatePost(selectedFile, caption);
         onClose();
         setCaption("");
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
                  <Input autoCapitalize="" maxLength={40} borderRadius={15} />
                  <Text>Price</Text>
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
                           max="999999"
                           borderRadius={15}
                        />
                     </InputGroup>
                     <Checkbox colorScheme={"green"} color={"#79A88E"} ml={4}>
                        OBO
                     </Checkbox>
                  </Flex>
                  <Text>Pickup Location</Text>
                  <Input borderRadius={15} />
                  <Text>caption</Text>
                  <Textarea
                     maxLength={250}
                     borderRadius={15}
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
                     >
                        <Image src={selectedFile} alt="Image" />
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
   const { createPost } = usePostStore((state) => state.createPost);
   const addPost = useUserProfileStore((state) => state.addPost);
   const userProfile = useUserProfileStore((state) => state.userProfile);
   const { pathname } = useLocation();

   const handleCreatePost = async (selectedFile, caption) => {
      if (isLoading) return;
      if (!selectedFile) throw new Error("Please select an image");
      setIsLoading(true);
      const newPost = {
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

         createPost({ ...newPost, id: postDocRef.id });
         addPost({ ...newPost, id: postDocRef.id });

         showToast("Success", "Listing created", "success");
      } catch (error) {
         showToast("Error", error.message, "error");
      } finally {
         setIsLoading(false);
      }
   };

   return { isLoading, handleCreatePost };
}
