import {
   Box,
   Button,
   Flex,
   Image,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
   VStack,
} from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";

const Post = ({ img, name, price, location, caption }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [liked, setLiked] = useState(false);
   const [likes, setLikes] = useState(10);

   const displayPrice = price ? `$${price}` : "Free";
   const showOBO = price && price !== "Free";

   const handleLike = () => {
      if (liked) {
         setLiked(false);
         setLikes(likes - 1);
      } else {
         setLiked(true);
         setLikes(likes + 1);
      }
   };
   return (
      <>
         <VStack
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
            padding={2}
            w="full"
            minW="100px"
            maxW="1fr"
            onClick={onOpen}
         >
            <Box>
               <Box w="10rem" h="auto" position="relative">
                  <Image
                     src={img}
                     borderRadius="10px"
                     objectFit="cover"
                     position="relative"
                     overflow={"hidden"}
                     w="10rem"
                     h="10rem"
                  />
               </Box>
               <PostFooter name={name} price={price} location={location} />
            </Box>
         </VStack>

         <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered={true}
            size={{ base: "xs", sm: "xl", md: "2xl", lg: "6xl" }}
         >
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent bg={"white"} borderRadius={40} mt={"10%"}>
               <ModalHeader py={5} borderTopRadius={40}>
                  <Box position="static" top="10px" left="10px">
                     <ModalCloseButton size="lg" _hover={{ bg: "none" }} />
                  </Box>
               </ModalHeader>

               <ModalBody py={3} px={3}>
                  <Flex flexDirection={{ base: "column", md: "row" }}>
                     <Box
                        borderRadius={30}
                        position="relative"
                        overflow="hidden"
                        flex={1}
                        w={"100%"}
                        _before={{
                           content: '""',
                           display: "block",
                           pt: { base: "100%", md: "56.25%" },
                        }}
                     >
                        <Image
                           src={img}
                           objectFit="cover"
                           position="absolute"
                           top="0"
                           left="0"
                           width="100%"
                           height="100%"
                        />
                     </Box>

                     <Flex
                        flex={1}
                        flexDirection="column"
                        pl={{ base: "0", md: "10" }}
                        pr={{ base: "0", md: "10" }}
                        justifyContent={{ base: "start", md: "start" }}
                        w={{
                           base: "100%",
                           md: "300px",
                        }}
                        h={"550px"}
                     >
                        <Box
                           display="flex"
                           justifyContent={"space-between"}
                           gap={{ base: "10", sm: "10", md: "10" }}
                           pt={1}
                        >
                           <Text
                              fontSize={{ base: 12, md: 20 }}
                              color="gray"
                              fontWeight={400}
                           >
                              Posted 3 hours ago
                           </Text>
                           <Flex gap={1} fontSize={{ base: 12, md: 20 }}>
                              <FaLocationDot color="gray" fontWeight={400} />
                              <Text color="gray">{location || "Anywhere"}</Text>
                           </Flex>
                        </Box>

                        <Flex
                           justifyContent="space-between"
                           alignContent="flex-start"
                           ml={-1}
                        >
                           <Box
                              fontSize={{ base: 36, md: 56 }}
                              fontWeight={500}
                              as="h4"
                              lineHeight="1.2"
                              overflow="hidden"
                              display="-webkit-box"
                              webkitLineClamp="2"
                              webkitBoxOrient="vertical"
                              maxW="100%"
                           >
                              {name}
                           </Box>
                        </Flex>

                        <Flex
                           justifyContent="space-between"
                           gap={{ base: 0, md: 8, lg: 16 }}
                           mt={-3}
                        >
                           <Box
                              fontSize={{ base: 64, md: 84 }}
                              as="h4"
                              lineHeight="1.5"
                              fontWeight={600}
                           >
                              <Text fontWeight={700}>{displayPrice}</Text>
                           </Box>

                           <Flex flexDirection={"row"} alignItems={"center"}>
                              <Box
                                 onClick={handleLike}
                                 cursor={"pointer"}
                                 fontSize={{ base: 30, md: 40 }}
                                 pr={1}
                              >
                                 {!liked ? <FaRegHeart /> : <FaHeart />}
                              </Box>
                              <Text
                                 fontWeight={600}
                                 fontSize={{ base: 20, md: 30 }}
                                 alignSelf={"center"}
                                 pr={1}
                              >
                                 {likes}
                              </Text>
                           </Flex>
                        </Flex>

                        <Flex gap={{ base: 5, md: 15 }}>
                           <Button
                              bg={"#79A88E"}
                              _hover={{ bg: "#A2C0B0" }}
                              variant="solid"
                              color={"white"}
                              borderRadius={{ base: 35, md: 25 }}
                              fontSize="36px"
                              py={9}
                              px={16}
                           >
                              Buy
                           </Button>

                           {showOBO && (
                              <Button
                                 bg="#D9D9D9"
                                 variant="solid"
                                 color={"black"}
                                 borderRadius={{ base: 35, md: 25 }}
                                 fontSize="36px"
                                 py={9}
                                 px={14}
                              >
                                 Offer
                              </Button>
                           )}
                        </Flex>

                        <Flex pr={5} py={5}>
                           <Box width="100%">
                              <Text fontWeight={"bold"}>Description</Text>
                              <Text>{caption}</Text>
                           </Box>
                        </Flex>
                     </Flex>
                  </Flex>
               </ModalBody>
               <ModalFooter py={5} borderBottomRadius={40}></ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default Post;
