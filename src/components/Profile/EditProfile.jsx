import {
   Avatar,
   Button,
   Center,
   Flex,
   FormControl,
   FormLabel,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Stack,
   Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
   const authUser = useAuthStore((state) => state.user);
   const [inputs, setInputs] = useState({
      fullName: "",
      username: "",
   });

   useEffect(() => {
      if (authUser) {
         setInputs({
            fullName: authUser.fullName || "",
            username: authUser.username || "",
         });
      }
   }, [authUser]);
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
            <ModalContent boxShadow={"2xl"} mx={5} pb={7} borderRadius={20}>
               <ModalHeader />
               <ModalCloseButton />
               <ModalBody>
                  <Flex>
                     <Stack spacing={5} w={"full"} maxW={"md"} p={3} my={0}>
                        <Text
                           lineHeight={1.1}
                           fontSize={{ base: "32px", sm: "42px" }}
                           fontWeight={600}
                        >
                           Edit Profile
                        </Text>
                        <FormControl>
                           <Stack direction={["column", "row"]} spacing={6}>
                              <Center>
                                 <Avatar
                                    size="2xl"
                                    src={selectedFile || authUser.profilePicURL}
                                    border={"2px solid white "}
                                 />
                              </Center>
                              <Center w="full">
                                 <Button
                                    w={{ base: "50%", md: "80%" }}
                                    onClick={() => fileRef.current.click()}
                                    borderRadius={10}
                                    fontSize={"18px"}
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
                           <FormLabel fontSize={"18px"}>New Name</FormLabel>
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
                              borderWidth={"2px"}
                              borderColor={"black"}
                           />
                        </FormControl>

                        <FormControl>
                           <FormLabel fontSize={"18px"}>New Username</FormLabel>
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
                              borderWidth={"2px"}
                              borderColor={"black"}
                           />
                        </FormControl>

                        <Stack spacing={6} direction={["row", "row"]}>
                           <Button
                              color={"#79A88E"}
                              variant={"outline"}
                              borderColor={"#79A88E"}
                              borderWidth={"2px"}
                              w="full"
                              size="sm"
                              _hover={{ bg: "#79A88E", color: "white" }}
                              onClick={onClose}
                              borderRadius={10}
                              fontSize={"18px"}
                           >
                              Cancel
                           </Button>
                           <Button
                              bg={"#79A88E"}
                              color={"white"}
                              size="sm"
                              w="full"
                              _hover={{ bg: "#A2C0B0" }}
                              onClick={handleEditProfile}
                              isLoading={isUpdating}
                              borderRadius={10}
                              fontSize={"18px"}
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
