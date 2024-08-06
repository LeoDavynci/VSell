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
   Tooltip,
} from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Select } from "chakra-react-select";

const CreatePost = () => {
   const authUser = useAuthStore((state) => state.user);
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
   const navigate = useNavigate();

   const redirectToLogin = () => {
      navigate("/auth");
   };

   const [itemQuality, setItemQuality] = useState("");
   const qualityOptions = [
      { value: "New", label: "New" },
      { value: "Like New", label: "Like New" },
      { value: "Very Good", label: "Very Good" },
      { value: "Good", label: "Good" },
      { value: "Fair", label: "Fair" },
      { value: "Poor", label: "Poor" },
   ];

   const [category, setCategory] = useState("");
   const categoryOptions = [
      { value: "Misc", label: "Misc" },
      { value: "Course Materials", label: "Course Materials" },
      { value: "Electronics", label: "Electronics" },
      { value: "Dorm Essentials", label: "Dorm Essentials" },
      { value: "Office Supplies", label: "School Supplies" },
      { value: "Furniture", label: "Furniture" },
      { value: "Clothing & Accessories", label: "Clothing & Accessories" },
      { value: "Vehicles", label: "Vehicles" },
      { value: "Fitness Equipment", label: "Fitness Equipment" },
      { value: "Entertainment", label: "Entertainment" },
      { value: "Kitchen & Dining", label: "Kitchen & Dining" },
      { value: "Event Tickets", label: "Event Tickets" },
      { value: "Books", label: "Books" },
      { value: "Beauty & Personal Care", label: "Beauty & Personal Care" },
      { value: "Collectibles & Art", label: "Collectibles & Art" },
   ];

   const [suggestedLocations, setSuggestedLocations] = useState([]);
   const fetchSuggestedLocations = (input) => {
      // This is a list of locations, no API was found for this list.
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
      if (!itemName.trim()) {
         showToast("Error", "Item name is required", "error");
         return;
      }
      if (!itemQuality) {
         showToast("Error", "Condition is required", "error");
         return;
      }
      if (!category) {
         showToast("Error", "Category is required", "error");
         return;
      }

      try {
         await handleCreatePost(
            selectedFiles,
            caption,
            itemName,
            price,
            pickupLocation,
            isOBO,
            itemQuality,
            category
         );
         onClose();
         setCaption("");
         setItemName("");
         setPrice("");
         setPickupLocation("");
         setIsOBO(false);
         setSelectedFiles([]);
         setItemQuality("");
         setCategory("");
      } catch (error) {
         showToast("Error", error.message, "error");
      }
   };

   return (
      <>
         <Flex
            width={"60px"}
            height={"60px"}
            align={"center"}
            justify={"center"}
         >
            <Tooltip
               label="List an Item"
               aria-label="List an Item"
               hasArrow
               bg="#79A88E"
               color="white"
               fontWeight="medium"
               fontSize="sm"
               padding="4px 8px"
               borderRadius="lg"
               boxShadow="md"
            >
               <Box
                  width={"50px"}
                  height={"50px"}
                  bg={"#719C83"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  cursor="pointer"
                  onClick={onOpen}
                  borderRadius={15}
               >
                  <IoMdAddCircle color="white" size={30} />
               </Box>
            </Tooltip>
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
                  {/* Item Name */}
                  <Text mt={-2}>
                     Item Name <span style={{ color: "red" }}>*</span>
                  </Text>

                  <Input
                     isRequired
                     autoCapitalize=""
                     maxLength={40}
                     borderRadius={10}
                     borderColor="#E6E6E6"
                     borderWidth={"2px"}
                     value={itemName}
                     onChange={(e) => {
                        const newValue = e.target.value.slice(0, 40);
                        setItemName(newValue);
                     }}
                  />
                  {/* Price and OBO checkbox and Quality*/}
                  <Flex flexDir={"row"} w={"full"}>
                     <Flex flexDir={"column"} w={"full"}>
                        <Text mt={2}>Price</Text>
                        <InputGroup width="full">
                           <InputLeftElement
                              pointerEvents="none"
                              color="gray.300"
                              fontSize="1.2em"
                           >
                              $
                           </InputLeftElement>
                           <Input
                              w={"full"}
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
                                    // Check if the value is within the allowed range
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
                              onBlur={() => {
                                 // On blur, format the price to always show two decimal places
                                 if (price !== "") {
                                    const formattedPrice =
                                       parseFloat(price).toFixed(2);
                                    setPrice(formattedPrice);
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
                              borderRadius={10}
                              borderColor="#E6E6E6"
                              borderWidth="2px"
                           />
                        </InputGroup>
                     </Flex>

                     {/* OBO checkbox */}
                     <Flex
                        flexDir={"column"}
                        justify={"center"}
                        pb={2}
                        pr={4}
                        pl={2}
                     >
                        <Tooltip
                           label="Or Best Offer"
                           borderRadius={50}
                           top={-15}
                        >
                           <Text>OBO</Text>
                        </Tooltip>
                        <Checkbox
                           pt={2}
                           colorScheme={"green"}
                           color={"#79A88E"}
                           ml={4}
                           isChecked={isOBO}
                           onChange={(e) => setIsOBO(e.target.checked)}
                        ></Checkbox>
                     </Flex>

                     {/* Item Quality */}
                     <Flex flexDir={"column"} w={"full"}>
                        <Text mt={2}>
                           Condition <span style={{ color: "red" }}>*</span>
                        </Text>
                        <Select
                           required
                           isRequired
                           placeholder="Select"
                           options={qualityOptions}
                           value={qualityOptions.find(
                              (option) => option.value === itemQuality
                           )}
                           onChange={(selectedOption) =>
                              setItemQuality(selectedOption.value)
                           }
                           chakraStyles={{
                              control: (provided) => ({
                                 ...provided,
                                 borderRadius: 10,
                                 borderColor: "#E6E6E6",
                                 borderWidth: "2px",
                                 backgroundColor: "white",
                              }),
                              option: (provided, state) => ({
                                 ...provided,
                                 backgroundColor: state.isSelected
                                    ? "#79A88E"
                                    : "79A88E",
                                 color: state.isSelected ? "white" : "gray.800",
                                 "&:hover": {
                                    backgroundColor: "#79A88E",
                                    color: "white",
                                 },
                              }),
                              menu: (provided) => ({
                                 ...provided,
                                 maxHeight: "300px", // Set the max height for the scrollable area
                                 overflowY: "auto", // Enable vertical scrolling
                              }),
                           }}
                        />
                     </Flex>
                  </Flex>

                  {/* Category and Quality */}
                  <Flex flexDir={"row"} w={"full"} gap={4}>
                     <Flex flexDir={"column"} w={"full"}>
                        <Text mt={2}>
                           Category <span style={{ color: "red" }}>*</span>
                        </Text>
                        <Box width="100%">
                           <Select
                              isRequired
                              required
                              placeholder="Select"
                              options={categoryOptions}
                              value={categoryOptions.find(
                                 (option) => option.value === category
                              )}
                              onChange={(selectedOption) =>
                                 setCategory(selectedOption.value)
                              }
                              chakraStyles={{
                                 control: (provided) => ({
                                    ...provided,
                                    borderRadius: 10,
                                    borderColor: "#E6E6E6",
                                    borderWidth: "2px",
                                    backgroundColor: "white",
                                 }),
                                 option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                       ? "#79A88E"
                                       : "79A88E",
                                    color: state.isSelected
                                       ? "white"
                                       : "gray.800",
                                    "&:hover": {
                                       backgroundColor: "#79A88E",
                                       color: "white",
                                    },
                                 }),
                                 menu: (provided) => ({
                                    ...provided,
                                    maxHeight: "190px", // Set the max height for the scrollable area
                                    overflowY: "auto", // Enable vertical scrolling
                                    minWidth: "200px",
                                 }),
                              }}
                           />
                        </Box>
                     </Flex>

                     <Flex flexDir={"column"} w={"full"}>
                        {/* Pickup Location */}
                        <Text mt={2}>Pickup Location</Text>
                        <Input
                           borderRadius={10}
                           borderColor="#E6E6E6"
                           borderWidth="2px"
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
                     </Flex>
                  </Flex>

                  {/* Description */}
                  <Text mt={2}>Description</Text>
                  <Textarea
                     maxLength={250}
                     borderRadius={10}
                     borderColor="#E6E6E6"
                     borderWidth="2px"
                     value={caption}
                     onChange={(e) => {
                        const newValue = e.target.value.slice(0, 250);
                        setCaption(newValue);
                     }}
                  />

                  {/* Upload photos */}
                  <Flex flexDir={"column"}>
                     <Input
                        type="file"
                        hidden
                        ref={imageRef}
                        onChange={handleImageChangeWrapper}
                     />
                     <Button
                        mt={4}
                        borderRadius={10}
                        onClick={() => imageRef.current.click()}
                     >
                        Upload Photo {"(up to 4)"}
                     </Button>
                  </Flex>

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
                  {(authUser && (
                     <Button
                        bg={"#79A88E"}
                        _hover={{ bg: "#A2C0B0" }}
                        variant="solid"
                        color={"white"}
                        size={"lg"}
                        borderRadius={10}
                        w={"full"}
                        onClick={handlePostCreation}
                        isLoading={isLoading}
                     >
                        Post
                     </Button>
                  )) || (
                     <Button
                        bg={"#716FE9"}
                        _hover={{ bg: "#A2C0B0" }}
                        variant="solid"
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
      itemQuality,
      category
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
         category: category,
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
