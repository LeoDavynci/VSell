import {
   Avatar,
   Button,
   Center,
   Flex,
   FormControl,
   FormLabel,
   Heading,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useAuthStore from "../../store/authStore";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
   const [inputs, setInputs] = useState({
      fullName: "",
      username: "",
   });
   const authUser = useAuthStore((state) => state.user);
   const fileRef = useRef(null);
   const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
   const { isUpdating, editProfile } = useEditProfile();
   const showToast = useShowToast();

   const handleEditProfile = async () => {
      try {
         await editProfile(inputs, selectedFile);
         setSelectedFile(null);
         onClose();
      } catch (error) {
         showToast("Error", error.message, "error");
      }
   };

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
               bg={"lime"}
               boxShadow={"2xl"}
               mx={5}
               pb={7}
               borderRadius={20}
            >
               <ModalHeader />
               <ModalCloseButton />
               <ModalBody>
                  {/* Container Flex */}
                  <Flex>
                     <Stack
                        spacing={4}
                        w={"full"}
                        maxW={"md"}
                        bg={"salmon"}
                        p={3}
                        my={0}
                     >
                        <Heading
                           lineHeight={1.1}
                           fontSize={{ base: "2xl", sm: "3xl" }}
                        >
                           Edit Profile
                        </Heading>
                        <FormControl>
                           <Stack direction={["column", "row"]} spacing={6}>
                              <Center>
                                 <Avatar
                                    size="2xl"
                                    src={selectedFile || authUser.profilePicURL}
                                    border={"1px solid white "}
                                 />
                              </Center>
                              <Center w="full">
                                 <Button
                                    w={{ base: "60%", md: "90%" }}
                                    onClick={() => fileRef.current.click()}
                                    borderRadius={10}
                                 >
                                    Change Picture
                                 </Button>
                              </Center>
                              <Input
                                 type="file"
                                 hidden
                                 ref={fileRef}
                                 onChange={handleImageChange}
                              />
                           </Stack>
                        </FormControl>

                        <FormControl>
                           <FormLabel fontSize={"md"}>New Name</FormLabel>
                           <Input
                              placeholder={""}
                              size={"sm"}
                              type={"text"}
                              value={inputs.fullName}
                              onChange={(e) =>
                                 setInputs({
                                    ...inputs,
                                    fullName: e.target.value,
                                 })
                              }
                              borderRadius={10}
                           />
                        </FormControl>

                        <FormControl>
                           <FormLabel fontSize={"md"}>New Username</FormLabel>
                           <Input
                              placeholder={""}
                              size={"sm"}
                              type={"text"}
                              value={inputs.username}
                              onChange={(e) =>
                                 setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                 })
                              }
                              borderRadius={10}
                           />
                        </FormControl>

                        <Stack spacing={6} direction={["column", "row"]}>
                           <Button
                              bg={"red.400"}
                              color={"white"}
                              w="full"
                              size="sm"
                              _hover={{ bg: "red.500" }}
                              onClick={onClose}
                              borderRadius={10}
                           >
                              Cancel
                           </Button>
                           <Button
                              bg={"blue.400"}
                              color={"white"}
                              size="sm"
                              w="full"
                              _hover={{ bg: "blue.500" }}
                              onClick={handleEditProfile}
                              isLoading={isUpdating}
                              borderRadius={10}
                           >
                              Submit
                           </Button>
                        </Stack>
                     </Stack>
                  </Flex>
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
};

export default EditProfile;
