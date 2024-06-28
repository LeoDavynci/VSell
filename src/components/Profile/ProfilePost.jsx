import {
   Box,
   Button,
   Flex,
   GridItem,
   Image,
   Img,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";

const ProfilePost = ({ img }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [liked, setLiked] = useState(false);
   const [likes, setLikes] = useState(10);

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
         <GridItem
            cursor={"pointer"}
            borderRadius={10}
            overflow={"hidden"}
            borderColor={"black"}
            position={"relative"}
            aspectRatio={1 / 1}
            onClick={onOpen}
         >
            <Flex
               opacity={0}
               _hover={{ opacity: 1 }}
               position={"absolute"}
               top={0}
               left={0}
               right={0}
               bottom={0}
               bg={"blackAlpha.700"}
               transition={"all 0.03s ease"}
               zIndex={1}
               justifyContent={"center"}
            >
               <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                  <Flex color={"white"}>
                     <FaHeart size={25} />
                     <Text fontWeight={"bold"} ml={2}>
                        7
                     </Text>
                  </Flex>
               </Flex>
            </Flex>

            <Img src={img} w={"100%"} h={"100%"} objectFit={"cover"} />
         </GridItem>

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
                           <Text fontSize="sm" color="gray">
                              Posted 3 hours ago
                           </Text>
                           <Flex gap={1}>
                              <FaLocationDot color="gray" />
                              <Text fontSize="sm" color="gray">
                                 Zeppos Tower
                              </Text>
                           </Flex>
                        </Box>

                        <Flex
                           justifyContent="space-between"
                           alignContent="flex-start"
                           ml={-1}
                        >
                           <Box
                              fontSize="56px"
                              fontWeight="normal"
                              as="h4"
                              lineHeight="1.2"
                              overflow="hidden"
                              display="-webkit-box"
                              webkitLineClamp="2"
                              webkitBoxOrient="vertical"
                              maxW="100%"
                           >
                              Respawn Gaming Chair
                           </Box>
                        </Flex>

                        <Flex
                           justifyContent="space-between"
                           gap={{ base: 0, md: 8, lg: 16 }}
                           mt={-3}
                        >
                           <Box
                              fontSize="86px"
                              as="h4"
                              lineHeight="1.5"
                              fontWeight="semibold"
                           >
                              $50
                           </Box>

                           <Flex flexDirection={"row"} alignItems={"center"}>
                              <Box
                                 onClick={handleLike}
                                 cursor={"pointer"}
                                 fontSize={40}
                                 pr={1}
                              >
                                 {!liked ? <FaRegHeart /> : <FaHeart />}
                              </Box>
                              <Text
                                 fontWeight={600}
                                 fontSize={"30"}
                                 alignSelf={"center"}
                                 pr={1}
                              >
                                 {likes}
                              </Text>
                           </Flex>
                        </Flex>

                        <Flex gap={{ base: 5, md: 15 }}>
                           <Button
                              bgGradient="linear(to-r, #5E2BFF, #FC6DAB)"
                              _hover={{
                                 bgGradient: "linear(to-r, #8862FF, #FF99C5)",
                              }}
                              _active={{
                                 bgGradient: "linear(to-r, #5E2BFF, #FC6DAB)",
                              }}
                              variant="solid"
                              color={"white"}
                              borderRadius={{ base: 35, md: 25 }}
                              fontSize="36px"
                              py={9}
                              px={16}
                           >
                              Buy
                           </Button>

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
                        </Flex>

                        <Flex pr={5} py={5}>
                           <Box width="100%">
                              <Text fontWeight={"bold"}>Description</Text>
                              <Text isTruncated>Selling this after</Text>
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

export default ProfilePost;
